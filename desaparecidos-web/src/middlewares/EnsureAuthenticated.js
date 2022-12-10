const jwt = require('jsonwebtoken')

module.exports = {
  async authMiddleware(req, res, next) {
    const token = req.cookies['@missing/token']

    try {
      jwt.verify(token, "fbf63b48-f456-4378-b019-9cb7c59a3272")

      req.token = token

      return next()
    } catch (error) {
      res.clearCookie('@missing/token')
      res.clearCookie('@missing/userId')

      return res.redirect("/sign-up")
    }
  }
}
