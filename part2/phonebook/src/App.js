import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons ] = useState([
    { content: 'Arto Hellas', number: '040-123456'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const addName = () => {
    const newNameObject = {
      content: newName,
      number: newNumber
    }

    setPersons(persons.concat(newNameObject))
    setNewNumber('')
    setNewName('')
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      persons.some(item => (item.content === newName) || (item.number === newNumber ))   ? alert(`${newName} is already added to phonebook`) : addName()    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name =>  <Name key={name.content} content={name.content} number={name.number} /> )}
    </div>
  )
}


export default App