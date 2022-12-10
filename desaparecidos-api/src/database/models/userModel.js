import { DataTypes } from 'sequelize'
import { db } from '../db.js'
import { missingPersonModel } from './missingPersonModel.js'

export const UserModel = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

UserModel.hasMany(missingPersonModel, {
  as: 'missingPeople',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
missingPersonModel.belongsTo(UserModel, {
  constraint: true,
  foreignKey: 'userId',
})

UserModel.sync({ force: false })
  .then(() => console.log('users table created'))
  .catch((error) => console.log(error))
