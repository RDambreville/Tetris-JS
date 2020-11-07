/**
 * game-config.js
 * Stores global game settings
 *
 */

/**=============================================================
 * ======================= Game Mechanics ======================
 * =============================================================
 **/

 export let cellSquareSize = 25; // in pixels

 export let tickInterval = 500; // in milliseconds

/**=============================================================
 * ============================= UI =============================
 * ==============================================================
 **/

let isDarkMode = true;

export function getIsDarkMode() {
    return isDarkMode;
}

export function setIsDarkMode(_isDarkMode) {
    isDarkMode = _isDarkMode
}

export let canvasHeight = 0.75 * window.innerHeight;

export let canvasWidth = 0.50 * (window.innerWidth / 2);