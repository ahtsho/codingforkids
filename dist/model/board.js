"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var Board = /** @class */ (function () {
    function Board(w, h) {
        this._width = w;
        this._height = h;
    }
    Board.prototype.getWidth = function () {
        return this._width;
    };
    Board.prototype.getHeight = function () {
        return this._height;
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=board.js.map