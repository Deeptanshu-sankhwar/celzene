# This is file where I will specify the configs for running my backend app for Celzene Backend

FROM node:22.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "server.js" ]