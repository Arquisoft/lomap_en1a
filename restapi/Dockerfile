FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG HOST_DOMAIN="lomapen1a.cloudns.ph"
ENV host=$HOST_DOMAIN

CMD [ "npm", "start" ]