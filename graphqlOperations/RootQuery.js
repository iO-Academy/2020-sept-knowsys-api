const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString
} = graphql;

// GraphQL Types
const UserType = require('../graphqlTypes/UserType');

// Mongoose Models
const UserModel = require('../mongoModels/UserModel');

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            description: 'Retrieve a single User by ID',
            args: {
                id: {
                    type: GraphQLID,
                    description: 'ObjectId'
                }
            },
            resolve(parent, args) {
                return UserModel.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'Retrieve all Users',
            args: {
                username: {
                    type: GraphQLString,
                    description: 'UserName of the required User'
                }
            },
            resolve(parent, args) {
                if (!args.username) {
                    return UserModel.find({});
                }
                return UserModel.find({"username": args.username})
            }
        }
    }
});