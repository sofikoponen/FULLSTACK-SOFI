import Filter from './Filter'
import PersonForm from './PersonForm'
import AllPersons from './AllPersons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './persons'
import Notification from './Notification'



const App = () => {

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)

  const addPerson = (event) => {
    console.log('button clicked', event.target)
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }


    const isThere = () => {
      const oldPerson = persons.find(person => person.name == newName)
      if (window.confirm(personObject.name + ' is already added to phonebook, replace the old number with a new one?')) {
        personService
          .update(oldPerson.id, personObject)
          .then(() => {
            setPersons(persons.filter(person => person.id !== oldPerson.id).concat(personObject))
            setMessage(`updated ${oldPerson.name}`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(error => {
            if (!person.name | !person.number) {
              setMessage('Please make sure the name and number are filled in correctly')
              setTimeout(() => setMessage(null), 5000) 
            } else {
              setMessage('Information of person has already been deleted')
              setTimeout(() => setMessage(null), 5000)
            }
          })
      }
    }

  const doesExist = persons.map(n => n.name).includes(newName)
  doesExist 
    ? isThere()
    : personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
        .catch(error => {
          setMessage(`${error.response.data}`)
          setTimeout(() => setMessage(null), 5000)
        })
    
  setNewName('')
  setNewNumber('')
  } 

  const handleNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }
       
  const handleNumberChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const removePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage('Person was deleted from the page')
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setMessage('Information of person has already been deleted');
          setTimeout(() => setMessage(null), 5000)
        });
    }
  }

    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
        <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
        <div>
          <AllPersons newFilter={newFilter} persons={persons} removePerson={removePerson}/>
        </div>
      </div>
    )

}

export default App