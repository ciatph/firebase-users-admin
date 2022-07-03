# BASE PROFILE
FROM node:14.19.3-alpine AS base
RUN adduser -S appuser

# BASE SERVER
FROM base as base-server
RUN mkdir -p /opt/server
WORKDIR /opt/server
RUN chown -R appuser /opt/server
COPY ./server/package*.json ./

# BASE CLIENT
FROM base as base-client
RUN mkdir -p /opt/client
WORKDIR /opt/client
RUN chown -R appuser /opt/client
COPY ./client/package*.json ./

# BUILD CLIENT WEBSITE TARGET
FROM base-client as builder-client
RUN npm install
COPY ./client ./
RUN npm run build

# BUILD API DOCUMENTATION
FROM base-server as builder-server
RUN npm install && npm cache clean --force
COPY ./server .
RUN npm run build

# PRODUCTION CLIENT+SERVER PROFILE TARGET
# Express backend running on pm2
# Create React App (CRA) served from backend's static directory (using express.static() middleware)
# Requirements: Disable CORS to allow Same Origin headers on client and server APIs
FROM base-server as production
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
RUN npm install pm2@5.2.0 -g
COPY ./server .
COPY --from=builder-server /opt/server/public/docs ./public/docs
COPY --from=builder-client /opt/client/build ./public
USER appuser
EXPOSE 3001
CMD ["pm2-runtime", "process.json"]
