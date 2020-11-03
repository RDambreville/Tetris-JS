import { TetriminoShapeStore } from './tetrimino-shape-store.js';
export class Tetrimino {

    shapeIndex;
    // horizontalOffsetOfCenter;
    // verticalOffsetOfCenter
    shapeMatrix;
    rotatedShapeMatrix = [];
    color;
    rotationIndex = 0;
    horizontalOffset = 0;
    verticalOffset = 0;

    constructor(shapeIndex, startHorizontalOffset) {
        this.shapeIndex = shapeIndex;
        this.horizontalOffset = startHorizontalOffset;
        this.shapeMatrix = TetriminoShapeStore[shapeIndex];
        this.color = this.shapeMatrix.color;
        this.rotatedShapeMatrix = this.shapeMatrix.rotations[this.rotationIndex];
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

        // this.rotatedShapeMatrix = [];
        // const numberOfRowsBeforeTransform = this.shapeMatrix.length;

        // const newRotatedShapeMatrix = []
        // const numberOfRowsBeforeTransform = this.rotatedShapeMatrix.length;
        // for (let rowIndex = 0; rowIndex < numberOfRowsBeforeTransform; rowIndex++) {
        //     const numberOfColumnsBeforeTransform = this.rotatedShapeMatrix[rowIndex].length;
        //     for (let columnIndex = 0; columnIndex < numberOfColumnsBeforeTransform; columnIndex++) {
        //         newRotatedShapeMatrix.push([this.rotatedShapeMatrix[rowIndex][columnIndex]]);
        //     }
        //     this.rotatedShapeMatrix = newRotatedShapeMatrix;
        //     break;
        // }

        this.rotationIndex = this.rotationIndex + 1 < this.shapeMatrix.rotations.length ?
            this.rotationIndex + 1 : 0;
        this.rotatedShapeMatrix = this.shapeMatrix.rotations[this.rotationIndex]

    }

    translate(direction) {
        
    }

    updateHorizontalOffset(offsetToAdd) {
        this.horizontalOffset += offsetToAdd;
    }

    updateVerticalOffset(offsetToAdd) {
        this.verticalOffset += offsetToAdd;
    }
}