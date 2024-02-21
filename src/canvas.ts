export class Canvas {

    private readonly canvas: HTMLCanvasElement
    private readonly ctx: CanvasRenderingContext2D

    constructor(mount: HTMLElement) {
        this.canvas = document.createElement("canvas") as HTMLCanvasElement
        window.addEventListener("resize", () => {
            this.resizeCanvas(this.canvas)
        })
        this.resizeCanvas(this.canvas)
        this.ctx = this.canvas.getContext("2d")
        mount.appendChild(this.canvas)
    }

    private resizeCanvas(canvas: HTMLCanvasElement) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

}