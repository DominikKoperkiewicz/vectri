Program.tool = new SelectTool();

document.getElementById("select-tool").addEventListener('mousedown', () => {
    Program.tool = new SelectTool();
});

document.getElementById("rectangle-tool").addEventListener('mousedown', () => {
    Program.tool = new RectangleTool();
});

document.getElementById("ellipse-tool").addEventListener('mousedown', () => {
    Program.tool = new EllipseTool();
});

document.getElementById("rotation-tool").addEventListener('mousedown', () => {
    Program.tool = new RotationTool();
});

document.getElementById("resize-tool").addEventListener('mousedown', () => {
    Program.tool = new ResizeTool();
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