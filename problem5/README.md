## Tech stack

- Express JS
- TypeScript
- Sequelize
- MySQL
- JWT
- Joi

## Installation

Install project with dependencies package by `yarn`

## Run Server Locally

Go to the project directory

```bash
  cd server
  yarn install
```

Start the with development mode

```bash
  yarn server:dev
```

Start Client

```bash
  cd client
  yarn install
  yarn start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT: 8000`

`JWT_SECRET_KEY: This_is_my-Scretkey_of_TES`

`JWT_EXPIRES_IN: 3d`

`DATABASE_NAME: dev`

`DATABASE_USER: root`

`DATABASE_PASSWORD=dev_password`

`DATABASE_HOST=127.0.0.1`

`DATABASE_PORT=3306`

## Another helper tools

- Git
- Eslint
- Prettier

## Features

- API register new user
- API login
- API get list task of user
- API update task (status, due, name, description, priority)
- API delete user
- Authentication with JWT token
- Validate Input with Joi

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
