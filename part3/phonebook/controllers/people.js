const peopleRouter = require('express').Router()
const logger = require('../utils/logger')
const Person = require('../models/person')

peopleRouter.get('/api/people', (request, response) => {
  Person.find({}).then((contacts) => {
    response.json(contacts)
  })
})

peopleRouter.post('/api/people', (request, response, next) => {
  const { body } = request
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then((contact) => contact.toJSON())
    .then((savedContact) => {
      response.json(savedContact)
    })
    .catch((error) => next(error))
})

peopleRouter.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
  logger.info(`deleted ${request.params.id}`)
})

peopleRouter.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

peopleRouter.get('/info', (request, response) => {
  Person.find({}).then((contacts) => {
    response.send(
      `<div>
				<p>Phonebook has info for ${contacts.length} people</p>
				<p>${new Date()}</p>
			</div>`
    )
  })
})

peopleRouter.put('/api/people/:id', (request, response, next) => {
  const { body } = request
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

module.exports = peopleRouter
