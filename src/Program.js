
class Program {
    static tool = null;
    //static selectionBox = new Graphics();
    static selected = null;
    static isCtrlPressed = false;
}


fillColorPicker.addEventListener('change', (e) => {
    if(Program.selected === null) { return; }
    if(Program.selected === null) { return; }
    Program.selected.obj.fillColor = '0x' + fillColorPicker.value.substr(1);
    Program.selected.obj.render();
});

lineColorPicker.addEventListener('change', (e) => {
    if(Program.selected === null) { return; }
    Program.selected.obj.lineColor = '0x' + lineColorPicker.value.substr(1);
    Program.selected.obj.render();
});

lineWidthPicker.addEventListener('change', (e) => {
    if(Program.selected === null) { return; }
    Program.selected.obj.lineWidth = parseFloat(lineWidthPicker.value); 
    Program.selected.obj.render();
});