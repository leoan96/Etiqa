# Etiqa

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Etiqa-README</h3>

  <p align="center">
    Responsible for registration, delete, update, and get action of user.
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>

  </ol>
</details>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

  ```sh
  npm install npm@latest -g
  ```

- create a .env file
- store secrets & environment variables (the values below are just sample values, please replace them with your own credentials)
- ```sh
  SERVER_PORT=3000
  NODE_ENV=development
  MONGO_DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.tihvu.mongodb.net/<database>?authSource=admin&replicaSet=atlas-ltmo8u-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
  EXPRESS_SESSION_SECRET=dfc89d6a182025d62ab2ae3485b0497b4cc9397f1ab820fb3b5f3fa99c45
  REDIS_PORT=15136
  REDIS_HOST=redis-15136.c1.ap-southeast-3-5.ec2.cloud.redislabs.com
  REDIS_PASSWORD=26186baa6eb3d6088925571d166564db0a1f3d5931c7386aa0b08a6d6fa8
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:leoan96/etiqa.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start server
   ```sh
   npm run start:dev
   ```

<!-- USAGE EXAMPLES -->

## Usage

You can utilize the api endpoints using either Postman or visiting http://localhost:3000

<!-- ![](images/swagger-main.png)
![](images/swagger-example.png) -->

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
