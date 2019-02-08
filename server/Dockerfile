FROM node:latest
WORKDIR "/app"
RUN apt-get update && apt-get install -y wget
COPY ./package.json ./
RUN npm install
COPY ./wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh
COPY . .
CMD ["node", "index.js"]
