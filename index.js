const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose').set('debug', true);
const expressjwt = require('express-jwt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://root:password@localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tildb'
})

mongoose.connection.once('open', () => {
    console.log('connected to database tildb');
})

const jwtAuth = expressjwt( {
    secret: 'mossypiglets-and-pangolins',
    //this turns key into token, must explicity declare which algorithm ur using, its like a hashing algorithm
    credentialsRequired: false,
    algorithms: ['HS256']
});

app.use(jwtAuth);

app.use(cors({origin:  "http://localhost:3000"}));



//login resolver stuff
// login (_, { email, password }) {
//     const user = await User.findOne({ where: { email } })
//
//     if (!user) {
//         throw new Error('No user with that email')
//     }
//
//     const valid = await bcrypt.compare(password, user.password)
//
//     if (!valid) {
//         throw new Error('Incorrect password')
//     }
//
//     // return json web token
//     return jsonwebtoken.sign({
//         id: user.id,
//         email: user.email
//     }, 'somesuperdupersecret', { expiresIn: '1y' })
// }




// login (_, { email, password })
// {
//     //does thsi need async await?
//     const user = UserModel.findOne({ where: { email } })
//
//     if (!user) {
//         throw new Error('No user with that email')
//     }
//
//     //await bcrypt??
//     const valid = bcrypt.compare(password, user.password)
//
//     if (!valid) {
//         throw new Error('Incorrect password')
//     }
//
//     // return json web token
//     return jsonwebtoken.sign({
//         id: user.id,
//         email: user.email
//     }, 'mossypiglets-and-pangolins', { expiresIn: '3 hours' })
// }



app.use('/graphql', graphqlHTTP({
    schema: require('./schema.js'),

    graphiql: true
}))

//only user with jwt shoudl be able to access this page
app.use('/user', bodyParser.json(), jwtAuth, graphqlHTTP(req => ({
        schema: require('./schema.js'),
        context: {
            user: req.user
        }
    }))
)

app.use('/api', bodyParser.json(), jwtAuth, graphqlHTTP(req => ({
    schema: require('./schema.js'),
        context: {
            user: req.user
        }
    }))
)

app.listen(4005);
console.log('Running a GraphQL API server at http://localhost:4005/graphql');