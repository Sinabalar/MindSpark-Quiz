import React from 'react';
import {useQuizContext} from "../context/QuizContext";

const Progress = () => {
    const {index, numQuestions, points, maxPossiblePoints,answer} =useQuizContext();
    return (
        <header className={'progress'}>
            <progress max={numQuestions} value={index+Number(answer!==null)}/>
            <p>Questions <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    );
};

export default Progress;
