// all require things
const express = require("express");
const dotenv = require("dotenv");
// const { graphqlHTTP } = require("express-graphql");
const connectToMongo = require("./config/connectToMongoDb");
require("colors");
dotenv.config({ path: "./.env" });
// const schema = require("./models/schema/mySchema.js");
// const query = require("./models/schema/projects.js");
// const RelationQuery = require("./models/schema/relation-ship.js");
// all require things end

// all constant and setting and middleware and invoked
const PORT = process.env.PORT || 4000;

const app = express();
connectToMongo(process.env.MONGO_URI) 
// all constant and setting and middleware and invoked end

// practice Purpose for graphQl
// app.use(
//   "/graphiql",
//   graphqlHTTP({
//     schema: schema.ClientSchema,
//     graphiql: process.env.NODE_ENV === "development",
//   })
// );
// app.use(
//     "/relation",
//     graphqlHTTP({
//       schema: RelationQuery,
//       graphiql: process.env.NODE_ENV === "development",
//     })
//   );
// app.use(
//   "/",
//   graphqlHTTP({
//     schema: query,
//     graphiql: process.env.NODE_ENV === "development",
//   })
// );

app.listen(PORT, () => {
  console.log("Listen to the port http://localhost:" + PORT);
});
