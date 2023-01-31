import React from 'react';
import PropTypes from 'prop-types';

const TileViewMove = (props) =>
    <div className='tile'
        style={getStyleForTile(props.id, props.size, props.tileWidth, props.isCorrectPos, props.imageNumber)}
        onClick={() => getStyleForTile(props.id)}
    />;

TileViewMove.propTypes = {
    id: PropTypes.number,
    size: PropTypes.number,
    tileWidth: PropTypes.number,
    isCorrectPos: PropTypes.bool,
    imageNumber: PropTypes.number,
    onClick: PropTypes.func
};

const getStyleForTile = (id, size, tileWidth, isCorrectPos, imageNumber) => {
    // Position a section of a background image in the tile based on the id of the tile
    if (id === 0) {
        // blank tile
        return {};
    }

    const idx = id - 1;
    const top = -(Math.floor(idx / size)) * tileWidth;
    const left = idx < size ? -idx * tileWidth : -(idx % size) * tileWidth;

    const imPath = `${window.location.href}/images/img${imageNumber}.jpg`;
    let style = {
        backgroundPosition: `left ${left}px top ${top}px`,
        backgroundImage: `url('${imPath}')`,
    }

    if (isCorrectPos) {
        // styles of correctly placed tile
        style = {
            ...style,
            outline: '1px solid white',
            outlineOffset: '-10px',
        }
    }

    return style;
}

export default TileViewMove;
