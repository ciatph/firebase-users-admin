### Introduction

CRUD API for Firebase Authentication users management using the firebase-admin SDK

### Demo

<p>Login using the default user credentials:</p>

```
username: superadmin@gmail.com
password: 123456789
```

- **live client app:** [https://adminusers-dev.web.app/](https://adminusers-dev.web.app/)
- **localhost app:** [http://localhost:3000](http://localhost:3000)
   - Read more about the localhost environment set-up instructions on [firebase-admin-users](https://github.com/ciatph/firebase-users-admin)

### Docker

firebase-users-admin's server component, hosting all the listed endpoints below is available as a stand-alone [docker image](https://hub.docker.com/r/ciatphdev/firebase-users-admin-server) on Docker Hub with customizable environment variables (.env file).

The server also serves a pre-built [`client`](https://github.com/ciatph/firebase-users-admin/tree/dev/client) website from a static directory using the `express.static()` middleware, following the build instructions from [**Option #2 - Client and Server Bundled in (1) Image and Service**](https://github.com/ciatph/firebase-users-admin#option-2---client-and-server-bundled-in-1-image-and-service).

1. Pull the (production) **/server** [Docker image](https://hub.docker.com/repository/docker/ciatphdev/firebase-users-app) from Docker Hub.
   - Find the latest version tag from https://hub.docker.com/r/ciatphdev/firebase-users-app, i.e., `v1.1.5`
   - `docker pull ciatphdev/firebase-users-app:v1.1.5`
2. Create a `.env` file.
   - Read [**Installation - server #3**](https://github.com/ciatph/firebase-users-admin#server) for more information.
   - Replace the variables accordingly in the `.env` file. Set `ALLOW_CORS=0` to allow `Same Origin` requests. Read [**Option #2 - Client and Server Bundled in (1) Image and Service**](https://github.com/ciatph/firebase-users-admin#option-2---client-and-server-bundled-in-1-image-and-service) for more information.
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
      --env-file .env
      -p 3001:3001 \
      ciatphdev/firebase-users-admin-app:v1.1.5
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

### Pre-built Server Docker Image (Client + Server) Development

Pre-built Docker images of the **server** and **client** for local development are also available on Docker Hub at:

- **client**<br>
https://hub.docker.com/r/ciatphdev/firebase-users-client/tags

- **server**<br>
https://hub.docker.com/r/ciatphdev/firebase-users-server/tags

### Usage Options

- Use with the docker-compose.dev.yml file (requires a `.env` file input parameter):<br>
`docker compose -f docker-compose.dev.yml pull`

- Docker pull<br>
   ```
   docker pull ciatphdev/firebase-users-client:dev
   docker pull ciatphdev/firebase-users-server:dev
   ```
- Docker run (requires a `.env` file input parameter):<br>
   ```
   docker run -it --rm --env-file .env -p 3000:3000 ciatphdev/firebase-users-client:dev
   docker run -it --rm --env-file .env -p 3001:3001 ciatphdev/firebase-users-server:dev
   ```

### References

- [firebase-users-admin](https://github.com/ciatph/firebase-users-admin) (GitHub repository)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- Firebase Admin SDK
   - [set-up](https://firebase.google.com/docs/admin/setup)
   - [manage users](https://firebase.google.com/docs/auth/admin/manage-users)
