# Food Delivery App

## Overview

The Food Delivery App is a platform designed to provide users with an easy and efficient way to order food from their favorite restaurants. With an intuitive and user-friendly interface, customers can browse a variety of cuisines, place orders, track deliveries, and enjoy a seamless food delivery experience. The admin panel allows restaurant owners to manage their menu, track orders, and handle customer interactions. The app is built with full responsiveness for both mobile and desktop devices.

---

## Features

- **User Profile**: Allows users to sign up, log in, and manage their personal information.
- **Menu Browsing**: Users can browse through a variety of restaurants, view menus, and place orders.
- **Order Tracking**: Users can track the status of their orders in real-time.
- **Restaurant Management**: Admin panel to add/remove items, view orders, and update restaurant details.
- **Payment Integration**: Secure payment gateway for processing orders.
- **Responsive Design**: Fully responsive for a seamless experience on mobile and desktop devices.

---

## Tech Stack

### Frontend
- **React**: For building dynamic and interactive UI components.
- **HTML/CSS**: For structuring and styling the platform.
- **JavaScript**: For client-side logic and interactivity.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: Server-side JavaScript framework for handling API requests and responses.
- **Express.js**: Web framework used for routing and middleware in the backend.
- **MongoDB**: Database for storing user, restaurant, and order data.
- **JWT Authentication**: JSON Web Token used for secure user and admin authentication.
- **Razorpay/Payment Gateway**: For processing payments securely.

---

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (local or cloud-based)

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/food-delivery-app.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd food-delivery-app/frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4.Run the frontend development server:
  ```bash
   npm start
  ```
### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd food-delivery-app/backend
   ```

2. Install the dependencies:
   ```bash
   npm install
    ```
3. Set up MongoDB (use either a local MongoDB instance or a cloud database like MongoDB Atlas).
   
4. Create a .env file in the backend directory and add your MongoDB URI and other environment variables:
   ```bash
   PORT, VITE_APP_MOGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

   ```
5. Run the backend server:
   ```bash
   npm start
   ```

## Usage

1. Visit the frontend at `http://localhost:3000`.
2. Create an account or log in to place an order.
3. Browse restaurants and menus, add items to your cart, and proceed with the order.
4. Use the admin panel (available at `http://localhost:5000/admin`) to manage restaurant menus and orders.
5. Use the secure payment system to complete the transaction.

---

## Future Enhancements

- **Multi-Restaurant Support**: Expand the platform to support multiple restaurants in the same region.
- **Review and Rating System**: Allow customers to leave reviews and ratings for restaurants and food items.
- **Delivery Partner Integration**: Enable integration with third-party delivery services for tracking and managing deliveries.
- **Push Notifications**: Implement push notifications for order updates and promotions.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

---
## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

---
