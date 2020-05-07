var GridDrawer = /** @class */ (function () {
    function GridDrawer(type, posX, posY, width, height, color, nbLin, nbCol) {
        if (color === void 0) { color = "rgb(255,255,255)"; }
        this.typeOfLine = type;
        this.y = posY;
        this.w = width;
        this.h = height;
        this.color = color;
        this.nbCol = nbCol;
        this.nbLin = nbLin;
    }
    GridDrawer.prototype.drawGrid = function () {
        for (var l = 0; l < this.nbLin; l++) {
            for (var c = 0; c < this.nbCol; c++) {
            }
        }
    };
    return GridDrawer;
}());
