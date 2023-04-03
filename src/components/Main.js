import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { typeGame, shuffleTiles } from '../reducers/actions';
import { TypePuzzle_Click, TypePuzzle_Move } from '../constants';
import Puzzle from './Puzzle';
import RestartBlock from './RestartBlock';
import FullImage from './fullImage/FullImage';
import GameComplete from './gameComplete/GameComplete';

const Main = (props) =>
    <div className='main'>
        <Header/>
        <GameComplete/>
        {!props.typePuzzle ?
            <div className="buttons-wrapper">
                <button
                    className="buttons-wrapper__button"
                    onClick={() => props.changedPuzzle(TypePuzzle_Click)}>
                    Easy
                </button>
                <button
                    className="buttons-wrapper__button"
                    onClick={() => props.changedPuzzle(TypePuzzle_Move)}>
                    Standard
                </button>
            </div>
            :
            <>
                <Puzzle typePuzzle={props.typePuzzle}/>
                <RestartBlock typePuzzle={props.typePuzzle}/>
                {props.typePuzzle === 'move' && <FullImage/>}
            </>
        }
        {props.gameName ? <Footer gameName={props.gameName}/> : ''}
    </div>


Main.propTypes = {
    gameName: PropTypes.string,
    typePuzzle: PropTypes.string,
    changedPuzzle: PropTypes.func,
    gameComplete: PropTypes.bool,
};

const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        typePuzzle: state.typePuzzle,
        gameComplete: state.gameComplete,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changedPuzzle: typePuzzle => {
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
