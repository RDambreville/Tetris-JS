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
    
}