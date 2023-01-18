import React from 'react';
import Header from './Header';
import StatusView from './Status';
import PuzzleView from './Puzzle';
import RestartBlock from './RestartBlock';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Main = (props) =>
    <div className='main'>
        <Header gameName={props.gameName}/>
        <StatusView />
        <PuzzleView />
        <RestartBlock />
        <Footer />
    </div>

Main.propTypes = {
    gameName: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        gameName: state.gameName,
    }
}

const MainView = connect(
    mapStateToProps
)(Main)

export default MainView;
