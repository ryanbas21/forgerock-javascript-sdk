FROM node:lts as builder

ARG WEB_OAUTH_CLIENT
ARG AM_URL
ARG APP_URL
ARG API_URL
ARG DEBUGGER_OFF
ARG REALM_PATH
ARG JOURNEY_LOGIN
ARG JOURNEY_REGISTER

WORKDIR /app/builder
RUN npm i -g nx

COPY . /app/builder 
RUN npm install

RUN nx run-many --target=build --projects=reactjs-todo,todo-api --skipNxCache
