"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
var Shape = exports.Shape = /** @class */ (function () {
    function Shape(ordinal) {
        this.ordinal = ordinal;
    }
    Shape.Rectangle = new Shape(0);
    Shape.Circle = new Shape(1);
    return Shape;
}());
