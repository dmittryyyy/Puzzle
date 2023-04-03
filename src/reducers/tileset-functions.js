import shuffle from 'shuffle-array';

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

export function tileIsValidForMovement(id, size, tiles) {
    if (id < 1 || id > size * size - 1) {
        return false;
    }
    return tileIsMovable(size, id, tiles);
}

export function tileIsMovable(size, id, tiles) {
    const idx = tiles.findIndex((t) => t.id === id);
    const row = Math.floor(idx / size);
    const col = idx % size;
    if (row < size - 1) {
        // Check below
        if (tiles[idx + size].id === 0) {
            return true;
        }
    }
    if (row > 0) {
        // Check above
        if (tiles[idx - size].id === 0) {
            return true;
        }
    }
    if (col < size - 1) {
        // check to the right
        if (tiles[idx + 1].id === 0) {
            return true;
        }
    }
    if (col > 0) {
        // check to the left
        if (tiles[idx - 1].id === 0) {
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
    const emptyTile = document.querySelector('.hide');
    if (emptyTile) {
        emptyTile.classList.remove('hide');
        emptyTile.classList.add('show');
    }
    return true;
}
