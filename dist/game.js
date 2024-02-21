import { Canvas } from "./canvas.js";
import { GameObject } from "./object.js";
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = new Canvas(document.body);
        this.objects = [];
        this.tickers = [];
        this.mouse = { x: 0, y: 0 };
        this.mouseButtonStates = { left: false, right: false };
        this.mouseInputMap = { left: [], right: [] };
        this.keyStates = {};
        this.keyMap = {};
        this.initEvents();
    }
    // TODO: stop / pause
    Game.prototype.start = function () {
        window.requestAnimationFrame(this.loop.bind(this));
    };
    Game.prototype.addTicker = function (ticker) {
        this.tickers.push(ticker);
    };
    Game.prototype.createObject = function (x, y, shape, color) {
        var object = new GameObject(x, y, shape, color);
        this.objects.push(object);
        return object;
    };
    // TODO: showText
    Game.prototype.mapKey = function (key, callback) {
        if (!this.keyMap[key]) {
            this.keyMap[key] = [];
        }
        this.keyMap[key].push(callback);
    };
    Game.prototype.mapLeftMouseButton = function (callback) {
        this.mouseInputMap.left.push(callback);
    };
    Game.prototype.mapRightMouseButton = function (callback) {
        this.mouseInputMap.right.push(callback);
    };
    Game.prototype.setBackgroundColor = function (color) {
        this.canvas.setClearColor(color);
    };
    Game.prototype.loop = function (timestamp) {
        window.requestAnimationFrame(this.loop.bind(this));
        var deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.update(deltaTime);
        this.render();
    };
    Game.prototype.update = function (dt) {
        this.handleInput();
        this.tickers.forEach(function (ticker) {
            ticker(dt);
        });
    };
    Game.prototype.handleInput = function () {
        for (var key in this.keyMap) {
            if (this.keyStates[key]) {
                this.keyMap[key].forEach(function (callback) {
                    callback();
                });
            }
        }
        if (this.mouseButtonStates.left) {
            this.mouseInputMap.left.forEach(function (callback) { return callback(); });
        }
        if (this.mouseButtonStates.right) {
            this.mouseInputMap.right.forEach(function (callback) { return callback(); });
        }
    };
    Game.prototype.render = function () {
        var _this = this;
        // TODO
        this.canvas.clearScreen();
        this.objects.forEach(function (object) {
            _this.canvas.drawShape(object.x, object.y, object.shape, object.color);
        });
    };
    Game.prototype.initEvents = function () {
        var _this = this;
        window.addEventListener("mousemove", function (event) {
            _this.mouse.x = event.pageX;
            _this.mouse.y = event.pageY;
        });
        window.addEventListener("mousedown", function (event) {
            if (event.button === 0)
                _this.mouseButtonStates.left = true;
            if (event.button === 2)
                _this.mouseButtonStates.right = true;
        });
        window.addEventListener("mouseup", function (event) {
            if (event.button === 0)
                _this.mouseButtonStates.left = false;
            if (event.button === 2)
                _this.mouseButtonStates.right = false;
        });
        window.addEventListener("keydown", function (event) {
            _this.keyStates[event.key] = true;
        });
        window.addEventListener("keyup", function (event) {
            _this.keyStates[event.key] = false;
        });
    };
    return Game;
}());
export { Game };
