from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload
from typing import List, Optional
from app.database import get_db
from app.models import Book, User, Tag
from app.schemas import BookCreate, BookUpdate, BookResponse
from app.dependencies import get_current_user


router = APIRouter(prefix="/books", tags=["Books"])


async def get_or_create_tag(db: AsyncSession, tag_name: str) -> Tag:
    tag_name = tag_name.strip().lower()
    result = await db.execute(select(Tag).filter(Tag.name == tag_name))
    tag = result.scalar_one_or_none()
    
    if not tag:
        tag = Tag(name=tag_name)
        db.add(tag)
        await db.flush()
    
    return tag


@router.post("/", response_model=BookResponse, status_code=status.HTTP_201_CREATED)
async def create_book(
    book_data: BookCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    new_book = Book(
        title=book_data.title,
        author=book_data.author,
        description=book_data.description,
        image_url=book_data.image_url,
        creator_id=current_user.id
    )
    
    if book_data.tags:
        for tag_name in book_data.tags:
            tag = await get_or_create_tag(db, tag_name)
            new_book.tags.append(tag)
    
    db.add(new_book)
    await db.commit()
    await db.refresh(new_book)
    
    result = await db.execute(
        select(Book)
        .options(selectinload(Book.tags))
        .filter(Book.id == new_book.id)
    )
    book = result.scalar_one()
    return book


@router.get("/", response_model=List[BookResponse])
async def get_books(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: Optional[str] = None,
    tag: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Book).options(selectinload(Book.tags))
    
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Book.title.ilike(search_pattern),
                Book.author.ilike(search_pattern)
            )
        )
    
    if tag:
        query = query.join(Book.tags).filter(Tag.name == tag.lower())
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    books = result.scalars().all()
    return books


@router.get("/{book_id}", response_model=BookResponse)
async def get_book(book_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Book)
        .options(selectinload(Book.tags))
        .filter(Book.id == book_id)
    )
    book = result.scalar_one_or_none()
    
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    return book


@router.put("/{book_id}", response_model=BookResponse)
async def update_book(
    book_id: int,
    book_data: BookUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Book)
        .options(selectinload(Book.tags))
        .filter(Book.id == book_id)
    )
    book = result.scalar_one_or_none()
    
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    if book.creator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own books"
        )
    
    update_data = book_data.model_dump(exclude_unset=True)
    
    if "tags" in update_data:
        tag_names = update_data.pop("tags")
        if tag_names is not None:
            book.tags.clear()
            for tag_name in tag_names:
                tag = await get_or_create_tag(db, tag_name)
                book.tags.append(tag)
    
    for field, value in update_data.items():
        setattr(book, field, value)
    
    await db.commit()
    await db.refresh(book)
    return book


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Book).filter(Book.id == book_id))
    book = result.scalar_one_or_none()
    
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    if book.creator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own books"
        )
    
    await db.delete(book)
    await db.commit()
    return None


@router.get("/tags/all", response_model=List[str])
async def get_all_tags(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tag))
    tags = result.scalars().all()
    return [tag.name for tag in tags]
