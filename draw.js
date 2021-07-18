/**
 * draw.js is a service for drawing graphics on a canvas.
 */

var canvas;
var context;

export function setupCanvas(_canvasHeight, _canvasWidth, isDarkMode) {
    canvas = document.getElementById('play-surface');
    context = canvas.getContext('2d');
    context.globalAlpha = '1.0';

    const backgroundColor = isDarkMode ? 'black' : 'lightgray';

    const canvasHeight = _canvasHeight === '100%' ? '-webkit-fill-available' : _canvasHeight;
    const canvasWidth = _canvasWidth;
    // const backgroundColor = isDarkMode ? 'black' : 'lightgray';
    // const strokeStyle = isDarkMode ? 'white' : 'green';
    // const fillStyle = isDarkMode ? 'white' : 'green';
    canvas.setAttribute('style',
        `background-color: ${backgroundColor}`);
    canvas.setAttribute('width', `${canvasWidth}`);
    canvas.setAttribute('height', `${canvasHeight}`);
    // context.strokeStyle = strokeStyle;
    // context.fillStyle = fillStyle;

    console.log('canvas', canvas);
    console.log('context', context);
}

export function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export function getCanvasHeight() {
    return canvas.height;
}

export function getCanvasWidth() {
    return canvas.width;
}

export function getMaxXCoordinate() {
    // return canvas.getBoundingClientRect().x * 2 /*- getMinXCoordinate()*/ /*+ getMinXCoordinate()*/;
    return canvas.getBoundingClientRect().right ;
}

export function getMinXCoordinate() {
    return canvas.getBoundingClientRect().x / canvas.getBoundingClientRect().left;
}

export function getMaxYCoordinate() {
    // return canvas.getBoundingClientRect().y /* canvas.getBoundingClientRect().top*/;
    // return canvas.getBoundingClientRect().bottom + getMinYCoordinate();
    return canvas.getBoundingClientRect().y / canvas.getBoundingClientRect().top;

}

export function getMinYCoordinate() {
    // return canvas.getBoundingClientRect().bottom / 2.75 /*- getMaxYCoordinate()*/;
    // return canvas.getBoundingClientRect().y / canvas.getBoundingClientRect().top;
    return canvas.getBoundingClientRect().bottom;
}

export function setFillColor(colorString) {
    if (context && colorString) {
        context.fillStyle = colorString.toString().toLowerCase();
    }
}

export function setStrokeColor(colorString) {
    if (context && colorString) {
        context.strokeStyle = colorString.toString().toLowerCase();
    }
}

export function drawText(textString, x, y) {
    context.font = '10pt sans-serif';
    // console.log('context', context);
    context.fillText(textString, x, y);
}

export function drawRectangle(x, y, width, height) {
    context.fillRect(x, y, width, height)
}

export function drawLine(xStart, yStart, xEnd, yEnd) {
    context.beginPath();
    context.moveTo (xStart, yStart);
    context.lineTo (xEnd, yEnd);
    context.stroke();
}

export function rotateObjects(degrees) {
    context.rotate(degrees * (Math.PI / 180));
}


// TODO: Remove
export function drawGrid() {
    CanvasRenderingContext2D.prototype.addGrid = function (delta, color, fontParams) {
        // define the default values for the optional arguments
        if (! arguments[0]) { delta = 25; }
        if (! arguments[1]) { color = 'blue'; }
        if (! arguments[2]) { fontParams = '8px sans-serif'; }
        // extend the canvas width and height by delta
        var oldWidth = this.canvas.width;
        var oldHeight = this.canvas.height;      
        this.canvas.width = oldWidth + delta;
        this.canvas.height = oldHeight + delta;        
        // draw the vertical and horizontal lines
        this.lineWidth = 0.1;
        this.strokeStyle = color;
        this.font = fontParams;
        this.beginPath();
        for (var i = 0; i * delta < oldWidth; i ++) {
          this.moveTo (i * delta, 0);
          this.lineTo (i * delta, oldHeight);
        }
        for (var j = 0; j * delta < oldHeight; j ++) {
          this.moveTo (0, j * delta);
          this.lineTo (oldWidth, j * delta);
        }      
        this.closePath();
        this.stroke();
        // draw a thicker line, which is the border of the original canvas
        this.lineWidth = 0.5;
        this.beginPath();
        this.moveTo(0,0);
        this.lineTo(oldWidth,0);
        this.lineTo(oldWidth,oldHeight);
        this.lineTo(0,oldHeight);
        this.lineTo(0,0);
        this.closePath();
        this.stroke();
        // set the text parameters and write the number values to the vertical and horizontal lines
        this.font = fontParams
        this.lineWidth = 0.3;
        // 1. writing the numbers to the x axis
        var textY = oldHeight + Math.floor(delta/2); // y-coordinate for the number strings
        for (var i = 0; i * delta <= oldWidth; i ++) {
          this.strokeText (i * delta, i * delta, textY);        
        }
        // 2. writing the numbers to the y axis
        var textX = oldWidth + 5; // x-coordinate for the number strings
        for (var j = 0; j * delta <= oldHeight; j ++) {
          this.strokeText (j * delta, textX, j * delta);
        }
      };
    context.addGrid(25, 'lightgray');
}

// export function initPlayScreen() {
//     setupCanvas();
//     drawStartScreen();
// }