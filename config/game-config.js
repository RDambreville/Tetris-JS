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

 export let fallSpeed = 2000; // in milliseconds

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

export let canvasHeight = window.innerHeight;

export let canvasWidth = window.innerWidth / 2;