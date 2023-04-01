export class Robot {
    constructor(x, y) {
        this.position[0] = x;
        this.position[1] = y;
    }
    move(x1, y1) {
        this.position[0] = this.position[0] + x1;
        this.position[1] = this.position[1] + y1;
    }
    turn(angle) {
        this.orierntation = this.orierntation + angle;
    }
}
//# sourceMappingURL=robot.js.map