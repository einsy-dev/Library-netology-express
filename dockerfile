FROM node:18.18.0

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY src/ ./