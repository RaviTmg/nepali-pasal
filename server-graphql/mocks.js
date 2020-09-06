const casual = require("casual")
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => casual.title,
};
module.exports = mocks