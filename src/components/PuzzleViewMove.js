import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from '../constants';
import TileView from './TileView';
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
                        props.tilesMove.map((tile, i) =>
                            <TileView key={i}
                                id={tile.id}
                                isCorrectPos={tile === (i + 1)}
                                imageNumber={props.imageNumber}
                                onClick={props.onTileClicked}
                                tileWidth={tileWidth}
                                size={props.size}
                                typePuzzle={props.typePuzzle}
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
    tilesMove: PropTypes.array,
    imageNumber: PropTypes.number,
    typePuzzle: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tilesMove: state.tilesMove,
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
