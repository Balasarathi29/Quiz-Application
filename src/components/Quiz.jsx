import React from 'react'
import './Quiz.css'
import {Data} from '../data/Data' 
import { useState } from 'react'
const Quiz = () => {
  const [state, setState] = useState({
    index: 0,
    Question: Data[0],
    lock : false
  })
  const checkAns = (e,ansIndex) => {
    if (state.lock === false){
      if(state.Question.answer === ansIndex + 1){
        e.target.classList.add("correct")
        setState(prev => ({...prev, lock: true}))
      }else{
        e.target.classList.add("incorrect")
        setState(prev => ({...prev, lock: true}))
      }
    }
  }
   const handleSubmit = () => {
    setState(prev => {
      const newIndex = prev.index + 1
      if (newIndex >= Data.length) return prev
      return {
        index: newIndex,
        Question: Data[newIndex],
      }
    }
  )
  }
  return (
    <div className='container'>
        <h1>Quiz Game</h1>
        <hr />
        <h2>{state.index +1} {state.Question.question}</h2>
        <ul>
            {state.Question.options.map((opt, i) =>(
              <li key={i} onClick={(e) =>checkAns(e,i) }>{opt}</li>
            ))}
        </ul>
        <button onClick={handleSubmit}>Next</button>
        <div className='index'>{state.index + 1} of {Data.length} Questions</div>
    </div>
  )
}

export default Quiz