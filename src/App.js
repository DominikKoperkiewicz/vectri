const Application = PIXI.Application;

const app = new Application({
    resizeTo: document.getElementById("viewport"),
    width: 500,
    height: 500,
    transparent: false,
    antialias: true,
    backgroundColor: 0xffffff
});

document.getElementById("viewport").appendChild(app.view);

let surface = document.getElementById("viewport").children[0];

surface.style.position = "absolute";
