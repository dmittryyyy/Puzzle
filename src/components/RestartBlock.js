import React from 'react';
import { connect } from 'react-redux'
import { TypePuzzle_Click, TypePuzzle_Move, GameId_4x4, GameId_5x5, GameId_6x6, GameId_7x7, CountImages } from '../constants';
import { initGame, shuffleTiles } from '../reducers/actions';
import PropTypes from 'prop-types';

const RestartBlock = (props) => {
    if (props.typePuzzle) {
        return <div className='buttons-wrapper'>
            <button className='buttons-wrapper__button' onClick={() => props.onInitGame(GameId_4x4, props.typePuzzle === 'click' ? TypePuzzle_Click : TypePuzzle_Move)}>Restart 4x4</button>
            <button className='buttons-wrapper__button' onClick={() => props.onInitGame(GameId_5x5, props.typePuzzle === 'click' ? TypePuzzle_Click : TypePuzzle_Move)}>Restart 5x5</button>
            <button className='buttons-wrapper__button' onClick={() => props.onInitGame(GameId_6x6, props.typePuzzle === 'click' ? TypePuzzle_Click : TypePuzzle_Move)}>Restart 6x6</button>
            <button className='buttons-wrapper__button' onClick={() => props.onInitGame(GameId_7x7, props.typePuzzle === 'click' ? TypePuzzle_Click : TypePuzzle_Move)}>Restart 7x7</button>
        </div>;
    }
}

RestartBlock.propTypes = {
    onInitGame: PropTypes.func,
    typePuzzle: PropTypes.string,
};

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: (gameId, typePuzzle) => {
            dispatch(initGame(gameId, Math.floor(Math.random() * CountImages) + 1, typePuzzle));
            dispatch(shuffleTiles());
        }
    }
}

const RestartBlockView = connect(
    null,
    mapDispatchToProps
)(RestartBlock)

export default RestartBlockView;
