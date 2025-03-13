# Food Delivery App

## Overview
This is a full-stack food delivery application that allows users to browse restaurants, order food, and track deliveries. It includes a **user-facing frontend**, an **admin panel**, and a **backend with authentication and database connectivity**.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Admin Panel:** React.js, ShadCN/UI, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Hosting:** Render.com

## Live Demo
- **User Frontend:** [Live Demo](https://food-delivery-frontend-ed5x.onrender.com)
- **Admin Panel:** [Live Demo](https://food-delivery-admin-6kig.onrender.com)

## Features
### User Frontend
- Browse restaurants and food items
- Add items to cart and place orders
- Track order status in real-time
- Secure login/signup with JWT authentication

### Admin Panel
- Manage restaurants and menu items
- View and process customer orders
- Dashboard for order analytics

## Installation
### Prerequisites
- Node.js (v16+)
- MongoDB

### Setup
#### 1. Clone the repository
```bash
git clone https://github.com/your-repo/food-delivery-app.git
cd food-delivery-app
```

#### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

#### 3. Setup environment variables
Create a `.env` file in the backend directory and configure:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### 4. Start the application
```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```

## API Endpoints
| Method | Endpoint         | Description            |
|--------|----------------|------------------------|
| POST   | /api/auth/signup | User registration     |
| POST   | /api/auth/login  | User login            |
| GET    | /api/restaurants | Fetch all restaurants |
| POST   | /api/orders      | Place an order        |
| GET    | /api/orders/:id  | Get order status      |

## Contribution
Feel free to fork the repository and open a pull request with enhancements.


