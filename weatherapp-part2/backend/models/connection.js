const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://test:test@cluster0.orqbr.mongodb.net/weatherapp2'

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error))
