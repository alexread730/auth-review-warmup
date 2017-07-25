const knex = require('./knex.js');


module.exports = {

  findUserByEmail: email => {
    return knex('manager').where('email', email).first();
  },

  addManager: manager => {
    return knex('manager').insert(manager, '*')
          .then(ids => {
              return ids[0];
            });
  }

};
