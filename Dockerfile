FROM node:18-alpine
RUN apk update

# create root application folder
WORKDIR /usr/src/app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
# copy source code to /app/src folder
COPY ./src ./src
RUN npm run compile
# check files list
RUN ls -a

CMD node ./dist/index.js