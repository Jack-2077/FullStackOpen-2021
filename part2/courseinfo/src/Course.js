import React from 'react'

const Header = ({ content }) =>  <h1>{content}</h1>

const Part = ({parts}) => <p>{parts.name} {parts.exercises} </p>    
    
const Content = ({ parts }) => <div>{parts.map(part => <Part key={part.id} parts={part} />)}</div>

const Total = ({ parts }) => {
     const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
    
const Course = ({course}) => {
    return (
        <>
        <Header key={course.id} content={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course