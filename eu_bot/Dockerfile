FROM node:7-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm install

COPY . /src/app

COPY ./mqtt-provider /src/mqtt-provider

COPY ./mongo-provider /src/mongo-provider

# EXPOSE 8080

CMD [ "npm", "start" ]
