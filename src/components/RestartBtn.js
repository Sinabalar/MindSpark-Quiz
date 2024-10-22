import React from 'react';

const RestartBtn = ({dispatch}) => {
  return (
    <button
        className={'btn btn-ui'}
        onClick={()=>dispatch({type:'restart'})}
    >Restart</button>
  );
};

export default RestartBtn;
