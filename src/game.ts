import { Canvas } from "./canvas"
import { GameObject } from "./object"
import { Shape } from "./shape"

export class Game {

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
        window.requestAnimationFrame(this.loop.bind(this))
    }

    public addTicker(ticker: (dt?: number) => void) {
        this.tickers.push(ticker)
    }

    public createObject(x: number, y: number, shape: Shape, color: string) {
        const object = new GameObject(x, y, shape, color)
        this.objects.push(object)
        return object
    }

    // TODO: showText

    public mapKey(key: string, callback: () => void) {
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

    private loop(timestamp: number) {
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