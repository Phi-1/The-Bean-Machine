
const imageFolder = "/assets/img"

export class Sprite {

    private readonly image: ImageData

    constructor(filename: string) {
        const imageHolder = document.createElement("img") as HTMLImageElement
        imageHolder.src
        // this.image = createImageBitmap()
    }

    private loadImageData(filename: string) {
        return new Promise((resolve, reject) => {
            
        })
    }

}

export class AnimatedSprite extends Sprite {

}