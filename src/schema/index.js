const graphql = require('graphql')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} = graphql

const baseUrl = process.env.BASE_URL

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        // Users Database
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },

        // Companies Database
        lastName: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
                type: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                if (!args.id) {
                    throw new Error("ID is required");
                }

                if (args.type === "users") {
                    return axios.get(`${baseUrl}/${args.type}/${args.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
                        }
                    })
                        .then(response => response.data)
                        .catch(error => {
                            throw new Error("Error fetching user data", error);
                        });
                } else if (args.type === "companies") {
                    return axios.get(`${baseUrl}/${args.type}/${args.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
                        }
                    })
                        .then(response => response.data)
                        .catch(error => {
                            throw new Error("Error fetching user data", error);
                        });

                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})