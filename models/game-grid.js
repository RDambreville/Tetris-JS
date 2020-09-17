import * as GameConfig from '../config/game-config.js';
import * as DrawService from '../../draw.js';
import { Tetrimino } from './tetrimino.js';


export class GameGrid {

    grid = [];
    numberOfRows;
    numberOfColumns;
    currentTetriminoToDraw;
    constructor() {
        DrawService.setupCanvas(GameConfig.canvasHeight, GameConfig.canvasWidth, GameConfig.getIsDarkMode());
        DrawService.clearCanvas();
        this.numberOfRows = Math.ceil(DrawService.getCanvasHeight() / GameConfig.cellSquareSize);
        this.numberOfColumns = Math.ceil(DrawService.getCanvasWidth() / GameConfig.cellSquareSize);
        this.clearGrid();
        console.log('empty grid', this.grid);
    }

    clearGrid() {
        this.grid = [];
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.grid.push([]);
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                this.grid[rowIndex].push(0);
            }
        }
    }

    drawRandomTetrimino(shapeIndex) {
        // const randomShapeIndex = Math.ceil(Math.random() * (6 - 0));
        const randomShapeIndex = shapeIndex;
        this.currentTetriminoToDraw = new Tetrimino(randomShapeIndex);
        console.log('new tetrimino', this.currentTetriminoToDraw);
        this.updateGrid();
        this.drawGrid();
    }

    updateGrid() {
        // const middleRowIndex = Math.floor(this.grid.length / 2);
        // const middleColumnIndex = Math.floor(this.grid[0].length / 2);
        const numberOfRows = this.currentTetriminoToDraw.shapeArray.length;
        for (let rowIndex = numberOfRows -1; rowIndex >= 0; rowIndex--) {
            // const horizShapeCenter = Math.ceil(row.length / 2);
            const numberOfColumns = this.currentTetriminoToDraw.shapeArray[rowIndex].length;
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                // this.grid[middleRowIndex + rowIndex][middleColumnIndex + columnIndex] = columnValue;
                this.grid[5 - rowIndex][5 + columnIndex] =
                    this.currentTetriminoToDraw.shapeArray[rowIndex][columnIndex];
            }
        };
        console.log('grid after draw', this.grid);
    }

    drawGrid() {
        DrawService.setFillColor('green');
        const initialHorizontalOffset = 5 * GameConfig.cellSquareSize;
        let horizontalOffset = 5 * GameConfig.cellSquareSize;
        let verticalOffset = this.numberOfRows * GameConfig.cellSquareSize;

        // Draw from the bottom of the grid and move upwards
        for (let rowIndex = this.numberOfRows - 1; rowIndex >= 0 ; rowIndex--) {
           for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
               const columnValue = this.grid[rowIndex][columnIndex];
                if (columnValue) {
                    DrawService.drawRectangle(
                        /*columnIndex +*/ horizontalOffset,
                        /*rowIndex +*/ verticalOffset,
                        GameConfig.cellSquareSize,
                        GameConfig.cellSquareSize
                    );
                }
                // Move the "paintbrush" forward to the right by 1 column
                horizontalOffset = this.grid[rowIndex][columnIndex + 1] ? (columnIndex + 1) * GameConfig.cellSquareSize : initialHorizontalOffset;
            }
            // Move the "paintbrush" upwards by 1 row;
            verticalOffset -= GameConfig.cellSquareSize;
            horizontalOffset = initialHorizontalOffset; // move the "paintbrush" back to the beginning of the line like a carriage return
        };
    }

}