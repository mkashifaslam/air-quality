<p align="center">
  <a href="https://www.iqair.com/" target="blank"><img src="https://dashboard.iqair.com/assets/logos/iqair-logo-default.png" width="200" alt="iqair Logo" /></a>
</p>

## Description

This is sample project to expose apis to get pollution data of nearest GPS coordinates city

## Installation

```bash
$ npm install
```

## Run Prisma Migrations To Create Database Schema

- Create new mysql database with name "air_quality_db"

```bash
$ npx prisma migrate deploy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
