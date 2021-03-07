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
3. Create a new MongoDB database (either locally or in the cloud via
   [Atlas](https://www.mongodb.com/cloud/atlas)) called `tildb` with a collection called `learners`
5. Import the data from the file `tildb-learners.json`
6. Adjust the database connection details in `index.js` according to your MongoDB instance ie username, password & url
7. Run `nodemon index.js`
8. To use the GraphQL interface, open a browser and goto - http://localhost:4005/graphql

## GraphQL API
Examples of queries and mutations you can run via the GraphQL interface above.

FYI stored passwords are salted & hashed, and an access token is only assigned after successful login ie after calling the mutation `loginUserName`

**Get All Users**

Input Query
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

Output

  ```json
   {
      "data": {
         "users": [
            {
               "_id": "5fd9d4a52cb84e1c9a455006",
               "username": "foxtrot",
               "email": "foxtrot@example.com",
               "bio": "FOXTROT BIO. Mizzen starboard Arr grapple interloper avast belay bring a spring upon her cable reef sails Pieces of Eight. Gunwalls grog man-of-war mizzen Shiver me timbers haul wind interloper handsomely trysail transom. Cackle fruit plunder deadlights pink tackle nipperkin mizzen walk the plank carouser provost. "
            },
            {
               "_id": "5fd9d83902623a1d4dc9d505",
               "username": "golf",
               "email": "golf@example.com",
               "bio": "GOLF BIO.Nipper prow handsomely grog Jack Tar port topmast spanker starboard rum. Man-of-war salmagundi chantey bilge to go on account boatswain line squiffy bring a spring upon her cable scallywag. Shiver me timbers sheet gally list code of conduct boatswain chase guns crow's nest Barbary Coast line.  Plunder yardarm cackle fruit scourge of the seven seas blow the man down sutler wherry Arr tender hang the jib"
            }
         ]
      }
   }
   ```

**Get User by Username**

Input Query
   ```GraphQL
   query {
       user (username: "sierra"){
            _id
            email
            username
            password
            bio
       }
   }
   ```
Output
```json
{
  "data": {
    "user": {
      "_id": "5fdcaaf0d0e72105437f86c2",
      "email": "sierra@example.com",
      "username": "sierra",
      "bio": "Arr Chain Shot pink topmast smartly gibbet capstan ahoy marooned log. Holystone aye hempen halter lass bilge starboard quarter weigh anchor lookout bounty. Blimey Yellow Jack bilge lad pirate chase avast rum overhaul fire in the hole. Tender scuppers topsail boom cutlass haul wind Shiver me timbers cable heave down hang the jib. Buccaneer warp bowsprit sheet hempen halter Blimey case shot broadside Sail ho hearties",
      "password": "$2b$10$5yWRlibvNcPt0A5CY3/8P.lCFv3Dda/C2lhpZk.B6aieUpQc4RyRe"
    }
  }
}
```

**Get User by ID**

Input Query
```GraphQL
query {
  userid (id: "601ad4263706b02aee2dfaeb"){
    email,
    username,
    bio
    _id
  }
}
```

Output
```json
{
  "data": {
    "userid": {
      "email": "whisky@example.com",
      "username": "whisky",
      "bio": "Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
      "_id": "601ad4263706b02aee2dfaeb"
    }
  }
}
```

**Add a New User**

Input Mutation
```GraphQL
mutation {
    addUser (email: "tango@example.com", 
    username: "tango", 
    password: "Password1234", 
    bio: "Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway") 
    {
        _id
        username
        email
        bio
        password
        access_token
    }
}
```
Output
```json
{
  "data": {
    "addUser": {
      "_id": "60451ca35ded2721900fec39",
      "username": "tango",
      "email": "tango@example.com",
      "bio": "Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway.",
      "password": "$2b$10$2vY0yu7g1HNgWNtgCKFf6.xAuLHlh4tIZpSm4tBGhZXGi/tek.sHW",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDQ1MWNhMzVkZWQyNzIxOTAwZmVjMzkiLCJlbWFpbCI6InRhbmdvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjE1MTQyMDUyLCJleHAiOjE2MTUxNTI4NTJ9.S_rdat2WBqfnXbmt4xqQZ_We1fGb5AGAKJ1TvKaonBs"
    }
  }
}
```

**Login an Existing User**

Input Mutation
```GraphQL
mutation {
    loginUserName (username: "whisky", password: "Password1234") {
        username
        email
        bio
        access_token
    }
}
```

Output
```json
{
  "data": {
    "loginUserName": {
      "username": "whisky",
      "email": "whisky@example.com",
      "bio": "Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDFhZDQyNjM3MDZiMDJhZWUyZGZhZWIiLCJlbWFpbCI6IndoaXNreUBleGFtcGxlLmNvbSIsImlhdCI6MTYxNTE0MjE3MCwiZXhwIjoxNjE1MTUyOTcwfQ.AJfJEnm50nl915BNURD9ecPpXwd1G_kup25rKE0-Muk"
    }
  }
}
```