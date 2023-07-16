const { projects, clients } = require("../../sampleData");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const { Client } = require("./mySchema");

const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },

  }),
});
const Query = new GraphQLObjectType({
  name: "ProjectQueryType",
  fields: {
    projectrelation: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return [...clients];
      },
    },
    project: {
      type: ProjectType,
      args: { clientId: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((e) => e.clientId === args.clientId);
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: Query,
});
