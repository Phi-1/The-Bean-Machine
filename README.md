### The Bean Machine
# How to start
Just add a file named script.js (or any other name if you know how to change it in the html) in the base folder, import game from dist/main.js, and get coding!

# Method reference
There are a lot of methods available on the game object you imported, here's a list of all the useful ones:

    - addTicker(ticker: (dt?: number) => void)
    Takes in a function that the game will execute every frame. This function can take an optional argument that the game will supply with the amount of time that has elapsed since the previous frame, also known as deltatime. This is useful for timers, or for making behaviour independent from the framerate.

    - createObject(x: number, y: number, shape: Shape, color: string | null): GameObject
    Creates a new object at position (x, y) and adds it to the game. Shape describes the hitbox of the object, and if you provide a color in any valid css color format, the game will also render this object to the screen. This function then returns the new object to you, so you can whatever you want with it.

    - mapLeftMouseButton(callback: () => void), mapRightMouseButton(callback: () => void)
    Will call the provided callback function every frame if the user holds down their left or right mouse button.

    - mapKey(key: string, callback: () => void)
    Will call the provided callback function every frame if the user holds down the provided key. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key for valid key strings.

    - setBackgroundColor(color: string)
    Sets the background color of the game to the provided color string. Accepts any valid css color format.

    - areColliding(object1: GameObject, object2: GameObject): boolean
    Returns true if the two objects' hitboxes overlap, false otherwise.