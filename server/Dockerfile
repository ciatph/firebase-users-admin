# BASE PROFILE
FROM node:14.19.3-alpine AS base
RUN mkdir -p /opt/server
WORKDIR /opt/server
RUN adduser -S server
RUN chown -R server /opt/server
COPY package*.json ./

# BUILD API DOCUMENTATION
FROM base as build
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

# PRODUCTION PROFILE TARGET
FROM base as production
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
RUN npm install pm2@5.2.0 -g
COPY . .
COPY --from=build /opt/server/public/docs ./public/docs
USER server
EXPOSE 3001
CMD ["pm2-runtime", "process.json"]

# DEVELOPMENT PROFILE TARGET
FROM base as development
ENV NODE_ENV development
RUN npm install && npm cache clean --force
COPY . .
COPY --from=build /opt/server/public/docs ./public/docs
USER server
EXPOSE 3001
CMD ["npm", "run", "dev"]
