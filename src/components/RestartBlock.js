import React from 'react';
import { connect } from 'react-redux'
import { GameId_4x4, GameId_5x5, GameId_6x6, GameId_7x7, CountImages } from '../constants';
import { initGame, shuffleTiles } from '../reducers/actions';
import PropTypes from 'prop-types';

const RestartBlock = (props) =>
    <div className='restart-block'>
        <button className='button' onClick={() => props.onInitGame(GameId_4x4)}>Restart 4x4</button>
        <button className='button' onClick={() => props.onInitGame(GameId_5x5)}>Restart 5x5</button>
        <button className='button' onClick={() => props.onInitGame(GameId_6x6)}>Restart 6x6</button>
        <button className='button' onClick={() => props.onInitGame(GameId_7x7)}>Restart 7x7</button>
    </div>;

RestartBlock.propTypes = {
    onInitGame: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: gameId => {
            dispatch(initGame(gameId, Math.floor(Math.random() * CountImages) + 1));
            dispatch(shuffleTiles());
        }
    }
}

const RestartBlockView = connect(
    null,
    mapDispatchToProps
)(RestartBlock)

export default RestartBlockView;
