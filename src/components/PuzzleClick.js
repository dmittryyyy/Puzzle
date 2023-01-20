import React from 'react';
import RestartBlock from './RestartBlock';
import Status from './Status';
import Puzzle from './Puzzle';

const PuzzleMove = () => {

    return (
        <div className='tiles'>
            MOVE
            <Status />
            <Puzzle />
            <RestartBlock />
        </div>
    );
}

export default PuzzleMove;
