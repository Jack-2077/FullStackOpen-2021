import React, { useState } from 'react'

const Header = ({content}) => <h2>{content}</h2>

const Name = (props) => <li>{props.content} {props.number}</li>
  
const Persons = ({props}) =>  props.map(item =>  <Name key={item.name} content={item.name} number={item.number} />) 

const Form = ({content, value, onChange}) => <div>{content} <input value={value} onChange={onChange} /></div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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

  return (
    <div>
      <Header content="Phonebook" />
      <Form content="filter shown with " value={filterName} onChange={handleFilterChange}/>
      <Header content="add a new" />
      <form onSubmit={handleSubmit}>
        <Form content="name: " value={newName} onChange={handleNameChange} />
        <Form content="number: " value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header content="Numbers" />
      { !filterName ? (<Persons props={persons} />) : (<Persons props={filterPersons} />) }
    </div>
  )
}


export default App