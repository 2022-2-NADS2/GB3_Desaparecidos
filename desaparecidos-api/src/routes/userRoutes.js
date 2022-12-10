import express from 'express'

import { userController } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const userRouter = express.Router()

userRouter.post('/create', (req, res) => userController.create(req, res))

userRouter.post('/auth', (req, res) => userController.authenticate(req, res))

userRouter.get(
  '/:userId',
  (req, res, next) => authMiddleware.execute(req, res, next),
  (req, res) => userController.findOne(req, res)
)

userRouter.put(
  '/:userId',
  (req, res, next) => authMiddleware.execute(req, res, next),
  (req, res) => userController.update(req, res)
)

userRouter.delete(
  '/:userId',
  (req, res, next) => authMiddleware.execute(req, res, next),
  (req, res) => userController.delete(req, res)
)
