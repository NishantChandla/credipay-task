## Credipay Task Backend

This folder contains the backend server built with NestJS.

## Table of Contents

- [Backend](#backend)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Database Setup](#database-setup)
    - [Install Dependencies](#install-dependencies)
    - [Environment Variables](#environment-variables)
  - [Running Migrations](#running-migrations)
  - [Running the Server](#running-the-server)
  - [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) (version 20.9.0 or later)
- You have installed [Docker](https://www.docker.com/get-started) (for the database)

## Setup

### Database Setup

Start the PostgreSQL database using Docker:

    ```bash
    docker run --name myservername -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
    ```

### Install Dependencies

Install the necessary dependencies:

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the `backend` directory and add your environment variables (use `.env.example` as a template):

```bash
cp .env.example .env
```

### Running migrations
To run migrations:

```bash
yarn migration:run
```

## Running the Server

To start the development server:

```bash
yarn start:dev
```

To build the project:

```bash
yarn build
```

To start the production server:

```bash
yarn start:prod
```

## Project Structure

```
backend/
├── README.md
├── nest-cli.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── config
│   │   ├── config.ts
│   │   ├── database.config.ts
│   │   └── datasource.config.ts
│   ├── credipay-client
│   │   ├── credipay-client.module.ts
│   │   └── credipay-client.service.ts
│   ├── main.ts
│   ├── migrations
│   │   └── 1721705698989-migration.ts
│   ├── orders
│   │   ├── dto
│   │   ├── entities
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   └── orders.service.ts
│   ├── products
│   │   ├── dto
│   │   ├── entities
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── seed
│   │   ├── data.ts
│   │   ├── init.seeder.ts
│   │   └── product.seeder.ts
│   ├── types
│   │   └── order.ts
│   └── utils
│       └── order.utils.ts
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```
