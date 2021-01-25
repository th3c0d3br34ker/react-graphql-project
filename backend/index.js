const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("../graphql/resolvers");
const { MONGODB } = require("./config.js");

const typeDefs = require("../graphql/typesDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
