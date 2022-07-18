require('../models/connection')
var express = require('express')
var router = express.Router()
const fetch = require('node-fetch')
const City = require('../models/cities')
const API_KEY = 'ac4cbae87c2b27f1977c09043553ca15'

router.post('/weather', (req, res) => {
  console.log(req.body.cityName)
  City.findOne({
    cityName: { $regex: new RegExp(req.body.cityName, 'i') },
  }).then((dbData) => {
    if (dbData === null) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((apiData) => {
          const newCity = new City({
            cityName: req.body.cityName,
            main: apiData.weather[0].main,
            description: apiData.weather[0].description,
            tempMin: apiData.main.temp_min,
            tempMax: apiData.main.temp_max,
          })

          newCity.save().then((newDoc) => {
            res.json({ result: true, weather: newDoc })
          })
        })
    } else {
      res.json({ result: false, error: 'City already saved' })
    }
  })
})

router.get('/weather', (req, res) => {
  City.find().then((data) => {
    if (data) {
      res.json({ result: true, weather: data })
    } else {
      res.json({ result: false })
    }
  })
})

// router.get('/weather/:cityName', (req, res) => {
//   console.log(req.params.cityName)
//   const cities = City.find().then((data) => {
//     console.log(data)
//     const findCity = data.find(
//       (e) => e.cityName.toLowerCase() === req.params.cityName.toLowerCase()
//     )
//     if (findCity) {
//       res.json({ result: true, weather: findCity })
//     } else {
//       res.json({ result: false, error: 'City not found' })
//     }
//   })
// })

router.get('/weather/:cityName', (req, res) => {
  console.log(req.params.cityName)
  const findCity = City.findOne({ cityName: req.params.cityName }).then(
    (data) => {
      console.log('data', data)

      if (data) {
        res.json({ result: true, weather: data })
      } else {
        res.json({ result: false, error: 'City not found' })
      }
    }
  )
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
