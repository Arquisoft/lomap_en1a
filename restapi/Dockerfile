FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG HOST_DOMAIN="lomapen1a.cloudns.ph"
ENV DOMAIN=$HOST_DOMAIN

ARG HOST_IP="localhost"
ENV IP=$HOST_IP

CMD [ "npm", "start" ]