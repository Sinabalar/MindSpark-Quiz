import React from 'react';
import Option from "./Option";

const Question = ({question, answer, dispatch, points}) => {


    return (
        <div>
            <h4>{question.question}</h4>
            <Option
                question={question}
                answer={answer}
                dispatch={dispatch}
                points={points}
            />

        </div>
    );
};

export default Question;
