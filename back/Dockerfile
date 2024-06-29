FROM node:latest

WORKDIR /usr/src/agis-server

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]