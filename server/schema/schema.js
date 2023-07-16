const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const Project = require("../mongo-models/Project");
const Client = require("../mongo-models/Client");
// define what query adn what data is achieved
const ClientType = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parents, args) => {
        return Client.findById(parents.clientId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
  },
});
// mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //add clients
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { name, email, phone } = args;
        const client = await Client.create({ name, email, phone });
        return client;
      },
    },
    //delete clients
    deleteClients: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(p, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    // add project
    addProjects: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(p, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation,
});
module.exports = schema;
