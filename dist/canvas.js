var Canvas = /** @class */ (function () {
    function Canvas(mount) {
        var _this = this;
        this.canvas = document.createElement("canvas");
        window.addEventListener("resize", function () {
            _this.resizeCanvas(_this.canvas);
        });
        this.resizeCanvas(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        mount.appendChild(this.canvas);
    }
    Canvas.prototype.setClearColor = function (color) {
        this.clearColor = color;
    };
    Canvas.prototype.clearScreen = function () {
        // TODO: figure out if this needs to change with a camera
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.clearColor)
            return;
        this.ctx.fillStyle = this.clearColor;
        var background = new Path2D();
        background.rect(0, 0, this.canvas.width, this.canvas.height);
        background.closePath();
        this.ctx.fill(background);
    };
    Canvas.prototype.drawShape = function (x, y, shape, color) {
        if (shape.type === "circle") {
            var circle = shape;
            this.drawCircle(x, y, circle.radius, color);
        }
        else if (shape.type === "rectangle") {
            var rectangle = shape;
            this.drawRectangle(x, y, rectangle.width, rectangle.height, color);
        }
    };
    Canvas.prototype.drawCircle = function (x, y, radius, color) {
        // TODO:
        var circle = new Path2D();
        circle.ellipse(x, y, radius, radius, 0, 0, 360, false);
        circle.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill(circle);
    };
    Canvas.prototype.drawRectangle = function (x, y, width, height, color) {
        // TODO
    };
    Canvas.prototype.resizeCanvas = function (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    return Canvas;
}());
export { Canvas };
