# E-Commerce REST API

## Overview

A full-featured E-Commerce REST API built with Express.js, PostgreSQL, and Sequelize ORM. Features JWT-based authentication with bcrypt password hashing, full CRUD operations for users, products, categories, and orders.

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Start backend
npm run dev:server    # starts with nodemon on port 3000

# Start frontend
npm run dev:client    # starts Vite dev server

# Or run directly
cd server && npm run dev
cd client && npm run dev
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `DB_HOST` | — | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_DATABASE` | — | Database name |
| `DB_USERNAME` | — | Database user |
| `DB_PASSWORD` | — | Database password |
| `JWT_SECRET` | — | Secret key for JWT signing |

## Tech Stack

| Package | Version |
|---------|---------|
| express | ^4.21.2 |
| sequelize | ^6.37.5 |
| pg / pg-hstore | ^8.13.1 / ^2.3.4 |
| jsonwebtoken | ^9.0.2 |
| bcryptjs | ^2.4.3 |
| dotenv | ^16.4.7 |
| nodemon (dev) | ^3.1.9 |

## Project Structure

```
ecom-api/
├── package.json                  # Root package.json with convenience scripts
├── CLAUDE.md                     # This file
├── .gitignore
├── client/                       # React frontend (Vite + Tailwind)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   └── src/
└── server/                       # Backend (Express + PostgreSQL)
    ├── app.js                    # Express app entry point
    ├── package.json
    ├── .env                      # Environment variables
    └── src/
        ├── config/
        │   └── database.js       # Sequelize PostgreSQL connection
        ├── controllers/
        │   ├── authController.js     # Register, login, profile
        │   ├── userController.js     # User CRUD
        │   ├── infoUserController.js # User info CRUD
        │   ├── productController.js  # Product & category CRUD
        │   └── orderController.js    # Order CRUD
        ├── middleware/
        │   └── auth.js               # JWT verification middleware
        ├── models/
        │   ├── index.js              # Model exports
        │   ├── User.js               # user table
        │   ├── RegisterUser.js       # register_user table
        │   ├── LoginUser.js          # login_user table
        │   ├── InfoUser.js           # info_user table
        │   ├── ProductInfo.js        # product_info table
        │   ├── ProductCategory.js    # product_category table
        │   └── OrderCheckout.js      # order_checkout table
        └── routes/
            ├── index.js              # Route aggregator, mounts at /api
            ├── authRoutes.js         # /api/auth/*
            ├── userRoutes.js         # /api/users/*
            ├── infoUserRoutes.js     # /api/user-info/*
            ├── productRoutes.js      # /api/products/* and /api/products/categories/*
            └── orderRoutes.js        # /api/orders/*
```

## Authentication Flow

1. **Register** — `POST /api/auth/register` with `user_id`, `user_name`, `user_password` (+ optional `f_name`, `l_name`, `age`). Password is hashed with bcrypt (10 salt rounds). Creates records in `register_user` and `info_user` tables.
2. **Login** — `POST /api/auth/login` with `user_name`, `user_password`. Returns a JWT token valid for **24 hours**. Creates a record in `login_user` table.
3. **Use Token** — Send `Authorization: Bearer <token>` header on all protected routes.
4. **Token Rejected** — 401 if missing, 403 if expired/invalid.

## API Endpoints

### Health Check

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | No | API status check |

### Auth (`/api/auth`)

| Method | Path | Auth | Body | Description |
|--------|------|------|------|-------------|
| POST | `/api/auth/register` | No | `{ user_id, user_name, user_password, f_name?, l_name?, age? }` | Register new user |
| POST | `/api/auth/login` | No | `{ user_name, user_password }` | Login, returns JWT |
| GET | `/api/auth/profile` | Yes | — | Get authenticated user's profile |
| GET | `/api/auth/registered` | Yes | — | List all registered users |
| GET | `/api/auth/login-history` | Yes | — | List all login records |

### Users (`/api/users`)

| Method | Path | Auth | Body | Description |
|--------|------|------|------|-------------|
| GET | `/api/users` | Yes | — | Get all users |
| GET | `/api/users/:id` | Yes | — | Get user by user_id |
| POST | `/api/users` | Yes | `{ user_id, user_name, user_password }` | Create user |
| PUT | `/api/users/:id` | Yes | `{ user_name?, user_password? }` | Update user by user_id |
| DELETE | `/api/users/:id` | Yes | — | Delete user by user_id |

### User Info (`/api/user-info`)

| Method | Path | Auth | Body | Description |
|--------|------|------|------|-------------|
| GET | `/api/user-info` | Yes | — | Get all user info |
| GET | `/api/user-info/:id` | Yes | — | Get user info by user_id |
| PUT | `/api/user-info/:id` | Yes | `{ f_name?, l_name?, age?, user_address? }` | Update user info |
| DELETE | `/api/user-info/:id` | Yes | — | Delete user info |

### Products (`/api/products`)

| Method | Path | Auth | Body | Description |
|--------|------|------|------|-------------|
| GET | `/api/products` | Yes | — | Get all products |
| GET | `/api/products/:id` | Yes | — | Get product by product_id |
| POST | `/api/products` | Yes | `{ product_id, product_info?, product_price?, product_description?, product_category? }` | Create product |
| PUT | `/api/products/:id` | Yes | `{ product_info?, product_price?, product_description?, product_category? }` | Update product |
| DELETE | `/api/products/:id` | Yes | — | Delete product |

### Categories (`/api/products/categories`)

| Method | Path | Auth | Body | Description |
|--------|------|------|------|-------------|
| GET | `/api/products/categories/all` | Yes | — | Get all categories |
| GET | `/api/products/categories/:id` | Yes | — | Get category by category_id |
| POST | `/api/products/categories` | Yes | `{ category_id, category_name? }` | Create category |
| PUT | `/api/products/categories/:id` | Yes | `{ category_name? }` | Update category |
| DELETE | `/api/products/categories/:id` | Yes | — | Delete category |

### Orders (`/api/orders`)

| Method | Path | Auth | Body | Description |
|--------|------|------|------|-------------|
| GET | `/api/orders` | Yes | — | Get all orders |
| GET | `/api/orders/:id` | Yes | — | Get order by id |
| GET | `/api/orders/user/:userId` | Yes | — | Get orders by user_id |
| POST | `/api/orders` | Yes | `{ user_id, product_id, order_userid?, product_info?, product_price?, mode_payment?, total?, quantity?, user_address? }` | Create order |
| PUT | `/api/orders/:id` | Yes | `{ user_id?, product_id?, order_userid?, product_info?, product_price?, mode_payment?, total?, quantity?, user_address? }` | Update order |
| DELETE | `/api/orders/:id` | Yes | — | Delete order |

## Models

### User (`user`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| user_id | BIGINT | No | |
| user_name | STRING | No | |
| user_password | BIGINT | No | |

### RegisterUser (`register_user`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| user_id | BIGINT | No | |
| user_name | STRING | Yes | |
| user_password | STRING | Yes | bcrypt hashed |
| f_name | TEXT | Yes | First name |
| l_name | TEXT | Yes | Last name |
| age | BIGINT | Yes | |

### LoginUser (`login_user`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| user_id | STRING | No | |
| user_name | STRING | No | |
| user_password | STRING | No | |

### InfoUser (`info_user`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| user_id | BIGINT | No | |
| f_name | TEXT | Yes | First name |
| l_name | TEXT | Yes | Last name |
| age | BIGINT | Yes | |
| user_address | STRING | Yes | |

### ProductInfo (`product_info`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| product_id | STRING | No | |
| product_info | TEXT | Yes | |
| product_price | FLOAT | Yes | |
| product_description | TEXT | Yes | |
| product_category | TEXT | Yes | |

### ProductCategory (`product_category`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| category_id | STRING | No | |
| category_name | STRING | Yes | |

### OrderCheckout (`order_checkout`)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| id | BIGINT | No | Primary key, auto-increment |
| user_id | STRING | Yes | |
| product_id | STRING | Yes | |
| order_userid | STRING | Yes | |
| product_info | TEXT | Yes | |
| product_price | BIGINT | Yes | |
| mode_payment | BIGINT | Yes | |
| total | BIGINT | Yes | |
| quantity | BIGINT | Yes | |
| user_address | STRING | Yes | |

## Response Format

All endpoints return JSON in this format:

```json
{
  "status": "success" | "error",
  "message": "Description of result",
  "data": { },
  "error": "Error details (only on 500)"
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK — successful read/update/delete |
| 201 | Created — successful create |
| 400 | Bad Request — missing required fields |
| 401 | Unauthorized — missing token or invalid credentials |
| 403 | Forbidden — expired or invalid token |
| 404 | Not Found — resource doesn't exist |
| 409 | Conflict — duplicate resource |
| 500 | Internal Server Error |

## Commands

```bash
# From root (convenience scripts)
npm run dev:server     # Start backend dev server with nodemon
npm run dev:client     # Start frontend Vite dev server
npm run start:server   # Start backend production server
npm run build:client   # Build frontend for production
npm run install:all    # Install dependencies for both server and client

# From server/ directly
cd server && npm run dev    # Start backend dev server
cd server && npm start      # Start backend production server

# From client/ directly
cd client && npm run dev    # Start frontend dev server
cd client && npm run build  # Build frontend
```
