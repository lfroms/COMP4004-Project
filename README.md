# Course Management System

Final project for COMP 4004, designed and built by Gaby Pancu, Mitchell Soares, and Lukas Romsicki.

## Table of Contents
* [Getting Started](#getting-started)
  * [macOS](#macos-recommended)
  * [Windows](#windows)
* [Logging In](#logging-in)
* [Running Tests](#running-tests)
* [Commits](#commits)
* [Data Model Diagram](#data-model-diagram)
* [Screenshots](#screenshots)

## Getting Started
### macOS (Recommended)
On macOS, you will need to install [**Docker for Mac**](https://docs.docker.com/docker-for-mac/install/). Simply download the application and install it to your Applications folder. Once installed, launch Docker and accept any permissions.

> We have aliased some common commands so that they are easier to run. Please note that these commands will only work on UNIX systems.

Run the following commands from the terminal to set up the app:
1. `./setup` to build the containers and seed the database.
1. `./start` to launch all containers and start the app.
1. Open [`http://localhost:3000`](http://localhost:3000) in your browser of choice.

> Note: The first time the app is launched, [Webpack](https://webpack.js.org) will need to compile the JavaScript bundles, which may take some time depending on your system. During this process, your browser request may time out or you may get a white screen. **If this happens, wait a few seconds and refresh.**

### Windows
On Windows, you will need to install [**Docker for Windows**](https://docs.docker.com/docker-for-windows/install/). Simply download the application and install it using the provided installer. Once installed, launch Docker and accept any permissions.

Run the following commands from the command line to set up the app:
1. `docker-compose build` to build the containers.
1. `docker-compose run --rm web rails db:setup` to set up and seed the database.
1. `docker-compose up` to launch all containers and start the app.

> Note: The first time the app is launched, [Webpack](https://webpack.js.org) will need to compile the JavaScript bundles, which may take some time depending on your system. During this process, your browser request may time out or you may get a white screen. **If this happens, wait a few seconds and refresh.**

## Logging In
The application is seeded with a default admin user, accessible using the following credentials:
* **Username:** `admin@example.com`
* **Password:** `123456`

Once logged in, you may log out using the "Log out" button at the bottom-left to log in as another user. All users have a default password of `123456`.

## Running Tests
There are a few ways to run the unit, integration, and system/acceptance tests for this application.

### macOS
* Unit tests: `./tests`
* System tests: `./system-tests`

### Windows
* Unit tests: `docker-compose run --rm web bash -c "rails db:create && rails db:schema:load && rails test"`
* System tests: `docker-compose -f docker-compose.test.yml up --abort-on-container-exit`

## Commits

All commits are squashed before merging into master. To see the full commit message with the `[CODE]`/`[TEST]`/`[ACCEPTANCE-TEST]`/`[REF]` labels, you must click on the commit.

## Data Model Diagram

<p align="center">
  <img src="/docs/data_model_screenshot.png" width="75%" />
</p>

## Screenshots

<img src="/docs/media/1_users.png" />
<img src="/docs/media/2_courses.png" />
<img src="/docs/media/3_directory.png" />
<img src="/docs/media/4_new_user.png" />
<img src="/docs/media/5_deliverables.png" />
