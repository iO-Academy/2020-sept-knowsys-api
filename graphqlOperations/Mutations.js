const graphql = require('graphql');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = graphql;

// GraphQL Types
const UserType = require('../graphqlTypes/UserType');

// Mongoose Models
const UserModel = require('../mongoModels/UserModel');

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Mutation to Add New User to DB
        addUser: {
            type: UserType,
            description: 'Add a Single User ie Register a New User',
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Email of the user"
                },
                username: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Username of the user"
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Password of the user"
                },
                bio: {
                    type: GraphQLString,
                    description: "Bio of the user"
                }
            },
            async resolve(parent, args) {
                try {
                    //create new user, MongoDB config will prevent users being created with an existing email or username
                    // ToDo - configure MongoDB under Windows to prevent duplicates
                    let newUser = await new UserModel({
                        email: args.email,
                        username: args.username,
                        password: await bcrypt.hash(args.password, 10),
                        bio: args.bio
                    })

                    let validNewUser = await newUser.save( );

                    //  Todo - need to test/force this error message ie what might prevent new user from saving?
                    if (!validNewUser) {
                        throw new Error(`Could not save new user with username ${args.username}`)
                    }

                    // log the new user in and give them a new jwtoken
                    let token = jsonwebtoken.sign({
                            sub: newUser.id,
                            email: newUser.email
                        },
                        'mossypiglets-and-pangolins',{
                            expiresIn: '3 hours'
                        })
                   
                    //return new user here, with token inside
                    newUser.access_token = token;
                    return newUser; 
                }
                catch(err) {
                    return new Error(`Could not add new user with the same username ${args.username} or email address ${args.email}`)
                }
            }
        },

        // Mutation to Log User In by checking for Existing UserName
        loginUserName: {
            type: UserType,
            description: 'Login and Retrieve a single User by Username and Password',
            args: {
                username: {
                    type: GraphQLString,
                    description: 'Username'
                },
                password: {
                    type: GraphQLString,
                    description: 'Password'
                }
            },
            async resolve(parent, args)
            {
                //ToDO - Issue that user variable contains stuff regardless of whether a match is found or not
                //ToDo - Issue that only first user with given username is returned as duplicates are currently allowed in MongoDB under Windows
                const user = await UserModel.findOne({ "username": args.username})
                if (!user) {
                    throw new Error(`Could not find a user with username ${args.username}`)
                }
                const validPassword = await bcrypt.compare(args.password, user.password)
                console.log(`validPassword: ${validPassword}`);
                if (!validPassword) {
                    throw new Error('Incorrect password, please try again')
                }
                //log the existing user in and give them a new jwtoken
                let token = jsonwebtoken.sign({
                        sub: user.id,
                        email: user.email
                        },
                    'mossypiglets-and-pangolins',{
                        expiresIn: '3 hours'
                    })

                user.access_token = token;
                return  user;
            }
        }
    }
});