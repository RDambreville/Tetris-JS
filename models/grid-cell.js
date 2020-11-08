export class GridCell {
    color;
    value
    rowIndex;
    columnIndex;

    constructor(_color, _value, _rowIndex, _columnIndex) {
        this.color = _color;
        this.value = _value;
        this.rowIndex = _rowIndex;
        this.columnIndex = _columnIndex;
    }
}