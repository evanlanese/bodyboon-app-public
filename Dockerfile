FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci

COPY . ./

EXPOSE 8080

# Environment variables are injected at runtime (e.g. Cloud Run / Secret Manager)
CMD ["node", "server.js"]