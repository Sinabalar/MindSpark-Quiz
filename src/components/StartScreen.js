import React from 'react';
import {useQuizContext} from "../context/QuizContext";

const StartScreen = () => {
    const {numQuestions,dispatch} = useQuizContext()
  return (
    <div className={'start'}>
      <h2>Welcome to my quiz app ! </h2>
      <h3>{numQuestions} questions are ready to test your coding knowledge</h3>
      <button
          className={'btn btn-ui'}
          onClick={()=>dispatch({type:'start'})}
      >Let's Start</button>
      
    </div>
  );
};

export default StartScreen;
