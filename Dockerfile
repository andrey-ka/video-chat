FROM node:argon
# Create app directory
RUN mkdir -p /data/src/app
WORKDIR /data/src/app

# Install app dependencies
COPY package.json /data/src/app/
RUN npm install

# Bundle app source
COPY . /data/src/app

# external port
EXPOSE 8080

CMD [ "npm", "start" ]
