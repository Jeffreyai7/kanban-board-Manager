# Kanban Board Backend
This is the backend API for this Kanban Board application, built with Django and Django REST Framework.
It supports user authentication (including Google OAuth), email/phone verification, JWT-based auth, and full CRUD for tasks.


## Tech Stack
- Python 3.12+
- Django 5.x
- Django REST Framework
- PostgreSQL (production) / SQLite (dev/test)
- SimpleJWT for authentication
- dj-rest-auth & django-allauth for registration and social login
- python-decouple for environment variables


## Features
- User registration (with verification code sent via email)
- login -> receive access and refresh JWT tokens
- logout -> revoke refresh token(JWT)
- Email and phone verification with codes
- Google social login support
- Task management (CRUD, per-user)
- Task priority and status
- Search/filter tasks
- CORS support for frontend integration



## Setup

**Clone the repo:**
```bash
 git clone https://token@github.com/Jeffreyai7/kanban-board-Manager.git
 ```
- Replace token with your personal access token


**Create and activate a virtual environment:**
```bash
- cd kanban-board-Manager/backend
- python3 -m venv kanban_env && source kanban_env.bin/activate
```

**Install dependencies:**
```bash
- pip install -r requirements.txt
```


**Create a .env file and configure the following:**
```bash
- vim .env
```
- Configure the following to your .env and add your .env file into .gitignore

SECRET_KEY=...
DEBUG=True
DATABASE_URL=postgres://user:pass@localhost:5432/kanban_db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=you@example.com
EMAIL_HOST_PASSWORD=your_email_app_password
SOCIAL_AUTH_GOOGLE_CLIENT_ID=...
SOCIAL_AUTH_GOOGLE_CLIENT_SECRET=...


**Apply migrations:**
```python
- python3 manage.py makemigrations users tasks
- python3 manage.py migrate
```

**Run the server:**
```python
- python3 manage.py runserver
```



## API Endpoints

**Auth & User**
- POST /api/register/ — Register new user
- POST /api/login/ — Login (JWT)
- POST /api/logout/ — Logout
- POST /api/token/refresh/ — Refresh JWT token
- GET /api/user-detail — Get current user details
- POST /api/send-code/ — Send verification code (email/phone)
- POST /api/verify-code/ — Verify code
- POST /api/google-login/ — Google OAuth login


**Tasks**
- GET /api/tasks/ — List user’s tasks
- POST /api/tasks/ — Create task
- GET /api/tasks/<id>/ — Retrieve task
- PUT/PATCH /api/tasks/<id>/ — Update task
- DELETE /api/tasks/<id>/ — Delete task


## Testing
**Run all tests:**
- `python3 manage.py test users`
- `python3 manage.py test tasks`


## Deployment
- Set DEBUG=False and configure allowed hosts in production.
- Use a real email backend (SMTP or a service like SendGrid).
- Set up your production database and environment variables.

**Deploying On Render**
1. Create new web service → attach GitHub repo → branch backend.
2. Add env vars in Render dashboard (matching .env).
3. **Build Command:**
```nginx
- pip install -r requirements.txt
- python3 manage.py migrate
```
4. **Start Command:**
```nginx
- gunicorn kanban_backend.wsgi
```
5. Setup PostgreSQL and add DATABASE_URL
6. Ensure ALLOWED_HOSTS includes your render domain
7. Configure SMTP settings in Render dashboard


## Contributing
1. Fork → create feature branch → open PR to development.
2. Ensure existing tests pass; add new ones for features.
3. Use pre-commit hooks and linting before submitting.


## AUTHOR
**Uchendu Prince (PrinceTheDev)**

## License
**MIT**