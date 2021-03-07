# 2020-sept-knowsys-api

## About
This is the API repo for a social media "Today I Learned" app called Knowsy (pronounced like 'nosey')

The UI repo for this app is here - https://github.com/Mayden-Academy/2020-sept-knowsys-ui

## Live Demo
The Knowsy app is live here - https://2020-sept-knowsys-ui.dev.io-academy.uk/

## End User Features
- Ability to create a new account
- Ability to login if you have an existing account

## Install & Run Locally
1. Clone the repo
2. Run `npm install`
3. Create a new MongoDB database - either locally or in the cloud via
   [Atlas](https://www.mongodb.com/cloud/atlas)
- called `tildb` with a collection called `learners`
5. Import the data from the file `tildb.json`
6. Adjust the database connection details in `index.js` according to your MongoDB instance
7. Run `nodemon index.js`
8. To use the GraphQL interface, open a browser and goto - http://localhost:4005/graphql

## GraphQL API
Examples of queries and mutations you can run via the GraphQL interface above.

FYI stored passwords are salted & hashed, and an access token is assigned after successful login

**Get All Users**
```GraphQL
query {
    users {
        _id
        username
        email
        bio
    }
}
```

**Get User by Username**
```GraphQL
query {
    user (username: "tango"){
        email,
        username,
        password
        bio
    }
}
```

**Add a New User**
```GraphQL
mutation {
    addUser (email: "tango@example.com", 
    username: "tango", 
    password: "password1234", 
    bio: "Run a shot across the bow Pirate Round swab ho gibbet Sail ho grapple cable dance the hempen jig reef. Scuppers spanker maroon case") 
    {
        _id
        username
        bio
        email
        access_token
    }
}
```

**Login an Existing User**
```GraphQL
mutation {
    loginUserName (username: "tango", password: "password1234") {
        _id
        username
        bio
        email
        access_token
    }
}
```