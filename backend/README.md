# 4IT580: Backend

## Setup ENV Variables

```
cp ./.env.example ./.env
```
Edit `.env` file, fill empty properties like JWT_SECRET,DB_PASSWORD, SMTP_PASS.

## Install Dependencies

```bash
yarn install
```

## `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Seed Database

Using phpMyAdmin or MySQL Workbench run following SQL: [`./user_team02_seed.sql`](./user_team02_seed.sql)


## Run Production

```bash
yarn start
```

## Build Production

```bash
yarn build
```

### Build Production and Watch for Changes

```bash
yarn build:watch
```
