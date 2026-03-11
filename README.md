# GoCinemas – Movie Ticket Booking Platform

GoCinemas is a **full-stack web application for browsing movies and booking cinema tickets online**.
The platform allows users to explore currently available movies, view show details, select seats, and complete ticket bookings through an interactive web interface.

This was a collaborative project, and the system is built using a **React frontend and a Node.js backend**, following a modular architecture for scalability and maintainability.

---

# Features

* Browse available movies
* View movie details and show information
* Select show timings
* Seat selection interface
* Ticket booking workflow
* Booking confirmation page
* View previously booked tickets
* Interactive UI with reusable components
* REST API based backend architecture

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript (JSX)
* CSS

## Backend

* Node.js
* Express.js
* REST APIs

## Database Layer

* MongoDB-style data models (Movies, Shows, Bookings, Users)

## Deployment / Configuration

* Vercel configuration for deployment

---

# Project Architecture

The application follows a **client–server architecture**.

```
Client (React)
        │
        │ HTTP API Requests
        ▼
Server (Node.js + Express)
        │
        ▼
Database Models
```

The **React client handles the user interface and user interaction**, while the **backend server manages API endpoints, business logic, and database communication**.

---

# Team Contributions

## Frontend Development – Niharika

Key contributions included:

* Developing the **React-based frontend architecture**
* Building reusable UI components for the application interface
* Implementing page views including:

  * landing page
  * movie details
  * search and filtering
  * seat layout selection
  * booking confirmation
  * user bookings
* Managing UI state across components using React context
* Integrating the frontend with backend API endpoints
* Styling the interface using CSS to create a responsive user experience

---

## Backend Development – Prithika

Key contributions included:

* Designing and implementing the **Node.js + Express server**
* Creating REST API endpoints for booking operations
* Implementing the MVC-style backend structure
* Defining database models for movies, shows, bookings, and users
* Handling booking logic through controller functions
* Managing route definitions for API requests
* Configuring server deployment settings

---

# Installation

Clone the repository:

```
git clone https://github.com/prithzzz/GoCinemas.git
```

---

# Running the Frontend

Navigate to the client folder:

```
cd client
npm install
npm run dev
```

The frontend will start on:

```
http://localhost:5173
```

---

# Running the Backend

Navigate to the server folder:

```
cd server
npm install
node server.js
```

---

# Authors

**Niharika** – Frontend development

**Prithika** – Backend development
