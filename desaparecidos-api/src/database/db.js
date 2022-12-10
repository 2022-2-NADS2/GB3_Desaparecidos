import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    timestamps: true,
    underscore: true,
  }
)

async function authenticate() {
  try {
    db.sync({ force: false })
    await db.authenticate()

    console.log('Database working')
  } catch (error) {
    console.log('Problem database: ', error)
  }
}

authenticate()
