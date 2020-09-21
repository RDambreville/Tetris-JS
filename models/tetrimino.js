import { TetriminoShapeStore } from './tetrimino-shape-store.js';
export class Tetrimino {

    shapeMatrix;
    rotatedShapeMatrix;
    constructor(shapeIndex) {
        this.shapeMatrix = TetriminoShapeStore[shapeIndex];
        this.rotatedShapeMatrix;
        console.log('shape matrix', this.shapeMatrix);
    }

    rotate() {
        
    }

    translate(direction) {
        
    }
}