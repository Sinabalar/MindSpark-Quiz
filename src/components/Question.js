import React from 'react';
import Option from "./Option";
import {useQuizContext} from "../context/QuizContext";

const Question = () => {
    const {question} = useQuizContext();
    return (
        <div>
            <h4>{question.question}</h4>
            <Option/>

        </div>
    );
};

export default Question;
