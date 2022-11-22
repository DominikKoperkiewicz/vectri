
class EllipseTool extends Tool {

    objectReference = null;
    grabPoint = { x: 0, y: 0 };

    constructor() {
        super();
    }

    pointerDown(event) {
        if(event.button != 0) { return; }
        this.grabPoint.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x;
        this.grabPoint.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y;
        let elli = new PIXI.Ellipse(this.grabPoint.x, this.grabPoint.y, 0, 0);
        this.objectReference = Factory.create(elli);
    }
    
    mouseMove(event) {
        if(this.objectReference === null) { return; }

        let mouseX = ((app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x);
        let mouseY = ((app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y);

        this.objectReference.obj.shape.width = Math.abs(mouseX - this.grabPoint.x);
        this.objectReference.obj.shape.height = Math.abs(mouseY - this.grabPoint.y);

        if(Program.isCtrlPressed) {
            this.objectReference.obj.shape.width = Math.min((this.objectReference.obj.shape.width), (this.objectReference.obj.shape.height));
            this.objectReference.obj.shape.height = Math.min((this.objectReference.obj.shape.width), (this.objectReference.obj.shape.height));
        }

        this.objectReference.obj.render();
    }

    pointerUp(event) {
        if(event.button != 0 || this.objectReference === null) { return; }
        
        let mouseX = ((app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x);
        let mouseY = ((app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y);

        if(Math.abs(mouseX - this.grabPoint.x) < 10 / Camera.zoom || 
           Math.abs(mouseY - this.grabPoint.y) < 10 / Camera.zoom ) {
            this.objectReference.destroy();
            this.objectReference = null;
            return;
        }
        
        if(this.objectReference.obj.shape.width < 0) {
            this.objectReference.obj.shape.x = mouseX;
            this.objectReference.obj.shape.width = -mouseX + this.grabPoint.x;
        }
        if(this.objectReference.obj.shape.height < 0) {
            this.objectReference.obj.shape.y = mouseY;
            this.objectReference.obj.shape.height = -mouseY + this.grabPoint.y;
        }

        this.objectReference.position.x = this.objectReference.obj.shape.x;
        this.objectReference.position.y = this.objectReference.obj.shape.y;
        this.objectReference.obj.shape.x =  0;
        this.objectReference.obj.shape.y =  0;

        this.objectReference.obj.render();
        this.objectReference = null;
    }
}