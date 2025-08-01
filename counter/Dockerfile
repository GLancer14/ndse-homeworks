FROM node:22.17-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY *.js ./

EXPOSE 3001

CMD ["npm", "run", "start", "-L"]
