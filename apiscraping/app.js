const fetch = require('node-fetch')
const db = require('./database/setup')
// Do not edit/remove code this line

// Insert your code here

function fetchAndSaveData() {
  fetch('https://www.fruityvice.com/api/fruit/all')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        const newFruit = new db({
          name: data[i].name,
          family: data[i].family,
          carbohydrates: data[i].nutritions.carbohydrates,
          protein: data[i].nutritions.protein,
          fat: data[i].nutritions.fat,
          calories: data[i].nutritions.calories,
          sugar: data[i].nutritions.sugar,
        })
        newFruit.save()
      }
    })
}
