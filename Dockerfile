FROM node:lts as builder

ARG WEB_OAUTH_CLIENT
ENV WEB_OAUTH_CLIENT ${WEB_OAUTH_CLIENT:-"client"}
ARG AM_URL
ENV AM_URL ${AM_URL:-"someurl"}
ARG APP_URL
ENV APP_URL ${APP_URL:-"someurl-app"}
ARG API_URL
ENV API_URL ${API_URL:-"http://todo-api:8081"}
ARG DEBUGGER_OFF
ENV DEBUGGER_OFF ${DEBUGGER_OFF:-"false"}
ARG REALM_PATH
ENV REALM_PATH ${REALM_PATH:-"alpha"}
ARG JOURNEY_LOGIN
ENV JOURNEY_LOGIN ${JOURNEY_LOGIN:-"Login"}
ARG JOURNEY_REGISTER
ENV JOURNEY_REGISTER ${JOURNEY_REGISTER:-"Registration"}

WORKDIR /app/builder
RUN npm i -g nx

COPY . /app/builder 
RUN npm install

RUN nx run-many --target=build --projects=reactjs-todo,todo-api,mock-api,autoscript-apps --parallel --skipNxCache
