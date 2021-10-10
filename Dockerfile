FROM node:12.16.3

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD [ "npm", "start" ]