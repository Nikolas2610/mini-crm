# Mini-CRM

Mini-CRM is a web application built with **Vue 3** for the frontend and **Laravel** for the backend.<br> The app is designed to manage customer relationship management (CRM) by providing a dashboard for creating, updating and deleting customers, and viewing their details.
***
## Installation

To install **Mini-CRM**, follow these steps:

```
1. Clone the repository to your local machine.
2. Navigate to the root folder of the Laravel app and run: composer install and npm install.
3. Generate storage link: php artisan storage:link
4. Navigate to the vue/ folder and run: npm install.
```
***
## Environment Variables

#### Backend

The following environment variables need to be set for the Laravel backend:

```
- APP_KEY: Generate app key: php artisan key:generate.
- FRONTEND_URL: The URL of the frontend app.
- SANCTUM_STATEFUL_DOMAINS: The domain(s) that should be considered stateful by Sanctum. Set to the URL of the frontend app.
- SESSION_DOMAIN: The domain for storing the session data. Set to the URL of the frontend app.
- DB_DATABASE: The name of the database to be used.
- DB_USERNAME: The username for accessing the database.
- DB_PASSWORD: The password for accessing the database.

```

#### Frontend

The following environment variable needs to be set for the Vue frontend:

```
VITE_API_URL: The URL of the backend API.
```
> Set the environment variables in the **.env** for production and **.env.production** for local development.
***
## Laravel Seed Data

To seed the database with sample data, run:
```
php artisan db:seed
```




***
## Running the app locally

To run the app locally, navigate to the root folder and run: 
```
npm start
```

***
## Building the app

- Clone the app from repository

- Install dependencies for Laravel and Vue

- Set up Environment variables

#### Backend: 
- Generate Application Key
- Set up Database

#### Frontend

- To build the app, navigate to the **vue/** folder and run:
```
npm run build
```
***
## Admin Credentials

Use the following credentials to log in as an ***admin***:

- Email: admin@admin.com
- Password: password

> All users have the same password (password).
***
## Production website

The website is live and can be accessed at https://crm.psillovits.com.
