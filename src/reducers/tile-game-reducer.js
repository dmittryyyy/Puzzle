import { configs } from '../configs';
import {
    INIT_GAME, NAME_CHANGED, REVERSE_TILES, SELECT_TILE, SHUFFLE_TILES
} from './actions';
import { allTilesAreAligned, generateTileSet, reverseTileSet, shuffleTileSet, swapTilesInSet } from './tileset-functions';

const initialState = {
    turnNo: 1,
    numClicksWithinTurn: 0,
    selectedId: undefined,
    gameComplete: false,
    imageNumber: 1,
    tiles: [],
    size: undefined,
};

function tileGame(state = initialState, action) {
    switch (action.type) {
        case INIT_GAME: {
            const size = configs[action.gameId].size
            return Object.assign({}, initialState,
                {
                    gameId: action.gameId,
                    size,
                    gameName: configs[action.gameId].name,
                    imageNumber: action.imageNumber,
                    tiles: generateTileSet(size),
                    highScoreListId: configs[action.gameId].highscorelistid
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

            if (gameComplete) {
                return Object.assign({}, state, {
                    numClicksWithinTurn: 0,
                    gameComplete,
                    turnNo: state.turnNo + 1,
                    tiles: setWithSwappedTiles,
                });
            }
            return Object.assign({}, state, {
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

        case NAME_CHANGED: {
            return Object.assign({}, state, {
                userName: action.name
            });
        }
        default:
            return state;
    }
}

export default tileGame;
