import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from '../constants';
import TileViewMove from './TileVieMove';
import PropTypes from 'prop-types';
import { moveTile } from '../reducers/actions';

const PuzzleMove = (props) => {
    const tileWidth = PuzzleWidth / props.size;
    const tileWrapperStyle = {
        width: `${props.size * tileWidth}px`
    }
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${props.size},${tileWidth}px)`
    }

    return (
        <div className='tiles'>
            <div className='tile-wrapper' style={tileWrapperStyle}>
                <div className='tiles__items' style={tileContainerStyle}>
                    {
                        props.tiles.map((t, idx) =>
                            <TileViewMove key={idx}
                                id={t.id}
                                isCorrectPos={t === (idx + 1)}
                                imageNumber={props.imageNumber}
                                onClick={props.onTileClicked}
                                tileWidth={tileWidth}
                                size={props.size}
                            />)
                    }
                </div>
            </div>
        </div>
    );
}

PuzzleMove.propTypes = {
    onTileClicked: PropTypes.func,
    size: PropTypes.number,
    tiles: PropTypes.array,
    imageNumber: PropTypes.number
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tiles: state.tiles,
        size: state.size,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTileClicked: (id) => {
            dispatch(moveTile(id));
        }
    }
}

const PuzzleViewMove = connect(
    mapStateToProps,
    mapDispatchToProps
)(PuzzleMove)

export default PuzzleViewMove;
