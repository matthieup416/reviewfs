const db = require('./database/setup') // Do not edit/remove this line

function displayAllArticles() {}

function displayArticleByName(articleName) {
  db.findOne({ name: articleName }).then((data) => {
    console.log('article  : ', data)
  })
}

function displayArticleByID(articleId) {
  db.findById(articleId).then((data) => {
    console.log('article : ', data)
  })
}

function updateArticlePrice(articleId, newPrice) {
  db.updateOne({ _id: articleId }, { price: newPrice }).then(() => {
    console.log(`Update effectué pour ${articleId}`)
  })
}

function updateArticleStock(articleId, newStock) {
  db.updateOne({ _id: articleId }, { stock: newStock }).then(() => {
    console.log(`Le stock a été mis à jour :  ${articleId}`)
  })
}

function resetStocks() {
  db.updateMany({}, { stock: 0 }).then(() => {
    console.log(`les stocks ont été reset `)
  })
}

// Do not edit/remove code under this line
module.exports = {
  displayAllArticles,
  displayArticleByName,
  displayArticleByID,
  updateArticlePrice,
  updateArticleStock,
  resetStocks,
}
