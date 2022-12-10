const express = require("express")
const routes = require("./routes")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const server = express()

server.set('view engine', 'ejs')

console.log(__dirname)

server.set("views", __dirname + "/views/")

server.use("/public", express.static("public"))
server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: false }))

server.use(cookieParser())

server.use(routes)

server.listen(3002, () =>
  console.log("✨ Desaparecidos (WEB) > Running on localhost:3002 ✨")
)