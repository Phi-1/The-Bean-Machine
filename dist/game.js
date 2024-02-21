"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var canvas_1 = require("./canvas");
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = new canvas_1.Canvas(document.body);
        this.objects = [];
    }
    return Game;
}());
exports.Game = Game;
