FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/arquisoft/lomap_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="http://lomapen1a.cloudns.ph:5443/api"
ENV REACT_APP_API_URI=$API_URI

ARG HOST_DOMAIN="lomapen1a.cloudns.ph"
ENV host=$HOST_DOMAIN

#Create an optimized version of the webapp
RUN npm run build

#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]
CMD node server.js