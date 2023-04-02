"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
var Robot = /** @class */ (function () {
    function Robot(x, y) {
        this.position[0] = x;
        this.position[1] = y;
    }
    Robot.prototype.move = function (x1, y1) {
        this.position[0] = this.position[0] + x1;
        this.position[1] = this.position[1] + y1;
    };
    Robot.prototype.turn = function (angle) {
        this.orierntation = this.orierntation + angle;
    };
    return Robot;
}());
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map