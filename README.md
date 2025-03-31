# Phishing Management System

A phishing simulation and management system, where administrators can track phishing attempts, send phishing emails, and manage their status (e.g., pending, clicked).

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [How to Run](#how-to-run)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Features](#features)
7. [Contact](#contact)

---

## Introduction

This project is a phishing management system built with **NestJS** on the backend and **React** on the frontend. It allows administrators to simulate phishing attempts, track the status of each attempt, and manage the status of emails sent.

## Technologies Used

- **Backend**: NestJS, MongoDB
- **Frontend**: React, Axios
- **Authentication**: JWT
- **Styling**: CSS (Basic styling)
  
## How to Run

### Backend (NestJS)

1. Clone the backend repository:
    ```bash
    git clone <your-backend-repository-url>
    cd phishing-management
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up MongoDB (either locally or using a service like MongoDB Atlas).

4. Run the backend:
    ```bash
    npm run start
    ```

    The backend will be available at `http://localhost:3001`.

### Frontend (React)

1. Clone the frontend repository:
    ```bash
    git clone <your-frontend-repository-url>
    cd phishing-simulator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the frontend:
    ```bash
    npm start
    ```

    The frontend will be available at `http://localhost:3002`.

### Environment Variables
To run the backend, you will need to configure the following environment variables:

- **MONGO_URI**: MongoDB connection URI (local or cloud).
- **JWT_SECRET**: Secret key for signing JWT tokens.

Example `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/phishing
JWT_SECRET=your-secret-key
