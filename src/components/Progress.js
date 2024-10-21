import React from 'react';

const Progress = ({index, numQuestions, points, pointsSum,answer}) => {
    return (
        <header className={'progress'}>
            <progress max={numQuestions} value={index+Number(answer!==null)}/>
            <p>Questions <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong>{pointsSum}</p>
        </header>
    );
};

export default Progress;
