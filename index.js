const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan('tiny :body'))

let persons = [
    {
        id: 1,
        name: "First name",
        number: "123123123"
    },
    {
        id: 2,
        name: "Second name",
        number: "3213254354"
    },
    {
        id: 3,
        name: "Third name",
        number: "854983934"
    },
    {
        id: 4,
        name: "4th name",
        number: "78658484374"
    }
]

const baseUrl = '/api/persons'

app.get(baseUrl, (req, res) => {
    res.json(persons)
})

app.get(`${baseUrl}/:id`, (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send({ error: "person not found" })
    }
})

app.post(baseUrl, (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ error: "no name in request" })
    } else if (!req.body.number) {
        res.status(400).send({ error: "no number in request" })
    } else if (persons.find(person => person.name === req.body.name)) {
        res.status(403).send({ error: "name is already in phonebook" })
    } else {
        const newPerson = {
            id: Math.floor(10000 * Math.random()),
            name: req.body.name,
            number: req.body.number
        }
        persons = persons.concat(newPerson)
        res.json(newPerson)
    }
})

app.delete(`${baseUrl}/:id`, (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.put(baseUrl, (req, res) => {
    const editedPerson = {
        id: req.body.id,
        name: req.body.name,
        number: req.body.number
    }
    persons = persons.filter(person => person.id !== req.body.id).concat(editedPerson)
})

app.get('/info', (req, res) => {
    res.status(200).send(`<p>${persons.length} persons in phonebook</p><p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Port ${PORT} is being used`)
})