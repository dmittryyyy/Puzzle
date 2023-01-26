import { configs } from '../configs';
import {
    INIT_GAME, REVERSE_TILES, SELECT_TILE, SHUFFLE_TILES, TYPE_GAME
} from './actions';
import {
    allTilesAreAligned,
    generateTileSet,
    reverseTileSet,
    shuffleTileSet,
    swapTilesInSet
} from './tileset-functions';
import { CountImages } from '../constants';

const initialState = {
    turnNo: 1,
    numClicksWithinTurn: 0,
    selectedId: undefined,
    gameComplete: false,
    imageNumber: 1,
    tiles: [],
    size: undefined,
    gameId: undefined,
    gameName: undefined,
    typePuzzle: null,
};

function tileGame(state = initialState, action) {
    switch (action.type) {
        case TYPE_GAME: {
            const size = configs[0].size;
            return Object.assign({}, initialState,
                {
                    typePuzzle: action.typePuzzle,
                    gameId: action.gameId,
                    size,
                    gameName: configs[0].name,
                    imageNumber: Math.floor(Math.random() * CountImages) + 1,
                    tiles: generateTileSet(size),
                })
        }

        case INIT_GAME: {
            const size = configs[action.gameId].size;
            return Object.assign({}, initialState,
                {
                    gameId: action.gameId,
                    size,
                    gameName: configs[action.gameId].name,
                    imageNumber: action.imageNumber,
                    tiles: generateTileSet(size),
                    typePuzzle: action.typePuzzle,
                });
        }

        case SELECT_TILE: {
            if (state.gameComplete) {
                return state;
            }
            if (action.id < 0 || action.id > (state.size * state.size - 1)) {
                return state;
            }
            const numClicks = state.numClicksWithinTurn + 1;
            if (numClicks === 1) {
                const newTiles = state.tiles.map(t => t);
                return Object.assign({}, state, {
                    selectedId: action.id,
                    numClicksWithinTurn: numClicks,
                    gameComplete: false,
                    tiles: newTiles
                });
            }

            const newTiles = state.tiles.map(t => t);
            if (action.id === state.selectedId) {
                return Object.assign({}, state, {
                    selectedId: undefined,
                    numClicksWithinTurn: 0,
                    tiles: newTiles
                });
            }
            const setWithSwappedTiles = swapTilesInSet(newTiles, state.selectedId, action.id);
            const gameComplete = allTilesAreAligned(setWithSwappedTiles);

            return Object.assign({}, state, {
                selectedId: undefined,
                numClicksWithinTurn: 0,
                gameComplete,
                turnNo: state.turnNo + 1,
                tiles: setWithSwappedTiles
            });
        }

        case SHUFFLE_TILES: {
            const newTiles = shuffleTileSet(state.tiles);
            return Object.assign({}, state, { tiles: newTiles });
        }

        case REVERSE_TILES: {
            const newTiles = reverseTileSet(state.tiles);
            return Object.assign({}, state, { tiles: newTiles });
        }

        default:
            return state;
    }
}

export default tileGame;
