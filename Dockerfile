FROM node:18-alpine as build

RUN apk add curl bash --no-cache

RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

RUN /usr/local/bin/node-prune

RUN rm -rf node_modules/rxjs/src/ \
  && rm -rf node_modules/rxjs/bundles/ \
  && rm -rf node_modules/rxjs/_esm5/ \
  && rm -rf node_modules/rxjs/_esm2015/ \
  && rm -rf node_modules/swagger-ui-dist/*.map \
  && rm -rf node_modules/couchbase/src/

FROM node:18-alpine AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/yarn.lock .
COPY --from=build /usr/src/app/dist/ ./dist
COPY --from=build /usr/src/app/node_modules/ ./node_modules

CMD [ "node", "dist/main" ]