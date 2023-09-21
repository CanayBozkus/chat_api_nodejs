# Overview

This is a node.js socket.io based chat app to simulate chat between customer and customer support agent. It uses mongodb as database and redis for socket.io cache.

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

# Important Points

- When using UI, first create users, a customer and an agent.
- Password has to be 8 characters long.
- UI is not very user friendly :) since its purpose is to test socket .
- Then login. If you don't login, then you cannot connect to socket.
- First message has to come from user. Click "find customer support agent" button on user page. If you don't, agent cannot receive live messages.
- You do not need to press that button on agent page. After you send first message from user, agent can communicate too.
- So, do not forget to create an agent.
- Authentication mechanism is cookie based. If you will test using postman, do not forget to add cookie that comes after login.
- I suggest you to use private browsers to prevent cookie conflicts.
- You can connect to mongodb container using mongodb compass.
- I did not check whether you can connect redis instance using any app. However, if you know how, you are welcome to use.

# APIs

- /
- /api/login
- /api/register
- /api/find-customer-support-agent
- /api/send-message
- /api/get-messages