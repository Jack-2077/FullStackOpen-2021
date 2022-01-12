import "./styles.css";
import {useEffect, useState} from "react"
import axios from "axios"


const DisplayCountry = ({countryInfo}) => {
  const [weather, setWeather] = useState({temp: "", png: "", wind: "", dir: ""})
  const info = Array.isArray(countryInfo) ? countryInfo[0] : countryInfo

  axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_YOUR_API_KEY_NAME}&q=${info.capital}&aqi=no`)
  .then(response => {
    setWeather({temp: response.data.current.temp_c, png: response.data.current.condition.icon,
    wind: response.data.current.wind_mph, dir: response.data.current.wind_dir})
  }).catch(error => console.log(error))
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
      <img src={info.flags["png"]} alt="flag" height="100px" width="150px"/>
      <h3>Weather in {info.name.common}</h3>
      <strong>temperature: {weather.temp} Celsius</strong><br />
      <img src={weather.png} alt="country flag" /><br />
      <strong>wind:</strong> {weather.wind} mph direction {weather.dir}
    </>
  )
  }

  const Button = ({country}) => {
    const [onClick, setOnClick] = useState(false)
    return (
      <>
      <button onClick={() => setOnClick(!onClick)}>Show</button>
      {onClick && <DisplayCountry countryInfo={country} />}
      </>
    )
  }

  const DisplayCountryList = ({countriesList}) => {
     return (
      countriesList.map((item, index) => (
      <li style={{listStyle: 'none'}} key={index}>
      {item.name.common}&nbsp;&nbsp;
      <Button country={item}/>
      <br />
      </li>
      )))}
    


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
        <DisplayCountryList countriesList={countries} />}
          </p>
           {countries.length === 1 && <DisplayCountry countryInfo={countries}/>}
           {(input && countriesLength > 10) && "Too many matches, specify another filter"}
        
       
      
       
      
  </>
  );
}
