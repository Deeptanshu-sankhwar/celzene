FROM node:22.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5789
CMD [ "node", "server.js" ]