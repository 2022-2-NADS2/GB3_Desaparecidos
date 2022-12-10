import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

class HashHelper {
  get SALT_ROUNDS() {
    return Number(process.env.SALT_ROUNDS) || 16
  }

  async hash(value) {
    return bcrypt.hash(value, this.SALT_ROUNDS)
  }

  async compare(value, hash) {
    return bcrypt.compare(value, hash)
  }
}

export const hashHelper = new HashHelper()