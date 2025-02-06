# Project Setup Guide

This guide will walk you through the steps to set up the project on your local machine.

## Prerequisites

Before setting up the project, ensure that you have the following software installed:

-   [Git](https://git-scm.com/downloads)
-   [PHP](https://www.php.net/downloads.php) (preferably version 8.3.x or higher)
-   [Composer](https://getcomposer.org/download/)
-   [Node.js](https://nodejs.org/) (preferably version 22.x or higher)
-   [npm](https://www.npmjs.com/get-npm)
-   [Apache](https://httpd.apache.org/download.cgi) (preferably version 2.4.58 or higher)
-   [MySQL](https://dev.mysql.com/downloads/mysql/) (preferably version 8.0.30 or higher)

## Step 1: Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository-name.git
```

Navigate into the project folder:

```bash
cd patient-registration-system
```

## Step 2: Install PHP Dependencies

This project uses [Composer](https://getcomposer.org/download) to manage PHP dependencies. Run the following command to install them:

```bash
composer install
```

This will install all necessary PHP packages as defined in the `composer.json` file.

## Step 3: Set Up the Environment Configurations

Copy the `.env.example` file to `.env`:

```bash
cp .env.exampple .env
```

This will create a new `.env` file with default configuration. You may need to adjust the database settings, app key, or other environment variables as needed.

To generate a new application key:

```bash
php artisan key:generate
```

This step will generate a new application key and update the .env file automatically.

## Step 4: Set Up the Database

Make sure you have a database set up (e.g., MySQL, PostgreSQL, SQLite). In your `.env` file, configure the database connection details according to your environment:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Once your database is set up and configured, run the database migrations to create the necessary tables:

```bash
php artisan migrate:fresh --seed
```

## Step 5: Install Node.js Dependencies

This project uses npm for front-end dependencies. Install them by running:

```bash
npm install
```

This will install all required JavaScript dependencies as specified in the `package.json` file.

## Step 6: Compile Assets

After installing the Node.js dependencies, you'll need to compile the front-end assets. Run the following command to build the assets:

```bash
npm run dev
```

This will compile and bundle the CSS, JavaScript, and other assets required for your application.

## Step 7: Access the Application

Open your browser and access the application.
