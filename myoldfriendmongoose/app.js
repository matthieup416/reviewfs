require('./models/connection')
const Country = require('./models/countries')
const City = require('./models/cities')

// Create country with name, flag image, currency and population
function createCountry(name, flagImg, currency, population) {
  const newCountry = new Country({
    name: name,
    flagImg: flagImg,
    currency: currency,
    population: population,
  })
  newCountry.save().then((data) => console.log('country saved: ', data))
}

// createCountry('Australia', 'autralia.png', 'AUD', [
//   { populationNbr: 25400000, year: new Date('2015-08-24') },
// ])

// Create city with name, population and country foreign key
function createCity(name, currentPopulation, countryId) {
  const newCity = new City({
    name: name,
    currentPopulation: currentPopulation,
    country: countryId,
  })
  newCity.save().then((data) => console.log('city saved: ', data))
}
// Sample call:
// createCity('Sydney', 5312163, '62cd427bc0b9b01efe915fa1')

// Display country population from country name
function displayCountryPopulation(countryName) {
  Country.findOne({ name: countryName }).then((data) => {
    console.log(data.population[0].populationNbr)
  })
}

// Display country informations from city name (with populate)
function displayCountryFromCityName(cityName) {
  City.findOne({ name: cityName })
    .populate('country')
    .then((data) => {
      console.log(data.country.name)
    })
}

module.exports = {
  createCountry,
  createCity,
  displayCountryPopulation,
  displayCountryFromCityName,
} // Do not edit/remove this line
