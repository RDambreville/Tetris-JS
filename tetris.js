import * as DrawService from '../draw.js';
import * as GameConfig from './config/game-config.js';
import { GameGrid } from './models/game-grid.js'

/**===============================================================
 * ====================== Variables ==============================
 * ===============================================================
 **/
let gameGrid = new GameGrid();
let shapeIndex = 0;










 /**===============================================================
 * ====================== Method Calls ============================
 * ===============================================================
 **/


document.querySelector('#dark-mode-checkbox')
    .addEventListener('click', toggleDarkMode);

document.querySelector('body')
    .addEventListener('keyup', handleMovement);

// setupCanvas();
// initPlayScreen();

// setInterval(drawTetrimino, 900); // Don't use parentheses with the method call

gameGrid.createNewTetrimino(5);
gameGrid.drawTetrimino();









 /**===============================================================
 * ====================== Method Definitions ======================
 * ===============================================================
 **/


// function drawTetrimino(shapeIndex) {
//     // if (shapeIndex === 7) {
//     //     shapeIndex = 0;
//     // }
//     DrawService.clearCanvas();
//     gameGrid.clearGridData();
//     gameGrid.drawTetrimino+(shapeIndex);
//     drawGridLines();
//     shapeIndex++;
// }


function drawTetrimino() {
    if (shapeIndex === 7) {
        shapeIndex = 0;
    }
    DrawService.clearCanvas();
    gameGrid.clearGridData();
    gameGrid.drawTetrimino+(shapeIndex);
    drawGridLines();
    shapeIndex++;
}

function handleMovement(event) {
    console.log('keyPress event', event);
    switch (event.key) {
        case 'w': gameGrid.handleMovement('up'); break;
        case 'ArrowUp': gameGrid.handleMovement('up'); break;
        case 's': gameGrid.handleMovement('down'); break;
        case 'ArrowDown': gameGrid.handleMovement('down'); break;
        case 'a': gameGrid.handleMovement('left'); break;
        case 'ArrowLeft': gameGrid.handleMovement('left'); break;
        case 'd': gameGrid.handleMovement('right'); break;
        case 'ArrowRight': gameGrid.handleMovement('right'); break;
        case ' ': gameGrid.handleMovement();
        default: gameGrid.handleMovement(null); // keep the direction the same
    }
}

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
    drawGridLines();
}

function clearScreen() {
    DrawService.clearCanvas();
}