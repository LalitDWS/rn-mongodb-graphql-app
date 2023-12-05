const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGOEDB =
  "mongodb://localhost:27017/";
  // "mongodb+srv://Cluster79033:admin@cluster79033.t40eozx.mongodb.net/?retryWrites=true&w=majority";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGOEDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection successful");
    return server.listen({ port: 5001 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
