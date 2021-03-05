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
3. Create a new MongoDB database called `tildb` with a collection called `learners`
5. Import the data from the file `tildb.json`
6. If your MongoDB instance requires a username & password to login, adjust line 17 in `index.js` accordingly
7. Run `nodemon index.js`
8. To use the GraphQL interface, open a browser and goto - http://localhost:4005/graphql

## GraphQL API
Examples of queries and mutations you can run via http://localhost:4005/graphql

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