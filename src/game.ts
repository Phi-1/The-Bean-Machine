import { Canvas } from "./canvas"
import { GameObject } from "./object"
import { Circle, Rectangle, Shape } from "./shape"

export class Game {

    private running: boolean

    private lastTime: number
    
    private readonly canvas: Canvas
    private readonly objects: GameObject[]
    private readonly tickers: ((dt?: number) => void)[]

    public mouse: { x: number, y: number }
    private readonly mouseButtonStates: { left: boolean, right: boolean }
    private readonly mouseInputMap: { left: (() => void)[], right: (() => void)[] }
    private readonly keyStates: { [key: string]: boolean }
    private readonly keyMap: { [key: string]: (() => void)[] }

    constructor() {
        this.running = false
        this.canvas = new Canvas(document.body)
        this.objects = []
        this.tickers = []
        this.mouse = { x: 0, y: 0 }
        this.mouseButtonStates = { left: false, right: false }
        this.mouseInputMap = { left: [], right: [] }
        this.keyStates = {}
        this.keyMap = {}

        this.initEvents()
    }

    // TODO: stop / pause

    public start() {
        if (this.running) return
        window.requestAnimationFrame(this.loop.bind(this))
        this.running = true
    }

    public addTicker(ticker: (dt?: number) => void) {
        this.tickers.push(ticker)
    }

    public createObject(x: number, y: number, shape: Shape, color: string | null) {
        const object = new GameObject(x, y, shape, color)
        this.objects.push(object)
        return object
    }

    // TODO: showText

    public mapKey(key: string, callback: () => void) {
        // TODO: press once only option
        if (!this.keyMap[key]) {
            this.keyMap[key] = []
        }
        this.keyMap[key].push(callback)
    }

    public mapLeftMouseButton(callback: () => void) {
        this.mouseInputMap.left.push(callback)
    }

    public mapRightMouseButton(callback: () => void) {
        this.mouseInputMap.right.push(callback)
    }

    public setBackgroundColor(color: string) {
        this.canvas.setClearColor(color)
    }

    public areColliding(object1: GameObject, object2: GameObject): boolean {
        if (object1.shape.type === "rectangle") {
            if (object2.shape.type === "rectangle") {
                return this.rectOnRectCollision(object1, object2)
            }
            if (object2.shape.type === "circle") {
                return this.rectOnCircleCollision(object1, object2)
            }
        }
        if (object1.shape.type === "circle") {
            if (object2.shape.type === "circle") {
                return this.circleOnCircleCollision(object1, object2)
            }
            if (object2.shape.type === "rectangle") {
                return this.rectOnCircleCollision(object2, object1)
            }
        }
    }

    private rectOnRectCollision(rect1: GameObject, rect2: GameObject): boolean {
        const hDist = Math.abs(rect1.x - rect2.x)
        const vDist = Math.abs(rect1.y - rect2.y)
        const halfWidth1 = (rect1.shape as Rectangle).width / 2
        const halfWidth2 = (rect2.shape as Rectangle).width / 2
        const halfHeight1 = (rect1.shape as Rectangle).height / 2
        const halfHeight2 = (rect2.shape as Rectangle).height / 2
        return hDist < Math.abs(halfWidth1 + halfWidth2) 
            && vDist < Math.abs(halfHeight1 + halfHeight2)
    }

    private rectOnCircleCollision(rect: GameObject, circle: GameObject): boolean {
        let testX = circle.x
        let testY = circle.y
        const lEdge = rect.x - (rect.shape as Rectangle).width / 2
        const rEdge = rect.x + (rect.shape as Rectangle).width / 2
        const tEdge = rect.y - (rect.shape as Rectangle).height / 2
        const bEdge = rect.y + (rect.shape as Rectangle).height / 2
        if (lEdge > circle.x) testX = lEdge
        else if (rEdge < circle.x) testX = rEdge
        if (tEdge > circle.y) testY = tEdge
        else if (bEdge < circle.y) testY = bEdge
        return Math.pow(testX - circle.x, 2) + Math.pow(testY - circle.y, 2) < Math.pow((circle.shape as Circle).radius, 2)
    }

    private circleOnCircleCollision(circle1: GameObject, circle2: GameObject): boolean {
        return Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2) < Math.pow((circle1.shape as Circle).radius + (circle2.shape as Circle).radius, 2)
    }

    private loop(timestamp: number) {
        if (!this.running) return
        window.requestAnimationFrame(this.loop.bind(this))
        const deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp

        this.update(deltaTime)
        this.render()
    }

    private update(dt: number) {
        this.handleInput()

        this.tickers.forEach((ticker) => {
            ticker(dt)
        })
    }

    private handleInput() {
        for (let key in this.keyMap) {
            if (this.keyStates[key]) {
                this.keyMap[key].forEach((callback) => {
                    callback()
                })
            }
        }

        if (this.mouseButtonStates.left) {
            this.mouseInputMap.left.forEach((callback) => callback())
        }
        if (this.mouseButtonStates.right) {
            this.mouseInputMap.right.forEach((callback) => callback())
        }
    }

    private render() {
        // TODO
        this.canvas.clearScreen()
        this.objects.forEach((object) => {
            if (object.color === null) return
            this.canvas.drawShape(object.x, object.y, object.shape, object.color)
        })
    }

    private initEvents() {
        window.addEventListener("mousemove", (event) => {
            this.mouse.x = event.pageX
            this.mouse.y = event.pageY
        })
        window.addEventListener("mousedown", (event) => {
            if (event.button === 0) this.mouseButtonStates.left = true
            if (event.button === 2) this.mouseButtonStates.right = true
        })
        window.addEventListener("mouseup", (event) => {
            if (event.button === 0) this.mouseButtonStates.left = false
            if (event.button === 2) this.mouseButtonStates.right = false 
        })

        window.addEventListener("keydown", (event) => {
            this.keyStates[event.key] = true
        })
        window.addEventListener("keyup", (event) => {
            this.keyStates[event.key] = false
        })
    }

}