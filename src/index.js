import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import tileGame from './reducers/tile-game-reducer'
import { initGame, shuffleTiles } from './reducers/actions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { GameId_4x4, CountImages } from './constants';

// For integration with Redux DevTools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(tileGame, composeEnhancers(
    applyMiddleware()
));

store.dispatch(initGame(GameId_4x4, Math.floor(Math.random() * CountImages) + 1));
store.dispatch(shuffleTiles())
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
