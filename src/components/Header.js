import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) =>
    <>
        <header className='header'>
            <h1 className='header__title'>Image Puzzle</h1>
            <h2 className='header__game-type'>{props.gameName}</h2>
        </header>
    </>;

Header.propTypes = {
    gameName: PropTypes.string,
};

export default Header;
