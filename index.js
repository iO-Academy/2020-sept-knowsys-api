const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose').set('debug', true);

mongoose.connect('mongodb://root:password@localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tildb',
    collection: 'learners'
})

mongoose.connection.once('open', () => {
    console.log('connected to database tildb');
})

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: require('./schema.js'),
    graphiql: true
}))

app.listen(4005);
console.log('Running a GraphQL API server at http://localhost:4005/graphql');