import React, { useState } from 'react';
import axios from 'axios';

const Header = ({ content }) => <h2>{content}</h2>;

const Name = ({ content, number }) => (
  <li>
    {content} {number}
  </li>
);

const Persons = ({ persons }) =>
  persons.map((item) => (
    <Name key={item.name} content={item.name} number={item.number} />
  ));

const Form = ({ content, value, onChange }) => (
  <div>
    {content} <input value={value} onChange={onChange} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setNewFilterName] = useState('');
  const [filterPersons, setFilterPersons] = useState({ name: '', number: '' });

  useState(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = () => {
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPersonObject));
    setNewNumber('');
    setNewName('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName && newNumber) {
      persons.some((item) => item.name === newName || item.number === newNumber)
        ? alert(`this person or number is already added to phonebook`)
        : addName();
    } else {
      alert('Your name or number is missing');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const searchItem = (input) => {
    const copy = [];
    console.log(input, persons);
    persons.some((item) => {
      if (item.name.toLowerCase() === input)
        setFilterPersons({ name: item.name, number: item.number });
      return 0;
    });
  };

  const handleFilterChange = (event) => {
    setFilterPersons({ name: '', number: '' });
    setNewFilterName(event.target.value);
    const input = event.target.value.trim().toLowerCase();
    input.length > 0 && searchItem(input);
  };

  return (
    <div>
      <Header content='Phonebook' />
      <Form
        content='filter shown with '
        value={filterName}
        onChange={handleFilterChange}
      />
      <Header content='add a new' />
      <form onSubmit={handleSubmit}>
        <Form content='name: ' value={newName} onChange={handleNameChange} />
        <Form
          content='number: '
          value={newNumber}
          onChange={handleNumberChange}
        />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Header content='Numbers' />
      {!filterName ? (
        <Persons persons={persons} />
      ) : (
        filterPersons.name + ' ' + filterPersons.number
      )}
    </div>
  );
};

export default App;
