import React, { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = ({handleClick, text}) => {
  return(
  <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Calculate = ({good, neutral, bad, operation}) => {
  if(operation === "sum")
    return (<div>all {good+ neutral + bad}</div>)

  else if(operation === "average")
    return (<div>average {(good - bad) / (good+ neutral + bad)}</div>)  

  else
    return (<div>positive {(good * 100 /( good + neutral + bad ))} % </div>)  
}
  
const Statistics = ({good, neutral, bad}) => {

  if((good || neutral || bad) === 0)
     return(<>No feedbacks given</>)
  
  
  return(
    <div>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Calculate good={good} neutral={neutral} bad={bad} operation="sum"/>
      <Calculate good={good} neutral={neutral} bad={bad} operation="average"/>
      <Calculate good={good} neutral={neutral} bad={bad} operation="positive"/>
    </div>
    )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {setGood(good + 1)}

  const handleNeutral = () => {setNeutral(neutral + 1)}

  const handleBad = () => {setBad(bad + 1)}

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App