'use strict'

function login (secret) {
  const hash = sha1(secret)
  const url = hash + '/'
  const alert = document.querySelectorAll("[data-id='alert']")
  const request = new XMLHttpRequest()

  request.open('GET', url, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      window.location = url
    } else {
      parent.location.hash = hash
      alert[0].style.display = 'block'
      password[0].setAttribute('placeholder', 'Incorrect password')
      password[0].value = ''
    }
  }

  request.onerror = function () {
    parent.location.hash = hash
    alert[0].style.display = 'block'
    password[0].setAttribute('placeholder', 'Incorrect password')
    password[0].value = ''
  }

  request.send()
}

$('#loginbutton').on('click', function () {
  login($('#password').val())
})

$('#password').keypress(function (e) {
  if (e.which === 13) {
    login($('#password').val())
  }
})

$('#password').focus()
