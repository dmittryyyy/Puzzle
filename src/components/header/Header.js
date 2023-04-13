import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import './Header.css';

const Header = (props) => {
    return (
        <header className='header'>
            <h1 className='header__title'>Image Puzzle</h1>
            {props.typePuzzle
                &&
                <div className="header__status">
                    {!props.gameComplete
                        &&
                        <>
                            <div className='header__status-count'>
                                <p className='header__status-text'>Number of steps:</p>
                                <span className="header__status-number">
                                    {props.step}
                                </span>
                            </div>
                            <div className={`header__status-instructions ${props.step > 1 ? 'header__status-instructions--hide' : ''}`}>
                                {props.typePuzzle === 'click' ?
                                    <p>
                                        {
                                            props.step < 1 ?
                                                'Click on the tile that should be moved'
                                                :
                                                'Click on the tile that should swapped with the first selected tile'
                                        }
                                    </p>

                                    :
                                    <p>Select a tile to move it to an empty space</p>
                                }
                            </div>
                        </>
                    }
                </div>}
        </header>
    )
}

Header.propTypes = {
    gameComplete: PropTypes.bool,
    step: PropTypes.number,
    turnNo: PropTypes.number,
    typePuzzle: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        gameComplete: state.gameComplete,
        step: state.step,
        turnNo: state.turnNo,
        typePuzzle: state.typePuzzle,
    }
};

const HeaderView = connect(
    mapStateToProps
)(Header)

export default HeaderView;
