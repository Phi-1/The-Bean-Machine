# The Bean Machine
## How to start
Just add a file named script.js (or any other name if you know how to change it in the html) in the base folder, import game from dist/main.js, and get coding!

## Method reference
There are a lot of methods available on the game object you imported, here's a list of all the useful ones:

### addTicker(ticker)
Takes in a function that the game will execute every frame. This function can take an optional argument that the game will supply with the amount of time that has elapsed since the previous frame, also known as deltatime. This is useful for timers, or for making behaviour independent from the framerate.

### createObject(x, y, shape, color)
Creates a new object at position (x, y) and adds it to the game. Shape takes in either a Rectangle or Circle (imported from dist/shape.js), describes the hitbox of the object, and if you provide a color string in any valid css color format, the game will also render this shape to the screen. This function then returns the new object to you, so you can do whatever you want with it.

### mapLeftMouseButton(callback), mapRightMouseButton(callback)
Will call the provided callback function every frame while the user holds down their left or right mouse button.
The game object also contains mouse.x and mouse.y properties, which automatically update with the user's current mouse position.

### mapKey(key, callback)
Will call the provided callback function every frame while the user holds down the provided key. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key for valid key strings.

### setBackgroundColor(color)
Sets the background color of the game to the provided color string. Accepts any valid css color format.

### areColliding(object1, object2)
Returns true if the two objects' shapes overlap, false otherwise.

### setCameraPosition(x, y)
Sets the center of the camera to look at position (x, y).