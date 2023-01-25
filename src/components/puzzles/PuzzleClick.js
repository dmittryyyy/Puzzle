import React from 'react';
import Status from '../Status';
import Puzzle from '../Puzzle';
import RestartBlock from '../RestartBlock';
import PropTypes from 'prop-types';

const PuzzleClick = (props) =>
    <div className='puzzle-click'>
        <Status />
        <Puzzle />
        <RestartBlock typePuzzle={props.typePuzzle}/>
    </div>

PuzzleClick.propTypes = {
    typePuzzle: PropTypes.string,
}

export default PuzzleClick;
