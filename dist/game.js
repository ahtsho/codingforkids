// import { Board } from "./model/board";
var HTMLViewer = /** @class */ (function () {
    function HTMLViewer(board, rob) {
        var _this = this;
        this.arrowKeyEventHandler = function (e) {
            var key = e.key;
            _this.robot.move(key, _this.board.getCellDim(), _this.board.getWidth());
            _this.robot.turn(key);
            _this.context.rotate(_this.robot.getOrierntation());
            _this.draw();
        };
        document.addEventListener("keydown", this.arrowKeyEventHandler);
        this.canvas = document.getElementById("canvas");
        this.canvas.height = board.getHeight();
        this.canvas.width = board.getWidth();
        this.context = this.canvas.getContext("2d");
        this.context.strokeStyle = "black";
        this.context.lineWidth = 0.5;
        this.robot = rob;
        this.board = board;
        this.draw();
    }
    HTMLViewer.prototype.drawHorizontalLine = function (x) {
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.canvas.height);
        this.context.stroke();
    };
    HTMLViewer.prototype.drawVerticalLine = function (y) {
        this.context.moveTo(0, y);
        this.context.lineTo(this.canvas.height, y);
        this.context.stroke();
    };
    HTMLViewer.prototype.draw = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        for (var i = 0; i < this.canvas.width;) {
            this.drawHorizontalLine(i);
            this.drawVerticalLine(i);
            i = i + this.board.getCellDim();
        }
        this.context.closePath();
        this.robot.draw(this.context, this.board.getCellDim());
    };
    return HTMLViewer;
}());
var Board = /** @class */ (function () {
    function Board(w, h, rows) {
        this.width = w;
        this.height = h;
        this.cellDim = this.width / rows;
    }
    Board.prototype.getWidth = function () {
        return this.width;
    };
    Board.prototype.getHeight = function () {
        return this.height;
    };
    Board.prototype.getCellDim = function () {
        return this.cellDim;
    };
    return Board;
}());
var Robot = /** @class */ (function () {
    function Robot(x, y) {
        this.position = { x: x, y: y };
        this.orierntation = 0;
    }
    Robot.prototype.move = function (direction, step, boardHeight) {
        switch (direction) {
            case "ArrowDown":
                if (this.position.y < boardHeight - step) {
                    this.position.y += step;
                }
                else {
                    alert("OUCH!");
                }
                return;
            case "ArrowUp":
                if (this.position.y > 0) {
                    this.position.y -= step;
                }
                else {
                    alert("OUCH!");
                }
                return;
            case "ArrowLeft":
                if (this.position.x > 0) {
                    this.position.x -= step;
                }
                else {
                    alert("OUCH!");
                }
                return;
            case "ArrowRight":
                if (this.position.x < boardHeight - step) {
                    this.position.x += step;
                }
                else {
                    alert("OUCH!");
                }
                return;
        }
    };
    Robot.prototype.getOrierntation = function () {
        return this.orierntation;
    };
    Robot.prototype.turn = function (wise) {
        if (wise === "l")
            this.orierntation -= 90;
        else if (wise === "r")
            this.orierntation += 90;
    };
    Robot.prototype.draw = function (context, h) {
        var height = h / 3;
        var path = new Path2D("M ".concat(height, " ").concat(height, " L ").concat(3 * height, " ").concat(height, " L ").concat(2 * height, " ").concat(3 * height, " z"));
        context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
        context.fill(path);
        context.stroke(path);
    };
    return Robot;
}());
var viewer = new HTMLViewer(new Board(1000, 1000, 5), new Robot(0, 0));
//# sourceMappingURL=game.js.map