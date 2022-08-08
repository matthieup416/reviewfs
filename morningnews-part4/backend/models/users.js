const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  canBookmark: Boolean,
  token: {
    type: String,
    default: true,
  },
})

const User = mongoose.model('users', userSchema)

module.exports = User
