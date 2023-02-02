import React from 'react';
import Status from '../Status';
import RestartBlock from '../RestartBlock';
import PropTypes from 'prop-types';
import PuzzleViewMove from '../PuzzleViewMove';
import FullImage from '../FullImage';

const PuzzleMove = (props) =>
    <div className='puzzle-move'>
        <Status />
        <PuzzleViewMove typePuzzle={props.typePuzzle}/>
        <FullImage />
        <RestartBlock typePuzzle={props.typePuzzle}/>
    </div>

PuzzleMove.propTypes = {
    typePuzzle: PropTypes.string
}

export default PuzzleMove;
