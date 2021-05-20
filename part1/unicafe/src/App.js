import React, { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>



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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Header text="statistics"/>
       good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {good+ neutral + bad}<br />
      average {(good - bad) / (good+ neutral + bad)}<br />
      positive {(good * 100/( good + neutral + bad ))}%
    </div>
  )
}

export default App