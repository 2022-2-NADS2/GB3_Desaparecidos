import { missingPersonModel } from '../database/models/missingPersonModel.js'

import fs from 'fs'
import crypto from 'crypto'
import path from 'path'

class MissingPersonController {
  async create(req, res) {

    const {
      missingPersonName,
      birthDate,
      weight,
      illnesses,
      tattoos,
      sex,
      height,
      eyeColor,
      hairType,
      hairColor,
      skinColor,
      clothing,
      policeReport,
      contacts,
      context,
      address,
      comments,
      profile,
    } = req.body

    let imagePath = ''

    if (profile && profile !== 'data:') {
      const [type, binary] = profile.split(';base64,')

      const fileName = Date.now() + '-' + crypto.randomUUID() + '.' + type.replace('data:image/', '')

      const destination = path.resolve(path.resolve(), 'uploads', fileName)

      fs.writeFile(destination, binary, { encoding: 'base64' }, (error) => {
        console.log(`${fileName} created`)
      })

      imagePath = fileName
    }

    const missingPerson = await missingPersonModel.create({
      missingPersonName,
      birthDate,
      weight,
      illnesses,
      tattoos,
      sex,
      height,
      eyeColor,
      hairType,
      hairColor,
      skinColor,
      clothing,
      policeReport,
      contacts,
      context,
      address,
      comments,
      profilePhoto: imagePath,
      userId: req.user.userId,
    })

    return res.status(201).json({ missingPerson })
  }

  async findAll(req, res) {
    const missingPeople = await missingPersonModel.findAll()

    return missingPeople.length > 0
      ? res.status(200).json(missingPeople)
      : res.status(404).send()
  }

  async findOne(req, res) {
    const { missingPersonId } = req.params

    const missingPerson = await missingPersonModel.findOne({
      where: {
        id: missingPersonId,
      },
    })

    return missingPerson
      ? res.status(202).json(missingPerson)
      : res.status(404).json({ message: 'Person not found' })
  }

  async filter(req, res) {
    const find = await missingPersonModel.findAll({
      where: {
        sex: req.body.sex,
        address: req.body?.address,
        skinColor: req.body.skinColor,
        birthDate: req.body.birthDate,
      },
    })

    return res.status(200).json(find)
  }

  async myMissingPersons(req, res) {
    const { userId } = req.params
    const myPerson = await missingPersonModel.findAll({
      where: {
        userId: userId,
      },
    })

    return res.status(200).json(myPerson)
  }


  async getTheLastSixPeople(req, res) {
    const missingPeople = await missingPersonModel.findAll()

    const lastSix = missingPeople.splice(missingPeople.length - 6)

    return res.status(200).json(lastSix)
  }
}


export const missingPersonController = new MissingPersonController()
