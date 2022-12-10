const fetcher = require("../utils/fetcher")

module.exports = {
  registerView(req, res) {
    return res.render(`sign-up`)
  },
  loginView(req, res) {
    return res.render(`sign-in`)
  },
  async register(req, res) {
    const { email, phone, password, username } = req.body


    const response = await fetcher("/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phone_number: phone,
        password,
        username,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      const { user, token } = data

      res.cookie('@missing/userId', user.id)
      res.cookie('@missing/token', token)

      return res.redirect('/')
    }

    return res.status(response.status).redirect('/')
  },

  async login(req, res) {
    const { email, password } = req.body

    const response = await fetcher("/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      const { user, token } = data

      res.cookie('@missing/userId', user.id)
      res.cookie('@missing/token', token)

      return res.redirect('/')
    }

    return res.status(response.status).redirect('/')
  },
}