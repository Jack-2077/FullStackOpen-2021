import React from 'react';

const Persons = ({ persons, deleteHandler }) => {
  return persons.map((item) => (
    <li key={item.id}>
      {item.name} {item.number}{' '}
      <button onClick={() => deleteHandler(item.id, item.name)}>delete</button>
    </li>
  ));
};

export default Persons;
