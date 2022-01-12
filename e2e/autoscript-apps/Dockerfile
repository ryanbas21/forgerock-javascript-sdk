FROM node:14
WORKDIR /app
COPY ./dist/e2e/autoscript-apps .
ENV PORT=8443
EXPOSE ${PORT}
RUN npm install --production
CMD node ./index.js
