import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import resolvers from './resolvers';
import typeDefs from './typedefs';
import { MongoClient } from "mongodb";
require('dotenv').config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbIdentifier = "cluster0.zfcpv.mongodb.net/nepali-pasal"
const dbUri = `mongodb+srv://${dbUser}:${dbPass}@${dbIdentifier}?retryWrites=true&w=majority`
let db;
const server = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(
          dbUri,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('nepali-pasal') // database name
      } catch (e) {
      }
    }

    return { db }
  }
});
export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: '/api/graphql' });