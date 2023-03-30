import React from 'react';
import PropTypes from 'prop-types';

function TileView(props) {
    const i = props.id;
    let top;
    let left;
    let style;

    top = -(Math.floor(i / props.size)) * props.tileWidth;
    left = i < props.size ? -i * props.tileWidth : -(i % props.size) * props.tileWidth;

    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;

    style = {
        backgroundPosition: `left ${left}px top ${top}px`,
        backgroundImage: `url('${imPath}')`,
        backgroundSize: `${props.width}px`,
    }

    if (props.correctPos) {
        style = {
            ...style,
            outline: 'none',
            outlineOffset: '0',
        }
    }

    return (
        <>
            {props.id === 0 && props.typePuzzle === 'move' ?
                <div className={'tile hide'}
                     style={style}
                     onClick={() => props.onClick(props.id)}>
                </div>
                :
                <div className={props.selected ? 'tile selected' : 'tile'}
                     style={style}
                     onClick={() => props.onClick(props.id)}
                >
                </div>
            }
        </>
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
