import * as DrawService from '../draw.js';
import * as GameConfig from './config/game-config.js';

/**===============================================================
 * ====================== Variables ==============================
 * ===============================================================
 **/













 /**===============================================================
 * ====================== Method Calls ============================
 * ===============================================================
 **/

DrawService.setupCanvas();

document.querySelector('#dark-mode-checkbox')
    .addEventListener('click', toggleDarkMode)

drawGameGrid();







 /**===============================================================
 * ====================== Method Definitions ======================
 * ===============================================================
 **/

function toggleDarkMode(clickEvent) {
    if (clickEvent.target.checked) {
        GameConfig.setIsDarkMode(true);
    } else {
        GameConfig.setIsDarkMode(false);
    }
    initPlayScreen();
}

function initPlayScreen() {
    DrawService.setupCanvas();
    // const screenState = new ScreenState(player, score, food)
    // console.log('screenState', screenState);
    clearScreen();
}

function clearScreen() {
    DrawService.clearCanvas();
}

function drawGameGrid() {
    DrawService.setStrokeColor('lightgray');
    const numberOfRows = DrawService.getCanvasHeight() / GameConfig.cellSquareSize;
    const numberOfColumns = DrawService.getCanvasWidth() / GameConfig.cellSquareSize;
    let heightInterval = GameConfig.cellSquareSize;
    let widthInterval = GameConfig.cellSquareSize;
    // Draw row grid lines
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        DrawService.drawLine(
            DrawService.getMinHorizontalPosition(), // xStart
            heightInterval, // yStart
            DrawService.getMaxHorizontalPosition(), // xEnd
            heightInterval // yEnd
        );
        heightInterval += GameConfig.cellSquareSize;
    }

    // Draw Column grid lines
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        DrawService.drawLine(
            widthInterval, // xStart
            DrawService.getMinVerticalPosition(), // yStart
            widthInterval, // xEnd
            DrawService.getMaxVerticalPosition() // yEnd
        );
        widthInterval += GameConfig.cellSquareSize;
    }
}