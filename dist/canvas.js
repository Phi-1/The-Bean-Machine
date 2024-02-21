"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
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
    Canvas.prototype.resizeCanvas = function (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    return Canvas;
}());
exports.Canvas = Canvas;
