// import { Board } from "./model/board";
class HTMLViewer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private robot: Robot;

  private board: Board;

  constructor(board: Board, rob: Robot) {
    document.addEventListener("keydown", this.arrowKeyEventHandler);

    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas.height = board.getHeight();
    this.canvas.width = board.getWidth();

    this.context = this.canvas.getContext("2d");
    this.context.strokeStyle = "black";
    this.context.lineWidth = 0.5;

    this.robot = rob;
    this.board = board;
    this.draw();
  }

  private arrowKeyEventHandler = (e: KeyboardEvent) => {
    let key = (e as KeyboardEvent).key;
    this.robot.move(
      key as Direction,
      this.board.getCellDim(),
      this.board.getWidth()
    );
    this.robot.turn(key as Rotate);

    this.draw();
  };

  private drawHorizontalLine(x: number) {
    this.context.moveTo(x, 0);
    this.context.lineTo(x, this.canvas.height);
    this.context.stroke();
  }

  private drawVerticalLine(y: number) {
    this.context.moveTo(0, y);
    this.context.lineTo(this.canvas.height, y);
    this.context.stroke();
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    for (let i = 0; i < this.canvas.width; ) {
      this.drawHorizontalLine(i);
      this.drawVerticalLine(i);
      i = i + this.board.getCellDim();
    }
    this.context.closePath();
    this.robot.draw(this.context, this.board.getCellDim());
  }
}

class Board {
  private width: number;
  private height: number;
  private cellDim: number;

  constructor(w: number, h: number, rows: number) {
    this.width = w;
    this.height = h;
    this.cellDim = this.width / rows;
  }
  public getWidth() {
    return this.width;
  }
  public getHeight() {
    return this.height;
  }
  public getCellDim() {
    return this.cellDim;
  }
}

type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
type Rotate = "l" | "r";

class Robot {
  private position: { x: number; y: number };
  // TODO: type Degree:IntRange<0,360>
  private orierntation: number;
  constructor(x: number, y: number) {
    this.position = { x, y };
    this.orierntation = 0;
  }
  public move(
    direction: Direction | Rotate,
    step: number,
    boardHeight: number
  ) {
    switch (direction) {
      case "ArrowDown":
        if (this.position.y < boardHeight - step) {
          this.position.y += step;
        } else {
          alert("OUCH!");
        }
        return;
      case "ArrowUp":
        if (this.position.y > 0) {
          this.position.y -= step;
        } else {
          alert("OUCH!");
        }
        return;
      case "ArrowLeft":
        if (this.position.x > 0) {
          this.position.x -= step;
        } else {
          alert("OUCH!");
        }
        return;
      case "ArrowRight":
        if (this.position.x < boardHeight - step) {
          this.position.x += step;
        } else {
          alert("OUCH!");
        }
        return;
    }
  }
  public getOrierntation() {
    return this.orierntation;
  }
  public turn(wise: Rotate): void {
    if (wise === "l") this.orierntation -= 90;
    else if (wise === "r") this.orierntation += 90;
  }
  public draw(context: CanvasRenderingContext2D, h: number) {
    const height = h / 3;
    var path = new Path2D(
      `M ${height} ${height} L ${3 * height} ${height} L ${2 * height} ${
        3 * height
      } z`
    );

    context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
    context.fill(path);
    context.stroke(path);
  }
}

const viewer = new HTMLViewer(new Board(1000, 1000, 5), new Robot(0, 0));
