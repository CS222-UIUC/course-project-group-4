From node:18.12-alpine

WORKDIR /src

ADD package.json /src/package.json
RUN npm install

ADD . /src

ENV PORT=8080

ENTRYPOINT npm install -g serve;  npm run build;  npx serve -s build;