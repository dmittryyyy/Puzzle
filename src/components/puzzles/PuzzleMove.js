import React from 'react';
import Status from '../Status';
import Puzzle from '../Puzzle';
import RestartBlock from '../RestartBlock';
import PropTypes from 'prop-types';

const PuzzleMove = (props) =>
    <div className='puzzle-move'>
        <Status />
        <Puzzle />
        <RestartBlock typePuzzle={props.typePuzzle}/>
    </div>

PuzzleMove.propTypes = {
    typePuzzle: PropTypes.string
}

export default PuzzleMove;
