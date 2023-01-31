import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Status = props => {
    if (props.gameComplete) {
        return <div className='status'>
            <h2 className='status__title'>GAME COMPLETE!</h2>
            <p>You used turns to put the puzzle together</p>
            <div className='status__count'>{props.moves}</div>
        </div>
    } else if (props.moves > 2) {
        return <div className='status'>
            <p>Turn:</p>
            <div className='status__count'>{props.moves - 1}</div>
        </div>
    } else {
        return <div className='status'>
            <p>Turn:</p>
            <div className='status__count'>{props.moves - 1}</div>
            <div className='status__instructions'>
                {props.numClicksWithinTurn === 0 &&
                    <p>
                        Click on the tile that should be moved
                    </p>
                }
                {props.numClicksWithinTurn === 1 &&
                    <p>
                        Click on the tile that should be swapped with the first selected tile
                    </p>
                }
            </div>
        </div>
    }
}

Status.propTypes = {
    gameComplete: PropTypes.bool,
    moves: PropTypes.number,
    numClicksWithinTurn: PropTypes.number,
};

const mapStateToProps = state => {
    return {
        gameComplete: state.gameComplete,
        moves: state.moves,
        numClicksWithinTurn: state.numClicksWithinTurn,
    }
};

const StatusView = connect(
    mapStateToProps
)(Status)

export default StatusView;
