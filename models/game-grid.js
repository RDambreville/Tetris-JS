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
        this.numberOfRows = Math.ceil(_canvasHeight / this.cellSquareSize) - 1;
        this.numberOfColumns = Math.ceil(_canvasWidth / this.cellSquareSize) - 1;
        this.clearGridData();
        console.log('empty grid', this.grid);
    }

    clearGridData() {
        this.grid = [];
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.grid.push([]);
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                this.grid[rowIndex].push(new GridCell(null, 0, rowIndex, columnIndex, false));
            }
        }
    }

    eraseOldTetriminoTiles() {
        this.currentTetrimino.rotatedShapeMatrix = this.currentTetrimino.rotatedShapeMatrix
            .map(row => row = row.map(columnValue => {return columnValue = 0}));
        this.updateShapeInGrid();
    }

    createNewTetrimino(/*shapeIndex*/) {
        const randomShapeIndex = Math.ceil(Math.random() * (6 - 0));
        // const randomShapeIndex = /* shapeIndex*/ /*0*/;
        const startColumnIndex = Math.floor(this.numberOfColumns / 2) - 1;
        this.currentTetrimino = new Tetrimino(randomShapeIndex, startColumnIndex);
        console.log('new tetrimino', this.currentTetrimino);
    }

    drawScreen(isErasing) {
            DrawService.clearCanvas();
            // Restore rotated shape and update the grid
            this.currentTetrimino.rotatedShapeMatrix =
                this.currentTetrimino.shapeMatrix.rotations[this.currentTetrimino.rotationIndex];
            this.updateShapeInGrid(isErasing);
            this.drawShapeBlocks();
            this.drawGridLines();
    }

    updateShapeInGrid(isErasing) {
        const verticalOffset = this.currentTetrimino.verticalOffset;
        const horizontalOffset = this.currentTetrimino.horizontalOffset;
        if (this.currentTetrimino) {
            const numberOfRows = this.currentTetrimino.rotatedShapeMatrix.length;
            for (let rowIndex = numberOfRows - 1; rowIndex >= 0; rowIndex--) {
                const numberOfColumns = this.currentTetrimino.rotatedShapeMatrix[rowIndex].length;
                for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                    const isCellColored = this.currentTetrimino.rotatedShapeMatrix[rowIndex][columnIndex]
                    const fallingGridCell = new GridCell(
                        isCellColored ? this.currentTetrimino.color : null,
                        this.currentTetrimino.rotatedShapeMatrix[rowIndex][columnIndex],
                        verticalOffset + rowIndex,
                        horizontalOffset + columnIndex,
                        false
                    );
                    const restingGridCell = this.grid[verticalOffset + rowIndex][horizontalOffset + columnIndex];
                    if ((this.isCellPartOfShape(restingGridCell) || !restingGridCell.value)) {
                        this.grid[verticalOffset + rowIndex][horizontalOffset + columnIndex] = fallingGridCell;
                    }
                }
            };
            console.log('grid after update', this.grid);
        }
    }

    willUpdateDestoryLegalCell(fallingGridCell, restingGridCell) {
        return !fallingGridCell.value && restingGridCell.value;
        // return false;
    }

    drawShapeBlocks() {
        const initialHorizontalOffset = 0;
        let horizontalOffset = 0;
        let verticalOffset = 0; // start drawing at the bottom and move up incrementally
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                const gridCell = this.grid[rowIndex][columnIndex];
                if (gridCell.value) {
                    DrawService.setFillColor(gridCell.color);
                    DrawService.drawRectangle(
                        /*columnIndex +*/ horizontalOffset,
                        /*rowIndex +*/ verticalOffset,
                        this.cellSquareSize,
                        this.cellSquareSize
                    );
                }
                // [DEBUG] Print markers for debugging
                this.printRowAndColumnNumbers(rowIndex, columnIndex, horizontalOffset, verticalOffset);                
                // Move the cursor forward to the right by however
                // many columns it takes to find a filled square
                horizontalOffset = this.grid[rowIndex][columnIndex + 1] ?
                    (columnIndex + 1) * this.cellSquareSize : initialHorizontalOffset;
            }
            // verticalOffset -= this.cellSquareSize; // Move the cursor upwards by 1 row;
            verticalOffset += this.cellSquareSize; // Move the cursor upwards by 1 row;
            horizontalOffset = initialHorizontalOffset; // move the cursor back to the beginning of the line like a carriage return
        };
    }

    printRowAndColumnNumbers(rowIndex, columnIndex, horizontalOffset, verticalOffset) {
        DrawService.setFillColor('#FFFFFF');
        if (rowIndex === 0 && columnIndex === 0) {
            DrawService.drawText(`${rowIndex}`, horizontalOffset + (this.cellSquareSize / 4), verticalOffset + (this.cellSquareSize / 2));
        }
        if (rowIndex !== 0 && columnIndex === 0) {
            DrawService.drawText(`${rowIndex}`, horizontalOffset + (this.cellSquareSize / 4), verticalOffset + (this.cellSquareSize / 2));
        }
        if (rowIndex === 0 && columnIndex !== 0) {
            DrawService.drawText(`${columnIndex}`, horizontalOffset + (this.cellSquareSize / 4), verticalOffset + (this.cellSquareSize / 2));
        }
    }

    drawGridLines() {
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
            case 'up': this.rotateShape(); this.drawScreen(); break;
            case 'down': this.moveShapeDown(); /*this.drawScreen();*/ break;
            case 'left': this.moveShapeLeft(); this.drawScreen(); break;
            case 'right': this.moveShapeRight(); this.drawScreen(); break;
            case 'space': break;
            default: return null;
        }
    }

    rotateShape() {
        this.eraseOldTetriminoTiles();
        this.currentTetrimino.rotate();
        this.updateShapeInGrid();
    }

    moveSideToSide(offsetToAdd) {
        if (!this.isShapeTouchingLeftWall()) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateHorizontalOffset(offsetToAdd);
            this.updateShapeInGrid();
        }
    }

    moveShapeDown() {
        if (!this.isShapeAtRest()) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateVerticalOffset(1);
            // this.updateShapeInGrid();
            this.drawScreen(true);
        } else {
            console.log('BOTTOM collision!', this);
            this.currentTetrimino.rotatedShapeMatrix = this.currentTetrimino.shapeMatrix.rotations[this.currentTetrimino.rotationIndex];
            this.lockShapeCells();
            this.updateShapeInGrid();
            // this.drawScreen();
            const solidRowIndices = this.getSolidRowIndices();
            if (this.hasSolidRows(solidRowIndices)) {
                const maxNumberOfContiguousSolidRows = this.getRowStreak();
                const totalNumberOfSolidRows = this.removeSolidRows();
                this.clearSolidRows(solidRowIndices);
                this.closeGaps(solidRowIndices);
                this.score += this.awardPoints(totalNumberOfSolidRows, maxNumberOfContiguousSolidRows);
            }
            this.createNewTetrimino();
            this.drawScreen();
        }
    }

    clearSolidRows(solidRowIndices) {
        solidRowIndices.forEach(index => this.grid[index] = this.grid[index].map(gridCell => gridCell = new GridCell(null, 0, gridCell.rowIndex, gridCell.columnIndex, false)));
    }

    closeGaps(solidRowIndices) {
        solidRowIndices = solidRowIndices.sort((a, b) => b - a); // Sort in descending order
        // loop from the bottom up
        solidRowIndices.forEach(rowIndex => {
            if (rowIndex === 0) {
                return;
            }
            while(rowIndex > 0) {
                if (rowIndex < this.numberOfRows) {
                    if (this.isRowEmpty(this.grid[rowIndex])) {
                        this.grid[rowIndex - 1].forEach(gridCell => { gridCell.rowIndex++; });
                        this.grid[rowIndex] = this.grid[rowIndex - 1];
                        this.grid[rowIndex - 1] = this.grid[rowIndex - 1].map(gridCell => gridCell = new GridCell(null, 0, gridCell.rowIndex, gridCell.columnIndex));
                    }
                    rowIndex--;
                }
            }
        })
    }

    isRowEmpty(row) {
        if (row && row.length) {
            return !row.some(gridCell => gridCell.color && gridCell.value);
        }
        return false;
    }

    // TODO: Consolidate to on method
    moveShapeLeft() {
        const isShapeTouchingLeftWall = this.isShapeTouchingLeftWall();
        const isShapeTouchingLeftPeer = this.isShapeTouchingLeftPeer();
        if (!isShapeTouchingLeftWall && !isShapeTouchingLeftPeer) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateHorizontalOffset(-1);
            this.updateShapeInGrid();
        } else if (isShapeTouchingLeftWall) {
            console.log('LEFT WALL collision!', this);
            this.kickLeftWall();
        } else if (isShapeTouchingLeftPeer) {
            console.log('LEFT PEER collision!', this);
        }
    }

    // TODO: Consolidate to on method
    moveShapeRight() {
        const isShapeTouchingRightWall = this.isShapeTouchingRightWall();
        const isShapeTouchingRightPeer = this.isShapeTouchingRightPeer();
        if (!isShapeTouchingRightWall && !isShapeTouchingRightPeer) {
            this.eraseOldTetriminoTiles();
            this.currentTetrimino.updateHorizontalOffset(1);
            this.updateShapeInGrid();
        } else if (isShapeTouchingRightWall) {
            console.log('RIGHT WALL collision!', this);
            this.kickRightWall();
        } else if (isShapeTouchingRightPeer) {
            console.log('RIGHT PEER collision!', this);
        }
    }

    kickLeftWall() {
        console.log('LEFT WALL KICKED!', this);
        while (this.isShapeTouchingLeftWall()) {
            this.moveShapeRight();
        }
    }

    kickRightWall() {
        console.log('RIGHT WALL KICKED!', this);
        while (this.isShapeTouchingRightWall()) {
            this.moveShapeLeft();
        }
    }

    lockShapeCells() {
        this.currentTetrimino.rotatedShapeMatrix
            .forEach((row, rowIndex) => row.forEach((columnValue, columnIndex) => {
                this.grid[this.currentTetrimino.verticalOffset + rowIndex][this.currentTetrimino.horizontalOffset + columnIndex].isAtRest = true;
            }));
        // this.updateShapeInGrid();
    }

    hasSolidRows(indicesOfSolidRows) {
        return indicesOfSolidRows && indicesOfSolidRows.length > 0;
    }

    getSolidRowIndices() {
        const indicesOfSolidRows = [];
        this.grid.forEach((row, rowIndex) => {
            if (!row.some(gridCell => !gridCell.value)) {
                indicesOfSolidRows.push(rowIndex);
            }
        });
        return indicesOfSolidRows;
    }

    awardPoints() {
        
    }

    removeSolidRows() {

    }

    getRowStreak() {

    }

    isShapeAtRest() {
        const numberOfRowsInShape = this.currentTetrimino.rotatedShapeMatrix.length;
        // const rowIndexOfBottommostTile = this.currentTetrimino.verticalOffset + numberOfRowsInShape;
        const rowIndexOfBottommostTile = this.currentTetrimino.verticalOffset + (numberOfRowsInShape - 1);
        return this.isShapeGrounded(numberOfRowsInShape) || this.isShapeBlockedFromBelow(rowIndexOfBottommostTile);
    }

    isShapeGrounded(numberOfRowsInShape) {
        return this.currentTetrimino.verticalOffset + numberOfRowsInShape >= this.numberOfRows;
    }

    isShapeBlockedFromBelow(rowIndexOfBottommostTile) {
        let isBlocked = false;
        isBlocked =
            this.currentTetrimino.rotatedShapeMatrix.some((row, rowIndex) =>
                row.some((column, columnIndex) => {
                    const shapeRowIndex = this.currentTetrimino.verticalOffset + rowIndex;
                    const shapeColumnIndex = this.currentTetrimino.horizontalOffset + columnIndex;
                    const fallingGridCell = this.grid[shapeRowIndex][shapeColumnIndex]; // TODO: Remove
                    const blockingGridCell = this.grid[shapeRowIndex + 1] ? this.grid[shapeRowIndex + 1][shapeColumnIndex] : {value : 0, rowIndex: rowIndexOfBottommostTile + 1 };
                    return blockingGridCell.value && fallingGridCell.value && !this.isCellPartOfShape(blockingGridCell) && this.isCellPartOfShape(fallingGridCell)
                    blockingGridCell.columnIndex === fallingGridCell.columnIndex &&  blockingGridCell.rowIndex > rowIndexOfBottommostTile;
                })
            );
        return isBlocked;
    }

    // TODO: Remove
    // isBlockingCellOutsideFallingShape(blockingGridCell, shapeRowIndex, shapeColumnIndex, rowIndexOfBottommostTile) {
    //     return ;
    // }

    isCellPartOfShape(targetGridCell) {
        return this.currentTetrimino.rotatedShapeMatrix.some((row, rowIndex) =>
            row.some((column, columnIndex) => {
                const shapeRowIndex = this.currentTetrimino.verticalOffset + rowIndex;
                const shapeColumnIndex = this.currentTetrimino.horizontalOffset + columnIndex;
                const isCellColored = this.currentTetrimino.rotatedShapeMatrix[rowIndex][columnIndex];
                const currentGridCellInShape = this.grid[shapeRowIndex][shapeColumnIndex];
                // new GridCell(
                //     isCellColored ? this.currentTetrimino.color : null,
                //     this.currentTetrimino.rotatedShapeMatrix[rowIndex][columnIndex],
                //     shapeRowIndex,
                //     shapeColumnIndex
                // );
                return currentGridCellInShape.value && !currentGridCellInShape.isAtRest && targetGridCell.rowIndex === shapeRowIndex && targetGridCell.columnIndex === shapeColumnIndex;
            })
        );
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

    isShapeTouchingLeftPeer() {
        let isTouching = false;
        isTouching = this.currentTetrimino.rotatedShapeMatrix.some((row, rowIndex) =>
            row.some((column, columnIndex) => {
                const shapeRowIndex = this.currentTetrimino.verticalOffset + rowIndex;
                const shapeColumnIndex = this.currentTetrimino.horizontalOffset + columnIndex;
                const currentGridCellInShape = this.grid[shapeRowIndex][shapeColumnIndex];
                const leftGridCell = this.grid[shapeRowIndex][shapeColumnIndex-1]
                return leftGridCell && leftGridCell.value && currentGridCellInShape && currentGridCellInShape.value &&
                    !this.isCellPartOfShape(leftGridCell);
            })
        );
        return isTouching;
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
        return rightMostTileIndex >= this.grid[0].length - 1;
    }

    isShapeTouchingRightPeer() {
        let isTouching = false;
        isTouching = this.currentTetrimino.rotatedShapeMatrix.some((row, rowIndex) =>
            row.some((column, columnIndex) => {
                const shapeRowIndex = this.currentTetrimino.verticalOffset + rowIndex;
                const shapeColumnIndex = this.currentTetrimino.horizontalOffset + columnIndex;
                const currentGridCellInShape = this.grid[shapeRowIndex][shapeColumnIndex];
                const rightGridCell = this.grid[shapeRowIndex][shapeColumnIndex + 1]
                return rightGridCell && rightGridCell.value && currentGridCellInShape && currentGridCellInShape.value &&
                    !this.isCellPartOfShape(rightGridCell);
            })
        );
        return isTouching;
    }

    isShapeTouchingCeiling() {
        const topMostTileRowIndex = this.currentTetrimino.verticalOffset /*+
            this.currentTetrimino.rotatedShapeMatrix[this.currentTetrimino.rotatedShapeMatrix.length -1]*/;
        return topMostTileRowIndex <= 0;
    }

    isGameOver() {
        return this.isShapeAtRest() && this.isShapeTouchingCeiling();
        // return true;
    }
}