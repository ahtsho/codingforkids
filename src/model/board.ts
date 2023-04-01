export class Board {
  private _width: number;
  private _height: number;

  constructor(w: number, h: number) {
    this._width = w;
    this._height = h;
  }
  public getWidth() {
    return this._width;
  }
  public getHeight() {
    return this._height;
  }
}
