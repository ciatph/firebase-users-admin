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
      - Take note to make sure that the value starts and ends with a double-quote

### client

1. Install dependencies.
   ```
   cd client
   npm install
   ```

## Usage

1. Navigate to the `/server` directory.
2. Generate the API documentation.  
`npm run gen:docs`
3. Run the app:  
   - (development mode) `npm run dev`
   - (production mode) `npm start`
4. Read the API documentation and usage examples guide of available CRUD API endpoints on:  
`http://localhost:3001/docs`


## Available Scripts - server

The npm scripts listed below are available under the **/server** directory.

### `npm start`

Run the express app (API only) in production mode. `npm run gen:docs` needs to run separately, if you'd also like to make the API documentation usage available in production mode.

### `npm run dev`

Run the express app (API only) in development mode.

### `npm run gen:docs`

Builds the API documentation. The static website documentation files are put in the `/src/public` directory, and made available on `http://localhost:3001/docs`.

### `npm run seed`

Creates an initial **superadmin** Firebase Authentication user with the credentials:  

```
email: superadmin@gmail.com
displayname: Super Admin
password: 123456789
account_level: 1
```

@ciatph  
20220406
