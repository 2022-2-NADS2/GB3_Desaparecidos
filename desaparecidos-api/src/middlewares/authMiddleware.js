import { tokenHelper } from '../helpers/tokenHelper.js'

class AuthMiddleware {
  async execute(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ message: 'Have to be a authorization' })
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
      const data = tokenHelper.verify(token)

      req.user = data

      next()
    } catch (err) {
      return res.status(401).json({ message: 'Have to be a authorization' })
    }
  }
}

export const authMiddleware = new AuthMiddleware()
