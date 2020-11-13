require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan('tiny'))
app.use(morgan(':body'))

app.use(cors())

app.use(express.static('build'))

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    switch (error.name) {
        case 'CastError':
            return res.status(400).send({ error })
        case 'ReferenceError':
            return res.status(500).send({ error })
    }

    next(error)
}

app.use(errorHandler)

const Person = require('./models/person')

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

app.post(baseUrl, async (req, res, next) => {

    if (!req.body.name) {
        res.status(400).send({ error: "no name in request" })
        return
    } else if (!req.body.number) {
        res.status(400).send({ error: "no number in request" })
        return
    }
    const persons = await Person.find({})
    if (persons.find(person => person.name === req.body.name)) {
        res.status(403).send({ error: "name is already in phonebook" })
        return
    }
    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })
    try {
        const savedPerson = await newPerson.save()
        res.json(savedPerson)
    } catch (error) {
        next(error)
    }
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Port ${PORT} is being used`)
})