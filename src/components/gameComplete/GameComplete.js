import React from 'react';
import PropTypes from 'prop-types';

import './GameCoplete.css';
import {connect} from "react-redux";

const GameComplete = (props) => {
    return (
        <div className={`game-complete ${props.gameComplete ?? 'game-complete--show'}`}>
            <h2 className='game-complete__title'>GAME COMPLETE!</h2>
            <p className='game-complete__text'>You used turns to put the puzzle together</p>
            <div className='game-complete__count'>{props.step}</div>
        </div>
    )
}

GameComplete.propTypes = {
    step: PropTypes.number,
    gameComplete: PropTypes.bool,
}

const mapStateToProps = state => {
    return {
        gameComplete: state.gameComplete,
        step: state.step,
        turnNo: state.turnNo,
        typePuzzle: state.typePuzzle,
    }
};

const GameCompleteView = connect(
    mapStateToProps
)(GameComplete)

export default GameCompleteView;
