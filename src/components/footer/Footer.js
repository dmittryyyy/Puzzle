import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

const Footer = (props) =>
    <>
        <footer className='footer'>
            <h2 className='footer__game-type'>{props.gameName}</h2>
        </footer>
    </>;

Footer.propTypes = {
    gameName: PropTypes.string,
};

export default Footer;
