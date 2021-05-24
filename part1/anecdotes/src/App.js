import React, { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Anecdotes = ({text}) => <p>{text}</p>

const Votes = ({text}) => <p>has {text} votes</p>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

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
  let [most, setMost] = useState(0)
  let [anecdote, setAnecdote] = useState()

  const handleAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    checkVote(copy)  
  }

  const checkVote = (props) => {
      for(let i = 0; i < props.length; i++)
      {
        if(props[i] > most)
        {
          most = props[i]
          anecdote = anecdotes[i]
        }
      }
      setAnecdote(anecdote)
      setMost(most)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdotes text={anecdotes[selected]} />
      <Votes text={vote[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleAnecdote} text="next anecdotes" />
      <Header text="Anecdote with most votes" />
      <Anecdotes text={anecdote} />
      <Votes text={most} />
    </div>

  )
}



export default App
