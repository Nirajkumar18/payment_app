FROM node:18

WORKDIR /app

COPY . /app

# Install dependencies
RUN npm install

# Expose the port your backend runs on (default: 3000 or configured in your app)
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
