from tests.conftest import USER_EMAIL, USER_PASSWORD, login

def register(client, email=USER_EMAIL, password=USER_PASSWORD, full_name="Regular Reader"):
    return client.post(
        "/auth/register",
        json={"email": email, "full_name": full_name, "password": password},
    )

# Registration

def test_register_creates_regular_user(client):
    response = register(client)

    assert response.status_code == 201
    body = response.json()
    assert body["email"] == USER_EMAIL
    assert body["full_name"] == "Regular Reader"
    assert body["role"] == "user"
    assert "id" in body
    assert "password" not in body
    assert "hashed_password" not in body

def test_register_rejects_duplicate_email(client):
    assert register(client).status_code == 201

    response = register(client)

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_register_rejects_weak_password(client):
    response = register(client, password="password")

    assert response.status_code == 422

def test_register_rejects_invalid_email(client):
    response = register(client, email="not-an-email")

    assert response.status_code == 422

# Login

def test_login_returns_bearer_token(client):
    register(client)

    response = client.post(
        "/auth/login", data={"username": USER_EMAIL, "password": USER_PASSWORD}
    )

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]

def test_login_json_returns_bearer_token(client):
    register(client)

    response = client.post(
        "/auth/login/json", json={"email": USER_EMAIL, "password": USER_PASSWORD}
    )

    assert response.status_code == 200
    assert response.json()["access_token"]

def test_login_rejects_wrong_password(client):
    register(client)

    response = client.post(
        "/auth/login", data={"username": USER_EMAIL, "password": "WrongPass123!"}
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect email or password"

def test_login_rejects_unknown_email(client):
    response = client.post(
        "/auth/login", data={"username": "nobody@example.com", "password": USER_PASSWORD}
    )

    assert response.status_code == 401

def test_token_identifies_current_user(client):
    register(client)
    headers = login(client, USER_EMAIL, USER_PASSWORD)

    response = client.get("/auth/me", headers=headers)

    assert response.status_code == 200
    assert response.json()["email"] == USER_EMAIL
    assert response.json()["role"] == "user"

def test_me_rejects_invalid_token(client):
    response = client.get("/auth/me", headers={"Authorization": "Bearer not-a-real-token"})

    assert response.status_code == 401

def test_seeded_admin_can_log_in_with_admin_role(client, admin_headers):
    response = client.get("/auth/me", headers=admin_headers)

    assert response.status_code == 200
    assert response.json()["role"] == "admin"
    