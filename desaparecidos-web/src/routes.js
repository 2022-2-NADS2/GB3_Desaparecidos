require('express-async-errors')
const express = require('express')
const routes = express.Router()

const AuthController = require('./controllers/AuthController')
const MissingController = require('./controllers/MissingController')
const EnsureAuthenticated = require('./middlewares/EnsureAuthenticated')
const { upload } = require('./utils/multer')

const views = __dirname + '/views/'

routes.get('/', (request, response) => {
  return MissingController.getSixRecentlyPersons(request, response)
})

routes.get('/missing-register', EnsureAuthenticated.authMiddleware, (request, response) => {
  return response.render(views + 'missing-register')
})
routes.get('/missing-person', (request, response) => response.render('missing-person'))


routes.get('/missing-person/:id', (request, response) => MissingController.getMissingPerson(request, response))


routes.post('/missing-register', upload.single('profile'),
  EnsureAuthenticated.authMiddleware, (request, response) => MissingController.createMissingPerson(request, response))

routes.get('/my-posts', (request, response) => {
  return response.render(views + 'my-posts')
})

routes.get('/search-person', (request, response) => {
  return MissingController.getAllMissingPeople(request, response)
})

routes.get('/sign-in', (request, response) => {
  return response.render(views + 'sign-in')
})

routes.post('/sign-in', (request, response) => AuthController.login(request, response))

routes.get('/sign-up', (request, response) => AuthController.registerView(request, response))

routes.post("/sign-up", (request, response) => AuthController.register(request, response))


module.exports = routes