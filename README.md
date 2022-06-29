## firebase-users-admin

**firebase-users-admin** is a backend app featuring CRUD API endpoints for managing [Firebase Authentication](https://firebase.google.com/docs/auth) users using the [firebase-admin](https://firebase.google.com/docs/admin/setup) SDK for NodeJS.

A basic web app client in the **/client** directory will show basic API usage and demonstration.

## Content

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts - server](#available-scripts---server)
- [Installation and Usage Using Docker](#installation-and-usage-using-docker)
  - [Docker for Localhost Development](#docker-for-localhost-development)
  - [Docker for Production Deployment](#docker-for-production-deployment)
   - [Pre-built Server Docker Image](#pre-built-server-docker-image)
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

1. Clone this repository.  
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
   |ALLOWED_ORIGINS|IP/domain origins in comma-separated values that are allowed to access the API. Include `http://localhost:3000` by default to allow CORS access to the `/client` app.|
   |EMAIL_WHITELIST| Comma-separated email addresses linked to Firebase Auth UserRecords that are not allowed to be deleted or updated (write-protected)<br><br>Default value is `superadmin@gmail.com`|
   |ALLOW_CORS|Allow Cross-Origin Resource Sharing (CORS) on the API endpoints.<br><br>Default value is `1`. Setting to `0` will make all endpoints accept requests from all domains, including Postman.|

### client

1. Install dependencies.
   ```
   cd client
   npm install
   ```
2. Replace the `/client/utils/firebase/firebase.config.js` file with your own Firebase project's web SDK setup configuration file.
   - You can find this file in a Firebase project's  
**Project Settings** -> **General** -> **Web apps** (Add an app if needed) -> **SDK setup and configuration**
   - The `firebase.config.js` settings must match with the `FIREBASE_SERVICE_ACC` environment variable defined on **server - step # 3.**
3. Create a `/client/.env` file from the `/client/.env.example` file. Replace the `REACT_APP_BASE_URL` variable with an appropriate value.  

   | Variable Name | Description |
   | --- | --- |
   |REACT_APP_BASE_URL|Domain on which the CRUD API is running.<br><br> Default value is `http://localhost:3001/api` on localhost. See the [server](#server) set-up instructions for more information.|
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

### Docker for Localhost Development

1. Set-up the environment variables and firebase configuration file for the **/client** app.
   - Create (your own) `firebase.config.js` file under `/client/utils/firebase/firebase.config.js` as advised on [**Installation - client # 2**](#client).
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

The following docker-compose commands build small client and server images targeted for creating optimized dockerized apps running on self-managed production servers. Hot reload is not available when editing source codes from `/client/src` or `/server/src`.

1. Install and set up the required **client** and **server** environment variables as with the required variables on [**Docker for Localhost Development**](#docker-for-localhost-development).
2. Build the client and server docker services for production deployment.  
   - `docker-compose -f docker-compose-prod.yml build`
3. At this point, we can opt to push the docker images to a docker registry of your choice. (Requires sign-in to the selected docker registry).
   - `docker-compose -f docker-compose-prod.yml push`
4. Create and start the client and server containers.  
`docker-compose -f docker-compose-prod.yml up`
5. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.  
   `docker exec -it server-prod npm run seed`
6. Launch the dockerized (prod) client app on  
`http://localhost:3000`
7. Launch the dockerized (prod) server app's API documentation on  
`http://localhost:3001/docs`
8. Stop and remove containers, networks, images and volumes:  
`docker-compose -f docker-compose-prod.yml down`

## Pre-built Server Docker Image

**firebase-users-admin**'s `server` component is available as a stand-alone docker image on Docker Hub with customizable environment variables (.env file).

1. Pull the (production) **/server** docker image from Docker Hub.  
   `docker pull ciatphdev/firebase-users-admin-server:v1.1.1`
2. Create a `.env` file.  
   - Read [**Installation - server #3**](#server) for more information.
   - Replace the variables accordingly in the `.env` file.
      ```
      ALLOWED_ORIGINS=http://localhost,http://localhost:3000,http://mywebsite.com,http://yourwebsite.com
      FIREBASE_SERVICE_ACC=YOUR-FIREBASE-PROJ-SERVICE-ACCOUNT-JSON-CREDENTIALS-ONE-LINER-NO-SPACES
      FIREBASE_PRIVATE_KEY=PRIVATE-KEY-FROM-FIREBASE-SERVICE-ACCOUNT-JSON-WITH-DOUBLE-QUOTES
      EMAIL_WHITELIST=superadmin@gmail.com
	  ALLOW_CORS=1
      ```
3. Run the image.
   ```
   docker run -it --rm \
      --env-file .env \
      -p 3001:3001 \
      ciatphdev/firebase-users-admin-server:v1.1.1
   ```
4. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.  
   `docker exec -it server-prod npm run seed`
5. Launch the server API documentation on  
`http://localhost:3001/docs`


## References

[[1]](https://docs.docker.com/compose/reference/) - docker compose commands

@ciatph  
20220406
