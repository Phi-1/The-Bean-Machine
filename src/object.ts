import { Shape } from "./shape"

export class GameObject {

    public x: number
    public y: number
    public shape: Shape
    public color: string

    constructor(x: number, y: number, shape: Shape, color: string) {
        this.x = x
        this.y = y
        this.shape = shape
        this.color = color
    }

}