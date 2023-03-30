import { configs } from '../configs';
import {
    INIT_GAME, REVERSE_TILES, SELECT_TILE, CLICK_TILE, SHUFFLE_TILES, TYPE_GAME
} from './actions';
import {
    allTilesAreAligned,
    generateTileSet,
    reverseTileSet,
    shuffleTileSet,
    swapTilesInSet,
    tileIsValidForMovement,
} from './tileset-functions';
import { CountImages } from '../constants';

const emptyTileId = 0;

const initialState = {
    halfStep: 0,
    step: 0,
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
                    size,
                    typePuzzle: action.typePuzzle,
                    gameId: action.gameId,
                    gameName: configs[0].name,
                    imageNumber: Math.floor(Math.random() * CountImages) + 1,
                    tiles: generateTileSet(size),
                })
        }

        case INIT_GAME: {
            const size = configs[action.gameId].size;
            return Object.assign({}, initialState,
                {
                    size,
                    gameId: action.gameId,
                    gameName: configs[action.gameId].name,
                    imageNumber: action.imageNumber,
                    tiles: generateTileSet(size),
                    typePuzzle: action.typePuzzle,
                });
        }

        case SELECT_TILE: {
            if (state.gameComplete) {
                return Object.assign({}, state, {
                    gameComplete: true,
                });
            }

            if (action.id < 0 || action.id > (state.size * state.size - 1)) {
                return state;
            }

            const numClicks = state.halfStep + 1;
            if (numClicks === 1) {
                const newTiles = state.tiles.map(t => t);
                return Object.assign({}, state, {
                    selectedId: action.id,
                    halfStep: numClicks,
                    tiles: newTiles
                });
            }

            const newTiles = state.tiles.map(t => t);
            if (action.id === state.selectedId) {
                return Object.assign({}, state, {
                    selectedId: undefined,
                    halfStep: 0,
                    tiles: newTiles
                });
            }
            const setWithSwappedTiles = swapTilesInSet(newTiles, state.selectedId, action.id);
            const gameComplete = allTilesAreAligned(setWithSwappedTiles);

            return Object.assign({}, state, {
                selectedId: undefined,
                step: state.step + 1,
                halfStep: 0,
                gameComplete,
                tiles: setWithSwappedTiles
            });
        }

        case CLICK_TILE: {
            if (state.gameComplete || !tileIsValidForMovement(action.id, state.size, state.tiles)) {
                return state;
            }

            const setSwappedTiles = swapTilesInSet(state.tiles, emptyTileId, action.id);
            const gameComplete = allTilesAreAligned(setSwappedTiles);

            return Object.assign({}, state, {
                step: state.step + 1,
                tiles: setSwappedTiles,
                gameComplete,
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
