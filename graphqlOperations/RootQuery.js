const graphql = require('graphql');
const jsonwebtoken = require('jsonwebtoken');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString
} = graphql;

//This file contains the GraphQL "Resolvers"

// GraphQL Types
const UserType = require('../graphqlTypes/UserType');

// Mongoose Models
const UserModel = require('../mongoModels/UserModel');

module.exports = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Queries fetch data about users',
    fields: {
        // these queries cannot have the same name!
        userid: {
            type: UserType,
            description: 'Retrieve a single User by ID',
            args: {
                id: {
                    type: GraphQLID,
                    description: 'ObjectId'
                }
            },
            async resolve(parent, args) {
                let foundUserByID = await UserModel.findById(args.id)
                if (!foundUserByID) {
                    throw new Error(`Could not find a user with ID ${args.id}`)
                }
                return foundUserByID;
            }
        },

        user: {
            type: UserType,
            description: 'Retrieve a single User by Username',
            args: {
                username: {
                    type: GraphQLString,
                    description: 'Username'
                }
            },
            async resolve(parent, args) {
                let foundUserByUsername = await UserModel.findOne({ "username": args.username})
                if (!foundUserByUsername) {
                    throw new Error(`Could not find a user with username ${args.username}`)
                }
                return foundUserByUsername;
            }
        },

        users: {
            type: new GraphQLList(UserType),
            description: 'Retrieve all Users in DB if no arguments provided, or just the user with the UserName provided',
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