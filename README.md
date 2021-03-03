# 2020-sept-knowsys-api

## About
This is the API repo for a social media "Today I Learned" app called Knowsy (pronounced like 'nosey')

The UI repo for this app is here - https://github.com/Mayden-Academy/2020-sept-knowsys-ui

## Live Demo
The Knowsy app is live here - https://2020-sept-knowsys-ui.dev.io-academy.uk/

## Features
- Ability to create a new account
- Ability to login if you have an existing account

## Install & Run Locally
1. Clone the repo
2. Run `npm install`
3. Create a new MongoDB database called `tildb` with a collection called `learners`
5. Import the data from the file `tildb.json`
6. Run `nodemon index.js`
7. To use the GraphQL interface, open a browser and goto - http://localhost:4005/graphql
