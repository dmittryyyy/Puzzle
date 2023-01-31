export const TYPE_GAME = 'TYPE_GAME';
export const INIT_GAME = 'INIT_GAME';
export const SHUFFLE_TILES = 'SHUFFLE_TILES';
export const REVERSE_TILES = 'REVERSE_TILES';
export const SELECT_TILE = 'SELECT_TILE';
export const MOVE_TILE = 'MOVE_TILE';

export function typeGame(typePuzzle) {
    return { type: TYPE_GAME, typePuzzle };
}

export function initGame(gameId, imageNumber, typePuzzle) {
    return { type: INIT_GAME, gameId, imageNumber, typePuzzle };
}

export function selectTile(id) {
    return { type: SELECT_TILE, id };
}

export function shuffleTiles() {
    return {
        type: SHUFFLE_TILES
    };
}

