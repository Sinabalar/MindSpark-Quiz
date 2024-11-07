import React from 'react';
import {useQuizContext} from "../context/QuizContext";

const RestartBtn = () => {
    const {dispatch} = useQuizContext()
    return (
        <button
            className={'btn btn-ui'}
            onClick={() => dispatch({type: 'restart'})}
        >Restart</button>
    );
};

export default RestartBtn;
