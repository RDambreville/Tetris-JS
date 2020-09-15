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
        this.initializeGrid();
        console.log('empty grid', this.grid);
    }

    initializeGrid() {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.grid.push([]);
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                this.grid[rowIndex].push(0);
            }
        }
    }

    drawRandomTetrimino() {
        const randomShapeIndex = Math.ceil(Math.random() * (6 - 0));
        this.currentTetriminoToDraw = new Tetrimino(randomShapeIndex);
        console.log('new tetrimino', this.currentTetriminoToDraw);
        this.updateGrid();
        this.drawGrid();
    }

    updateGrid() {
        const middleRowIndex = Math.floor(this.grid.length / 2);
        const middleColumnIndex = Math.floor(this.grid[0].length / 2);
        // tetriminoRowCount = tetrimino.length;
        this.currentTetriminoToDraw.shapeArray.forEach((row, rowIndex) => {
            // const horizShapeCenter = Math.ceil(row.length / 2);
            row.forEach((columnValue, columnIndex) => {
                // this.grid[middleRowIndex + rowIndex][middleColumnIndex + columnIndex] = columnValue;
                this.grid[5 + rowIndex][5 + columnIndex] = columnValue;

            })
        });
        console.log('grid after draw', this.grid);
    }

    drawGrid() {
        DrawService.setFillColor('green');
        let horizontalOffset = GameConfig.cellSquareSize;
        let verticalOffset = GameConfig.cellSquareSize;
        // let horizontalOffset = 0;
        // let verticalOffset = 0;
        this.grid.forEach((row, rowIndex) => {
            row.forEach((columnValue, columnIndex) => {
                if (columnValue) {
                    DrawService.drawRectangle(
                        /*columnIndex +*/ horizontalOffset,
                        /*rowIndex +*/ verticalOffset,
                        GameConfig.cellSquareSize,
                        GameConfig.cellSquareSize
                        );
                    horizontalOffset += GameConfig.cellSquareSize;
                }
            });
            verticalOffset += GameConfig.cellSquareSize;
        });
    }
}