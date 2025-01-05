# “Reach out: A Map for Community Care”

A web application built to bridge the gap between community needs and volunteers willing to help. The app maps out areas where help is needed and enables volunteers to contribute efficiently. This project aligns with the theme of "Tech for Social Good."

## Features

- **User Authentication**: Register and log in as a user or volunteer.
- **Create Needs**: Users can report community needs (e.g., food, book drives, blood donation).
- **View Needs**: Volunteers can browse needs filtered by category and urgency.
- **Fulfill Needs**: Volunteers can mark needs they are addressing.
- **Dashboard**: Track reported and fulfilled needs.
- **Profile Management**: Update user information and view activities.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT with cookies

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB set up locally

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Shivansh-Dutt/Team-Shivansh.git
   cd Team-Shivansh

   ```

2. Install Backend Dependencies
   ```bash
   cd backend
   npm install
   ```
3. Install Frontend Dependencies

   ```bash
   cd frontend
   npm install
   ```

4. Create Environment variable
   Backend: In server/.env, set up:

   SECRET_KEY=your_jwt_secret

5. Run the backend Server

   ```bash
   cd backend
   npm run dev
   ```

6. Run the frontend app

   ```bash
   cd frontend
   npm run dev
   ```
