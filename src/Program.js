
class Program {
    static tool = null;//new Select();
    static selected = null;
    static grabbed = false;
    static grabPoint = { x: 0, y:0 };
}


fillColorPicker.addEventListener('change', (e) => {
    if(Program.selected === null) { return; }
    Program.selected.obj.fillColor = '0x' + fillColorPicker.value.substr(1);
    Program.selected.obj.render();
});

lineColorPicker.addEventListener('change', (e) => {
    Program.selected.obj.lineColor = '0x' + lineColorPicker.value.substr(1);
    Program.selected.obj.render();
});

lineWidthPicker.addEventListener('change', (e) => {
    Program.selected.obj.lineWidth = parseFloat(lineWidthPicker.value); 
    Program.selected.obj.render();
});

document.addEventListener('mouseup', () => {
    Program.grabbed = false;
});

document.addEventListener('mousemove', () => {
    if(!Program.grabbed || Program.selected === null) { return; }

    Program.selected.obj.shape.x = (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x - Program.grabPoint.x;// (app.renderer.plugins.interaction.mouse.global.x - app.stage.position.x) / Camera.zoom + app.stage.pivot.x;
    Program.selected.obj.shape.y = (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y - Program.grabPoint.y;// (app.renderer.plugins.interaction.mouse.global.y - app.stage.position.y) / Camera.zoom + app.stage.pivot.y;
    Program.selected.obj.render();
});