var express = require('express')
var router = express.Router()
const { checkModeratorPassword } = require('../helpers/checkPasswords')
router.post('/login', (req, res) => {
  checkModeratorPassword(req.body.password)
    ? res.json({ result: true })
    : res.json({ result: false, error: 'Invalid password for moderator' })
})

router.post('/secretaction', (req, res) => {
  checkModeratorPassword(req.body.password)
    ? res.json({ result: true })
    : res.json({ result: false, error: 'Invalid password for moderator' })
})
module.exports = router
