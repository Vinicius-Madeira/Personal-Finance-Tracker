# Personal Finance Tracker

This project aims to help users keep track of their profits and expenditures along with graphs and a dashboard to help them visualize it.

## Authors

- Fernanda Baggio
- João Chaves
- Juliana Chen
- Paula Ayumi
- Vinicius Madeira

## Table of Contents

- [Personal Finance Tracker](#personal-finance-tracker)
  - [Authors](#authors)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
    - [Windows](#windows)
    - [Linux](#linux)
  - [Repository Structure](#repository-structure)
  - [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)
      - [Using SSH](#using-ssh)
      - [Using HTTPS](#using-https)
    - [Database Setup (with Docker)](#database-setup-with-docker)
    - [Backend Setup](#backend-setup)
      - [Using IntelliJ IDEA](#using-intellij-idea)
      - [Using Eclipse](#using-eclipse)
    - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
    - [Start the Database (if not already running)](#start-the-database-if-not-already-running)
    - [Start the Backend](#start-the-backend)
      - [Using IntelliJ IDEA](#using-intellij-idea-1)
      - [Using Eclipse](#using-eclipse-1)
    - [Start the Frontend](#start-the-frontend)
  - [Development Notes](#development-notes)
  - [Troubleshooting](#troubleshooting)
    - [Database Connection Issues](#database-connection-issues)
    - [Backend Issues](#backend-issues)
    - [Frontend Issues](#frontend-issues)

## Prerequisites

### Windows

- [Git](https://git-scm.com/download/win)
- [Node.js](https://nodejs.org/) (v16 or later)
- [Java Development Kit (JDK) 17](https://adoptium.net/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) or [Eclipse IDE](https://www.eclipse.org/downloads/)

### Linux

- Git: `sudo apt install git` (Ubuntu/Debian)
- Node.js: `sudo apt install nodejs npm` (Ubuntu/Debian)
- JDK 17:
  ```bash
  sudo apt install openjdk-17-jdk   # Ubuntu/Debian
  ```
- Docker: [Installation Guide](https://docs.docker.com/engine/install/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) or [Eclipse IDE](https://www.eclipse.org/downloads/)

## Repository Structure

Since this is a full-stack app, you will find this file structure on the project, separating the front-end and back-end apps.

```
monorepo/
├── frontend/           # NextJS application
├── backend/            # Spring Boot application
└── README.md           # This file
```

## Getting Started

### Clone the Repository

#### Using SSH

```bash
git clone git@github.com:Vinicius-Madeira/Personal-Finance-Tracker.git
cd ./Personal-Finance-Tracker
```

or

#### Using HTTPS

```bash
git clone https://github.com/Vinicius-Madeira/Personal-Finance-Tracker.git
cd ./Personal-Finance-Tracker
```

### Database Setup (with Docker)

1. Pull the MySQL Docker image:

```bash
docker pull mysql:8
```

2. Create and run the MySQL container:

```bash
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=rastreamento-de-gastos -e MYSQL_USER=myuser -e MYSQL_PASSWORD=mypassword -p 3306:3306 -d mysql:latest
```

This creates a MySQL instance with:

- Database name: `rastramento-de-gastos`
- Username: `root`
- Password: `root`
- Port: `3306`

### Backend Setup

#### Using IntelliJ IDEA

1. Open IntelliJ IDEA
2. Select "Open" or "Import Project"
3. Navigate to and select the `backend` folder of the project
4. IntelliJ should automatically detect the Maven project and set it up
5. Let IntelliJ download all required dependencies
6. Configure application properties:

Check if your `src/main/resources/application.properties` is looking like this:

```properties
spring.application.name=rastreamento-de-gastos

server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/rastreamento-de-gastos?useTimezone=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

#### Using Eclipse

1. Open Eclipse
2. Go to File -> Import -> Maven -> Existing Maven Projects
3. Navigate to the `backend` folder of the project
4. Click "Finish" and wait for Eclipse to import and build the project
5. Configure application properties as described above

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the frontend directory and add the following:

```
API_URL=http://localhost
API_PORT=8080
```

## Running the Application

### Start the Database (if not already running)

If your Docker container is not running, start it:

```bash
docker start mysql-db
```

### Start the Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Run the application:

#### Using IntelliJ IDEA

1. Open the project in IntelliJ IDEA
2. Find the main application class in `src/main/java/RastreamentoDeGastosApplication.java` (it has `@SpringBootApplication` annotation)
3. Right-click on this class and select "Run"

#### Using Eclipse

1. Open the project in Eclipse
2. Find the main application class in `src/main/java/RastreamentoDeGastosApplication.java` (it has `@SpringBootApplication` annotation)
3. Right-click on this class and select "Run As" -> "Java Application"

The backend will be available at `http://localhost:8080`

### Start the Frontend

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Development Notes

- The backend API is available at `http://localhost:8080`
- The frontend application is available at `http://localhost:3000`
- The database is accessible at `localhost:3306`

## Troubleshooting

### Database Connection Issues

1. Verify that the Docker container is running:

```bash
docker ps
```

2. Check MySQL logs:

```bash
docker logs mysql-db
```

3. Verify connection settings in the backend's `application.properties` file.

### Backend Issues

1. Check application logs for errors.
2. Make sure that port 8080 is not already in use.
3. Verify that Java 17 is installed and set as the default Java version:

```bash
java -version
```

### Frontend Issues

1. Check for Node.js version compatibility:

```bash
node -v
```

2. Make sure dependencies are installed correctly:

```bash
npm install
```

3. Verify that port 3000 is not already in use.
4. Check that the variables in `.env` are correctly set as described above, and that the file is located in the frontend folder.
