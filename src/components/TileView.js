import React from 'react';
import PropTypes from 'prop-types';

function TileView(props) {
    const i = props.id;
    const idx = props.id - 1;
    let top;
    let left;
    let style;

    if (props.typePuzzle === 'click') {
        top = -(Math.floor(i / props.size)) * props.tileWidth;
        left = i < props.size ? -i * props.tileWidth : -(i % props.size) * props.tileWidth;
    }

    if (props.typePuzzle === 'move') {
        top = -(Math.floor(idx / props.size)) * props.tileWidth;
        left = idx < props.size ? -idx * props.tileWidth : -(idx % props.size) * props.tileWidth;
    }

    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;

    if (props.id === 0 && props.typePuzzle === 'move') {
        style = {}
    } else {
        style = {
            backgroundPosition: `left ${left}px top ${top}px`,
            backgroundImage: `url('${imPath}')`,
            backgroundSize: props.typePuzzle === 'click' ? `${props.width}px` : '',
        }
    }

    if (props.correctPos) {
        style = {
            ...style,
            outline: 'none',
            outlineOffset: '0',
        }
    }

    return (
        <div className={props.selected ? 'tile selected' : 'tile'}
            style={style}
            onClick={() => props.onClick(props.id)}
        >
        </div>
    );
}

TileView.propTypes = {
    id: PropTypes.number,
    size: PropTypes.number,
    tileWidth: PropTypes.number,
    selected: PropTypes.bool,
    correctPos: PropTypes.bool,
    imageNumber: PropTypes.number,
    onClick: PropTypes.func,
    width: PropTypes.number,
    typePuzzle: PropTypes.string,
};

export default TileView;
