# Etiqa

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Complete-Developer-Network-README</h3>

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
- save environment variables to the .env file
- ```sh
  SERVER_PORT=3000
  NODE_ENV=development
  MONGO_DATABASE_URI=mongodb://localhost:27017/etiqa
  APP_BASE_URL=http://localhost:3000
  ```
- ```sh
  npm install @openapitools/openapi-generator-cli -g
  openapi-generator-cli version-manager set 5.0.1
  npm install @openapitools/openapi-generator-cli -D
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/leoan96/etiqa.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start local MongoDB database
4. Start server
   ```sh
   npm run start:dev
   ```
5. Run tests (user.controller.spec.ts, user.service.spec.ts)
   ```sh
   npm run test
   ```
6. Generate documentation
   ```sh
   npx @compodoc/compodoc -p tsconfig.json -s
   ```
7. Visit http://localhost:8080
8. The steps below should only be carried out if changes are made to the user.service.ts file.
9. Generate client sdk for frontend (a service file containing all the user methods, i.e. get, delete, update, register)
   ```sh
   openapi-generator-cli generate -i swagger.json -g typescript-axios -o client-sdk
   ```
10. Copy the generated client sdk and paste it to the frontend root directory.

### Alternative setup by using docker (start docker engine)

1. docker build -t backend .
2. docker run -p 3000:3000 backend

<!-- USAGE EXAMPLES -->

## Usage

You can utilize the api endpoints using either Postman(http://localhost:3000) or visiting its swagger endpoints(http://localhost:3000/api)

![](images/swagger-main.png)
![](images/docs.png)

- This is the backend of Complete Developer Network company. The REST endpoints are served at http://localhost:3000 and also for easier accessibilty at http://localhost:3000/api.
- The backend is built using NestJS framework with its data stored in MongoDB database.
- The frontend uses the client sdk generated from the backend to easily make a request to this backend.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
