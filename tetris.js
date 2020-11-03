import * as DrawService from '../draw.js';
import * as GameConfig from './config/game-config.js';
import { GameGrid } from './models/game-grid.js'

/**===============================================================
 * ====================== Variables ==============================
 * ===============================================================
 **/
let gameGrid = new GameGrid(/*GameConfig.fallSpeed*/);
// let shapeIndex = 0; // TODO: Remove



 /**===============================================================
 * ====================== Method Calls ============================
 * ===============================================================
 **/


document.querySelector('#dark-mode-checkbox')
    .addEventListener('click', toggleDarkMode);

document.querySelector('body')
    .addEventListener('keydown', handleMovement);

// TODO: Remove
// setInterval(drawTetrimino, 900); // Don't use parentheses with the method call

gameGrid.createNewTetrimino(1);
gameGrid.drawTetrimino();
// clock = setInterval(moveTetriminoDown, GameConfig.fallSpeed); // Don't use parentheses with the method call



 /**===============================================================
 * ====================== Method Definitions ======================
 * ===============================================================
 **/


function moveTetriminoDown() {
    gameGrid.handleMovement('down');
}
 // TODO: Remove
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


// TODO: Remove
// function drawTetrimino() {
//     if (shapeIndex === 7) {
//         shapeIndex = 0;
//     }
//     DrawService.clearCanvas();
//     gameGrid.clearGridData();
//     gameGrid.drawTetrimino+(shapeIndex);
//     drawGridLines();
//     shapeIndex++;
// }

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

function toggleDarkMode(clickEvent) {
    if (clickEvent.target.checked) {
        GameConfig.setIsDarkMode(true);
    } else {
        GameConfig.setIsDarkMode(false);
    }
    initPlayScreen();
}

function initPlayScreen() {
    // TODO: Remove
    // clearScreen();
    // drawGridLines();
}

// TODO: Move all drawing references to game-grid.js
// function clearScreen() {
//     DrawService.clearCanvas();
// }