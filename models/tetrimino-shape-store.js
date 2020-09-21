/**
 * Each tetrimino in the store is a 2D array of bits,
 * where every element is a row containing an array of columns.
 * Values of 1 or 0 at any row-column combination represent
 * populated and empty squares, respectively.
 * The shapes will be drawn in a bottom-up fashion, so the first
 * element in the outermost array represents the bottom row, while
 * the last element in the outermost array represents the top row.
 * Columns will be drawn left-to-right.
 */
export const TetriminoShapeStore = [
    [[1, 1, 1, 1]], // I-shape
    [[1, 1, 1], [1, 0, 0]], // J-shape
    // [[1, 1], [1], [1]], // J-shape
    [[1, 1, 1], [0, 0, 1]], // L-shape
    // [[1], [1], [1, 1]], // L-shape
    [[1, 1], [1, 1]], // O-shape
    [[1, 1, 0], [0, 1, 1]], // Z-shape
    [[1, 1, 1], [0, 1, 0]], // T-shape
    [[0, 1, 1], [1, 1, 0]], // S-shape
]