const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'A single user/learner',
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: 'ObjectId of User'
        },
        email: {
            type: GraphQLString,
            description: 'Email of User'
        },
        username: {
            type: GraphQLString,
            description: 'UserName of the User'
        },
        password: {
            type: GraphQLString,
            description: 'Password of User'
        },
        bio: {
            type: GraphQLString,
            description: 'Bio of User'
        },
        access_token: {
            type: GraphQLString,
            description: 'Access token of the User'
        }
    })
});