const { gql } = require('apollo-server');
const typeDefs = gql`
  type Product {
    id:String!
    name: String
    price: String
    description:String
    thumbnail:String
    images:[String]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    products: [Product]
    product(id:String): Product
  }
`;
module.exports = typeDefs