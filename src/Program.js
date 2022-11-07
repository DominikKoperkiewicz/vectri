
class Program {
    //objectList = new Array();
    tool = new Select();
    selected = test;

    constructor() {
        console.log("Program");
    }
}

let program = new Program();

fillColorPicker.addEventListener('change', (e) => {
    program.selected.fillColor = '0x' + fillColorPicker.value.substr(1);
    program.selected.render();
});

lineColorPicker.addEventListener('change', (e) => {
    program.selected.lineColor = '0x' + lineColorPicker.value.substr(1);
    program.selected.render();
});