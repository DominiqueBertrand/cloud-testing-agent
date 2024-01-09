<p align="center">
  <a href="https://coopengo.com" target="blank"><img src="https://coopengo.com/wp-content/uploads/2020/09/Coopengo_Logo_RVB.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

The Cloud Testing Agent is a purpose-built tool crafted for the testing of Coog cloud application services. Its design enables seamless integration with the entire application delivery pipeline within the Coopengo cloud application platform.

## Installation

Install dependencies
```bash
$ yarn install
```

Enable environment variables using the shell extension [direnv](https://direnv.net/):
```bash
$ cp .envrc.example .envrc
$ direnv allow
```

Please be aware that if your database hasn't undergone the initialization process, specifically with regards to the 'user' table, it's essential to perform a pre-initialization step. This entails the creation of two user accounts: one as a super administrator named 'superadmin,' and the other as a user named 'coog.' Ensure that 'coog' is granted permissions to read, create, delete, and update all database objects except for the 'user' table.

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

## SonarQube

### Execute the Scanner

Running a SonarQube analysis is straighforward. Locally, you just need to execute the following commands in your project's folder.

### Generate pre-scan reports

Generate unit test coverage report

```sh
yarn test:cov
```

Generate security vulnaribility report

```sh
./scripts/dependency-check.sh -f ALL -s . --out reports/dependency-check --project "coog-cloud-agent"
```

## Run the scan
```sh
sonar-scanner \ 
  -Dsonar.projectKey=$SONARQUBE_PROJECT_KEY \
  -Dsonar.sources=$SONARQUBE_REPO \
  -Dsonar.host.url=$SONARQUBE_URL \
  -Dsonar.token=$SONARQUBE_TOKEN
```

or thanks to the following docker command :

```sh
docker run \
    --rm \
    -e SONAR_HOST_URL="$(SONARQUBE_URL)" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=$(SONARQUBE_PROJECT_KEY)" \
    -e SONAR_TOKEN="$(SONARQUBE_TOKEN)" \
    -v "$(SONARQUBE_REPO):/usr/src" \
    sonarsource/sonar-scanner-cli
```

## Docker

## How to generate docker image thanks to the following command

To build:

```console
docker build --file ./build/Dockerfile --no-cache --progress=plain -t cloud-testing-agent:latest -t cloud-testing-agent:{{VERSION}} . |& tee build_output.txt
```

### How to run cloud-testing-agent docker image

Before starting the service, we will create a network for our container, so you can more easily choose which one to use and when.

```console
docker network create global-default
```

To run:

```console
docker compose -f "./build/compose.yaml" -p "cloud-testing" up --force-recreate -d 
```

The service will be available at http://0.0.0.0:3000/ .


## License

Nest is [MIT licensed](LICENSE).
