import { Board } from "./model/board";
class HTMLViewer {
    constructor(board) {
        let canvas = document.getElementById("canvas");
        canvas.height = board.getHeight();
        canvas.width = board.getWidth();
        let context = canvas.getContext("2d");
        context.strokeStyle = "black";
        context.lineWidth = 0.5;
        this.canvas = canvas;
        this.context = context;
        this.draw();
    }
    draw() {
        let context = this.context;
        for (let x = 0; x < this.canvas.width;) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, this.canvas.height);
            context.stroke();
            context.beginPath();
            context.moveTo(0, x);
            context.lineTo(this.canvas.width, x);
            context.stroke();
            x = x + this.canvas.height / 10;
        }
        context.closePath();
    }
}
// class Board {
//   private _width: number;
//   private _height: number;
//   constructor(w: number, h: number) {
//     this._width = w;
//     this._height = h;
//   }
//   public getWidth() {
//     return this._width;
//   }
//   public getHeight() {
//     return this._height;
//   }
// }
new HTMLViewer(new Board(500, 500));
//# sourceMappingURL=game.js.map