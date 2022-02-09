FROM node:lts as builder

WORKDIR /app/builder
RUN npm i -g nx

COPY . /app/builder 
RUN npm install

RUN nx run-many --target=build --projects=reactjs-todo,todo-api --parallel
