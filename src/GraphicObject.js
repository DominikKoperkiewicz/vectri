
class GraphicObject {
    static id = 0;
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
        parent.zIndex = GraphicObject.id;
        GraphicObject.id++;
        
        app.stage.addChild(this.parent);
        this.render();
    }

    render() {
        this.parent.clear();
        this.parent.beginFill(this.fillColor)
        .lineStyle(this.lineWidth, this.lineColor, 1);

        if(this.shape.isPath === true) {
            this.shape.drawPath(this.parent);
        }else{
            this.parent.drawShape(this.shape);
        }
        
        this.parent.endFill();
    }
}

/* ********************* */
//test = new GraphicObject( new PIXI.Rectangle(0,0,100,200) );
//test.render();