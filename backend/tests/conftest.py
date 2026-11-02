import os
import tempfile
from pathlib import Path

import pytest

# Settings are read when the app is imported, so point it at a throwaway
# SQLite database before importing anything from the app. These values only
# exist for the test run and override anything in .env; they are not real
# credentials.
TEST_DB_PATH = Path(tempfile.gettempdir()) / "litbooks_test.db"
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{TEST_DB_PATH.as_posix()}"
os.environ["SECRET_KEY"] = "test-only-secret-key"
os.environ["ADMIN_EMAIL"] = "admin@test.example"
os.environ["ADMIN_PASSWORD"] = "TestOnlyAdmin1!"
os.environ["ADMIN_FULL_NAME"] = "Test Admin"

from fastapi.testclient import TestClient  # noqa: E402  pylint: disable=wrong-import-position

from main import app  # noqa: E402  pylint: disable=wrong-import-position

ADMIN_EMAIL = os.environ["ADMIN_EMAIL"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]
USER_EMAIL = "reader@example.com"
USER_PASSWORD = "ReaderPass123!"


@pytest.fixture
def client():
    TEST_DB_PATH.unlink(missing_ok=True)
    # Entering the client runs the lifespan: creates tables and seeds the admin.
    with TestClient(app) as test_client:
        yield test_client
    TEST_DB_PATH.unlink(missing_ok=True)


def login(client: TestClient, email: str, password: str) -> dict:
    response = client.post("/auth/login", data={"username": email, "password": password})
    assert response.status_code == 200, response.text
    return {"Authorization": f"Bearer {response.json()['access_token']}"}


@pytest.fixture
def admin_headers(client):
    return login(client, ADMIN_EMAIL, ADMIN_PASSWORD)


@pytest.fixture
def user_headers(client):
    response = client.post(
        "/auth/register",
        json={"email": USER_EMAIL, "full_name": "Regular Reader", "password": USER_PASSWORD},
    )
    assert response.status_code == 201, response.text
    return login(client, USER_EMAIL, USER_PASSWORD)


@pytest.fixture
def book(client, admin_headers):
    response = client.post(
        "/books/",
        json={
            "title": "Dune",
            "author": "Frank Herbert",
            "description": "Desert planet politics.",
            "tags": ["Sci-Fi", "classic"],
        },
        headers=admin_headers,
    )
    assert response.status_code == 201, response.text
    return response.json()
