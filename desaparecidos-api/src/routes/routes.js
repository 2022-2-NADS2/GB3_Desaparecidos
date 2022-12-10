import express from 'express'

import { userRouter } from './userRoutes.js'
import { missingPeopleRouter } from './missingPersonRoutes.js'

export const router = express.Router()

router.use('/users', userRouter)

router.use('/missingPeople', missingPeopleRouter)
