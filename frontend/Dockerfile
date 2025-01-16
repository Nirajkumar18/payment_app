FROM node:18 AS builder

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# Use an Nginx base image to serve the built files
FROM nginx:alpine

# Copy built files from the builder stage to the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
