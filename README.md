# Credipay Task

## Table of Contents

- [Credipay Task](#credipay-task)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Clone the Repository](#clone-the-repository)
    - [Database Setup](#database-setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) (version 20.9.0 or later)
- You have installed [Yarn](https://yarnpkg.com/)
- You have installed [Docker](https://www.docker.com/get-started)
- You have a basic understanding of Docker, NestJS, and Next.js

## Setup

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/NishantChandla/credipay-task.git
cd credipay-task
```

### Database Setup

Start the PostgreSQL database using Docker:

```bash
docker run --name myservername -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Create a `.env` file and add your environment variables (use `.env.example` as a template):

    ```bash
    cp .env.example .env
    ```

4. Running migrations
    ```bash
    yarn migration:run
    ```

5. Seed the database:
    ```bash
    yarn seed-db
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Create a `.env.local` file and add your environment variables (use `.env.local.example` as a template):

    ```bash
    cp .env.local.example .env.local
    ```

### Running the Project

1. Start the backend server:

    ```bash
    cd backend
    yarn start:dev
    ```

2. Start the frontend server:

    ```bash
    cd ../frontend
    yarn dev --port 3001
    ```
