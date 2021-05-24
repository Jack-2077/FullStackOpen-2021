import React from 'react'

const Header = ({ content }) =>  <h1>{content}</h1>

const Part = ({parts}) => <p>{parts.name} {parts.exercises} </p>    
    
const Content = ({ parts }) => <div>{parts.map(part => <Part key={part.id} parts={part} />)}</div>

const Total = ({ parts }) => {
     const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <p key={parts.id}><strong>Total of {sum} exercises</strong></p>
    ) 
  }
    
const Course = ({course}) => {
    return (
        <>
        {course.map((data) => {
            return (
            <div key={data.id}>
            <Header  key={data.id} content={data.name} />
            <Content parts={data.parts} />
            <Total  parts={data.parts} />
            </div>)
            })
        }
            </> 
        )}
            
export default Course