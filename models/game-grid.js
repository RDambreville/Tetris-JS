import * as GameConfig from '../config/game-config.js';
import * as DrawService from '../../draw.js';
import { Tetrimino } from './tetrimino.js';


export class GameGrid {

    grid = [];
    numberOfRows;
    numberOfColumns;
    currentTetrimino;

    constructor() {
        DrawService.setupCanvas(GameConfig.canvasHeight, GameConfig.canvasWidth, GameConfig.getIsDarkMode());
        DrawService.clearCanvas();
        this.numberOfRows = Math.floor(DrawService.getCanvasHeight() / GameConfig.cellSquareSize);
        this.numberOfColumns = Math.floor(DrawService.getCanvasWidth() / GameConfig.cellSquareSize);
        this.clearGridData();
        console.log('empty grid', this.grid);
    }

    clearGridData() {
        this.grid = [];
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.grid.push([]);
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                this.grid[rowIndex].push(0);
            }
        }
    }

    createNewTetrimino(shapeIndex) {
        // const randomShapeIndex = Math.ceil(Math.random() * (6 - 0));
        const randomShapeIndex = shapeIndex;
        this.currentTetrimino = new Tetrimino(randomShapeIndex);
        console.log('new tetrimino', this.currentTetrimino);
    }

    drawTetrimino() {
        DrawService.clearCanvas();
        this.clearGridData();
        this.updateGridData();
        this.drawGrid();
    }

    updateGridData() {
        // const middleRowIndex = Math.floor(this.grid.length / 2);
        // const middleColumnIndex = Math.floor(this.grid[0].length / 2);
        if (this.currentTetrimino) {
            const numberOfRows = this.currentTetrimino.rotatedShapeMatrix.length;
            for (let rowIndex = numberOfRows - 1; rowIndex >= 0; rowIndex--) {
                // const horizShapeCenter = Math.ceil(row.length / 2);
                const numberOfColumns = this.currentTetrimino.rotatedShapeMatrix[rowIndex].length;
                for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                    // this.grid[middleRowIndex + rowIndex][middleColumnIndex + columnIndex] = columnValue;
                    this.grid[5 - rowIndex][5 + columnIndex] =
                        this.currentTetrimino.rotatedShapeMatrix[rowIndex][columnIndex];
                }
            };
            console.log('grid after update', this.grid);
        }
    }

    drawGrid() {
        DrawService.setFillColor('green');
        const initialHorizontalOffset = 5 * GameConfig.cellSquareSize;
        let horizontalOffset = 5 * GameConfig.cellSquareSize;
        let verticalOffset = this.numberOfRows * GameConfig.cellSquareSize;

        // Draw from the bottom up
        for (let rowIndex = this.numberOfRows - 1; rowIndex >= 0; rowIndex--) {
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
                // Move the "paintbrush" forward to the right by however
                // many columns it takes to find a filled square
                horizontalOffset = this.grid[rowIndex][columnIndex + 1] ? (columnIndex + 1) * GameConfig.cellSquareSize : initialHorizontalOffset;
            }

            verticalOffset -= GameConfig.cellSquareSize; // Move the "paintbrush" upwards by 1 row;
            horizontalOffset = initialHorizontalOffset; // move the "paintbrush" back to the beginning of the line like a carriage return
        };
        this.drawGridLines();
    }

    drawGridLines() {
        // DrawService.setStrokeColor(GameConfig.getIsDarkMode() ? 'lightgray' : 'green');
        // DrawService.setupCanvas(GameConfig.canvasHeight, GameConfig.canvasWidth, GameConfig.getIsDarkMode());
        // clearScreen();
        const numberOfRows =
            Math.floor(DrawService.getCanvasHeight() / GameConfig.cellSquareSize);
        const numberOfColumns =
            Math.floor(DrawService.getCanvasWidth() / GameConfig.cellSquareSize);
        let heightInterval = GameConfig.cellSquareSize;
        let widthInterval = GameConfig.cellSquareSize;
        // Draw horizontal grid lines
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            DrawService.drawLine(
                DrawService.getMinHorizontalPosition(), // xStart
                heightInterval, // yStart
                DrawService.getMaxHorizontalPosition(), // xEnd
                heightInterval // yEnd
            );
            heightInterval += GameConfig.cellSquareSize;
        }

        // Draw verttical grid lines
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            DrawService.drawLine(
                widthInterval, // xStart
                DrawService.getMinVerticalPosition(), // yStart
                widthInterval, // xEnd
                DrawService.getMaxVerticalPosition() // yEnd
            );
            widthInterval += GameConfig.cellSquareSize;
        }


        // DrawService.drawGrid();
    }

    handleMovement(userInput) {
        switch (userInput) {
            case 'up': this.currentTetrimino.rotate(); this.drawTetrimino(); break;
            case 'down': break;
            case 'left': break;
            case 'right': break;
            case 'space': break;
            default: return null;
        }
    }

}