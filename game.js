var World = /** @class */ (function () {
    function World(w, h) {
        var canvas = document.getElementById("canvas");
        canvas.height = w;
        canvas.width = h;
        var context = canvas.getContext("2d");
        //context.lineCap = "round";
        //context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 0.5;
        this.canvas = canvas;
        this.context = context;
        this.draw();
    }
    World.prototype.draw = function () {
        var context = this.context;
        for (var x = 0; x < this.canvas.width;) {
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
    };
    return World;
}());
new World(500, 500);
