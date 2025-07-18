# School Management App

A simple school management system with APIs for managing users, teachers, and courses.

---

## How to Run the Application

To build and start the application using Docker:

```bash
# For default environment
npm run docker

```

---

##  Running Tests

Use the following npm scripts to run tests:

```bash
# Run all tests (unit + integration + e2e)
npm run test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only end-to-end (e2e) tests
npm run test:e2e
```

---

##  API Endpoints

###  Health Check

- `GET /`  
  Returns the health status of the application.

---

###  User API

**Base URL:** `/api/user`

| Method | Endpoint            | Description                                      |
|--------|---------------------|--------------------------------------------------|
| GET    | `/`                 | Get all users                                    |
| GET    | `/:id`              | Get specific user by ID                          |
| POST   | `/`                 | Create a user (requires `name` and `email` in body) |
| PUT    | `/:id`              | Update a user (requires `name` and `email` in body) |
| PUT    | `/join/:id`         | Enroll user in a course (`courseId` in body)     |
| PUT    | `/remove/:id`       | Remove course from user (`courseId` in body)     |
| GET    | `/cources/:id`      | Get all courses enrolled by a user               |
| DELETE | `/:id`              | Delete user by ID                                |

---

###  Teacher API

**Base URL:** `/api/teacher`

| Method | Endpoint            | Description                                        |
|--------|---------------------|----------------------------------------------------|
| GET    | `/`                 | Get all teachers                                   |
| GET    | `/:id`              | Get specific teacher by ID                         |
| POST   | `/`                 | Create a teacher (requires `name` and `email` in body) |
| PUT    | `/:id`              | Update a teacher (requires `name` and `email` in body) |
| PUT    | `/join/:id`         | Assign a teacher to a course (`courseId` in body)  |
| PUT    | `/remove/:id`       | Remove course from teacher (`courseId` in body)    |
| GET    | `/cources/:id`      | Get all courses assigned to a teacher              |
| DELETE | `/:id`              | Delete teacher by ID                               |

---

### Courses API

**Base URL:** `/api/cources`

| Method | Endpoint    | Description                                 |
|--------|-------------|---------------------------------------------|
| GET    | `/`         | Get all available courses                   |
| GET    | `/:id`      | Get specific course by ID                   |
| POST   | `/`         | Create a course (requires `name` in body)   |
| PUT    | `/:id`      | Update course name (requires `name` in body)|
| DELETE | `/:id`      | Delete course by ID                         |
