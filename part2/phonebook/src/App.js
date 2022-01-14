import React, { useState } from 'react';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const Header = ({ content }) => <h2>{content}</h2>;

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
  const [popup, setPopup] = useState('');

  useState(() => {
    personService
      .getAll()
      .then((intialPersonsList) => setPersons(intialPersonsList));
  }, []);

  const showPopup = (name) => {
    setPopup(`Added ${name}`);
    setTimeout(() => setPopup(''), 5000);
  };
  const addName = () => {
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPersonObject).then((personsList) => {
      setPersons(persons.concat(personsList));
      setNewNumber('');
      setNewName('');
    });
    showPopup(newName);
  };

  const handleReplace = (id, updatedPerson) => {
    const message = `${updatedPerson.name} is already added to phonebook, replace the old number with a new one?`;

    if (window.confirm(message)) {
      personService
        .update(id, updatedPerson)
        .then((response) =>
          setPersons(persons.map((item) => (item.id !== id ? item : response)))
        );
      showPopup(updatedPerson.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatePerson = {};
    if (newName && newNumber) {
      const isPersonExist = persons.some((item) => {
        if (
          item.name.toLowerCase() === newName.toLowerCase() &&
          item.number !== newNumber
        ) {
          updatePerson = { ...item, number: newNumber };
          handleReplace(item.id, updatePerson);
          return true;
        } else {
          return false;
        }
      });

      const isPersonDuplicate = persons.some(
        (item) => item.number === newNumber
      );

      isPersonDuplicate &&
        alert('this person or number is already added to phonebook');

      !isPersonExist && !isPersonDuplicate && addName();
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

  const onDeleteHandler = (id, name) => {
    const message = `Delete ${name} ?`;
    if (window.confirm(message)) {
      personService.deletePerson(id).then((response) => response);
      setPersons(persons.filter((p) => p.id !== id));
    } else return 0;
  };

  return (
    <div>
      <Header content='Phonebook' />
      <Notification message={popup} />
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
        <Persons persons={persons} deleteHandler={onDeleteHandler} />
      ) : (
        filterPersons.name + ' ' + filterPersons.number
      )}
    </div>
  );
};

export default App;
