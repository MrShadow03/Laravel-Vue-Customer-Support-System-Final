# Real-Time Chat Application - Laravel + Vue.js

![Project Banner](https://repository-images.githubusercontent.com/603411565/4e13dc7c-b56d-44fe-a39a-6d5d7e3ae137)

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

- PHP v8.2.12
- Composer v2.8.6
- Node.js v22.14.0
- MySQL 5.7+

## Setup Instructions

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrShadow03/Laravel-Vue-Customer-Support-System-Final
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

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```
5. **Create a new MySQL database named "customer-support-system"**

6. **Run migrations and seed**
   ```bash
   php artisan migrate --seed
   ```

7. **Start the server**
   ```bash
   php artisan serve
   ```
8. **Admin Credentials**
    After migrating and seeding the database 2 admin accounts should be created automatically with the following credentials:
    ```bash
   Email: admin@example.com
   Password: password
   ```
    ```bash
   Email: admin2@example.com
   Password: password
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

3. **Start development server**
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

1. New chat channels are created for each new tickets
2. Admins can send messages to any channels but users can only send messages to their tickets
3. To try out the chatting feature navigate to a single ticket view and then the chatbox should appear at the sidebar