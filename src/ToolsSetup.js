Program.tool = new SelectTool();

document.getElementById("select-tool").addEventListener('mousedown', () => {
    Program.tool = new SelectTool();
});

document.getElementById("rectangle-tool").addEventListener('mousedown', () => {
    Program.tool = new RectangleTool();
});

document.getElementById("rotation-tool").addEventListener('mousedown', () => {
    Program.tool = new RotationTool();
});

canvas.addEventListener('mousedown', (e) => {
    Program.tool.pointerDown(e);
});
document.addEventListener('mouseup', (e) => {
    Program.tool.pointerUp(e);
});

document.addEventListener('mousemove', (e) => {
    Program.tool.mouseMove(e);
    console.log(fillColorPicker.value);
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