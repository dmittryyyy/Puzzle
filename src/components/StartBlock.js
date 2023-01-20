import React from 'react';
import PropTypes from "prop-types";

const StartBlock = (props) => {
    if (props.puzzle === 'click') {
        return <div>CLICK</div>
    } else if (props.puzzle === 'move') {
        return <div>MOVE</div>
    } else {
        return '';
    }
}

StartBlock.propTypes = {
    puzzle: PropTypes.string,
};

export default StartBlock;
