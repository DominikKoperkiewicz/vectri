
class Factory {
    static create(shape) {
        let parent = new Graphics();
        parent.obj = new GraphicObject(shape, parent);
        parent.interactive = true;
        
        //addEvents(parent);
        parent.on('pointerdown', (e) => {
            if( e.data.button === 0 && Program.selected === parent) {
                Program.grabbed = true;
                Program.grabPoint.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x)/ Camera.zoom + app.stage.pivot.x - parent.obj.shape.x;
                Program.grabPoint.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y)/ Camera.zoom + app.stage.pivot.y - parent.obj.shape.y;
            } else if (Program.selected != parent){
                Program.selected = parent;
                fillColorPicker.value = '#' + parent.obj.fillColor.substr(2);
                lineColorPicker.value = '#' + parent.obj.lineColor.substr(2);
                lineWidthPicker.value = parent.obj.lineWidth;
            }
        });

        return parent;
    }

    addEvents(obj) {
        obj.on('pointerdown', () => {
            Program.selected = obj;
        });
    }
}

a = Factory.create( new PIXI.Rectangle(0,0,100,200) );
b = Factory.create( new PIXI.Circle(200,100,100) );