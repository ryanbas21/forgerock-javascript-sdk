FROM node:lts-alpine
WORKDIR /app
COPY ./dist/e2e/mock-api .
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install
# dependencies that nestjs needs
CMD node ./main.js