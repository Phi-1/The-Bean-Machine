import { Canvas } from "./canvas"
import { GameObject } from "./object"

export class Game {
    
    private readonly canvas: Canvas
    private readonly objects: GameObject[]
    private readonly tickers: ((dt?: number) => void)[]

    constructor() {
        this.canvas = new Canvas(document.body)
        this.objects = []
    }

    public update(dt: number) {
        this.tickers.forEach((ticker) => {
            ticker(dt)
        })
        this.render()
    }

    private render() {
        // TODO
    }

}