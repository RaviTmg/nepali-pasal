const casual = require('casual');
const Sequelize = require("sequelize");
const _ = require("lodash")

const db = new Sequelize('product', null, null, {
  dialect: 'sqlite',
  storage: './product.sqlite',
});


const ProductModel = db.define('product', {
  title: { type: Sequelize.STRING },
  price: { type: Sequelize.INTEGER }
});
const ManufacturerModel = db.define('manufacturer', {
  name: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
});
ManufacturerModel.hasMany(ProductModel);
ProductModel.belongsTo(ManufacturerModel);

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return ManufacturerModel.create({
      name: casual.first_name,
      location: casual.address,
    }).then((manufacturer) => {
      return manufacturer.createProduct({
        title: `A product by ${manufacturer.name}`,
        price: casual.integer(from = 100, to = 1000)
      });
    });
  });
});

const Product = db.models.product;
const Manufacturer = db.models.manufacturer;

module.exports = { Product, Manufacturer };