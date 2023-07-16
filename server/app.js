// all require things
const express = require("express");
const dotenv = require("dotenv");
const connectToMongo = require("./config/connectToMongoDb");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("colors");
dotenv.config({ path: "./.env" });
// all constant and setting and middleware and invoked
const PORT = process.env.PORT || 4000;
const app = express();

connectToMongo(process.env.MONGO_URI);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.MONGO_URI === "development",
  })
);
app.listen(PORT, () => {
  console.log("Listen to the port http://localhost:" + PORT);
});
