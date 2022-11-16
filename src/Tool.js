
class Tool {
    constructor() {
        console.log("tool constructor");
    }

    objectPressed(object, event) {
        console.log("tool object pressed");
        //console.log(object);
    }
    
    pointerDown(event) {
        console.log("tool mouse down");
        //console.log(object);
    }

    mouseMove(event) {
        console.log("tool mouse move");
    }

    pointerUp(event) {
        console.log("tool mouse up");
    }
}