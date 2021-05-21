import React, { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  const handleClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)  
  }

  return (
    <div>
      {anecdotes[selected]} <div>has {vote[selected]} votes</div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anecdotes</button>
        </div>
    </div>
  )
}

export default App

