<p align="center">
  <a href="https://www.iqair.com/" target="blank"><img src="https://dashboard.iqair.com/assets/logos/iqair-logo-default.png" width="200" alt="iqair Logo" /></a>
</p>

## Description

This is sample project to expose apis to get pollution data of nearest GPS coordinates city using IQAir APIs.

## Installation

```bash
$ npm install
```

## Run Database Migrations

- Create new mysql database with name "air_quality_db"
- Update DATABASE_URL variable value according to your database connection string in .env file

```bash
$ npx prisma migrate deploy
```

## Running the app

```bash
$ npm run start
```

## Open API Swagger Docs

- open <a href="http://localhost:3008/api" target="blank"> http://localhost:3008/api </a> in your browser

## Test

```bash
# unit tests
$ npm run test
```
