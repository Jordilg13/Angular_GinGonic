# build stage
FROM golang:alpine AS build-env
RUN echo "fs.inotify.max_user_watches=524288" | tee -a /etc/sysctl.conf | sysctl -p
RUN set -eux; \
    apk add --no-cache --virtual .build-deps \
    git gcc libc-dev; \
    go get -u github.com/kardianos/govendor; \
    go get -u github.com/pilu/fresh; \
    go get -u github.com/go-sql-driver/mysql; \
    go get -u github.com/gorilla/websocket;  \
    go get -u github.com/gin-gonic/gin; \
    go get -u github.com/jinzhu/gorm;
# apk del .build-deps;
# ADD ./vendor /go/src/github.com/wangzitian0/golang-gin-starter-kit/vendor
ENV GOPATH /go
ENV GOROOT /usr/local/go
# WORKDIR /go/src/github.com/reji/backend
# RUN govendor sync;
# RUN govendor add +external
# COPY . /go/src/github.com/reji/backend
# RUN go build
# CMD fresh
# EXPOSE 3001