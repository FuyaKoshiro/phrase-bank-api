# Server

## 1. Technology Stack
- **Language**: TypeScript
- **Framework**: Express.js
- **Environment**: Node.js
- **Database**: PostgreSQL
- **Authentication**: Firebase
- **ORM**: Prisma
- **Version Control**: Git (GitHub, GitLab, etc.)
- **Testing**: Jest (for unit tests and integration tests)

## 2. Directory Structure and Roles
```plaintext
/src
  /controllers
  /services
  /repositories
  /middlewares
  /routes
  /utils
  /configs
  index.ts
/prisma
```

- **Routes**: Handle incoming requests and direct them to appropriate controllers.
- **Controllers**: Manage request validation and business logic invocation.
- **Services**: Contain core business logic and interact with repositories.
- **Repositories**: Interface directly with the database.
-**Middlewares**: Handle cross-cutting concerns like authentication.
- **Utils**: Utility functions that are used across various layers.

## 3. API endpoints
- **/phrase**
- **/user**
- **/youtube**
- **/video**

## 4. Midddleware
- **Authentication**: Intercepts all incoming requests and checks for a valid authorization token in the headers. The token is verified using Firebase, and if valid, the user's ID is added to the request body for use in subsequent request handling phases.

## 5. Principles and Practices
- **Dependency Inversion Principle (DIP)**: Ensures that our services are modular and interchangeable, enhancing flexibility.
- **Dependency Injection**: Facilitates easier unit testing by allowing dependencies of the service layer to be mocked during tests

## 6. Docker
To run the docker database, run the command at the project's root.
```bash
docker-compose up -d
```

## 7. Deploy
Deployed on AWS Lamda
