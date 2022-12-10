import { UserModel } from '../database/models/userModel.js'
import { hashHelper } from '../helpers/hashHelper.js'
import { tokenHelper } from '../helpers/tokenHelper.js'
import { userValidator } from '../validations/userValidator.js'

class UserController {
  async create(req, res) {
    await userValidator.validate(req.body)

    const { email, username, phone_number, password } = req.body

    const encryptedPassword = await hashHelper.hash(password)

    const user = await UserModel.create({
      email,
      username,
      phone_number,
      password: encryptedPassword,
    })

    const token = tokenHelper.generate(user.id)

    return res.status(201).json({ user, token })
  }

  async authenticate(req, res) {
    const { email, password } = req.body

    const user = await UserModel.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isValidPassword = await hashHelper.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'This password is incorrect' })
    }

    const token = tokenHelper.generate(user.id)

    return res.status(202).json({ user, token })
  }

  async findOne(req, res) {
    const { userId } = req.params

    const user = await UserModel.findOne({
      where: {
        id: userId,
      },
    })

    return user
      ? res.status(202).json(user)
      : res.status(404).json({ message: 'User not found' })
  }

  async update(req, res) {
    const { userId } = req.params

    await UserModel.update(req.body, { where: { id: userId } })

    return res.status(200).send()
  }

  async delete(req, res) {
    const { userId } = req.params

    await UserModel.destroy({ where: { id: userId } })

    return res.status(200).send()
  }
}

export const userController = new UserController()
