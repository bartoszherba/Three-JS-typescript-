FROM node:14.4-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY server.js ./
COPY ./dist ./dist

RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]