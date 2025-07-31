FROM node:22.12

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY ./src ./src

EXPOSE 3000

CMD ["npm", "run", "start"]