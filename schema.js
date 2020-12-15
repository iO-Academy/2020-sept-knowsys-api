const graphql = require('graphql');

const {
    GraphQLSchema,
} = graphql;

// Mongoose Operations
const RootQuery = require('./graphqlOperations/RootQuery');
const Mutation = require('./graphqlOperations/Mutations');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});