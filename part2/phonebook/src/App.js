import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'abc', number: '123' },
    { name: 'def', number: '456' }
  ]) 

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')
  
  const [ filterName, setNewFilterName ] = useState('')

  const [ filterPersons, setFilterPersons ] = useState([])

  const addName = () => {
    const newNameObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newNameObject))
    setNewNumber('')
    setNewName('')
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      persons.some(item => (item.name === newName) || (item.number === newNumber ))   ? alert(`${newName} is already added to phonebook`) : addName()    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const searchItem = (props) => {
    const copy = []
    persons.some(item => (item.name.toLowerCase() === props) ? (setFilterPersons([]), setFilterPersons(copy.concat({name: item.name, number: item.number}))) : null )
  }


  const handleFilterChange = (event) => {
    setNewFilterName(event.target.value)
    const input = event.target.value.trim().toLowerCase()
    if (input.length > 0)
      searchItem(input)
  }

  const filter = (props) => props.map(item =>  <Name key={item.name} content={item.name} number={item.number} />)

  const Person = () => {
    return ( (!filterName) ? filter(persons) : filter(filterPersons) )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterName} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
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
      <Person />
    </div>
  )
}


export default App