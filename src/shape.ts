export type shapeType = "circle" | "rectangle"

export class Shape {
    public readonly type: shapeType
    constructor(type: shapeType) {
        this.type = type
    }
}

export class Circle extends Shape {

    public radius: number
    constructor(radius: number) {
        super("circle")
        this.radius = radius
    }

}

export class Rectangle extends Shape {

    public width: number
    public height: number
    constructor(width: number, height: number) {
        super("rectangle")
        this.width = width
        this.height = height
    }

}