import { DataTypes } from 'sequelize'
import { db } from '../db.js'

export const missingPersonModel = db.define('missingPerson', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  profilePhoto: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  missingPersonName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  illnesses: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tattoos: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eyeColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hairType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hairColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skinColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clothing: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  policeReport: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contacts: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  context: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

missingPersonModel
  .sync({ force: false })
  .then(() => console.log('missing person table created'))
  .catch((error) => console.log(error))
