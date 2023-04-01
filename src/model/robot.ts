export class Robot {
  private position: [x: number, y: number];
  // TODO: type Degree:IntRange<0,360>
  private orierntation: number;
  constructor(x: number, y: number) {
    this.position[0] = x;
    this.position[1] = y;
  }
  public move(x1: number, y1: number): void {
    this.position[0] = this.position[0] + x1;
    this.position[1] = this.position[1] + y1;
  }
  public turn(angle: number): void {
    this.orierntation = this.orierntation + angle;
  }
}
