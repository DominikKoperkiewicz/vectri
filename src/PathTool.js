
class PathTool extends Tool {

    objectReference = null;
    grabPoint = { x: 0, y: 0 };
    released = false;

    constructor() {
        super();
    }

    pointerDown(event) {
        this.released = false;
        if(event.button != 0) { return; }
        let mouseX = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x;
        let mouseY = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y;
        if(this.objectReference === null) {
            this.grabPoint.x = mouseX;
            this.grabPoint.y = mouseY;
            this.objectReference = Factory.create(new Path());
            this.objectReference.obj.shape.addMoveTo(mouseX, mouseY);
            this.objectReference.obj.shape.addLine(mouseX, mouseY);
            return;
        }
        let last = this.objectReference.obj.shape.lines[this.objectReference.obj.shape.lines.length - 1];
        last.x = mouseX;
        last.y = mouseY;
        this.objectReference.obj.shape.addLine(mouseX, mouseY);
    
        if(Math.abs(this.grabPoint.x - mouseX) + Math.abs(this.grabPoint.y - mouseY) < 25 / Camera.zoom) {
            let tmp = this.objectReference.obj.shape.lines[this.objectReference.obj.shape.lines.length - 2]
            if(tmp.type === "C") {
                tmp.toX = this.grabPoint.x;
                tmp.toY = this.grabPoint.y;
            }else{
                this.objectReference.obj.shape.lines.pop();
            }
            this.objectReference.obj.shape.lines.pop();
            this.objectReference.obj.shape.addClosePath();
            this.objectReference.obj.render();

            if(this.objectReference.obj.shape.lines.length < 4 && tmp.type != "C") {
                this.objectReference.destroy();
            }
            this.objectReference = null;
        }
    }
    
    mouseMove(event) {
        if(this.objectReference === null) { return; }
        let last = this.objectReference.obj.shape.lines[this.objectReference.obj.shape.lines.length - 1];

        let mouseX = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x;
        let mouseY = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y;
        switch(last.type) {
            case 'L':
                last.x = mouseX;
                last.y = mouseY;
                if(!this.released) {
                    this.objectReference.obj.shape.lines.pop();
                    this.objectReference.obj.shape.addCubicCurve(mouseX, mouseY, mouseX, mouseY);

                }
                break;
            case 'C':
                if(!this.released) {
                    last.cpX = mouseX;
                    last.cpY = mouseY;
                    last.cpX2 = mouseX;
                    last.cpY2 = mouseY;
                    last.toX = mouseX;
                    last.toY = mouseY;
                    let tmp = this.objectReference.obj.shape.lines[this.objectReference.obj.shape.lines.length - 2]
                    if(tmp.type === 'C') {
                        tmp.cpX2 = 2 * tmp.toX - mouseX;
                        tmp.cpY2 = 2 * tmp.toY - mouseY;
                    }
                }else{
                    last.cpX2 = mouseX;
                    last.cpY2 = mouseY;
                    last.toX = mouseX;
                    last.toY = mouseY;
                }
                break;
        }
        if(Math.abs(this.grabPoint.x - mouseX) + Math.abs(this.grabPoint.y - mouseY) < 25 / Camera.zoom) {
            last.x = this.grabPoint.x;
            last.y = this.grabPoint.y;
        }
        this.objectReference.obj.render();
    }

    pointerUp(event) {
        this.released = true;
    }
}