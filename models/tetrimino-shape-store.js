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
    // I Shape
    {
        rotations: [
            [[1, 1, 1, 1]],
            [[1], [1], [1], [1]],
        ],
        color: '#009FDA'
    },

    // J Shape
    {
        rotations: [
            [[1, 1, 1], [1, 0, 0]],
            [[1], [1], [1, 1]],
            [[0, 0, 1], [1, 1, 1]],
            [[1, 1], [0, 1], [0, 1]]
        ],
        color: '#0065BD'
    },

    // L Shape
    {
        rotations: [
            [[1, 1, 1], [0, 0, 1]],
            [[1, 1], [1], [1]],
            [[1], [1, 1, 1]],
            [[0, 1], [0, 1], [1, 1]]

        ],
        color: '#FF7900'
    },

    // O Shape
    {
        rotations: [
            [[1, 1], [1, 1]]
        ],
        color: '#FECB00'
    },

    // Z Shape
    {
        rotations: [
            [[0, 1, 1], [1, 1, 0]],
            [[1, 0], [1, 1], [0, 1]],
        ],
        color: '#ED2939'
    },

    // T Shape
    {
        rotations: [
            [[1, 1, 1], [0, 1, 0]],
            [[1, 0], [1, 1], [1, 0]],
            [[0, 1, 0], [1, 1, 1]],
            [[0, 1], [1, 1], [0, 1]]
        ],
        color: '#952D98'
    },

    // S Shape
    {
        rotations: [
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1], [1, 1], [1, 0]],
        ],
        color: '#69BE28'
    }
]