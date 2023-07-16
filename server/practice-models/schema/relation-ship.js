const { projects, clients } = require("../../sampleData");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const { Client } = require("./mySchema");

const RelationTypeQuery = new GraphQLObjectType({
  name: "RelationProject",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: Client,
      resolve: (parent, agrs) => {
        return clients.find((e) => e.id === parent.clientId);
      },
    },
  }),
});
const RelationQuery = new GraphQLObjectType({
  name: "RelationProjectQuery",
  fields: {
    projects: {
      type: new GraphQLList(RelationTypeQuery),
      resolve(parent, args) {
        return [...clients];
      },
    },
    project: {
      type: RelationTypeQuery,
      args: { clientId: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((e) => e.clientId === args.clientId);
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RelationQuery,
});
