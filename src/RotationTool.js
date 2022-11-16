
class RotationTool extends Tool {

    objectReference = null;
    grabPoint = { x: 0, y: 0 };
    angle = 0;

    constructor() {
        super();
    }

    objectPressed(object, event) {
        if( event.data.button === 0) {
            this.objectReference = object;
            this.grabPoint.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x)/ Camera.zoom + app.stage.pivot.x - object.obj.shape.x;
            this.grabPoint.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y)/ Camera.zoom + app.stage.pivot.y - object.obj.shape.y;
            console.log(object);
            this.angle = object.rotation;
        }
    }

    pointerDown(event) {

    }
    
    mouseMove(event) {
        if(this.objectReference === null) { return; }

        let mouseX = ((app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x);
        let mouseY = ((app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y);

        let v = {x: this.objectReference.x - this.grabPoint.x , y: this.objectReference.y - this.grabPoint.y};
        let w = {x: this.objectReference.x - mouseX , y: this.objectReference.y - mouseY};

        //let ang = Math.acos((v.x*w.x + v.y*w.y) / (Math.sqrt(v.x*v.x + v.y*v.y) * Math.sqrt(w.x*w.x + w.y*w.y)));
        let ang = Math.atan2(v.x*w.y-v.y*w.x , v.x*w.x+v.y*w.y);

        this.objectReference.rotation = this.angle + ang;
        this.objectReference.obj.render();
    }

    pointerUp(event) {
        this.objectReference = null;
    }
}