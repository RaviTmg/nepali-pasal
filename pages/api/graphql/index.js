import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import resolvers from './resolvers';
import typeDefs from './typedefs';
import { MongoClient } from "mongodb"
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
export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: '/api/graphql' });