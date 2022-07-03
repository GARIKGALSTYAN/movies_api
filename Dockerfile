FROM node:14.19.3

WORKDIR /

COPY package*.json yarn.lock /
EXPOSE 18000

COPY . /

RUN yarn install
RUN yarn build

CMD ["node", "dist/index.js"]
