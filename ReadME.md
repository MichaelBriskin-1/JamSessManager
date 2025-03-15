# Jamoveo Web Application

## Overview

Jamoveo is a web-based platform that allows musicians to search for songs, display lyrics and chords, and perform live. The application supports user roles for **players** and **admins**, with real-time song updates using WebSockets.

## Features

- **User Authentication**: Signup and login system for players and admins.
- **Song Search**: Admins can search for songs by title.
- **Results Page**: Displays matching songs for selection.
- **Live Page**: Shows song lyrics and chords; only admins can quit the session.
- **Real-Time Updates**: Uses **Socket.io** to broadcast song selections.

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (latest stable version)
- **MongoDB** (if using a database)
- **Git** (for cloning the repository)

### Steps

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd jamoveo-web
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file and configure:
   ```sh
   VITE_BACKEND_URL=http://localhost:5000
   JWT_SECRET_KEY=your_secret_key
   ```
4. **Start the backend**:
   ```sh
   node server/index.js
   ```
5. **Start the frontend**:
   ```sh
   npm run dev
   ```

## Usage

1. **Signup/Login**:
   - Players select their instrument.
   - Admins access a special URL to register.
2. **Song Search & Selection**:
   - Admins search songs and select one.
   - All players are updated in real-time.
3. **Live Mode**:
   - Lyrics are displayed.
   - Players see lyrics + chords (except vocalists).
   - Admin can quit the session.

## Technologies Used

### Frontend:
- **React** (Vite setup)
- **Axios** (API requests)
- **React Router** (Navigation)

### Backend:
- **Node.js**
- **Express** (API framework)
- **MongoDB with Mongoose** (Database, if applicable)

### Real-Time Updates:
- **Socket.io** (WebSocket communication)

## Contributors

- **Michael**

## License

This project is licensed under the **MIT License**.

