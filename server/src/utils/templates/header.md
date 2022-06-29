### Introduction

CRUD API for Firebase Authentication users management using the firebase-admin SDK

### Demo

<p>Login using the default user credentials:</p>

```
username: superadmin@gmail.com
password: 123456789
```

- **live client app:** [https://fire-auth-users.web.app/](https://fire-auth-users.web.app/)
- **localhost app:** [http://localhost:3000](http://localhost:3000)
   - Read more about the localhost environment set-up instructions on [firebase-auth-users](https://github.com/ciatph/firebase-users-admin)

### Docker

firebase-users-admin's server component, hosting all the listed endpoints below is available as a stand-alone [docker image](https://hub.docker.com/r/ciatphdev/firebase-users-admin-server) on Docker Hub with customizable environment variables (.env file).

1. Pull the (production) **/server** docker image from Docker Hub.  
   `docker pull ciatphdev/firebase-users-admin-server:v1.1.1`
2. Create a `.env` file.  
   - Read [**Installation - server #3**](https://github.com/ciatph/firebase-users-admin#server) for more information.
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
      --env-file .env
      -p 3001:3001 \
      ciatphdev/firebase-users-admin-server:v1.1.1
   ```
4. Run a script in the container to create the default `superadmin@gmail.com` account, if it does not yet exist in the Firestore database.  
   `docker exec -it server-prod npm run seed`
5. Launch the server API documentation on  
`http://localhost:3001/docs`

### References

- [firebase-users-admin](https://github.com/ciatph/firebase-users-admin) (GitHub repository)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- Firebase Admin SDK
   - [set-up](https://firebase.google.com/docs/admin/setup)
   - [manage users](https://firebase.google.com/docs/auth/admin/manage-users)
