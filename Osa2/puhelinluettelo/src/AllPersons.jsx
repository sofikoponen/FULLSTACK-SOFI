import PersonForm from './PersonForm'
import React from 'react'

const AllPersons = ({newFilter, persons, removePerson}) => {

    const list = persons.filter(n => n.name.toLowerCase().includes(newFilter.toLowerCase()))
    const personsMap = persons.map(n => <p key = {n.name} >{n.name} {n.number} <button onClick={() => removePerson(n.id)}>Delete</button></p>)
    const filterListMap = list.map(n => <p key = {n.name} >{n.name} {n.number}<button onClick={() => removePerson(n.id)}>Delete</button></p>)
    
    return (
        <div>
            {(newFilter.length === 0) ? personsMap : filterListMap}
        </div>
    )
}

export default AllPersons

