
const resolvers = {
  Query: {
    products(_parent, _args, _context, _info) {
      const collection = _context.db.collection('products')
      const allProducts = collection.find()

      // since this method returns the matched document, not a cursor, print it directly
      return allProducts.toArray()
    },
    product(_parent, _args, _context, _info) {
      console.log("product -> _parent, _args, _context, _info", _args)
      return _context.db
        .collection('products')
        .findOne(_args)
        .then((data) => {
          console.log("products -> data", data)
          return data
        })
    }
  },
};

export default resolvers;