FROM node:12-alpine as debug

WORKDIR /work/

COPY ./package.json /work/package.json
RUN npm install
RUN npm install -g nodemon

COPY ./ /work/

ENTRYPOINT [ "npm", "run", "debug" ]