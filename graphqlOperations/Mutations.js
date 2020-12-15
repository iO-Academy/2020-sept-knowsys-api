const graphql = require('graphql');

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
            description: 'Add a single user ie register new user',
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Email of the user"
                },
                username: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Userame of the user"
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
            resolve(parent, args) {
                let newUser = new UserModel({
                    email: args.email,
                    username: args.username,
                    password: args.password,
                    bio: args.bio
                })
                //give token here

                console.log(newUser)
                return newUser.save();
            }
        },

        // login: {
        //     login2 (_, { email, password })
        //     {
        //         //does thsi need async await?
        //         const user = UserModel.findOne({ where: { email } })
        //
        //         if (!user) {
        //             throw new Error('No user with that email')
        //         }
        //
        //         //await bcrypt??
        //         const valid = bcrypt.compare(password, user.password)
        //
        //         if (!valid) {
        //             throw new Error('Incorrect password')
        //         }
        //
        //         // return json web token
        //         return jsonwebtoken.sign({
        //             id: user.id,
        //             email: user.email
        //         }, 'mossypiglets-and-pangolins', { expiresIn: '3 hours'         })
        //     }
        // }

    }
});