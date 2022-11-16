
class GraphicObject {
    parent;
    fillColor;
    lineColor;
    lineWidth;
    shape;

    constructor(shape, parent) {
        this.parent = parent;
        this.fillColor = '0x' + fillColorPicker.value.substr(1); //fillColorPicker.value;
        this.lineColor = '0x' + lineColorPicker.value.substr(1);  //lineColorPicker.value;
        this.lineWidth = parseFloat(lineWidthPicker.value);
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