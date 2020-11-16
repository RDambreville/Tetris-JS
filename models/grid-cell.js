export class GridCell {
    color;
    value
    rowIndex;
    columnIndex;
    isAtRest;

    constructor(_color, _value, _rowIndex, _columnIndex, _isAtRest) {
        this.color = _color;
        this.value = _value;
        this.rowIndex = _rowIndex;
        this.columnIndex = _columnIndex;
        this.isAtRest = _isAtRest;
    }
}