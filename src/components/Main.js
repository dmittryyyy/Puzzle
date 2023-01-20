import React from 'react';
import Header from './Header';
import StartBlock from './StartBlock';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Main = (props) => {
    return (
        <div className='main'>
            <Header gameName={props.gameName}/>
            {!props.puzzle ?
                <div className='start-block'>
                    <div className="start-block__buttons">
                        <button className="button">Easy</button>
                        <button className="button">Standard</button>
                    </div>
                </div> : ''
            }
            <StartBlock puzzle={props.puzzle}/>
            <Footer/>
        </div>
    )
}

Main.propTypes = {
    gameName: PropTypes.string,
    puzzle: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        puzzle: state.puzzle,
    }
}

const MainView = connect(
    mapStateToProps
)(Main)

export default MainView;
