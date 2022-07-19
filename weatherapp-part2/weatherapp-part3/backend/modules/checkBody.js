function checkBody(request, fieldsToCheck) {
  let isValid = true

  fieldsToCheck.forEach((field) => {
    if (!request[field] || request[field] === '') {
      isValid = false
    }
  })

  return isValid
}

module.exports = { checkBody }
