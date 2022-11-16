
class SelectTool extends Tool {
    grabPoint = { x: 0, y:0 };
    grabbed = false;

    constructor() {
        super();
        console.log("select constructor");
    }

    objectPressed(object, event) {
        if( event.data.button === 0 && Program.selected === object) {
            this.grabbed = true;
            //this.grabPoint.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x)/ Camera.zoom + app.stage.pivot.x - object.obj.shape.x;
            //this.grabPoint.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y)/ Camera.zoom + app.stage.pivot.y - object.obj.shape.y;
            this.grabPoint.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x)/ Camera.zoom + app.stage.pivot.x - object.position.x;
            this.grabPoint.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y)/ Camera.zoom + app.stage.pivot.y - object.position.y;
        } else if (Program.selected != object){
            Program.selected = object;
            fillColorPicker.value = '#' + object.obj.fillColor.substr(2);
            lineColorPicker.value = '#' + object.obj.lineColor.substr(2);
            lineWidthPicker.value = object.obj.lineWidth;
        }
    }
    
    pointerUp(event) {
        this.grabbed = false;
    }

    mouseMove(event) {
    if(!this.grabbed || Program.selected === null) { return; }
    
    Program.selected.position.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x - this.grabPoint.x;// (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x;
    Program.selected.position.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y - this.grabPoint.y;// (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y;
    
    //Program.selected.obj.shape.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x - this.grabPoint.x;// (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x;
    //Program.selected.obj.shape.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y - this.grabPoint.y;// (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y;
    Program.selected.obj.render();
    }
}