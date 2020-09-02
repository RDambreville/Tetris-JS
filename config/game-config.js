/**
 * game-config.js
 * Stores global game settings
 *
 */

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

export let canvasHeight = '100%';

export let canvasWidth = '50%';