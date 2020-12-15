const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoClient = require('mongodb').MongoClient;
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const buildSchema = require('graphql');
const url = 'mongodb://root:password@localhost:27017';

//without 'use bodyParser' it wont notice the Body key-value pairs!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//this const can the be added as the 2nd param to any route that u wish to protect
const jwtCheck = expressjwt( {
    secret: 'mossypiglets-and-pangolins',
    //this turns key into token, must explicity declare which algorithm ur using, its like a hashing algorithm
    algorithms: ['HS256']
});

app.use(cors({origin: '*', optionsSuccessStatus: 200}));
app.options('*', cors({origin: '*', optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.post('/login', async (request, response) => {
    const connection = await mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        let db = client.db('tildb');
        let collection = db.collection('learners');
        // console.log(collection);
        // console.log(request.body);
        // console.log(`FISH DORY`);
        if (!request.body.username || !request.body.password) {
            response.send('no username or pwd provided');
        }
        let enduserName = request.body.username;
        console.log(enduserName);
        //find().toArray method is for array, need findOne() for  mongo collection!
        //how to get teh user out of the collecetion?? - both user and u are undefined
         collection.findOne({ "username": enduserName}, function(err, user) {
            // console.log('FISH blah user u:');
            // console.log(user);
             let foundUser = user.username === request.body.username && user.password === request.body.password;
             console.log('RESULT: ');
             console.log(foundUser);

             //stuff about chekcing user has to go here, not outside the }) below, or will be undefined!
             if (!foundUser) {
                 response.send('seriously get lost!');
             }
             let token = jwt.sign( {
                 sub: user.id,
                 username: user.username
             }, 'mossypiglets-and-pangolins', {expiresIn: "3 hours"});
             response.json({access_token: token});
        })
    });
})

app.get('/resource', (request, response) => {
    response.send('Hello this is public');
})

app.get('/resource/secret', jwtCheck, (request, response) => {
    response.send('Hello this is SECRET Learners Page');
})


const port = 3003;
app.listen(port, () => {
    console.log(`JWT w MongoDB User - listening on http://localhost:${port}`)
})

// app.listen(3000);
// console.log('server running!!');