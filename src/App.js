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

document.getElementById("viewport").appendChild(app.view);

let canvas = document.getElementById("viewport").children[0];

canvas.style.position = "absolute";


const rect = new Graphics();
rect.beginFill(0xAA33BB)
.lineStyle(4, 0x000000, 1)
.drawRect(200, 200, 100, 120)
.endFill();

app.stage.addChild(rect);