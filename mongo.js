const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length < 4) {
  const password = process.argv[2]

  const url = `mongodb+srv://First_user:${password}@cluster0.4i4rg.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(result => {
    result.forEach(person => console.log(person))
    mongoose.connection.close()
  })
} else if (process.argv.length > 4) {
  const password = process.argv[2]

  const name = process.argv[3]

  const number = process.argv[4]

  const url = `mongodb+srv://First_user:${password}@cluster0.4i4rg.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}