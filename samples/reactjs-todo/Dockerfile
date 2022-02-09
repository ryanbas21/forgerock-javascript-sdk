FROM okteto.dev/base as builder


FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html
ENV PORT=8443
EXPOSE ${PORT}

COPY --from=builder /app/builder/samples/reactjs-todo/public .
COPY --from=builder /app/builder/dist/samples/reactjs-todo .
# COPY --from=builder /app/builder/samples/reactjs-todo/nginx.conf /etc/nginx/nginx.conf
