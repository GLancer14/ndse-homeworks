FROM node:22.17-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY ./src ./src
COPY ./middleware ./middleware
COPY ./public ./public
COPY ./routes ./routes
COPY ./views ./views
COPY ./models ./models

EXPOSE 3000

CMD ["npm", "run", "start", "-L"]
