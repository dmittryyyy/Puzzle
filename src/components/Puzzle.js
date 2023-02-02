import React from 'react';
import { connect } from 'react-redux';
import TileView from './TileView';
import { selectTile } from '../reducers/actions';
import PropTypes from 'prop-types';
import {
    useWindowSize
} from '@react-hook/window-size/throttled';

const Puzzle = (props) => {
    const [winWidth, winHeight] = useWindowSize();
    const width = Math.max(Math.min(winWidth, winHeight - 258), 200);
    const tileWidth = width / props.size;
    const tileWrapperStyle = {
        width: `${props.size * tileWidth}px`
    }
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${props.size},${tileWidth}px)`
    }

    return (
        <div className='tiles'>
            <div className='tiles-wrapper' style={tileWrapperStyle}>
                <div className='tiles__items' style={tileContainerStyle}>
                    {
                        props.tilesClick.map((tile, i) =>
                            <TileView key={i}
                                id={tile.id}
                                correctPos={tile.id === i}
                                imageNumber={props.imageNumber}
                                onClick={props.onTileClicked}
                                tileWidth={tileWidth}
                                size={props.size}
                                selected={props.selectedId === tile.id}
                                width={width}
                                typePuzzle={props.typePuzzle}
                            />)
                    }
                </div>
            </div>
        </div>
    );
}

Puzzle.propTypes = {
    onTileClicked: PropTypes.func,
    size: PropTypes.number,
    tilesClick: PropTypes.array,
    imageNumber: PropTypes.number,
    selectedId: PropTypes.number,
    typePuzzle: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        size: state.size,
        tilesClick: state.tilesClick,
        imageNumber: state.imageNumber,
        selectedId: state.selectedId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTileClicked: id => {
            dispatch(selectTile(id));
        }
    }
}

const PuzzleView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Puzzle)

export default PuzzleView;
