import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import './Status.css';

const Status = props => {
    if (props.gameComplete) {
        return <div className='status'>
            <h2 className='status__title'>GAME COMPLETE!</h2>
            <p>You used turns to put the puzzle together</p>
            <div className='status__count'>{props.step}</div>
        </div>
    } else if (props.step > 2) {
        return <div className='status'>
            <p>Turn:</p>
            <div className='status__count'>{props.step}</div>
        </div>
    } else {
        return <div className='status'>
            <p>Turn:</p>
            <div className='status__count'>{props.step}</div>
            {props.typePuzzle === 'click' ?
                    <div className='status__instructions'>
                {props.step === 0 &&
                    <p>
                        Click on the tile that should be moved
                    </p>
                }
                {props.step === 1 &&
                    <p>
                        Click on the tile that should be swapped with the first selected tile
                    </p>
                }
                    </div>
                : <div className='status__instructions'>
                    {props.step === 0 &&
                        <p>
                            Select a tile to move it to an empty space
                        </p>
                    }
                </div>}
        </div>
    }
}

Status.propTypes = {
    gameComplete: PropTypes.bool,
    step: PropTypes.number,
    turnNo: PropTypes.number,
    typePuzzle: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        gameComplete: state.gameComplete,
        step: state.step,
        turnNo: state.turnNo,
        typePuzzle: state.typePuzzle,
    }
};

const StatusView = connect(
    mapStateToProps
)(Status)

export default StatusView;
