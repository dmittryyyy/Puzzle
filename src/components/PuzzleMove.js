import React from 'react';
import RestartBlock from './RestartBlock';
import Status from './Status';
import Puzzle from './Puzzle';

const PuzzleClick = () => {

    return (
        <div className='tiles'>
            CLICK
            <Status />
            <Puzzle />
            <RestartBlock />
        </div>
    );
}

export default PuzzleClick;
