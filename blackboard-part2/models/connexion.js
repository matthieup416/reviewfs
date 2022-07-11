var mongoose = require('mongoose')

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

mongoose.connect(
  'mongodb+srv://test:test@cluster0.orqbr.mongodb.net/blackboard',
  options,
  function (err) {
    console.log(err)
  }
)

module.exports = mongoose
