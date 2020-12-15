const graphql = require('graphql');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString
} = graphql;

//Resolvers are in this file!

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
        user: {
            type: UserType,
            description: 'Retrieve a single User by Username',
            args: {
                username: {
                    type: GraphQLString,
                    description: 'Username'
                }
            },
            resolve(parent, args) {
                return UserModel.findOne({ "username": args.username})
            }
        },
        login: {
            type: UserType,
            description: 'Login and Retrieve a single User by Username and Password',
            args: {
                username: {
                    type: GraphQLString,
                    description: 'Username'
                },
                password: {
                    type: GraphQLString,
                    description: 'password'
                }
            },
            resolve(parent, args) {
                let returnedUser = UserModel.findOne({"username": args.username, "password": args.password})
                //maybe compare stuff here - how to chekc if real user is returned?

                let returnedData = [];
                console.log('returnedUser');
                console.log(returnedUser.data);
                if (!returnedUser.data) {
                    console.log('bad shit')
                    returnedData = {
                        message: "FAIL FAIL",
                        status: 500,
                        data: []
                    }
                }
                else {
                    console.log('good shit')
                    returnedData = {
                        message: "all good",
                        status: 200,
                        data: returnedUser
                    }
                }

                return returnedData;
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