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


document.querySelector('#dark-mode-checkbox')
    .addEventListener('click', toggleDarkMode)

// setupCanvas();
initPlayScreen();








 /**===============================================================
 * ====================== Method Definitions ======================
 * ===============================================================
 **/

function setupCanvas() {
    DrawService.setupCanvas(GameConfig.canvasHeight, GameConfig.canvasWidth, GameConfig.getIsDarkMode());
    initPlayScreen();
}

function toggleDarkMode(clickEvent) {
    if (clickEvent.target.checked) {
        GameConfig.setIsDarkMode(true);
    } else {
        GameConfig.setIsDarkMode(false);
    }
    initPlayScreen();
}

function initPlayScreen() {
    // const screenState = new ScreenState(player, score, food)
    // console.log('screenState', screenState);
    // clearScreen();
    drawGameGrid();
}

function clearScreen() {
    DrawService.clearCanvas();
}

function drawGameGrid() {
    // DrawService.setStrokeColor(GameConfig.getIsDarkMode() ? 'lightgray' : 'green');
    DrawService.setupCanvas(GameConfig.canvasHeight, GameConfig.canvasWidth, GameConfig.getIsDarkMode());
    clearScreen();
    const numberOfRows = DrawService.getCanvasHeight() / GameConfig.cellSquareSize;
    const numberOfColumns = DrawService.getCanvasWidth() / GameConfig.cellSquareSize;
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