import { Camera } from "./camera.js";
import { Canvas } from "./canvas.js";
import { GameObject } from "./object.js";
var Game = /** @class */ (function () {
    function Game() {
        this.running = false;
        this.canvas = new Canvas(document.body);
        this.camera = new Camera(0, 0);
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
        if (this.running)
            return;
        window.requestAnimationFrame(this.loop.bind(this));
        this.running = true;
    };
    Game.prototype.addTicker = function (ticker) {
        this.tickers.push(ticker);
    };
    Game.prototype.createObject = function (x, y, shape, color) {
        var object = new GameObject(x, y, shape, color);
        this.objects.push(object);
        return object;
    };
    // TODO: showText: use html, not canvas text rendering
    // TODO: spawnParticle(sprite, x, y, speed, lifetime)
    Game.prototype.mapKey = function (key, callback) {
        // TODO: press once only option
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
    Game.prototype.setCameraPosition = function (x, y) {
        this.camera.x = x;
        this.camera.y = y;
    };
    Game.prototype.areColliding = function (object1, object2) {
        if (object1.shape.type === "rectangle") {
            if (object2.shape.type === "rectangle") {
                return this.rectOnRectCollision(object1, object2);
            }
            if (object2.shape.type === "circle") {
                return this.rectOnCircleCollision(object1, object2);
            }
        }
        if (object1.shape.type === "circle") {
            if (object2.shape.type === "circle") {
                return this.circleOnCircleCollision(object1, object2);
            }
            if (object2.shape.type === "rectangle") {
                return this.rectOnCircleCollision(object2, object1);
            }
        }
    };
    Game.prototype.rectOnRectCollision = function (rect1, rect2) {
        var hDist = Math.abs(rect1.x - rect2.x);
        var vDist = Math.abs(rect1.y - rect2.y);
        var halfWidth1 = rect1.shape.width / 2;
        var halfWidth2 = rect2.shape.width / 2;
        var halfHeight1 = rect1.shape.height / 2;
        var halfHeight2 = rect2.shape.height / 2;
        return hDist < Math.abs(halfWidth1 + halfWidth2)
            && vDist < Math.abs(halfHeight1 + halfHeight2);
    };
    Game.prototype.rectOnCircleCollision = function (rect, circle) {
        var testX = circle.x;
        var testY = circle.y;
        var lEdge = rect.x - rect.shape.width / 2;
        var rEdge = rect.x + rect.shape.width / 2;
        var tEdge = rect.y - rect.shape.height / 2;
        var bEdge = rect.y + rect.shape.height / 2;
        if (lEdge > circle.x)
            testX = lEdge;
        else if (rEdge < circle.x)
            testX = rEdge;
        if (tEdge > circle.y)
            testY = tEdge;
        else if (bEdge < circle.y)
            testY = bEdge;
        return Math.pow(testX - circle.x, 2) + Math.pow(testY - circle.y, 2) < Math.pow(circle.shape.radius, 2);
    };
    Game.prototype.circleOnCircleCollision = function (circle1, circle2) {
        return Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2) < Math.pow(circle1.shape.radius + circle2.shape.radius, 2);
    };
    Game.prototype.loop = function (timestamp) {
        if (!this.running)
            return;
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
        this.canvas.clearScreen();
        this.objects.forEach(function (object) {
            // FIXME: color null will break rendering once sprites are added
            if (object.color === null)
                return;
            _this.canvas.drawShape(object.x - _this.camera.x + _this.canvas.width / 2, object.y - _this.camera.y + _this.canvas.height / 2, object.shape, object.color);
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
