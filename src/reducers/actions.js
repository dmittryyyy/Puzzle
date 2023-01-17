export const INIT_GAME = 'INIT_GAME';
export const SHUFFLE_TILES = 'SHUFFLE_TILES';
export const REVERSE_TILES = 'REVERSE_TILES';
export const SELECT_TILE = 'SELECT_TILE';
export const NAME_CHANGED = 'NAME_CHANGED';

export function initGame(gameId, imageNumber) {
    return { type: INIT_GAME, gameId, imageNumber };
}

export function selectTile(id) {
    return { type: SELECT_TILE, id };
}

export function shuffleTiles() {
    return {
        type: SHUFFLE_TILES
    };
}

export function reverseTiles() {
    return {
        type: REVERSE_TILES
    };
}

export function nameChanged(name) {
    return { type: NAME_CHANGED, name };
}
