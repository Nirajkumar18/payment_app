#!/bin/bash

# Enable debugging
set -x

# Update package lists
apt-get update

# Log the current user and permissions
whoami
ls -l /var/www/html/app
