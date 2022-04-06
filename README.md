## firebase-users-admin

**firebase-users-admin** features CRUD API endpoints for managing [Firebase Authentication](https://firebase.google.com/docs/auth) users using the [firebase-admin](https://firebase.google.com/docs/admin/setup) SDK for NodeJS.


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


## Installation

1. Clone this repository.  
`git clone https://github.com/ciatph/firebase-users-admin`
2. Install dependencies.  
`npm install`
3. Set up the environment variables. Create a `.env` file with reference to the `.env.example` file. Encode your own Firebase project settings on the following variables:
   -  `FIREBASE_SERVICE_ACC`
      -  The project's private key file contents, condensed into one line and minus all whitespace characters.
      -  The service account JSON file is generated from the Firebase project's **Project Settings** page, on  
        **Project Settings** -> **Service accounts** -> **Generate new private key**
   - `FIREBASE_PRIVATE_KEY`
      - The `private_key` entry from the service account JSON file
      - Take note to make sure that the value starts and ends with a double-quote


## Usage

1. Generate the API documentation.  
`npm run gen:docs`
2. Run the app:  
   - (development mode) `npm run dev`
   - (production mode) `npm start`
3. Read the API documentation and usage examples guide of available CRUD API endpoints on:  
`http://localhost:3001/docs`


@ciatph  
20220406
