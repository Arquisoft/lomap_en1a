FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="40.81.128.219"
ENV host=$API_URI

CMD [ "npm", "start" ]