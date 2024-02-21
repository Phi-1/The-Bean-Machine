export class Shape {
    public static Rectangle = new Shape(0)
    public static Circle = new Shape(1)
    
    private ordinal: number
    private constructor(ordinal: number) {
        this.ordinal = ordinal
    }
}