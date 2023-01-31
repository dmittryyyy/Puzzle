import shuffle from 'shuffle-array';
import { isSolvable } from './solvableChecker';

export function generateTileSet(size) {
    let newTilesArray = [];
    for (let i = 0; i < size * size; i++) {
        let newTile = {
            id: i,
            top: -(Math.floor(i / size)) * 100,
            left: i < size ? -i * 100 : -(i % size) * 100,
        };
        newTilesArray.push(newTile);
    }
    return newTilesArray;
}

export function generateTileSetMove(size, doShuffling) {
    let newTilesArray = [];
    for (let i = 0; i < size * size; i++) {
        newTilesArray[i] = i + 1;
    }
    const blankTileIdx = size * size - 1;
    newTilesArray[blankTileIdx] = 0;

    if (doShuffling) {
        let solvable = false;
        while (!solvable) {
            newTilesArray = shuffle(newTilesArray);
            solvable = isSolvable(size, newTilesArray);
        }
    }
    return newTilesArray;
}

export function tileIsValidForMovement(id, size, tiles) {
    if (id < 1 || id > size * size - 1) {
        return false;
    }
    return tileIsMovable(size, id, tiles);
}

export function swapTilesInSetMove(tiles, sourceId, destId) {
    let sourceIdx = tiles.findIndex((t) => t === sourceId);
    let source = tiles[sourceIdx];
    let destIdx = tiles.findIndex((t) => t === destId);
    let dest = tiles[destIdx];
    tiles[destIdx] = source;
    tiles[sourceIdx] = dest;
    return tiles;
}

export function allTilesAreAlignedMove(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== 0 && tiles[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

export function tileIsMovable(size, id, tiles) {
    const idx = tiles.findIndex((t) => t === id);
    const row = Math.floor(idx / size);
    if (row < size - 1) {
        // Check below
        if (tiles[idx + size] === 0) {
            return true;
        }
    }
    if (row > 0) {
        // Check above
        if (tiles[idx - size] === 0) {
            return true;
        }
    }
    const col = idx % size;

    if (col < size - 1) {
        // check to the right
        if (tiles[idx + 1] === 0) {
            return true;
        }
    }
    if (col > 0) {
        // check to the left
        if (tiles[idx - 1] === 0) {
            return true;
        }
    }

    return false;
}

export function reverseTileSet(tiles) {
    return [...tiles].reverse();
}

export function shuffleTileSet(tiles) {
    return shuffle([...tiles]);
}

export function swapTilesInSet(tiles, sourceId, destId) {
    const copy = [...tiles];
    let sourceIdx = copy.findIndex(t => t.id === sourceId);
    let source = copy[sourceIdx];
    let destIdx = copy.findIndex(t => t.id === destId);
    let dest = Object.assign({}, copy[destIdx]);
    copy[destIdx] = source;
    copy[sourceIdx] = dest;
    return copy;
}

export function allTilesAreAligned(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].id !== i) {
            return false;
        }
    }
    return true;
}
