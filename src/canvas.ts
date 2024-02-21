import { Circle, Rectangle, Shape } from "./shape"

export class Canvas {

    private readonly canvas: HTMLCanvasElement
    private readonly ctx: CanvasRenderingContext2D
    private clearColor: string | undefined

    constructor(mount: HTMLElement) {
        this.canvas = document.createElement("canvas") as HTMLCanvasElement
        window.addEventListener("resize", () => {
            this.resizeCanvas(this.canvas)
        })
        this.resizeCanvas(this.canvas)
        this.ctx = this.canvas.getContext("2d")
        mount.appendChild(this.canvas)
    }

    public setClearColor(color: string) {
        this.clearColor = color
    }

    public clearScreen() {
        // TODO: figure out if this needs to change with a camera
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (!this.clearColor) return
        this.ctx.fillStyle = this.clearColor
        const background = new Path2D()
        background.rect(0, 0, this.canvas.width, this.canvas.height)
        background.closePath()
        this.ctx.fill(background)
    }

    public drawShape(x: number, y: number, shape: Shape, color: string) {
        if (shape.type === "circle") {
            const circle = shape as Circle
            this.drawCircle(x, y, circle.radius, color)
        } else if (shape.type === "rectangle") {
            const rectangle = shape as Rectangle
            this.drawRectangle(x, y, rectangle.width, rectangle.height, color)
        }
    }

    public drawCircle(x: number, y: number, radius: number, color: string) {
        // TODO:
        const circle = new Path2D()
        circle.ellipse(x, y, radius, radius, 0, 0, 360, false)
        circle.closePath()
        this.ctx.fillStyle = color
        this.ctx.fill(circle)
    }

    public drawRectangle(x: number, y: number, width: number, height: number, color: string) {
        // TODO
    }

    private resizeCanvas(canvas: HTMLCanvasElement) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

}