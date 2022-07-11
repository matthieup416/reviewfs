const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  inscriptionDate: Date,
})

const User = mongoose.model('users', UserSchema)

module.exports = User
