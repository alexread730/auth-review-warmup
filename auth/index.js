const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const query = require('../db/query.js');

function validUser(user) {

  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPass = typeof user.password == 'string' && user.password.trim() != '';
  return validEmail && validPass;
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    query.findUserByEmail(req.body.email)
      .then(manager => {
        if (manager) {
          next(new Error('Email in Use'));
        } else {

          const manager = {
            email: req.body.email
          }

          bcrypt.hash(req.body.password, 8)
          .then((hash) => {
            manager.password = hash;
            query.addManager(manager)
              .then(manager => {
                res.json(manager)
              })
          })

        }
      })
  } else {
    next(new Error('Invalid User'))
  }
});

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    query.findUserByEmail(req.body.email)
      .then(manager => {
        if (manager) {

          bcrypt.compare(req.body.password, manager.password)
            .then(result => {
              if (result) {
                res.json({
                  result,
                  message: manager
                });
              } else {
                next(new Error('Invalid password'));
              }
            });

        } else {
          res.json('You are not admitted!')
        }
      })
  } else {
    next(new Error('Invalid User'))
  }
});

module.exports = router;
