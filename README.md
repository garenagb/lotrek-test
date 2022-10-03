# Telegram BOT Api

This api used for sending message to specific channels with specific bot

## Installation

First we need to install npm packages and configure our .env file

```bash
1- npm i
2- copy .env.example and past main repo folder as .env filename
3- Fill all necessary parameters in .env file (for JWT secret you can use 64 char length string)
4- Rename ormconfig.ts.example as ormconfig.ts and fill your db info
```

## DB Installation

Creating all tables we need

```bash
npm run migration:generate --name=AllTables
npm run migration:up
```

## Telegram Bot Configuration

You can use https://core.telegram.org/bots this url for setup your first telegram bot

## Build and Test

```bash
for testing without build use "npm run serve"

for production deployments
- tsc
- npm run start:dev
```
