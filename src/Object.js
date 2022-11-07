
class GraphicObject {
    parent;
    fillColor;
    lineColor;
    shape;

    constructor(_shape) {
        this.parent = new Graphics();
        this.fillColor = fillColorPicker.value;
        this.lineColor = lineColorPicker.value;
        this.shape = _shape;
        
        app.stage.addChild(this.parent);
    }

    render() {
        //this.parent.clear();
        this.parent.beginFill(this.fillColor)
        .lineStyle(4, this.lineColor, 1)
        .drawShape(this.shape)
        .endFill();
    }
}

/* ********************* */
test = new GraphicObject( new PIXI.Rectangle(0,0,100,200) );
test.render();