FROM node:14
WORKDIR /app
COPY ./dist/e2e/mock-api .
ENV MOCK_PORT=9443
EXPOSE ${MOCK_PORT}
RUN npm install --production
CMD node ./main.js
