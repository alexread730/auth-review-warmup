const knex = require('./knex');

module.exports = {

  getAllEvents() {
    return knex('event');
  },
  getOneEvent(id) {
    return knex('event').where('id', id);
  },
  createEvent(event) {
    return knex('event').insert(event, '*');
  },
  updateEvent(event, id) {
    return knex('event').where('id', id).update({
              title: event.title,
              date: event.date,
              time: event.time,
              manager_id: event.manager_id
    }, "*");
  },
  deleteEvent(id) {
    return knex('event').where('id', id).del();
  }
}
