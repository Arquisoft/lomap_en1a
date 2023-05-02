FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/arquisoft/lomap_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="http://172.187.193.114:5000/api"
ENV REACT_APP_API_URI=$API_URI

ARG HOST_URI="172.187.193.114"
ENV host=$HOST_URI

#Create an optimized version of the webapp
RUN npm run build

#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
CMD ["npm", "start"]