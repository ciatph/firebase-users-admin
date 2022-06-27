# BASE PROFILE
FROM node:14.19.3-alpine AS base
RUN mkdir -p /opt/server
WORKDIR /opt/server
RUN adduser -S server
RUN chown -R server /opt/server
COPY package*.json ./

# PRODUCTION PROFILE TARGET
FROM base as production
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
RUN npm install --save pm2
COPY . .
RUN npm run build
USER server
EXPOSE 3001
CMD ["npm", "run", "pm2"]

# DEVELOPMENT PROFILE TARGET
FROM base as development
ENV NODE_ENV development
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build
USER server
EXPOSE 3001
CMD ["npm", "run", "dev"]
