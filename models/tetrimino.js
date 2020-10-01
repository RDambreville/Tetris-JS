import { TetriminoShapeStore } from './tetrimino-shape-store.js';
export class Tetrimino {

    shapeIndex;
    // horizontalOffsetOfCenter;
    // verticalOffsetOfCenter
    shapeMatrix;
    rotatedShapeMatrix = [];

    constructor(shapeIndex) {
        this.shapeIndex = shapeIndex;
        this.shapeMatrix = TetriminoShapeStore[shapeIndex];
        this.rotatedShapeMatrix = this.shapeMatrix;
        console.log('shape matrix', this.shapeMatrix);
    }

    rotate() {
        // Probe the current shape matrix
        // Turn rows into columns and columns into rows

        // this.shapeMatrix.forEach((row, index) => {
        //     // this.rotatedShapeMatrix.push(...row); // spread the columns and push into the rotated matrix them as rows

        // })
        // if (!this.shapeIndex) { // if dealing with the L-shape
        //     this.rotatedShapeMatrix = 
        // }

        this.rotatedShapeMatrix = [];
        const numberOfRowsBeforeTransform = this.shapeMatrix.length;
        for (let rowIndex = 0; rowIndex < numberOfRowsBeforeTransform; rowIndex++) {
            const numberOfColumnsBeforeTransform = this.shapeMatrix[rowIndex].length;
            for (let columnIndex = 0; columnIndex < numberOfColumnsBeforeTransform; columnIndex++) {
                this.rotatedShapeMatrix.push([this.shapeMatrix[rowIndex][columnIndex]]);
            }
            break;
        }
    }

    translate(direction) {

    }
}