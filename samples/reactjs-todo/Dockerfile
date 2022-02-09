FROM okteto.dev/base as builder

ARG WEB_OAUTH_CLIENT
ENV WEB_OAUTH_CLIENT=$WEB_OAUTH_CLIENT
ARG AM_URL
ENV AM_URL=$AM_URL
ARG APP_URL
ENV APP_URL=$APP_URL
ARG API_URL
ENV API_URL=$API_URL
ARG DEBUGGER_OFF
ENV DEBUGGER_OFF=$DEBUGGER_OFF
ARG REALM_PATH
ENV REALM_PATH=$REALM_PATH
ARG JOURNEY_LOGIN
ENV JOURNEY_LOGIN=$JOURNEY_LOGIN
ARG JOURNEY_REGISTER
ENV JOURNEY_REGISTER=$JOURNEY_REGISTER

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/samples/reactjs-todo/public .
COPY --from=builder /app/builder/dist/samples/reactjs-todo .
# COPY --from=builder /app/builder/samples/reactjs-todo/nginx.conf /etc/nginx/nginx.conf