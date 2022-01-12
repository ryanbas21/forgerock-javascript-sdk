FROM okteto.dev/base as builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .

FROM node:alpine

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

CMD ["node", "./dist/samples/todo-api/main.js"]