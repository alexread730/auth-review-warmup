// Update with your config settings.
const dotenv = require('dotenv').config;

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/events'
  },
    production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
