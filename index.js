require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))

app.use(express.json())

const errorHandler = (error, req, res, next) => {
    const errorName = error.name
    console.log(error.message)
    switch (errorName) {
        case 'CastError':
            return res.status(400).json({ error: error.message })
        case 'ValidationError':
            return res.status(400).json({ error: error.message })
        case 'ReferenceError':
            return res.status(500).json({ error: error.message })
    }
    next(error)
}



morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan('tiny'))
app.use(morgan(':body'))

app.use(cors())

const Person = require('./models/person')
const { response } = require('express')

const baseUrl = '/api/persons'

app.get(baseUrl, (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get(`${baseUrl}/:id`, (req, res, next) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    }).catch(error => next(error))
})

app.post(baseUrl, (req, res, next) => {
    console.log("Post")
    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })
    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson.toJSON())
            console.log("saved")
        })
        .catch(error => {
            next(error)
            console.log("error")
        })
})

app.delete(`${baseUrl}/:id`, (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(person => res.status(204).end())
        .catch(error => next(error))
})

app.put(`${baseUrl}/:id`, (req, res, next) => {
    const id = req.params.id
    const editedPerson = {
        id: id,
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(id, editedPerson)
        .then(person => res.json(person))
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(persons => res.status(200).send(`<p>${persons.length} persons in phonebook</p><p>${new Date()}</p>`))
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Port ${PORT} is being used`)
})