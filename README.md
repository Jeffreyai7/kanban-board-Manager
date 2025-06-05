# Kanban Board Management App

A modern Kanban board management application built with a *React* frontend (powered by *Vite, **TypeScript, and **TailwindCSS) and a **Django REST Framework* backend API.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This Kanban Board app helps users organize tasks using boards, lists, and cards. It features drag-and-drop functionality, real-time updates, and user authentication.

---

## Features

- User authentication and authorization (sign up, login, logout)
- Create, edit, and delete boards, lists, and cards
- Drag-and-drop cards between lists and reorder
- Responsive UI with TailwindCSS
- RESTful API built with Django REST Framework
- Real-time updates using WebSockets (optional, if implemented)
- Search and filter tasks by status, priority, or labels

---

## Tech Stack

*Frontend:*

- React 18
- Vite
- TypeScript
- TailwindCSS
- React DnD

*Backend:*

- Django 4.x
- Django REST Framework
- PostgreSQL (or SQLite for development)
- Django Channels (if using WebSockets)

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- Python 3.8+
- pip
- PostgreSQL (or use SQLite for local development)

---

### Backend Setup

1. Clone the repository:

   bash
   git clone https://github.com/Jeffreyai7/kanban-board-Manager.git
   cd kanban_board_backend
   

2. Create and activate a virtual environment:

   bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows
   

3. Install dependencies:

   bash
   pip install -r requirements.txt
   

4. Configure your database in backend/settings.py (PostgreSQL recommended):

   python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'kanban_db',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   

5. Apply migrations:

   bash
   python manage.py migrate
   

6. Create a superuser (optional):

   bash
   python manage.py createsuperuser
   

7. Run the development server:

   bash
   python manage.py runserver
   

---

### Frontend Setup

1. Navigate to the frontend folder:

   bash
   cd client
   

2. Install dependencies:

   bash
   npm install
   # or
   yarn install
   

3. Configure API URL in your .env or environment variables (example .env):

   
   VITE_API_BASE_URL=http://localhost:8000/api
   

4. Run the development server:

   bash
   npm run dev
   # or
   yarn dev
   

---

## Running the App

- Start the backend Django server:

  bash
  cd backend
  source venv/bin/activate
  python manage.py runserver
  

- Start the frontend Vite dev server:

  bash
  cd frontend
  npm run dev
  

Open your browser at [http://localhost:3000](http://localhost:3000) (or the port Vite outputs) to access the app.

---

## API Documentation

When the Django server is running, you can access the browsable API at http://localhost:8000/api/.

Typical API endpoints include:

- /api/auth/ - Authentication endpoints
- /api/boards/ - Manage Kanban boards
- /api/lists/ - Manage lists inside boards
- /api/cards/ - Manage cards inside lists

---

## Folder Structure


kanban-board-Manager/
├── kanban_board_backend/
│   ├── kanban_backend/               # Django project folder
│   ├── tasks/
|   |──  users/      # App handling boards, lists, cards
│   ├── requirements.txt
│   └── manage.py
|   ├── signup.rest
├── client/
│   ├── public/
│   |   ├── images/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/         # API calls, auth services
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md


---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

Steps to contribute:

1. Fork the repo
2. Create a feature branch (git checkout -b feature/my-feature)
3. Commit changes (git commit -m 'Add my feature')
4. Push to branch (git push origin feature/my-feature)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Contact

Created by
[Ejiro Frances (Frontend)](https://github.com/Ejiro-Frances) - feel free to reach out!
[Jeffery (Frontend)](https://github.com/jefferyai7) - feel free to reach out!
[Prince (Backend)](https://github.com/PrinceTheDev) - feel free to reach out!
