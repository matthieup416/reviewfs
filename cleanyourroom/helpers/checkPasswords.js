function checkModeratorPassword(pw) {
  if (pw === 'modpwd123') {
    return true
  } else {
    return false
  }
}

function checkAdminPassword(pw) {
  if (pw === 'adminazerty123') {
    return true
  } else {
    return false
  }
}

module.exports = { checkModeratorPassword, checkAdminPassword }
