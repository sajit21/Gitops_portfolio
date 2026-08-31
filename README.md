## NK Portfolio

A personal portfolio website with a Content Management System (CMS) where the admin can perform CRUD operations on videos, articles, publications, and more. The website also displays the admin’s profile on the frontend.

## Features
- Admin CMS

- Create, edit, delete content: videos, books, articles, publications

- Admin profile displayed on the frontend

- Dashboard overview of all content

## Backend

-CRUD operations for all content

## User authentication: signup and login

- Token generation stored locally using Redis

- Database management with Prisma ORM and PostgreSQL

## 🛠 Backend Setup

- Install Redis and start the server:

- sudo apt install redis-server -y
- sudo systemctl start redis-server


## Install dependencies:

- npm install


## Set up Prisma database:

# Create PostgreSQL database named 'portfolio'
# Then migrate initial schema
npx prisma migrate dev --name init


## Run backend server:

npm run dev

## Backend Folder Structure
```
backend/
 ├── controllers/     # Handles logic for CRUD operations
 ├── routes/          # API endpoints
 ├── middleware/      # Auth, error handling, etc.
 ├── models/          # Prisma schema
 ├── utils/           # Helpers, token generation
 ├── app.js / server.js
 └── package.json

```

## Authentication

- Admin signs up or logs in using email and password

- JWT tokens generated and stored in Redis

For now, use Postman to test login/signup endpoints

## 🖥 Admin Dashboard

- Overview of content, users, and system activity

- Perform CRUD operations on videos, articles, publications, etc.

- Simple sign-in access using email and password (via Postman or frontend login)

## ⚡ Frontend (Next.js)

- Built with Next.js using the App Router

- State Management: Zustand

## Pages & Features

-Profile of admin displayed on frontend

Display videos, articles, publications, and other content

## Folder Structure
```
frontend/
 ├── src/
 │   ├── app/
 │   │   ├── layout.jsx
 │   │   ├── page.jsx
 │   │   ├── about/page.jsx
 │   │   ├── videos/page.jsx
 │   │   ├── articles/page.jsx
 │   │   └── publications/page.jsx
 │   ├── components/      # Reusable UI components
 │   ├── store/           # Zustand state management
 │   └── assets/          # Images, videos, icons

```

- Run Frontend
- npm install
- npm start


## Localhost: http://localhost:3000
