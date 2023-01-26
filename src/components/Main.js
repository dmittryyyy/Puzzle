import React from 'react';
import Header from './Header';
import StartBlock from './StartBlock';
import Footer from './Footer';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import { typeGame, shuffleTiles } from '../reducers/actions';
import { TypePuzzle_Click, TypePuzzle_Move } from '../constants';

const Main = (props) =>
    <div className='main'>
        <Header gameName={props.gameName}/>
        {!props.typePuzzle ?
            <div className='start-block'>
                <div className="start-block__buttons">
                    <button className="button" onClick={() => props.changedPuzzle(TypePuzzle_Click)}>Easy</button>
                    <button className="button" onClick={() => props.changedPuzzle(TypePuzzle_Move)}>Standard</button>
                </div>
            </div> : ''
        }
        <StartBlock typePuzzle={props.typePuzzle}/>
        <Footer/>
    </div>


Main.propTypes = {
    gameName: PropTypes.string,
    typePuzzle: PropTypes.string,
    changedPuzzle: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        typePuzzle: state.typePuzzle,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changedPuzzle: (typePuzzle) => {
            dispatch(typeGame(typePuzzle));
            dispatch(shuffleTiles());
        }
    }
}

const MainView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default MainView;
