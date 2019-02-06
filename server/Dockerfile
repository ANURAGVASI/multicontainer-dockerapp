FROM node:latest
WORKDIR "/app"
RUN apt-get update && apt-get install -y wget
COPY ./package.json ./
RUN npm install
COPY ./wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh
COPY . .
CMD ["./wait-for-it.sh","-t","30","mongoserver:27017", "--", "node", "index.js"]
