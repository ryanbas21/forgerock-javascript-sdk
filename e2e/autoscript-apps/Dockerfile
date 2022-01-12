FROM node:14 as builder
WORKDIR /app
RUN npm install

COPY ./dist/e2e/autoscript-apps .

# nginx state for serving content
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder . .

ENV PORT=3000
EXPOSE ${PORT}

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
