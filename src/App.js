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
.drawRect(0, 0, 10, 10)
.endFill();

const rect2 = new Graphics();
rect.beginFill(0xAA0022)
.lineStyle(0.5, 0x000000, 1)
.drawRect(100, 100, 40, 20)
.endFill();

app.stage.addChild(rect);