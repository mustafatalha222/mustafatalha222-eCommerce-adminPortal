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

1. After cloning the project, open the folder, and you'll find a file named .env.sample.
2. Create a free Superbase account and make a new project. Create a bucket within this project to store images.
3. In the project's root directory, create a new file named .env.local, similar to .env.sample, and enter your Superbase API keys.
4. Inside the "superbase" folder, you'll see a file named migration.sql. Simply copy and paste its contents into the Superbase SQL editor.
5. In the same folder, you'll find a file named seed.sql. Copy and paste its contents into the SQL editor as well.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.

## APP IS DEPLOYED ON VERCEL

- [View live Deme: E-Commerce Link](https://mustafatalha222-e-commerce-admin-portal-iyeirokzm.vercel.app/)
