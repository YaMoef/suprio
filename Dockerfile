ARG NODE_VERSION=18.14.0-alpine

FROM node:${NODE_VERSION} as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output to replace the default nginx contents.
EXPOSE 80
COPY --from=builder /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/surprio /usr/share/nginx/html

# make sure assets folder exists
RUN mkdir -p /usr/share/nginx/html/assets
# Expose port 80