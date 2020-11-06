import { TetriminoShapeStore } from './tetrimino-shape-store.js';
export class Tetrimino {

    // shapeIndex;
    shapeMatrix;
    rotatedShapeMatrix = [];
    color;
    rotationIndex = 0;
    horizontalOffset = 0;
    verticalOffset = 0;

    constructor(shapeIndex, startHorizontalOffset) {
        // this.shapeIndex = shapeIndex;
        this.horizontalOffset = startHorizontalOffset;
        this.shapeMatrix = TetriminoShapeStore[shapeIndex];
        this.color = this.shapeMatrix.color;
        this.rotatedShapeMatrix = this.shapeMatrix.rotations[this.rotationIndex];
        console.log('shape matrix', this.shapeMatrix);
    }

    rotate() {
        this.rotationIndex = this.rotationIndex + 1 < this.shapeMatrix.rotations.length ?
            this.rotationIndex + 1 : 0;
        this.rotatedShapeMatrix = this.shapeMatrix.rotations[this.rotationIndex]
    }

    updateHorizontalOffset(offsetToAdd) {
        this.horizontalOffset += offsetToAdd;
    }

    updateVerticalOffset(offsetToAdd) {
        this.verticalOffset += offsetToAdd;
    }
}