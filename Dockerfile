# install latest node
# https://hub.docker.com/_/node/
FROM node:14

# create and set app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# install app dependencies
# this is done before the following COPY command to take advantage of layer caching
# remember the working directory is `/usr/src/app/`
COPY package.json ./

# If you are building your code for production
# RUN npm ci --only=production
# RUN npm install
# RUN npm install --production --unsafe-perm
# RUN npm audit fix
# RUN npm link @angular/cli
# RUN npm install tslint typescript --save-dev

# copy app source to destination container
COPY . .
# RUN npm run lint

# expose container port
EXPOSE 8080

CMD npm start
