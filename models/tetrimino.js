import { TetriminoShapeStore } from './tetrimino-shape-store.js';
export class Tetrimino {

    shapeArray;

    constructor(shapeIndex) {
        this.shapeArray = TetriminoShapeStore[shapeIndex];
    }

    rotate(direction) {

    }

    translate(direction) {
        
    }
}