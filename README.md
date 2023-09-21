# Overview

This is a node.js socket.io based chat app. It uses mongodb as database and redis for socket.io cache.

# Installation and Setup

- Download docker, docker-compose and node.js to your local environment.
- Download the codes using git clone.
- Create an .env file.
- Add below parameters to .env file:
  + JWT_TOKEN=chatapi
  + PORT=3000
  + MONGODB_USERNAME=root
  + MONGODB_PASSWORD=test123
  + MONGODB_HOST=mongodb:27017
  + MONGODB_DB=chatify
  + REDIS_PORT=6379 
  + REDIS_HOST=redis
  + BCRYPT_SALT=10 
- Use docker-compose up to start.

After all these step you can use postman to test APIs or from your browser you can test real-time chat feature on 127.0.0.1:3000.

