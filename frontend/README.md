## Credipay Task Frontend

This folder contains the frontend application built with Next.js.

## Table of Contents

- [Frontend](#frontend)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Install Dependencies](#install-dependencies)
    - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) (version 20 or later)

## Setup

### Install Dependencies

Install the necessary dependencies:

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the `frontend` directory and add your environment variables (use `.env.local.example` as a template):

```bash
cp .env.local.example .env.local
```

## Running the Application

To start the development server:

```bash
yarn dev
```

To build the project:

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

## Project Structure

```
frontend/
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── components
│   │   ├── InputField
│   │   ├── QuantityPicker
│   │   ├── RadioGroup
│   │   └── SelectField
│   ├── hooks
│   │   └── useProducts.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   ├── index.tsx
│   │   └── order-confirmation.tsx
│   ├── providers
│   │   └── cart.tsx
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   └── product.ts
│   └── utils
│       └── product.ts
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```
