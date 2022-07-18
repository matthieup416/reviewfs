require('../models/connection')
var express = require('express')
var router = express.Router()
const fetch = require('node-fetch')
const City = require('../models/cities')
const API_KEY = 'ac4cbae87c2b27f1977c09043553ca15'

router.post('/weather', (req, res) => {
  console.log(req.body.cityName)
  const cities = City.find().then((data) => {
    console.log(data)
    const findCity = data.find(
      (e) => e.cityName.toLowerCase() === req.body.cityName.toLowerCase()
    )
    if (!findCity) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=metric&lang=fr&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          const newCity = new City({
            cityName: data.name,
            main: data.weather[0].main,
            description: data.weather[0].description,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
          })
          newCity.save().then(res.json({ result: true, data: newCity }))
        })
    } else {
      res.json({ result: false, message: 'city already saved' })
    }
  })
})

router.get('/weather', (req, res) => {
  const cities = City.find().then((data) => {
    res.json({ allCities: data })
  })
})

router.get('/weather/:cityName', (req, res) => {
  console.log(req.params.cityName)
  const cities = City.find().then((data) => {
    console.log(data)
    const findCity = data.find(
      (e) => e.cityName.toLowerCase() === req.params.cityName.toLowerCase()
    )
    if (findCity) {
      res.json({ result: true, weather: findCity })
    } else {
      res.json({ result: false, error: 'City not found' })
    }
  })
})

router.delete('/weather/:cityName', (req, res) => {
  console.log(req.params.cityName)
  const cities = City.find().then((data) => {
    console.log(data)
    const findCity = data.find(
      (e) => e.cityName.toLowerCase() === req.params.cityName.toLowerCase()
    )
    console.log('findCity', findCity)
    if (findCity) {
      City.deleteOne({ cityName: findCity.cityName }).then(() =>
        res.json({ result: true })
      )
    } else {
      res.json({ result: false, error: 'City not found' })
    }
  })
})

module.exports = router
