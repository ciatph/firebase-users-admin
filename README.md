## firebase-users-admin

**firebase-users-admin** is a backend app featuring CRUD API endpoints for managing [Firebase Authentication](https://firebase.google.com/docs/auth) users using the [firebase-admin](https://firebase.google.com/docs/admin/setup) SDK for NodeJS.

A basic web app client in the **/client** directory will show basic API usage and demonstration.

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
3. React 18 (CRA) on client app


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
   -  `FIREBASE_SERVICE_ACC`
      -  The project's private key file contents, condensed into one line and minus all whitespace characters.
      -  The service account JSON file is generated from the Firebase project's **Project Settings** page, on  
        **Project Settings** -> **Service accounts** -> **Generate new private key**
   - `FIREBASE_PRIVATE_KEY`
      - The `private_key` entry from the service account JSON file
      - > **NOTE:** Take note to make sure that the value starts and ends with a double-quote on WINDOWS OS localhost. Some systems may or may not require the double-quotes (i.e., Ubuntu running on heroku).
   - `ALLOWED_ORIGINS`
      - IP/domain origins in comma-separated values that are allowed to access the API
   - `EMAIL_WHITELIST`
      - Comma-separated email addresses linked to Firebase Auth UserRecords that are not allowed to be deleted or updated (write-protected)

### client

1. Install dependencies.
   ```
   cd client
   npm install
   ```
2. Replace `/client/utils/firebase/firebase.config.js` with your own Firebase project's web SDK setup configuration file.
   - You can find this file in a Firebase project's  
**Project Settings** -> **General** -> **Web apps** (Add an app if needed) -> **SDK setup and configuration**
3. Create a `/client/.env` file from the `/client/.env.example` file.
   - Replace `REACT_APP_BASE_URL` with the domain on which the CRUD API is running (default value is `http://localhost:3001/api` on localhost. See the [server](#server) set-up instructions for more information).
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

@ciatph  
20220406
