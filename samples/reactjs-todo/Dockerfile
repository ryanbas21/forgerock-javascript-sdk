FROM okteto.dev/base as builder

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/samples/reactjs-todo/public .
COPY --from=builder /app/builder/dist/samples/reactjs-todo .
# COPY --from=builder /app/builder/samples/reactjs-todo/nginx.conf /etc/nginx/nginx.conf