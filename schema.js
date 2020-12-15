const graphql = require('graphql');

const {
    GraphQLSchema,
} = graphql;

// Mongoose Operations
const RootQuery = require('./graphqlOperations/RootQuery');

module.exports = new GraphQLSchema({
    query: RootQuery
});