const express = require('express');
const router = express.Router();

const query = require('../db/event-queries');

router.get('/', function(req, res, next) {
  query
    .getAllEvents()
    .then(events => {
      res.json(events)
    });
});

router.get('/:id', function(req, res, next) {
  query
    .getOneEvent(req.params.id)
    .then(event => {
      res.json(event)
    });
});

router.post('/', function(req, res, next) {
  query
    .createEvent(req.body)
    .then(response => {
      res.json(response)
    });
});

router.put('/:id', function(req, res, next) {
  query
    .updateEvent(req.body, req.params.id)
    .then(response => {
      res.json(response)
    });
});

router.delete('/:id', function(req, res, next) {
  query
    .deleteEvent(req.params.id)
    .then(response => {
      res.json({"message": "Deleted!"})
    });
});

module.exports = router;
