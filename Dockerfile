FROM node:18.17.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/

EXPOSE 3000

CMD [ "npm", "run","dev" ]