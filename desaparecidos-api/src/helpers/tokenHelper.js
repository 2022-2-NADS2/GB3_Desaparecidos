import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class TokenHelper {
  generate(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
  }

  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

export const tokenHelper = new TokenHelper()
