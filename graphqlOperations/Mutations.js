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
        addUser: {
            type: UserType,
            description: 'Add a single user ie register a new user',
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
                let newUser = await new UserModel({
                    email: args.email,
                    username: args.username,
                    password: await bcrypt.hash(args.password, 10),
                    bio: args.bio
                })
                newUser.save();

                // console.log(newUser)
                // console.log('about to do token')
                let token = jsonwebtoken.sign({
                        sub: newUser.id,
                        email: newUser.email
                    },
                    'mossypiglets-and-pangolins',{
                        expiresIn: '3 hours'
                    })
                //should we add token to user?
                newUser.access_token = token;
                // console.log('heres token')
                // console.log(token)
                // console.log('after token')
                // console.log(newUser.access_token)
                // console.log('saving new user...')
                return token;
            }
        },

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
                    description: 'password'
                }
            },
            async resolve(parent, args)
            {
                // console.log('resolver loginUserName');
                //user contains stuff regardless of whether a match is found or not!
                const user = await UserModel.findOne({ "username": args.username})
                if (!user) {
                    throw new Error(`Could not find a user with username ${args.username} `)
                }
                // console.log('arg input pwd: ' )
                // console.log(args.password)
                // console.log(user.password)
                const valid = await bcrypt.compare(args.password, user.password)
                if (!valid) {
                    throw new Error('Incorrect password, please try again')
                }
                let token = jsonwebtoken.sign({
                        sub: user.id,
                        email: user.email
                        },
                    'mossypiglets-and-pangolins',{
                        expiresIn: '3 hours'
                    })
                //token is being printed, but not sure where its returned to?
                //can return the user in GQL or the token in console but not both, WHY??
                //and WHERE  does this stuff get returned to, would we see it in the result  of a  FETCH request??
                //can add token to user obj and see in console, but not in returned GQL data object
                user.access_token = token;
                // console.log(user);
                return  user;
            }
        }
    }
});