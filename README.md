<p align="center">
  <a href="https://coopengo.com" target="blank"><img src="https://coopengo.com/wp-content/uploads/2020/09/Coopengo_Logo_RVB.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Coog Cloud Agent is a specialized tool suite for testing and monitoring the entire application-delivery chain within the Coopengo Cloud Application Platform.

## Installation

```bash
$ yarn install
```

Note that if your database has not been initialized yet, especially the 'user' table, you must pre-initialize it by creating a super administrator 'superadmin' and a user 'coog' (with permissions to read, create, delete, and update all objects except 'user').

See section [Seeding](#seeding) below.

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

## Releases

When a commit to the main branch has Release-As: x.x.x (case insensitive) in the commit body, [Release Please](https://github.com/googleapis/release-please) will open a new pull request for the specified version.

Empty commit example:

```sh
git commit --allow-empty -m "chore: release 0.2.0" -m "Release-As: 0.2.0"
```

results in the following commit message:

```sh
chore: release 2.0.0

Release-As: 2.0.0
```

## License

Nest is [MIT licensed](LICENSE).
