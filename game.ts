class World {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(w: number, h: number) {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = w;
    canvas.width = h;

    let context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 0.5;

    this.canvas = canvas;
    this.context = context;
    this.draw();
  }

  private draw() {
    let context = this.context;
    for (let x = 0; x < this.canvas.width; ) {
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

new World(500, 500);
