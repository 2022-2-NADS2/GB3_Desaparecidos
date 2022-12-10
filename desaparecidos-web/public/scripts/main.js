
const missingRegister = document.getElementById('formRegister')

// FRONT

async function submitForm(event) {
  const formData = new FormData(event.currentTarget)

  const data = {
    ...Object.fromEntries(formData),
    profile: formData.get('profile') ?
      await encodeFileToBase64(formData.get('profile'))
      : ''
  }

  console.log(data)

  await fetch('http://localhost:3002/missing-register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('@missing/token')}`
    },
    body: JSON.stringify({
      ...data,
    }),
  })
}

// AUTH

const cookies = {
  set: (key, value) => {
    document.cookie = `${key}=${value}`
  },
  get: (key) => {
    const cookies = document.cookie.split(';').map((cookie) => {
      const trimmedCookie = cookie.trim()

      const [key, value] = trimmedCookie.split('=')

      return {
        name: key,
        value,
      }
    })

    const cookie = cookies.find(cookie => cookie.name === key)

    if (!cookie) return

    return cookie.value
  },
  remove: (key) => {
    document.cookie = `${key}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
  }
}

function logoutUser() {
  cookies.remove('@missing/userId')
  cookies.remove('@missing/token')

  alert('Você foi deslogado')

  window.location = '/'
}

// UTILS

async function encodeFileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onloadend = (data) => {
      resolve(data.target.result)
    }
    reader.readAsDataURL(file)
  })
}