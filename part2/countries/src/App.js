import "./styles.css";
import {useEffect, useState} from "react"
import axios from "axios"


const DisplayCountry = ({countryInfo}) => {
  const info = countryInfo[0]
  return (
    <>
    <h2>{info.name.common}</h2>
    <p>capital {info.capital}</p>
    <p>population {info.population} </p>

    <h3>Languages</h3>
    <ul>
      {Object.values(info.languages).map((item, index) => 
      <li key={index}>{item}</li>)}
      </ul>
      <img src={info.flags["png"]} alt="flag" height="150px" width="150px"/>
    </>
  )
  }

export default function App() {

  
  const [input, setInput] = useState("")
  const [countries, setCountries]  = useState([])

  const onChangeHandler = (e) => {
   setInput(e.target.value);
  }

  useEffect(() => {

    if(input)
    {
    axios
   .get(`https://restcountries.com/v3.1/name/${input}`)
   .then(response => {
     setCountries(response.data)
   }).catch(err => err)}
  }, [input])

  let countriesLength = Array.isArray(countries) ? countries.length : 1;
  return (
  <>
      <p>find countries 
        <input type="text" value={input} onChange={onChangeHandler}/>
        <br />
         {(countries.length > 1 && countries.length <= 10) && 
          countries.map((item, index) => <li style={{listStyle: 'none'}} key={index}>{item.name.common}<br /></li>)} 
          </p>
           {countries.length === 1 && <DisplayCountry countryInfo={countries}/>}
           {(input && countriesLength > 10) && "Too many matches, specify another filter"}
        
       
      
       
      
  </>
  );
}
