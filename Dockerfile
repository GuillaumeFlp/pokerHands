FROM node:16-alpine

WORKDIR /usr/src/app

EXPOSE 8080

COPY backend/package*.json ./
COPY backend/src/ .

RUN npm install --production

CMD [ "node", "app.js" ]
