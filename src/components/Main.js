import React from 'react';
import PuzzleView from './Puzzle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Main = () =>
    <div className='game'>
        <PuzzleView />
    </div>

Main.propTypes = {
    gameName: PropTypes.string,
    highScoreList: PropTypes.object
};

const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        highScoreList: state.highScoreList
    }
}

const MainView = connect(
    mapStateToProps
)(Main)

export default MainView;
