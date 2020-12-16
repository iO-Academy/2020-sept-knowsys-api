const graphql = require('graphql');
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

        loginUser: {
            type: UserType,
            description: 'Login and Retrieve a single User by Username and Password XX',
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
                //does thsi need async await?
                console.log('resolver loginUser');

                //user contains stuff regardless of whether a match is found or not!
                // const user = UserModel.findOne({ where: { "username": args.username } })
                const user = UserModel.findOne({ "username": args.username})
                console.log(user.access_token);
                if (!user) {
                    throw new Error('XX No user with that UN')
                }
                console.log('arg input pwd: ' )
                console.log(args.password)
                console.log(user.password)
                //await bcrypt??
                //need to hash & salt pwd before storing, so that compare  will work!
                // error = new Error('data and hash arguments required')
                // const valid = bcrypt.compare(args.password, user.password)
                const valid = true;

                if (!valid) {
                    throw new Error('Incorrect password')
                }

                // return json web token

                let token = jsonwebtoken.sign({
                    sub: user.id,
                    username: user.username
                },
                    'mossypiglets-and-pangolins',            {
                    expiresIn: '3 hours'
                })
                //token is being printed, but not sure where its returned to?
                console.log(token);
                //return user and token? but response is undefined
                // response.json({access_token: token});

                // let returnedData = {
                //     message: "all good good",
                //     status: 200,
                //     data: {
                //         access_token: token,
                //         user: user
                //     }
                // }
                // return returnedData;
                //can return the user or the token but not both??
                //can add token to user obj and see in console, but not in returned GQL data object
                // user.data.access_token = token;
                user.access_token = token;
                console.log(user);
                return  token;
                // return {access_token: token};
                // return token;
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