var express = require('express')
var router = express.Router()
const { checkAdminPassword } = require('../helpers/checkPasswords')

router.post('/login', (req, res) => {
  checkAdminPassword(req.body.password)
    ? res.json({ result: true })
    : res.json({ result: false, error: 'Invalid password for admin' })
})

router.post('/supersecretaction', (req, res) => {
  checkAdminPassword(req.body.password)
    ? res.json({ result: true })
    : res.json({ result: false, error: 'Invalid password for admin' })
})

module.exports = router
