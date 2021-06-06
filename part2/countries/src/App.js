import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = ({ content, value, onChange }) => (
  <form>
    {content} <input value={value} onChange={onChange} />
  </form>
);

const Info = ({ content }) => <p>{content}</p>;

const DisplayCountries = ({ countries }) => {
  return countries.map((country) => {
    return <div key={country.name}>{country.name}</div>;
  });
};

const DisplayInfo = ({ info }) => {
  return (
    <>
      <h2>{info.name}</h2>
      <p>capital {info.capital}</p>
      <p>population {info.population}</p>
      <h3>languages</h3>
      <ul>
        {info.languages.map((lang) => {
          return <li key={lang.name}>{lang.name}</li>;
        })}
      </ul>
      <img src={info.flag} alt="country flag" width="100" height="100" />
    </>
  );
};

const App = () => {
  const [newCountry, setNewCountry] = useState("");

  const [info, setInfo] = useState([]);

  const HandleFormChange = (event) => setNewCountry(event.target.value);

  useEffect(() => {
    if (newCountry) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${newCountry}`)
        .then((response) => {
          const jsonLength = response.data.length;
          jsonLength > 1 ? setInfo(response.data) : setInfo(response.data[0]);
        });
    }
  }, [newCountry]);

  const arrayLength = Array.isArray(info) ? info.length : 1;

  return (
    <>
      <Form
        content="find countries"
        value={newCountry}
        onChange={HandleFormChange}
      />
      {arrayLength > 1 && arrayLength <= 10 && (
        <DisplayCountries countries={info} />
      )}
      {arrayLength === 1 && <DisplayInfo info={info} />}
      {arrayLength > 10 && (
        <Info content="Too many matches, specify another filter" />
      )}
    </>
  );
};

export default App;
