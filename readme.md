# Auto loan Application

initialised the project using 
```npm init```

using https://mrkandreev.name/snippets/gitignore-generator/ to generate the gitignore file which should not be pushed to the git repo

create .env fine which stores all the environmental variables so that it can be added in production for security

creat6ed src folder and created files in it touch app.js constants.js index.js

to use the import statements in the node js. you need to use the type as module in package.json
(there is 2 types 1. common js    2. module js)

installing Nodemon --- used to restart the surver automatically. when you have done any changes.
install Nodemon as dev dependency.
```npm i -D nodemon```
add this line in the package.json scripts part
"dev": "nodemon src/index.js"

createing the project structure in src;;; mkdir controllers db middlewares models routes utils

creating database:: used mongoDB Atlas.

installing dotenv package :: loads environment variables from a .env file into process.env.
install mongoose
install express

```npm i mongoose express dotenv```

install cookie-parser 
used for handling cookies
```npm i cookie-parser```
install cors 
its a middleware used for cross origin resource sharing. to get data from backend and frontend
```npm i cors```