## firebase-users-admin

**firebase-users-admin** is a backend app featuring CRUD API endpoints for managing [Firebase Authentication](https://firebase.google.com/docs/auth) users using the [firebase-admin](https://firebase.google.com/docs/admin/setup) SDK for NodeJS.

A basic web app client in the **/client** directory will show basic API usage and demonstration.

## Content

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts - server](#available-scripts---server)
- [Installation and Usage Using Docker](#installation-and-usage-using-docker)
  - [Docker Dependencies](#docker-dependencies)
  - [Docker for Localhost Development](#docker-for-localhost-development)
  - [Docker for Production Deployment](#docker-for-production-deployment)
- [Pre-built Server Docker Image](#pre-built-server-docker-image-app)
- [Pre-built Server Docker Image](#pre-built-server-docker-image-client--server-development)
- [References](#references)

## Requirements

1. Windows 10, MacOS, Linux
2. NodeJS v14.18.3 or higher
3. Firebase Project [[link]](https://firebase.google.com/)
   - Pricing Plan: Spark plan or higher
   - with the **Email/Password** Provider enabled in the Firebase Console's
**Authentication** -> **Sign-in method** -> **Sign-in providers** options.
   - Service account credentials JSON file

### Core Libraries and Frameworks

1. [firebase-admin](https://www.npmjs.com/package/firebase-admin) v10.0.2
2. [Firebase Authentication](https://firebase.google.com/docs/auth) (using Email/Password Provider)
3. React 18.1.0 (CRA) on client app


## Installation

### server

1. Clone this repository.<br>
`git clone https://github.com/ciatph/firebase-users-admin.git`
2. Install dependencies.
   ```
   cd server
   npm install
   ```
3. Set up the environment variables. Create a `.env` file inside the **/server** directory with reference to the `.env.example` file. Encode your own Firebase project settings on the following variables:

   | Variable Name | Description |
   | --- | --- |
   |FIREBASE_SERVICE_ACC| The project's private key file contents, condensed into one line and minus all whitespace characters.<br><br>The service account JSON file is generated from the Firebase project's **Project Settings** page, on **Project Settings** -> **Service accounts** -> **Generate new private key**|
   |FIREBASE_PRIVATE_KEY| The `private_key` entry from the service account JSON file.<br> <blockquote> **NOTE:** Take note to make sure that the value starts and ends with a double-quote on WINDOWS OS localhost. Some systems may or may not require the double-quotes (i.e., Ubuntu running on heroku).</blockquote> |
   |ALLOWED_ORIGINS|IP/domain origins in comma-separated values that are allowed to access the API if `ALLOW_CORS=1`. Include `http://localhost:3000` by default to allow CORS access to the `/client` app.|
   |EMAIL_WHITELIST| Comma-separated email addresses linked to Firebase Auth UserRecords that are not allowed to be deleted or updated (write-protected)<br><br>Default value is `superadmin@gmail.com`|
   |ALLOW_CORS|Allow Cross-Origin Resource Sharing (CORS) on the API endpoints.<br><br>Default value is `1`, allowing access to domains listed in `ALLOWED_ORIGINS`. Setting to `0` will make all endpoints accept requests from all domains, including Postman.|
   |ALLOW_AUTH|Restrict access to the `POST`, `PATCH` and `DELETE` API endpoints by allowing signed-in Firebase user Bearer Authorization (Firebase token) checking.<br><br>Retrieve the signed-in Firebase token by signing in a user using the Firebase Web JS SDK `signInWithEmailAndPassword()` method, then retrieve the latest token value using `getIdTokenResult()`.<br><br>Default value is `1`. Setting to `0` will disable Bearer Authorization checking on the listed API endpoints.|

### client

1. Install dependencies.
   ```
   cd client
   npm install
   ```
2. Replace the `/client/config/firebase.config.js` file with your own Firebase project's web SDK setup configuration file.
   - You can find this file in a Firebase project's
**Project Settings** -> **General** -> **Web apps** (Add an app if needed) -> **SDK setup and configuration**
   - The `firebase.config.js` settings must match with the `FIREBASE_SERVICE_ACC` environment variable defined on **server - step # 3.**
3. Create a `/client/.env` file from the `/client/.env.example` file.
   - Replace the `REACT_APP_BASE_URL` variable with an appropriate value.
   - Replace the `REACT_APP_FIREBASE_*` set of variables with your own Firebase project configuration that matches the **server** variables: `FIREBASE_SERVICE_ACC` and `FIREBASE_PRIVATE_KEY`. These variables, using default values from this repository's Firebase project will not work with your **server** Firebase variables.

   | Variable Name | Description |
   | --- | --- |
   |REACT_APP_BASE_URL|Domain on which the CRUD API is running.<br><br> Default value is `http://localhost:3001/api` on localhost. See the [server](#server) set-up instructions for more information.|
   | REACT_APP_FIREBASE_API_KEY | Firebase web API key from the Firebase Project Settings configuration file. |
   | REACT_APP_FIREBASE_AUTHDOMAIN | Firebase web auth domain key from the Firebase Project Settings configuration file. |
   | REACT_APP_FIREBASE_PROJECT_ID | Firebase web project ID from the Firebase Project Settings configuration file. |
   | REACT_APP_FIREBASE_STORAGE_BUCKET | Firebase web storage bucket key from the Firebase Project Settings configuration file. |
   | REACT_APP_FIREBASE_MESSAGING_SENDER_ID | Firebase web messaging sender ID from the Firebase Project Settings configuration file. |
   | REACT_APP_FIREBASE_APP_ID | Firebase web web app key from the Firebase Project Settings configuration file. |
   | REACT_APP_FIREBASE_MEASUREMENT_ID | Firebase web measurement ID from the Firebase Project Settings configuration file. |

4. Run the app in development mode.
`npm start`
5. Launch the client app in:
`http://localhost:3000`


## Usage

1. Navigate to the `/server` directory.
2. Create a default Firebase Auth user.
`npm run seed`
3. Generate the API documentation.
`npm run gen:docs`
4. Run the app:
   - (development mode) `npm run dev`
   - (production mode) `npm start`
5. Read the API documentation and usage examples guide of available CRUD API endpoints on:
`http://localhost:3001/docs`
6. Try to log-in to the `/client` app using the default superadmin seeded user from step no. 2:
   ```
   username: superadmin@gmail.com
   password: 123456789
   ```
7. Use the CRUD API endpoints to create/update/delete or view Firebase Auth users using Postman, curl, or other http clients.
   - Try signing in these users to the `/client` app.
   - > **NOTE:** Comment out the `cors` options line `app.use(cors(corsOptions))` on **/server/src/index.js** when testing on Postman and other http clients other than the `/client` app.

## Available Scripts - server

The npm scripts listed below are available under the **/server** directory.

### `npm start`

Run the express app (API only) in production mode. You'll need to `npm run gen:docs` if you haven't done so already, if you'd also like to view the API documentation usage in production mode.

### `npm run dev`

Run the express app (API only) in development mode.

### `npm run gen:docs`

Builds the API documentation. The static website documentation files are put in the `/src/public/docs` directory, and made available on `http://localhost:3001/docs`.

### `npm run seed`

Creates an initial **superadmin** Firebase Authentication user with the credentials:

```
email: superadmin@gmail.com
displayname: Super Admin
password: 123456789
account_level: 1
```

### `npm run copyclient`

Copies the built `/client` website from `/client/build` to the server's root directory.

- It requires to build the client app first, after following its set-up [instructions](#client):
   ```
   cd client
   npm run build
   ```
- The built client app will be viewable on `http://localhost:3001` if the server is running.


## Installation and Usage Using Docker

We can use Docker to run dockerized **client** and **server** apps for local development. The following methods require Docker and Docker compose correctly installed and set up on your development machine.

### Docker Dependencies

The following dependencies are used to build and run the image. Please feel feel free to use other versions as needed.

1. Ubuntu 20.04 (Host)
2. Docker version 20.10.17, build 100c701
3. Docker Compose version v2.6.0

### Docker for Localhost Development

1. Set-up the environment variables and firebase configuration file for the **/client** app.
   - Create the `.env` file under the **/client** directory as advised on [**Installation - client # 3**](#client).
2. Set-up the environment variables for the **/server** app.
   - Create the `.env` file under the **/server** directory as advised on [**Installation - server # 3**](#server).
3. Build the client and server docker services for localhost development.
   - `docker-compose -f docker-compose-dev.yml build`
   - > **INFO:** Building the images for localhost development takes a while, around ~7min+.
4. Create and start the client and server containers.
`docker-compose -f docker-compose-dev.yml up`
5. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.
   `docker exec -it server-prod npm run seed`
6. Launch the dockerized (dev) client app on
`http://localhost:3000`
7. Launch the dockerized (dev) server app's API documentation on
`http://localhost:3001/docs`
8. Edit source the codes in `/client/src` or `/server/src` as needed. Verify that hot reload is working on both the client and server apps.
9. Stop and remove containers, networks, images and volumes:
`docker-compose -f docker-compose-dev.yml down`

### Docker for Production Deployment

#### Option #1 - Client and Server as (2) Separate Images and Services

The following docker-compose commands build small `client` and `server` images targeted for creating optimized dockerized apps running on self-managed production servers. An **Nginx** service serves the frontend `client` on port `3000`. The `server`, running on a separate **Nodejs (pm2)** service, is also served by the client's Nginx service in a reverse proxy on port `3001`.  Hot reload is not available when editing source codes from `/client/src` or `/server/src`.

1. Install and set up the required **client** and **server** environment variables as with the required variables on [**Docker for Localhost Development**](#docker-for-localhost-development).
2. Build the client and server docker services for production deployment.
   - `docker-compose -f docker-compose-prod.yml build`
3. Create and start the containers.
   - `docker-compose -f docker-compose-prod.yml up`
4. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.
   - `docker exec -it server-prod npm run seed`
5. Launch the dockerized (prod) client app on
`http://localhost:3000`
6. Launch the dockerized (prod) server app's API documentation on
`http://localhost:3001/docs`
7. Stop and remove containers, networks, images and volumes:
   - `docker-compose -f docker-compose-prod.yml down`

#### Option #2 - Client and Server Bundled in (1) Image and Service

The following docker-compose commands build a small `server` image targeted for creating an optimized dockerized Express app running on self-managed production servers. The frontend `client` is served in an a static directory using the Express static middleware.

1. Install and set up the required **client** and **server** environment variables as with the required variables on [**Docker for Localhost Development**](#docker-for-localhost-development).
   - > **INFO:** This build method requires CORS checking dissabled, since the client and server will run on the same port (3001).
     > - Disable CORS by setting `ALLOW_CORS=0` in the **.env** file to avoid `Same Origin` errors.
2. Build the client and server docker services for production deployment.
   - `docker-compose -f docker-compose-app.yml build`
3. Create and start the containers.
   - `docker-compose -f docker-compose-app.yml up`
4. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.
   - `docker exec -it firebase-users-admin-app npm run seed`
5. Launch the dockerized (prod) client + server app on
`http://localhost:3000`
6. Launch the dockerized (prod) client + server app API documentation on
`http://localhost:3001/docs`
7. Stop and remove containers, networks, images and volumes:
   - `docker-compose -f docker-compose-app.yml down`

## Pre-built Server Docker Image App

The `server` component of **firebase-users-admin** is available as a stand-alone docker image on Docker Hub with customizable environment variables (.env file).

The server also serves the pre-built `client` website from a static directory using the `express.static()` middleware, following the build instructions from [**Option #2 - Client and Server Bundled in (1) Image and Service**](#option-2---client-and-server-bundled-in-1-image-and-service).

> [!WARNING]
> While the pre-built Docker image runs both **client** and **server** apps, the **client** only works for this code repository at **ciatph/firebase-users-admin**, since it uses the repository's specific Firebase config settings during **client** (React) build.

### Steps

1. Pull the (production) **/server** [Docker image](https://hub.docker.com/repository/docker/ciatphdev/firebase-users-app) from Docker Hub.
   - Find the latest version tag from https://hub.docker.com/r/ciatphdev/firebase-users-app, i.e., `v1.1.5`
   - `docker pull ciatphdev/firebase-users-app:v1.1.5`
   - **NOTE:**
2. Create a `.env` file.
   - Read [**Installation - server #3**](#server) for more information.
   - Replace the variables accordingly in the `.env` file. Set `ALLOW_CORS=0` to allow `Same Origin` requests. Read [**Option #2 - Client and Server Bundled in (1) Image and Service**](#option-2---client-and-server-bundled-in-1-image-and-service) for more information.
      ```
      ALLOWED_ORIGINS=http://localhost,http://localhost:3000,http://mywebsite.com,http://yourwebsite.com
      FIREBASE_SERVICE_ACC=YOUR-FIREBASE-PROJ-SERVICE-ACCOUNT-JSON-CREDENTIALS-ONE-LINER-NO-SPACES
      FIREBASE_PRIVATE_KEY=PRIVATE-KEY-FROM-FIREBASE-SERVICE-ACCOUNT-JSON-WITH-DOUBLE-QUOTES
      EMAIL_WHITELIST=superadmin@gmail.com
	  ALLOW_CORS=0
	  ALLOW_AUTH=1
      ```
3. Run the image.
   ```
   docker run -it --rm \
      --env-file .env \
      -p 3001:3001 \
      ciatphdev/firebase-users-admin-app:v1.1.2
   ```
4. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.
   `docker exec -it firebase-users-admin-app npm run seed`
5. Launch the server API documentation on
`http://localhost:3001/docs`
6. Launch the client website on `http://localhost:3001`.
   - Login using the superadmin account create on step # 4.
      ```
	  username: superadmin@gmail.com
	  password: 123456789
	  ```
   - Test the API routes by creating new accounts, editing or deleting existing accounts.
   - The signed-in user's Firebase Auth token is available on the **Home** page (http://localhost:3001/)

## Pre-built Server Docker Image (Client + Server) Development

Pre-built Docker images of the **server** and **client** for local development are also available on Docker Hub at:

- **client**<br>
https://hub.docker.com/r/ciatphdev/firebase-users-client/tags

- **server**<br>
https://hub.docker.com/r/ciatphdev/firebase-users-server/tags

### Usage Options

- Use with the docker-compose.dev.yml file (requires a `.env` file inside the client and server folders):<br>
`docker compose -f docker-compose.dev.yml pull`

- Docker pull<br>
   ```
   docker pull ciatphdev/firebase-users-client:dev
   docker pull ciatphdev/firebase-users-server:dev
   ```
- Docker run (requires a `.env` file inside the client and server folders):<br>
   ```
   docker run -it --rm --env-file .env -p 3000:3000 ciatphdev/firebase-users-client:dev
   docker run -it --rm --env-file .env -p 3001:3001 ciatphdev/firebase-users-server:dev
   ```


## References

[[1]](https://docs.docker.com/compose/reference/) - docker compose commands

@ciatph
20220406
