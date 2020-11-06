import * as DrawService from '../../draw.js';
import { Tetrimino } from './tetrimino.js';
import { GridCell } from './grid-cell.js'

export class GameGrid {

    grid = [];
    numberOfRows;
    numberOfColumns;
    currentTetrimino;
    cellSquareSize;
    score = 0;

    constructor(_canvasHeight, _canvasWidth, _cellSquareSize, _isDarkMode) {
        DrawService.setupCanvas(_canvasHeight, _canvasWidth, _isDarkMode);
        DrawService.clearCanvas();
        this.cellSquareSize = _cellSquareSize;
        this.numberOfRows = Math.ceil(_canvasHeight / this.cellSquareSize);
        this.numberOfColumns = Math.ceil(_canvasWidth / this.cellSquareSize);
        this.clearGridData();
        console.log('empty grid', this.grid);
    }

    clearGridData() {
        this.grid = [];
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.grid.push([]);
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                this.grid[rowIndex].push(new GridCell(null, 0));
            }
        }
    }

    eraseOldTetriminoTiles() {
        this.currentTetrimino.rotatedShapeMatrix = this.currentTetrimino.rotatedShapeMatrix.map(row => row = row.map(columnValue => columnValue = 0));
        this.updateGridData();
    }

    createNewTetrimino(/*shapeIndex*/) {
        const randomShapeIndex = Math.ceil(Math.random() * (6 - 0));
        // const randomShapeIndex = /* shapeIndex*/ /*0*/;
        this.currentTetrimino = new Tetrimino(randomShapeIndex, Math.floor(this.numberOfColumns / 2));
        console.log('new tetrimino', this.currentTetrimino);
    }

    drawScreen() {
        if (!this.isShapeTouchingLeftWall() && !this.isShapeTouchingRightWall() && !this.isShapeAtRest()) {
            DrawService.clearCanvas();
            // this.clearGridData();
            // this.eraseOldTetriminoTiles(); // Erase old tile data and prepare to draw displaced shape
            // Restore rotated shape and update the grid
            this.currentTetrimino.rotatedShapeMatrix = this.currentTetrimino.shapeMatrix.rotations[this.currentTetrimino.rotationIndex];
            this.updateGridData();
            // this.updateGridData();
            this.drawShapeBlocks();
            this.drawGridLines();
        } else if (this.isShapeAtRest()) {
            this.currentTetrimino.rotatedShapeMatrix = this.currentTetrimino.shapeMatrix.rotations[this.currentTetrimino.rotationIndex];
            this.updateGridData();
            this.drawShapeBlocks();
            this.drawGridLines();
            if (this.hasSolidRows()) {
                const numberOfContiguousSolidRows = this.getRowStreak();
                const totalNumberOfSolidRows = this.removeSolidRows();
                this.score += this.awardPoints(totalNumberOfSolidRows, numberOfContiguousSolidRows);
            }
            this.createNewTetrimino();
            this.drawScreen();
        }
    }

    updateGridData() {
        // const middleRowIndex = Math.floor(this.grid.length / 2);
        // const middleColumnIndex = Math.floor(this.grid[0].length / 2);
        const verticalOffset = this.currentTetrimino.verticalOffset;
        const horizontalOffset = this.currentTetrimino.horizontalOffset;
        if (this.currentTetrimino) {
            const numberOfRows = this.currentTetrimino.rotatedShapeMatrix.length;
            for (let rowIndex = numberOfRows - 1; rowIndex >= 0; rowIndex--) {
                // const horizShapeCenter = Math.ceil(row.length / 2);
                const numberOfColumns = this.currentTetrimino.rotatedShapeMatrix[rowIndex].length;
                for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                    // this.grid[middleRowIndex + rowIndex][middleColumnIndex + columnIndex] = columnValue;
                    this.grid[verticalOffset + rowIndex][horizontalOffset + columnIndex] =
                        new GridCell(this.currentTetrimino.color, this.currentTetrimino.rotatedShapeMatrix[rowIndex][columnIndex]);
                }
            };
            console.log('grid after update', this.grid);
        }
    }

    drawShapeBlocks() {
        // DrawService.setFillColor(this.currentTetrimino.color);
        const initialHorizontalOffset = 5 * this.cellSquareSize;
        let horizontalOffset = 5 * this.cellSquareSize;
        let verticalOffset = this.numberOfRows * this.cellSquareSize;

        // Draw from the bottom up
        for (let rowIndex = this.numberOfRows - 1; rowIndex >= 0; rowIndex--) {
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                const columnValue = this.grid[rowIndex][columnIndex].value;
                if (columnValue) {
                    DrawService.setFillColor(this.grid[rowIndex][columnIndex].color);
                    DrawService.drawRectangle(
                        /*columnIndex +*/ horizontalOffset,
                        /*rowIndex +*/ verticalOffset,
                        this.cellSquareSize,
                        this.cellSquareSize
                    );
                }
                // Move the cursor forward to the right by however
                // many columns it takes to find a filled square
                horizontalOffset = this.grid[rowIndex][columnIndex + 1] ? (columnIndex + 1) * this.cellSquareSize : initialHorizontalOffset;
            }

            verticalOffset -= this.cellSquareSize; // Move the cursor upwards by 1 row;
            horizontalOffset = initialHorizontalOffset; // move the cursor back to the beginning of the line like a carriage return
        };
    }

    drawGridLines() {
        // const numberOfRows =
        //     Math.ceil(DrawService.getCanvasHeight() / this.cellSquareSize);
        // const numberOfColumns =
        //     Math.ceil(DrawService.getCanvasWidth() / this.cellSquareSize);
        let verticalOffset = this.cellSquareSize;
        let horizontalOffset = this.cellSquareSize;

        // Draw horizontal grid lines
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            DrawService.drawLine(
                DrawService.getMinXCoordinate(), // xStart
                verticalOffset, // yStart
                DrawService.getMaxXCoordinate(), // xEnd
                verticalOffset // yEnd
            );
            verticalOffset += this.cellSquareSize;
        }

        // Draw verttical grid lines
        for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
            DrawService.drawLine(
                horizontalOffset, // xStart
                DrawService.getMinYCoordinate(), // yStart
                horizontalOffset, // xEnd
                DrawService.getMaxYCoordinate() // yEnd
            );
            horizontalOffset += this.cellSquareSize;
        }
    }

    handleMovement(userInput) {
        switch (userInput) {
            case 'up': this.currentTetrimino.rotate(); this.drawScreen(); break;
            case 'down': this.moveDown(); this.drawScreen(); break;
            case 'left': this.moveLeft(); this.drawScreen(); break;
            case 'right': this.moveRight(); this.drawScreen(); break;
            case 'space': break;
            default: return null;
        }
    }


    rotate() {
        this.eraseOldTetriminoTiles();
        this.currentTetrimino.rotate();
        this.updateGridData();
    }

    moveSideToSide(offsetToAdd) {
        if (!this.isShapeTouchingLeftWall()) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateHorizontalOffset(offsetToAdd);
            this.updateGridData();
        }
    }

    moveDown() {
        if (!this.isShapeAtRest()) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateVerticalOffset(1);
            this.updateGridData();
        }
    }

    // TODO: Consolidate to on method
    moveLeft() {
        if (!this.isShapeTouchingLeftWall()) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateHorizontalOffset(-1);
            this.updateGridData();
        }
    }

    // TODO: Consolidate to on method
    moveRight() {
        if (!this.isShapeTouchingRightWall()) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateHorizontalOffset(1);
            this.updateGridData();
        }
    }

    hasSolidRows() {
        return this.grid.some(rows => !rows.some(gridCell => !gridCell.value));
    }

    removeSolidRows() {

    }

    getRowStreak() {

    }

    isShapeAtRest() {
        const numberOfRowsInShape = this.currentTetrimino.rotatedShapeMatrix.length;
        const rowIndexOfBottommostTile = this.currentTetrimino.verticalOffset + numberOfRowsInShape;
        return this.currentTetrimino.verticalOffset + numberOfRowsInShape >= this.numberOfRows ||
            (rowIndexOfBottommostTile < this.grid.length &&
                rowIndexOfBottommostTile + 1 < this.grid.length &&
                this.grid[rowIndexOfBottommostTile + 1]
                    .slice(this.currentTetrimino.horizontalOffset, this.currentTetrimino.rotatedShapeMatrix[0].length)
                    .some(number => !!number));
    }

    isShapeTouchingLeftWall() {
        let leftMostTileIndex = 0;
        let tileColumnIndices = [];
        this.currentTetrimino.rotatedShapeMatrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                tileColumnIndices.push(this.currentTetrimino.horizontalOffset + columnIndex);
            });
        })
        leftMostTileIndex = Math.min(...tileColumnIndices);

        return leftMostTileIndex <= 0;
    }

    isShapeTouchingRightWall() {
        let rightMostTileIndex = 0;
        let tileColumnIndices = []
        this.currentTetrimino.rotatedShapeMatrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                tileColumnIndices.push(this.currentTetrimino.horizontalOffset + columnIndex);
            });
        });
        rightMostTileIndex = Math.max(...tileColumnIndices);
        return rightMostTileIndex >= this.grid[0].length;
    }

    isShapeTouchingOtherShape() {
        return true;
    }

    isShapeTouchingCeiling() {
        const topMostTileRowIndex = this.currentTetrimino.verticalOffset /*+
            this.currentTetrimino.rotatedShapeMatrix[this.currentTetrimino.rotatedShapeMatrix.length -1]*/;
        return topMostTileRowIndex <= 0;
    }

    isGameOver() {
        return this.isShapeAtRest() && this.isShapeTouchingCeiling();
    }
}