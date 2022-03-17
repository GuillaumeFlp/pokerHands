FROM node:16-alpine

WORKDIR /usr/src/app

EXPOSE 8080

COPY package*.json ./
COPY src/ .

RUN npm install --production

CMD [ "node", "app.js" ]
