const { ApolloServer } = require('apollo-server');
const mocks = require("./mocks");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { makeExecutableSchema } = require("graphql-tools");
const { MongoClient } = require("mongodb")
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

let db
const server = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(
          'mongodb+srv://ravi:ravimongo123@cluster0.zfcpv.mongodb.net/nepali-pasal?retryWrites=true&w=majority',
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('nepali-pasal') // database name
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e)
      }
    }

    return { db }
  }
});
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default server.createHandler({ path: '/api/graphql' })
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});






// Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://ravi:ravimongo123@cluster0.zfcpv.mongodb.net/nepali-pasal?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db("nepali-pasal");
//     const collection = database.collection("products");

//     // Query for a movie that has the title 'The Room'
//     const query = { name: "Gold Sneakers" };


//     const movie = collection.find()

//     // since this method returns the matched document, not a cursor, print it directly
//     movie.toArray().then(movies => {
//       console.log(movies);

//     })
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);