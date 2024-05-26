require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
app.use(express.static('dist'))
app.use(express.json())
const morgan = require('morgan')
morgan.token('request-body', (req) => Object.values(req.body)[0] ? JSON.stringify(req.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))
const cors = require('cors')
app.use(cors())


app.get('/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
  })


app.get('/info', (request, response, next) => {
  Person.find({}).then(people => {
  response.send(`<p>Phonebook has info for ${people.length} people</p>` + `<p>${new Date()}</p>` )
  })
  .catch(error => next(error))
})


app.post('/persons', (request, response, next) => {
  console.log(request.headers)
  const {name, number} = request.body
  
  if (!name || !number){
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
 }

  const person = new Person({name, number})

  person.save()
  .then(saved => {
    response.json(saved)
  })
  .catch(error => next(error))
})

app.get('/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      console.log('person could not be found')
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/persons/:id', (request, response, next) => {
  const {name, number} = request.body
  const person = {name, number}
  
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
}
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


