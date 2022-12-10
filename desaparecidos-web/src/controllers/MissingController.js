const fetcher = require('../utils/fetcher')
const path = require('path')
const FormData = require('form-data')

const views = path.resolve(path.resolve(), 'views')

module.exports = {
  async createMissingPerson(req, res) {
    const dto = req.body

    console.log(req.body)

    const response = await fetcher('/missingPeople/create', {
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${req.token}`
      },
      body: JSON.stringify({ ...dto }),
    })

    console.log(response)

    if (response.ok) {
      return res.redirect("/")
    }

    return res.redirect('/')
  },

  async getMissingPerson(req, res) {
    const { id } = req.params

    const response = await fetcher(`/missingPeople/${id}`)

    const data = await response.json()

    if (response.ok) {
      return res.render(path.resolve(path.resolve(), 'src', 'views', 'missing-person'), {
        person: data
      })
    }

    return res.redirect('/')
  },

  async getSixRecentlyPersons(req, res) {

    const response = await fetcher('/missingPeople/lastSix')

    const data = await response.json()

    if (response.ok) {
      return res.render('landing-page', {
        lastSix: data
      })
    }

    return res.render('landing-page', {
      lastSix: []
    })
  },

  async getAllMissingPeople(req, res) {
    
    const response = await fetcher('/missingPeople/findAll')

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      return res.render('search-person', {
        peopleData: data
      })
    }

    return res.render('search-person', {
      peopleData: []
    })
  }
}