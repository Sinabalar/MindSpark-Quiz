import React from 'react';
import {useQuizContext} from "../context/QuizContext";

const NextBtn = () => {
    const {dispatch, answer, index, numQuestions} = useQuizContext();

    if (answer === null) return;

    if (index < numQuestions - 1) {
        return (
            <button
                className={'btn btn-ui'}
                onClick={() => dispatch({type: 'nextQuestion'})}
            >Next</button>
        );
    }
    if (index === numQuestions - 1) {
        return (
            <button
                className={'btn btn-ui'}
                onClick={() => dispatch({type: 'finished'})}
            >Finished</button>
        )
    }
};

export default NextBtn;
