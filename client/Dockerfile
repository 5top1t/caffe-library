# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /var/www

# add `/app/node_modules/.bin` to $PATH
ENV PATH /var/www/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./
EXPOSE 3001
# start app
CMD ["npm", "run", "start"]