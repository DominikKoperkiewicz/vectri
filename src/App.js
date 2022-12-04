const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const app = new Application({
    resizeTo: document.getElementById("viewport"),
    width: 500,
    height: 500,
    transparent: false,
    antialias: true,
    backgroundColor: 0xffffff
});

app.stage.sortableChildren = true;

document.getElementById("viewport").appendChild(app.view);

let canvas = document.getElementById("viewport").children[0];

canvas.style.position = "absolute";

fillColorPicker = document.getElementById("fill-picker");
lineColorPicker = document.getElementById("line-picker");
lineWidthPicker = document.getElementById("line-width");

fillColorPicker.value = '#000000';
lineColorPicker.value = '#000000';
lineWidthPicker.value = '1';


/**************/
/*
g = new PIXI.Graphics();
poly = new PIXI.Polygon(new PIXI.Point(0,0), new PIXI.Point(50,0), new PIXI.Point(100,50)); //0,0,50,0,100,50
poly.closeStroke = false;
g.clear();
g.beginFill(0xAA2222)
.lineStyle(0.2, 0x000000, 1)
//.moveTo(-50,0)
//.bezierCurveTo(0,250,0,-100,200,0)
//.lineTo(0,-50)
//.quadraticCurveTo(-50,-50,100,100,200,0)
//.bezierCurveTo(200,-100,100,-200,50,-100)
.moveTo(50.04622,157.71248)
//.bezierCurveTo(33.67596,-12.2543,0,0, 5.799749,-24.60216)
// .bezierCurveTo(0,0, 33.67596,-12.2543, 5.799749,-24.60216)
//.quadraticCurveTo(0,0, 33.67596,-12.2543, 5.799749,-24.60216)

//.quadraticCurveTo(200,-100,100,-200,50,-100)
//.drawShape(poly)
//.drawPolygon(poly.points)
.endFill();

//app.stage.addChild(g);

g.interactive = true;
g.on('pointerdown', (e) => {
    console.log("TTT");
});
*/