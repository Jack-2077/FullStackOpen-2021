import React from 'react'

const Header = ({ content }) =>  <h1>{content}</h1>

const Part = ({parts}) => <p>{parts.name} {parts.exercises} </p>    
    
const Content = ({ parts }) => <div>{parts.map(part => <Part key={part.id} parts={part} />)}</div>
    
const Course = ({course}) => {
    return (
        <>
        <Header key={course.id} content={course.name} />
        <Content parts={course.parts} />
        </>
    )
}

export default Course