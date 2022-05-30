const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ""),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
};
