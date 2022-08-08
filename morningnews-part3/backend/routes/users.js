var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const User = require('../models/users')

const fetch = require('node-fetch');

const NEWS_API_KEY = process.env.NEWS_API_KEY;
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    User.findOne({ username: req.body.username }).then(data => {
      if (data === null) {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
        });
  
        newUser.save().then(newDoc => {
          res.json({ result: true });
        });
      } else {
        // User already exists in database
        res.json({ result: false, error: 'User already exists' });
      }
    });
  });

  router.post('/signin', (req, res) => {
    console.log('req.body', req.body)
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    User.findOne({ username: req.body.username, password: req.body.password }).then(data => {
      if (data) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    });
  });
module.exports = router;
