# Real-Time Chat Application - Laravel + Vue.js

![Project Banner](https://via.placeholder.com/800x200?text=Laravel+Vue+RealTime+Chat)

A full-stack real-time chat application built with Laravel backend and Vue.js frontend, featuring ticket management, comments, and live chat functionality.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend (Laravel)](#backend-setup)
  - [Frontend (Vue.js)](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Chat Implementation](#chat-implementation)
- [Assumptions](#assumptions)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- PHP 8.0+
- Composer
- Node.js 14+
- npm/yarn
- MySQL 5.7+
- Pusher account (for real-time features)
- Redis (optional for queue management)

## Setup Instructions

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database and Pusher credentials:
   ```env
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password

   BROADCAST_DRIVER=pusher
   PUSHER_APP_ID=your_app_id
   PUSHER_APP_KEY=your_app_key
   PUSHER_APP_SECRET=your_app_secret
   PUSHER_APP_CLUSTER=your_cluster
   ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Run migrations**
   ```bash
   php artisan migrate --seed
   ```

6. **Start the server**
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_PUSHER_APP_KEY=your_pusher_app_key
   VITE_PUSHER_APP_CLUSTER=your_pusher_cluster
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

| Method | Endpoint   | Description                | Auth Required |
|--------|------------|----------------------------|---------------|
| POST   | /register  | Register new user          | No            |
| POST   | /login     | Login user                 | No            |
| POST   | /logout    | Logout user                | Yes           |
| GET    | /user      | Get authenticated user info| Yes           |

### Tickets

| Method | Endpoint        | Description                     | Roles          |
|--------|-----------------|---------------------------------|----------------|
| GET    | /tickets        | List all tickets                | Any            |
| POST   | /tickets        | Create new ticket               | customer       |
| GET    | /tickets/{id}   | Get specific ticket             | Any            |
| PATCH  | /tickets/{id}   | Update ticket                   | Any            |
| DELETE | /tickets/{id}   | Delete ticket                   | Any            |

### Comments

| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| GET    | /comments/{ticket}   | Get comments for ticket         |
| POST   | /comments/{ticket}   | Add comment to ticket           |
| PATCH  | /comments/{comment}  | Update comment                  |
| DELETE | /comments/{comment}  | Delete comment                  |

### Chat

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | /chats/{ticket}   | Get chat messages for ticket    |
| POST   | /chats/{ticket}   | Send new chat message           |

## Chat Implementation

The real-time chat feature uses:

1. **Pusher Channels** for WebSocket communication
2. **Laravel Broadcasting** to send events
3. **Private Channels** for secure communication
4. **Vue.js reactivity** for instant UI updates

### Flow:
1. User sends message via POST /chats/{ticket}
2. Laravel broadcasts NewChatMessage event
3. Pusher delivers event to all subscribers
4. Vue.js receives event and updates UI in real-time

## Assumptions

1. Users have only one role (customer or admin)
2. Tickets belong to customers
3. All authenticated users can participate in chats
4. Frontend runs on port 3000, backend on 8000
5. Development environment uses local Pusher config

## Troubleshooting

**403 Forbidden on /broadcasting/auth**
- Verify Sanctum token is being sent
- Check CORS configuration
- Ensure session driver is cookie

**Real-time not working**
- Verify Pusher credentials
- Check browser console for errors
- Ensure event is properly broadcasting

**Authentication issues**
- Clear Laravel cache
- Verify Sanctum configuration
- Check token expiration