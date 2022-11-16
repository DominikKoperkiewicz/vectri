
class Factory {
    static create(shape) {
        let parent = new Graphics();
        parent.obj = new GraphicObject(shape, parent);
        parent.interactive = true;
        
        //addEvents(parent);
        parent.on('pointerdown', (e) => {
            Program.tool.objectPressed(parent, e);
        });
        return parent;
    }

    drawSelectionBox() {
        Program.selectionBox.clear();
        Program.selectionBox.beginFill(0xEEEEEE)
        .lineStyle()
        .drawRectangle();
    }
}

//a = Factory.create( new PIXI.Rectangle(0,0,100,200) );
//b = Factory.create( new PIXI.Circle(200,100,100) );