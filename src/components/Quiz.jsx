import React from "react";
import "./Quiz.css";
import { Data } from "../data/Data";
import { useState, useRef } from "react";

const Quiz = () => {
  const [state, setState] = useState({
    index: 0,
    Question: Data[0],
    lock: false,   
    result: false,
    score: 0,
  });

  let ans1 = useRef(null);
  let ans2 = useRef(null);
  let ans3 = useRef(null);
  let ans4 = useRef(null);

  const optionAns = [ans1, ans2, ans3, ans4];

  const checkAns = (e, ansIndex) => {
    if (state.lock === false) {
      if (state.Question.answer === ansIndex + 1) {
        e.target.classList.add("correct");
        setState((prev) => ({ ...prev, lock: true ,score : prev.score+1}));
      } else {
        e.target.classList.add("incorrect");
        setState((prev) => ({ ...prev, lock: true }));
        optionAns[state.Question.answer - 1].current.classList.add("correct");
      }
    }
  };
  const handleSubmit = () => {
    if (state.lock) {
      optionAns.forEach((opt) => {
          opt.current.classList.remove("correct");
          opt.current.classList.remove("incorrect");
      });
      if (state.index === Data.length - 1) {
        setState((prev) => ({ ...prev, result: true }));
        return;
      }
      setState((prev) => {
        const newIndex = prev.index + 1;
        if (newIndex >= Data.length) return prev;
        return {
          ...prev,
          index: newIndex,
          Question: Data[newIndex],
          lock: false,
        };
      });
    }
  };
  const resetQuiz = () => {
    setState({
      index: 0,
      Question: Data[0],
      lock: false,
      result: false,
      score: 0,
    });
    optionAns.forEach((opt) => {
      if (opt.current) {
        opt.current.classList.remove("correct");
        opt.current.classList.remove("incorrect");
      }
    });
  };
    if (!state.Question) {
    return <div className="container">No questions available.</div>;
  }

  const greetings = (score) => {
    switch (score) {
      case 0: return "Try again!";
      case 1: return "You can do better!";
      case 2: return "Better luck next time!";
      case 3: return "Good job!";
      case 4: return "Great work!";
      case 5: return "Excellent work!";
      default: return "Keep practicing!";
  }
}
  return (
    <div className="container">
      <h1>Quiz Game</h1>
      <hr />
      {state.result ? (
        <>
          <h2>Your Score is {state.score} / {Data.length}</h2>
          <h3>{greetings(state.score)}</h3>
          <button onClick={resetQuiz}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {state.index + 1}, {state.Question.question}
          </h2>
          <ul>
            {state.Question.options.map((opt, i) => (
              <li key={i} onClick={(e) => checkAns(e, i)} ref={optionAns[i]}>
                {opt}
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Next</button>
          <div className="index">
            {state.index + 1} of {Data.length} Questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
