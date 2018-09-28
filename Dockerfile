FROM mhart/alpine-node:10

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge

WORKDIR /app
# dependencies will be installed only if the yarn.lock file changes
COPY yarn.lock package.json ./
RUN yarn

COPY . .