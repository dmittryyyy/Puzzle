import React from 'react';
import { connect } from 'react-redux'
import { TypePuzzle_Click, TypePuzzle_Move, GameId_4x4, GameId_5x5, GameId_6x6, GameId_7x7, CountImages } from '../constants';
import { initGame, shuffleTiles } from '../reducers/actions';
import PropTypes from 'prop-types';

const RestartBlock = (props) => {
    if (props.typePuzzle === 'click') {
        return <div className='restart-block'>
            <button className='button' onClick={() => props.onInitGame(GameId_4x4, TypePuzzle_Click)}>Restart 4x4</button>
            <button className='button' onClick={() => props.onInitGame(GameId_5x5, TypePuzzle_Click)}>Restart 5x5</button>
            <button className='button' onClick={() => props.onInitGame(GameId_6x6, TypePuzzle_Click)}>Restart 6x6</button>
            <button className='button' onClick={() => props.onInitGame(GameId_7x7, TypePuzzle_Click)}>Restart 7x7</button>
        </div>;
    } else {
        return <div className='restart-block'>
            <button className='button' onClick={() => props.onInitGame(GameId_4x4, TypePuzzle_Move)}>Restart 4x4</button>
            <button className='button' onClick={() => props.onInitGame(GameId_5x5, TypePuzzle_Move)}>Restart 5x5</button>
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
