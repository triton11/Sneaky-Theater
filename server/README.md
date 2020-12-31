## This is the Server for Sneaky Theater

It uses a MongoDB database, Express and NodeJS. 

git clone https://github.com/triton11/Emojinius.git

Install Node
1. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
2. . ~/.nvm/nvm.sh
3. nvm install 10.10.0
4. test: node -e "console.log('Running Node.js ' + process.version)"

Install MongoDB:
1. vim /etc/yum.repos.d/mongodb-org-3.6.repo
2. paste in the following:
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
3. sudo yum install -y mongodb-org
4. sudo service mongod start
5. test: mongo

Start server:
1. cd into server
2. npm install
3. node index.js

This should start the server running on port 3000. Test your connection by going to the server in a web browser - it should say hello world! 