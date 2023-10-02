# E-Commerce Admin Portal | Dashboard

## Description

eCommerce-admin-portal is Created using NextJS and superbase (database)

## Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- You will need to install yarn/npm as well

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/mustafatalha222/mustafatalha222-eCommerce-adminPortal.git
    yarn install
    yarn run dev

## Configuring

1. After clone open up folder you will see .env.sample file
2. Needs to create a free account on superbase and then create a bucket as well for storing images.
3. Create .env.local file in root directly same as .env.sample and enter you superbase keys.
4. In superbase folder you can see migration.sql file, just copy-paste this in superbase SQL editor.
5. Under this file you can see seed.sql file, same copy-paste in SQL editor.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.
