import React from 'react';

const FinishedScreen = ({points, maxPossiblePoints,highScore}) => {
    const percentage = (points / maxPossiblePoints) * 100;
    let emoji;

    switch (true) {
        case (percentage === 100):
            emoji = '🥇';
            break;
        case (percentage >= 80 && percentage < 100):
            emoji = '🎉';
            break;
        case (percentage >= 50 && percentage < 80):
            emoji = '🤔';
            break;
        case (percentage > 0 && percentage < 50):
            emoji = '🤨';
            break;
        case (percentage === 0):
            emoji = '🤦‍♂️';
            break;
        default:
            emoji = '';
    }

    return (


        <>
            <p className={'result'}>
                {emoji} You scored <strong>{points}</strong> of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className={'highscore'}>(High score: {highScore} points)</p>
        </>
    );
};

export default FinishedScreen;
