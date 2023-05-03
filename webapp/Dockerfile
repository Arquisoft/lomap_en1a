FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/arquisoft/lomap_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG HOST_DOMAIN="lomapen1a.cloudns.ph"
ENV DOMAIN=$HOST_DOMAIN

ARG HOST_IP="localhost"
ENV IP=$HOST_IP

#Create an optimized version of the webapp
RUN npm run build

#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]
CMD node server.js