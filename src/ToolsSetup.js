Program.tool = new SelectTool();

document.getElementById("select-tool").addEventListener('mousedown', (e) => {
    Program.tool = new SelectTool();
    let tmp = document.getElementsByClassName("active")[0]
    if( tmp != undefined) tmp.classList.remove("active");
    e.target.classList.add("active");
});

document.getElementById("rectangle-tool").addEventListener('mousedown', (e) => {
    Program.tool = new RectangleTool();
    let tmp = document.getElementsByClassName("active")[0]
    if( tmp != undefined) tmp.classList.remove("active");
    e.target.classList.add("active");
});

document.getElementById("ellipse-tool").addEventListener('mousedown', (e) => {
    Program.tool = new EllipseTool();
    let tmp = document.getElementsByClassName("active")[0]
    if( tmp != undefined) tmp.classList.remove("active");
    e.target.classList.add("active");
});

document.getElementById("path-tool").addEventListener('mousedown', (e) => {
    Program.tool = new PathTool();
    let tmp = document.getElementsByClassName("active")[0]
    if( tmp != undefined) tmp.classList.remove("active");
    e.target.classList.add("active");
});

document.getElementById("rotation-tool").addEventListener('mousedown', (e) => {
    Program.tool = new RotationTool();
    let tmp = document.getElementsByClassName("active")[0]
    if( tmp != undefined) tmp.classList.remove("active");
    e.target.classList.add("active");
});

document.getElementById("resize-tool").addEventListener('mousedown', (e) => {
    Program.tool = new ResizeTool();
    let tmp = document.getElementsByClassName("active")[0]
    if( tmp != undefined) tmp.classList.remove("active");
    e.target.classList.add("active");
});

canvas.addEventListener('mousedown', (e) => {
    Program.tool.pointerDown(e);
});
document.addEventListener('mouseup', (e) => {
    Program.tool.pointerUp(e);
});

document.addEventListener('mousemove', (e) => {
    Program.tool.mouseMove(e);
});

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case "Delete":
            if(Program.selected === null) { break; }
            Program.selected.destroy();
            Program.selected = null;
            break;
        case "Control":
            Program.isCtrlPressed = true;
            break;
        case "PageUp":
            Program.selected.zIndex++;
            break;
        case "PageDown":
            Program.selected.zIndex--;
            break;
    }

    //console.log(e.key);
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case "Control":
            Program.isCtrlPressed = false;
            break;
    }
});


document.getElementById("save-file").addEventListener('mousedown', () => {
    SaverSVG.saveFile();
});