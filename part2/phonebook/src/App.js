import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons ] = useState([
    { content: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const handleSubmit = (event) => {
      event.preventDefault()
      const newNameObject = {
        content: newName,
        date: new Date().toISOString()
      }

      setPersons(persons.concat(newNameObject))
      setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name =>  <Name key={name.content} content={name.content} /> )}
    </div>
  )
}

export default App