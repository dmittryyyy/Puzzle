import { configs } from '../configs';
import {
    INIT_GAME, REVERSE_TILES, MOVE_TILE, SELECT_TILE, SHUFFLE_TILES, TYPE_GAME
} from './actions';
import {
    allTilesAreAligned,
    generateTileSet,
    reverseTileSet,
    shuffleTileSet,
    swapTilesInSet,
    tileIsValidForMovement,
    generateTileSetMove,
    swapTilesInSetMove,
    allTilesAreAlignedMove,
} from './tileset-functions';
import { CountImages } from '../constants';

const initialState = {
    moves: 1,
    numClicksWithinTurn: 0,
    selectedId: undefined,
    gameComplete: false,
    imageNumber: 1,
    tilesClick: [],
    tilesMove: [],
    size: undefined,
    gameId: undefined,
    gameName: undefined,
    typePuzzle: null,
};

const emptyTileId = 0;

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
                    tilesClick: generateTileSet(size),
                    tilesMove: generateTileSetMove(size),
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
                    tilesClick: generateTileSet(size),
                    typePuzzle: action.typePuzzle,
                    tilesMove: generateTileSetMove(size),
                });
        }

        case MOVE_TILE: {
            if (state.gameComplete || !tileIsValidForMovement(action.id, state.size, state.tilesMove)) {
                return state;
            }

            return Object.assign({}, state, {
                moves: state.moves + 1,
                tilesMove: swapTilesInSetMove(state.tilesMove, emptyTileId, action.id),
                gameComplete: allTilesAreAlignedMove(state.tilesMove),
            })
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
                const newTiles = state.tilesClick.map(t => t);
                return Object.assign({}, state, {
                    selectedId: action.id,
                    numClicksWithinTurn: numClicks,
                    gameComplete: false,
                    tilesClick: newTiles
                });
            }

            const newTiles = state.tilesClick.map(t => t);
            if (action.id === state.selectedId) {
                return Object.assign({}, state, {
                    selectedId: undefined,
                    numClicksWithinTurn: 0,
                    tilesClick: newTiles
                });
            }
            const setWithSwappedTiles = swapTilesInSet(newTiles, state.selectedId, action.id);
            const gameComplete = allTilesAreAligned(setWithSwappedTiles);

            return Object.assign({}, state, {
                selectedId: undefined,
                numClicksWithinTurn: 0,
                gameComplete,
                moves: state.moves + 1,
                tilesClick: setWithSwappedTiles
            });
        }

        case SHUFFLE_TILES: {
            const newTiles = shuffleTileSet(state.tilesClick, state.tilesMove);
            return Object.assign({}, state, { tilesClick: newTiles, tilesMove: newTiles });
        }

        case REVERSE_TILES: {
            const newTiles = reverseTileSet(state.tilesClick, state.tilesMove);
            return Object.assign({}, state, { tilesClick: newTiles, tilesMove: newTiles });
        }

        default:
            return state;
    }
}

export default tileGame;
