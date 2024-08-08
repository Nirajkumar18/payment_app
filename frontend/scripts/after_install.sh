#!/bin/bash

set -e
set -x

# Ensure Node.js and npm are installed
if ! command -v npm &> /dev/null
then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Navigate to the app directory
cd /var/www/html/app

# Install dependencies
npm install

# Build the application
npm run build
