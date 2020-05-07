class GridDrawer {
    typeOfLine: string;
    x: number;
    y: number;
    w: number;
    h: Number;
    color: string;
    nbLin: number;
    nbCol: number;

    constructor(type: string, posX: number, posY: number, width: number, height: Number, color :string = "rgb(255,255,255)", nbLin: number, nbCol: number) {
        this.typeOfLine = type
        this.y = posY;
        this.w = width;
        this.h = height;
        this.color = color;
        this.nbCol = nbCol;
        this.nbLin = nbLin;
    }
    drawGrid() {
        for (let l = 0; l < this.nbLin; l++) {
            for (let c = 0; c < this.nbCol; c++) {
            }
        }
    }

}
