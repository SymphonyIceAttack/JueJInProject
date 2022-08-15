FROM  node:alpine


WORKDIR /usr/app


COPY package.json .

RUN  yarn config set ignore-engines true

RUN yarn

COPY . .

CMD [ "yarn","preview","--host" ]