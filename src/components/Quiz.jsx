import React from 'react'
import './Quiz.css'
import {Data} from '../data/Data' 
import { useState } from 'react'
const Quiz = () => {
  const [state, setState] = useState({
    index: 0,
    Question: Data[0],
  })
   const next = () => {
    setState(prev => {
      const nextIndex = prev.index + 1
      return {
        index: nextIndex,
        Question: Data[nextIndex]
      }
    })
  }
  return (
    <div className='container'>
        <h1>Quiz Game</h1>
        <hr />
        <h2>{state.index +1} {state.Question.question}</h2>
        <ul>
            {state.Question.options.map((opt, i) =>(
              <li key={i}>{opt}</li>
            ))}
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{state.index + 1} of {Data.length} Questions</div>
    </div>
  )
}

export default Quiz