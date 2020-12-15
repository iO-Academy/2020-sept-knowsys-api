const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'A single user',
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: 'ObjectId'
        },
        email: {
            type: GraphQLString,
            description: 'Email of user'
        },
        username: {
            type: GraphQLString,
            description: 'UserName of the User'
        },
        password: {
            type: GraphQLString,
            description: 'Password of user'
        },
        bio: {
            type: GraphQLString,
            description: 'Bio of user'
        }
    })
});