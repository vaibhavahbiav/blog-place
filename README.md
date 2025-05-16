Steps

1. Make an env file in backend directory, if not present. then use YOUR MONGODB_URI here.

2. On console, cd to backend directory and run "node .\backend.js". This will start your backend. 
Provided that you have entered your URI correctly.

3. Now to run your front-end, open a new console from root directory and run "npm run start". This will open dev server in browser
http://localhost:3000

I have used MongoDB Atlas for the storage which is online on cloud. Same can be done locally using MongoDB Compass. Make database locally and then use that URI in env.
In order to use MongoDB Atlas you need to make an account, login, then create a new cluster and then use that URI in env and connect.