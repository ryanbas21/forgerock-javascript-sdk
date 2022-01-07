FROM node:lts-alpine
WORKDIR /app
COPY ./dist/e2e/autoscript-apps .
ENV PORT=3334
EXPOSE ${PORT}

CMD node ./index.js