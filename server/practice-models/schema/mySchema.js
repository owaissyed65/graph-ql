const { projects, clients } = require("../../sampleData");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const Client = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(Client),
      resolve(parent, args) {
        return [...clients];
      },
    },
    client: {
      type: Client,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return clients.find((e) => e.id === args.id);
      },
    },
  },
});

const ClientSchema = new GraphQLSchema({
  query: RootQuery,
});
module.exports = { ClientSchema, Client };
