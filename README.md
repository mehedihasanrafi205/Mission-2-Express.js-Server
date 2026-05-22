# Express.js Server Architecture & Database Integration

A robust, scalable, and secure backend server built with **Node.js**, **Express.js**, and **TypeScript**. This project implements a modular architecture for clean code and easy maintainability, featuring **PostgreSQL** integration and **JWT-based authentication**.

---

## 🛠 Features

* **Modular Architecture:** Organized into distinct layers (Routes, Controllers, Services) for better scalability and separation of concerns.
* **Database Integration:** Utilizes PostgreSQL (`pg`) for relational data management with predefined schema setup for `users` and `profiles`.
* **Authentication & Security:** 
  * Implements JSON Web Tokens (JWT) for secure authentication.
  * Role-based access control (Admin, Agent, User).
  * `bcryptjs` for secure password hashing.
  * `cookie-parser` for handling HTTP cookies and refresh tokens.
* **Global Error Handling:** Centralized error catching via `globalErrorHandler`.
* **CORS Configured:** Configured to accept requests from specific origins (`localhost:3000`).
* **Environment Configuration:** Secure management of environment variables using `dotenv`.

---

## 💾 Database Schema

The database relies on two main tables connected via a one-to-one relationship:

1. **`users` Table:**
   - `id` (Primary Key)
   - `name`, `email` (Unique)
   - `password` (Hashed)
   - `is_active` (Boolean), `age`
   - `role` ('admin', 'agent', 'user')
   
2. **`profiles` Table:**
   - `id` (Primary Key)
   - `user_id` (Foreign Key referencing `users(id)`, ON DELETE CASCADE)
   - `bio`, `address`, `phone`, `gender`

---

## 🔗 API Endpoints

### 👤 User Module (`/api/users`)
* `POST /` - Create a new user.
* `GET /` - Get all users (Protected: requires valid auth token).
* `GET /:id` - Get a single user by ID.
* `PUT /:id` - Update user details.
* `DELETE /:id` - Delete a user.

### 🛡️ Auth Module (`/api/auth`)
* `POST /login` - Authenticate a user and receive access & refresh tokens.
* `POST /refresh-token` - Generate a new access token using a valid refresh token.

### 📝 Profile Module (`/api/profile`)
* `POST /` - Create a user profile linked to an existing user account.

---

## 🚀 Technologies Used

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL (`pg` module)
* **Security:** JSON Web Tokens (JWT), bcryptjs
* **Development:** TSX (TypeScript execution), TSUP (Bundler)

---

## 📁 Project Structure

```text
├── src/                
│   ├── app/            # Main Express application setup & middleware
│   ├── config/         # Global configurations and env variables
│   ├── db/             # Database connection and schema initialization
│   ├── middleware/     # Custom middlewares (auth, logger, error handling)
│   ├── modules/        # Domain modules (auth, profile, user)
│   │   ├── auth/       # Auth routes, controllers, and services
│   │   ├── profile/    # Profile routes, controllers, and services
│   │   └── user/       # User routes, controllers, and services
│   ├── types/          # Global TypeScript interfaces
│   ├── utility/        # Helper functions
│   ├── server.ts       # Server entry point
│   └── app.ts          # Express App configuration
├── dist/               # Compiled production build
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## 💻 Getting Started

### Prerequisites
* Node.js installed
* PostgreSQL database up and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mehedihasanrafi205/Mission-2-Express.js-Server.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary configurations:
   ```env
   # Example variables
   PORT=5000
   CONNECTION_STRING=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

* **Development Mode:**
  ```bash
  npm run dev
  ```
* **Production Build:**
  ```bash
  npm run build
  npm start
  ```