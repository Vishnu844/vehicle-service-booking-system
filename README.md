# Vehicle Service Booking API Documentation

This documentation provides details about the Vehicle Service Booking API system built using Node.js, Express.js, and MongoDB.

## Table of Contents

1. [Installation](#installation)
2. [Setup](#setup)
3. [API Endpoints](#api-endpoints)
4. [Features](#features)
5. [Technologies Used](#technologies-used)
6. [Folder Structure](#folder-structure)
7. [Contributing](#contributing)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Vishnu844/vehicle-service-booking-system.git
   cd vehicle-service-booking-system

2. Install dependencies for both backend:
   ```sh
   cd vehicle-service-booking-system
   npm install

3. Start MongoDB server:
   ```sh
   mongod

4. Start the backend server:
   ```sh
   cd backend
   npm start

## Setup

The backend is built using Node.js, Express, and MongoDB.

### Configuration

- Ensure MongoDB is running locally or update the MongoDB connection string in `index.js`.

### Models

- Vehicle user model
```
userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
```

- Vehicle booking model
```
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  vehicleType: { type: String, required: true },
  serviceType: { type: String, required: true },
  bookingDate: { type: Date, required: true, default: Date.now() }
```

### API Endpoints

### Vehicle Booking Endpoints

| Method | Endpoint                          | Description                                                                        |
|--------|-----------------------------------|------------------------------------------------------------------------------------|
| GET    | /api/bookings                 | Fetch all Bookings of a user with filters by serviceDate and vehicleType |
| GET    | /api/bookings/:bookingId                   | Fetch booking data of given booking id.                                               |
| POST    | /api/bookings/create                    | Create a booking for given data.                                         |
| PUT    | /api/update/:bookingId                    | Update data for a booking for a given booking id.                                         |
| DELETE    | /api/delete/:bookingId                     | Delete booking for a given booking id.             |

### Vehicle User Endpoints

| Method | Endpoint                          | Description                                                                        |
|--------|-----------------------------------|------------------------------------------------------------------------------------|
| POST    | /api/user/register                 | Create a user for given data |
| POST    | /api/user/login                   | Authenticate user and allows to perform vehicle booking.|          

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing product transaction data.
- **Json Web Token**: For Token based Authentication.

### Development Tools

- **npm**: Package manager for Node.js packages.
- **Git**: Version control system for tracking changes in the codebase.
- **Visual Studio Code**: Source code editor with built-in support for JavaScript and React.
- **Postman**: API development environment for testing API endpoints.

## Folder Structure

```
/vehicle-service-booking-systems
│
├── /controllers
├── /middleware
├── /models
├── /routes
├── index.js
└── ...
```
## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
