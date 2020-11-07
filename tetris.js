import * as GameConfig from './config/game-config.js';
import * as DrawService from '../draw.js';
import { GameGrid } from './models/game-grid.js'

/**===============================================================
 * ====================== Variables ==============================
 * ===============================================================
 **/
let gameGrid;
let clock;
// let shapeIndex = 0; // TODO: Remove



 /**===============================================================
 * ====================== Method Calls ============================
 * ===============================================================
 **/


document.querySelector('#start-button')
    .addEventListener('click', startGame);

document.querySelector('#dark-mode-checkbox')
    .addEventListener('click', toggleDarkMode);

document.querySelector('body')
    .addEventListener('keydown', handleMovement);


initGameScreen();

// TODO: Remove
// setInterval(drawTetrimino, 900); // Don't use parentheses with the method call



 /**===============================================================
 * ====================== Method Definitions ======================
 * ===============================================================
 **/

function initGameScreen() {
    gameGrid = new GameGrid(
        GameConfig.canvasHeight,
        GameConfig.canvasWidth,
        GameConfig.cellSquareSize,
        GameConfig.getIsDarkMode());
    gameGrid.createNewTetrimino(/*1*/);
    gameGrid.drawScreen();
}

function startGame() {
    clock = setInterval(iterateGameLoop, GameConfig.tickInterval);
}

function iterateGameLoop() {
    if (gameGrid) {
        if (!gameGrid.isGameOver()) {
            gameGrid.handleMovement('down');
        } else {
            DrawService.drawText('Game Over!', GameConfig.canvasWidth / 2, GameConfig.canvasHeight / 2);
            releaseResources();
        }
    }
}

function handleMovement(event) {
    // console.log('keyPress event', event);
    if (gameGrid) {
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
}

function toggleDarkMode(clickEvent) {
    if (clickEvent.target.checked) {
        GameConfig.setIsDarkMode(true);
    } else {
        GameConfig.setIsDarkMode(false);
    }
    initGameScreen();
}

function releaseResources() {
    clock = null;
    gameGrid = null;
}