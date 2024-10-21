import React from 'react';

const NextBtn = ({children,dispatch, answer}) => {
    if (answer === null) return;
    return (
        <button
            className={'btn btn-ui'}
            onClick={()=>dispatch({type:'nextQuestion'})}
        >{children}</button>
    );
};

export default NextBtn;
