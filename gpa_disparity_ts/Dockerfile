From node:18.12-alpine

WORKDIR /src

ADD package.json /src/package.json
RUN npm install

ADD . /src
RUN npm run build

ENV PORT=8080

ENTRYPOINT   npx serve -l $PORT -s build