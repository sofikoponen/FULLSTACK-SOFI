const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


/*const password = process.argv[2]

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}*/

//const url = `mongodb+srv://sofikoponen:${password}@cluster0.aueezgf.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => /^(\d{3}-\d{5,}$)|(\d{2}-\d{6,}$)/.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
  },
    required: true,
},
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)


/*if (process.argv.length >= 4)  {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })
    person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
    })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
    console.log(person.name, person.number)
    mongoose.connection.close()
})
})
}*/


