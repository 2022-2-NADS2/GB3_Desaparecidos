import express from 'express'

import { missingPersonController } from '../controllers/missingPersonController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const missingPeopleRouter = express.Router()

missingPeopleRouter.post(
  '/create',
  (req, res, next) => authMiddleware.execute(req, res, next),
  (req, res) => missingPersonController.create(req, res)
)

missingPeopleRouter.get('/findAll', (req, res) =>
  missingPersonController.findAll(req, res)
)

missingPeopleRouter.get('/lastSix', (req, res) => missingPersonController.getTheLastSixPeople(req, res))

missingPeopleRouter.get('/:missingPersonId', (req, res) =>
  missingPersonController.findOne(req, res)
)

missingPeopleRouter.post('/find', (req, res) =>
  missingPersonController.filter(req, res)
)

missingPeopleRouter.get('/myPeople/:userId', (req, res) =>
  missingPersonController.myMissingPersons(req, res)
)

