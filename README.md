# Course Management System

Final Project for COMP4004, designed and built by Gaby Pancu, Mitchell Soares, and Lukas Romsicki.

## Getting Started
To begin, start by installing **Docker for Mac** from [this link](https://docs.docker.com/docker-for-mac/install/).  If you are using a Windows PC, you will need to download Docker for Windows, and _will not be able to use the command shortcuts described herein_.

Once Docker is installed, run the following commands from the Terminal:
1. `./setup` - _this command will install everything and seed the database_
1. `./start` - _this command will launch the app_
1. Open [`http://localhost:3000`](http://localhost:3000) in your browser of choice.

> Note: The first time the app is launched, [Webpack](https://webpack.js.org) will need to compile the JavaScript bundles, which may take some time depending on your system.  If you get a blank screen, refresh the page.

## Logging In
The application is seeded with a default admin user, accessible by using the following credentials:
* **Username:** `admin@example.com`
* **Password:** `123456`

:tada: Congratulations! You can now browse the app.

## Notes

All commits are squashed before merging into master. To see the full commit message with the [CODE]/[TEST]/[REF] labels, you must click on the commit.


## Data Model

<p align="center">
  <img src="/docs/data_model_screenshot.png" width="75%" />
</p>
