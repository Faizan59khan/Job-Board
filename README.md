# Job Board

A full-stack job board application built using NestJS, Vue.js, and PostgreSQL. This project allows employers to post jobs and manage applications, while job seekers can browse and apply for job listings.

## Features

- **Authentication**
  - User authentication and authorization using JWT.
  - Role-based access control (Job Seekers & Employers).

- **Job Management**
  - Employers can create, update, and delete job listings.
  - Job listings include details such as title, description, salary, and required skills.

- **Job Applications**
  - Job seekers can apply for jobs.
  - Employers can update the status of job applications (e.g., Pending, Accepted, Rejected).

## Tech Stack

- **Backend:** NestJS (Node.js framework), PostgreSQL (Database)
- **Frontend:** Vue.js
- **Authentication:** JWT-based authentication
- **ORM:** TypeORM

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Faizan59khan/Job-Board
   cd job-board
   ```

2. Install dependencies:
   ```sh
   npm install  # for backend
   cd frontend && npm install  # for frontend
   ```

3. Set up environment variables for backend (`.env` file):
   ```sh
   DATABASE_URL=postgresql://user:password@localhost:5432/jobboard
   JWT_SECRET=your_secret_key
   ```

4. Run migrations:
   ```sh
   npm run migration:run
   ```

5. Start the backend server:
   ```sh
   npm run start:dev
   ```

6. Start the frontend application:
   ```sh
   cd frontend
   npm run serve
   ```

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user
- `GET /jobs` - Get all job listings
- `POST /jobs` - Create a new job (Employer only)


## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.


