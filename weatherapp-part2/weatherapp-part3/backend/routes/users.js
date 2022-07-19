var express = require('express')
var router = express.Router()

require('../models/connection')
const fetch = require('node-fetch')
const User = require('../models/users')
const { checkBody } = require('../modules/checkBody')

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['name', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' })
    return
  }
  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      newUser.save().then((newDoc) => {
        res.json({ result: true })
      })
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' })
    }
  })
})

router.post('/signin', (req, res) => {
  console.log('req.body', req.body)
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' })
    return
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      newUser.save().then((userSaved) => {
        res.json({ result: true })
      })
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' })
    }
  })
})

module.exports = router
