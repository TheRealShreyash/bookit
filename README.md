<div align="center">
  <img src="https://img.icons8.com/color/120/000000/ticket.png" alt="bookIT Logo" width="100"/>
  <h1>🎬 bookIT - Simplified Ticket Booking</h1>
  <p>
    <em>A beautifully crafted, fully-functional seat reservation platform, bridging secure backend architecture with a stunning, modern frontend.</em>
  </p>

  <p>
    <!-- <img alt="Express" src="https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img alt="JWT" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" /> -->
    [![My Skills](https://skillicons.dev/icons?i=https://skillicons.dev/icons?i=js,bun,express,postgres,html,css,tailwindcss,vercel)](https://skillicons.dev)
  </p>
</div>

<br />

## 🌟 Overview

**bookIT** is a cinematic seat booking platform developed as a follow-up to the **Chai Aur SQL** module. Designed to mimic a real-world developer scenario, this project extends a starting code base by adding a robust authentication system, managing concurrent seat bookings with PostgreSQL transactions, and ensuring an intuitive, aesthetic frontend.

---

## ✨ Features Implemented

- 🔐 **Robust Authentication Layer**: End-to-end registration and login functionality utilizing encrypted bcrypt passwords, HTTP-only refresh cookies, and secure short-lived Access JWTs.
- 🛡️ **Protected Routing**: Specialized authentication middleware strictly restricting unauthorized access to critical endpoints (e.g., viewing seats, making bookings).
- 💺 **Bulletproof Seat Booking Engine**: Prevents double-booking via robust **SQL transactions (`FOR UPDATE`)**, ensuring concurrent booking attempts cannot hijack the same seat.
- 🔄 **Seamless Session Maintenance**: Silent auto-refresh for JWT tokens directly from the frontend to keep your ticket-booking spree uninterrupted!

---

## 🛠️ Technology Stack

**Backend Engine**

- **Runtime:** Bun / Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via `pg` pool)

**Security & Validation**

- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **Password Hashing:** `bcrypt`
- **Schema Validation:** `zod`
- **Cookies:** `cookie-parser`

**Frontend Aesthetics**

- HTML5 / Vanilla JavaScript (ES6+)
- TailwindCSS (via CDN)
- Google Fonts (_Outfit, DM Serif Display, DM Sans_)

---

## 🚀 Getting Started

### Prerequisites

- **Bun** or **Node.js** installed globally.
- A running **PostgreSQL** server.

### 1. Installation

Clone the repository and install the required dependencies:

```bash
# Using bun
bun install

# Or using npm
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root of the project with the following (fill in your PostgreSQL credentials & JWT secrets):

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=railway # Or whichever database you use

# Tokens
ACCESS_TOKEN_SECRET=your_super_secret_access_token
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token
```

### 3. Database Setup

Using your preferred interface (`psql`, pgAdmin, Beekeeper Studio), execute the following SQL to generate your `seats` schema:

```sql
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    isbooked INT DEFAULT 0
);

-- Generate initial 20 empty seats
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(322) UNIQUE NOT NULL,
    password VARCHAR(15) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    refresh_token TEXT,
    created_at DATE,
    updated_at DATE
);
```

### 4. Running the Application

You can start the server locally:

```bash
# Development Mode (hot-reload)
bun run dev

# Standard Mode
bun run start
```

Visit `http://localhost:8080` in your browser. (The app exposes the interface directly through simple `res.sendFile()`)

---

## 🗺️ API Blueprint

### Authentication Endpoints (`/auth`)

- `POST /auth/sign-in` — Authenticate user and assign Session Cookies & JWT.
- `POST /auth/sign-up` — Validate and create a safe user entry.
- `POST /auth/refresh-token` — Regenerate access token if refresh cookie is intact.
- `POST /auth/logout` — Expire local & browser sesssions safely.

### Application Endpoints

- `GET /seats` — Returns chronological sequence of all seats and their current booking status. _(Requires Auth)_
- `PUT /:id/:name` — Books the specified seat (`id`) under the provided string (`name`). Enacts the `FOR UPDATE` lock logic. _(Requires Auth)_

---

<div align="center">
  <p>Built as a part of the Web Dev Cohort • Happy Coding! ☕💻📖</p>
</div>
