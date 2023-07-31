<p align="center">
  <a href="https://coopengo.com" target="blank"><img src="https://coopengo.com/wp-content/uploads/2020/09/Coopengo_Logo_RVB.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Coog Cloud Agent is a specialized tool suite for testing and monitoring the entire application-delivery chain within the Coopengo Cloud Application Platform.

## Installation

```bash
$ yarn install
```

Note that if your database has not been initialized yet, especially the 'user' table, you can pre-initialize it by creating a super administrator 'superadmin' and a user 'coog' (with permissions to read, create, delete, and update all objects except 'user').

See section [Seeding](#Seeding) below.

## Running the app

```bash
# Development - Start application
$ yarn start

# Watch mode - Start application in watch mode
$ yarn start:dev

# Production mode - Start built application
$ yarn start:prod
```

By default, the application is running to http://localhost:3000

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Swagger Documentation

By default, while the application is running, open your browser and navigate to http://localhost:3000/api to see the Swagger UI.

## Custom variables

By default, th application running to the port 3000, but you can customize this value thanks to the variable `SERVER_PORT`

```bash
export SERVER_PORT=7000
```

## Seeding
Seeding is used to insert data into the database. The seeding files are stored in `modules/orm/seeders` directory.

```sh
    npx cross-env NODE_ENV=dev yarn orm seeder:run   # seeds data
```
## License

Nest is [MIT licensed](LICENSE).
