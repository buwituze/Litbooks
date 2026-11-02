NEW_BOOK = {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "description": "There and back again.",
    "tags": ["Fantasy"],
}

# Create

def test_admin_can_create_book(client, admin_headers):
    response = client.post("/books/", json=NEW_BOOK, headers=admin_headers)
    assert response.status_code == 201
    body = response.json()
    assert body["title"] == "The Hobbit"
    assert body["author"] == "J.R.R. Tolkien"
    assert [tag["name"] for tag in body["tags"]] == ["fantasy"]
    fetched = client.get(f"/books/{body['id']}")
    assert fetched.status_code == 200
    assert fetched.json()["title"] == "The Hobbit"

def test_create_book_requires_title_and_author(client, admin_headers):
    response = client.post("/books/", json={"title": "", "author": ""}, headers=admin_headers)
    assert response.status_code == 422

def test_anonymous_user_cannot_create_book(client):
    response = client.post("/books/", json=NEW_BOOK)
    assert response.status_code == 401

# Read

def test_anyone_can_list_books(client, book):
    response = client.get("/books/")
    assert response.status_code == 200
    assert [b["id"] for b in response.json()] == [book["id"]]

def test_get_missing_book_returns_404(client):
    response = client.get("/books/9999")
    assert response.status_code == 404

# Update

def test_admin_can_update_book(client, admin_headers, book):
    response = client.put(
        f"/books/{book['id']}",
        json={"title": "Dune Messiah", "tags": ["sequel"]},
        headers=admin_headers,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["title"] == "Dune Messiah"
    assert body["author"] == "Frank Herbert"  # untouched fields are kept
    assert [tag["name"] for tag in body["tags"]] == ["sequel"]
    assert client.get(f"/books/{book['id']}").json()["title"] == "Dune Messiah"

def test_update_missing_book_returns_404(client, admin_headers):
    response = client.put("/books/9999", json={"title": "Ghost"}, headers=admin_headers)
    assert response.status_code == 404

# Delete

def test_admin_can_delete_book(client, admin_headers, book):
    response = client.delete(f"/books/{book['id']}", headers=admin_headers)
    assert response.status_code == 204
    assert client.get(f"/books/{book['id']}").status_code == 404

def test_delete_missing_book_returns_404(client, admin_headers):
    response = client.delete("/books/9999", headers=admin_headers)
    assert response.status_code == 404

# Regular users are refused admin actions

def test_regular_user_cannot_create_book(client, user_headers):
    response = client.post("/books/", json=NEW_BOOK, headers=user_headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "Admin access required"
    assert client.get("/books/").json() == []

def test_regular_user_cannot_update_book(client, user_headers, book):
    response = client.put(
        f"/books/{book['id']}", json={"title": "Hijacked"}, headers=user_headers
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "Admin access required"
    assert client.get(f"/books/{book['id']}").json()["title"] == "Dune"

def test_regular_user_cannot_delete_book(client, user_headers, book):
    response = client.delete(f"/books/{book['id']}", headers=user_headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "Admin access required"
    assert client.get(f"/books/{book['id']}").status_code == 200
    