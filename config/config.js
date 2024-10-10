const dotenv = require('dotenv');
const path = require('path');



dotenv.config({ path: path.join(__dirname, '../.env') });


module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  // Set mongoose configuration
  mongoose: {
    url: process.env.MONGODB_URL + (process.env.NODE_ENV === "test" ? "-test" : ""),
    options: {

    },
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};