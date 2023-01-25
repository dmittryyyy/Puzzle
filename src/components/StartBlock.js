import React from 'react';
import PropTypes from 'prop-types';
import PuzzleClick from './puzzles/PuzzleClick';
import PuzzleMove from './puzzles/PuzzleMove';

const StartBlock = (props) => {
    if (props.typePuzzle === 'Easy') {
        return <PuzzleClick typePuzzle={props.typePuzzle}/>
    } else if (props.typePuzzle === 'Standard') {
        return <PuzzleMove typePuzzle={props.typePuzzle}/>
    }
}

StartBlock.propTypes = {
    typePuzzle: PropTypes.string,
};

export default StartBlock;
