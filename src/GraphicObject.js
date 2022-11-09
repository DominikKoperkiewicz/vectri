
class GraphicObject {
    parent;
    fillColor;
    lineColor;
    lineWidth;
    shape;

    constructor(shape, parent) {
        this.parent = parent;
        this.fillColor = fillColorPicker.value;
        this.lineColor = lineColorPicker.value;
        this.lineWidth = lineWidthPicker.value;
        this.shape = shape;
        
        app.stage.addChild(this.parent);
        this.render();
    }

    render() {
        this.parent.clear();
        this.parent.beginFill(this.fillColor)
        .lineStyle(this.lineWidth, this.lineColor, 1)
        .drawShape(this.shape)
        .endFill();
    }
}

/* ********************* */
//test = new GraphicObject( new PIXI.Rectangle(0,0,100,200) );
//test.render();