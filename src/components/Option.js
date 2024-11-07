import React from 'react';
import {useQuizContext} from "../context/QuizContext";

const Option = () => {
    const {dispatch, answer,question}=useQuizContext()
    const hasAnswered = answer !== null;
    return (
        <div className={'options'}>
            {question.options.map((el, index) => (
                <button
                    key={el}
                    className={`btn btn-option
                    ${answer === index ? 'answer' : ''}
                    ${hasAnswered
                        ? (question.correctOption === index
                            ? 'correct'
                            : 'wrong')
                        : ''}
                        `}
                    onClick={() => dispatch(
                        {type: 'newAnswer', payload: index}
                    )}
                    disabled={hasAnswered}

                >{el}</button>
            ))}
        </div>

    );
};

export default Option;
