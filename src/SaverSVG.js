
class SaverSVG {

    static saveFile() {
        let data = "<svg>\n" + SaverSVG.encodeStage() + "\n</svg>";

        console.log(data);

        let blob = new Blob(
            [data],
            {type: "text/plain"}
        );

        let url = window.URL.createObjectURL(blob);
        let anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "untitled.svg";
        anchor.click();

        window.URL.revokeObjectURL(url);
        document.removeChild(anchor);
    }

    static encodeStage() {
        let string = "";
        app.stage.children.forEach((element) => {
            switch(element.obj.shape.type) {
                case 1:
                    string += SaverSVG.encodeRectangle(element);
                    break;
                    
                case 3:
                    string += SaverSVG.encodeEllipse(element);
                    break;
                    
                case 4:
                    string += SaverSVG.encodePath(element);
                    break;
            }
        });
        return string;
    }

    static encodeRectangle(object) {
        let string = "<rect ";
        //string += "x=\"" + (-object.pivot.x) + "\" y=\"" + (-object.pivot.y) + "\" ";
        string += "x=\"" + (object.position.x) + "\" y=\"" + (object.position.y) + "\" ";
        string += "width=\"" + object.obj.shape.width + "\" height=\"" + object.obj.shape.height + "\" ";
        string += "transform=\"rotate(" + this.rad2deg(object.rotation) + " " + (object.position.x + object.pivot.x) + " " + (object.position.y + object.pivot.y) + ")\" ";
        string += "style=\"fill:#" + object.obj.fillColor.toString().substr(2) + ";stroke:#" + object.obj.lineColor.toString().substr(2) + ";stroke-width:" + object.obj.lineWidth + "\"";
        
        string += " />\n";
        return string;
    }

    static encodeEllipse(object) {
        let string = "<ellipse ";
        string += "cx=\"" + (object.position.x) + "\" cy=\"" + (object.position.y) + "\" ";
        string += "rx=\"" + object.obj.shape.width + "\" ry=\"" + object.obj.shape.height + "\" ";
        string += "transform=\"rotate(" + this.rad2deg(object.rotation) + " " + (object.position.x + object.pivot.x) + " " + (object.position.y + object.pivot.y) + ")\" ";
        string += "style=\"fill:#" + object.obj.fillColor.toString().substr(2) + ";stroke:#" + object.obj.lineColor.toString().substr(2) + ";stroke-width:" + object.obj.lineWidth + "\"";
        
        string += " />\n";
        return string;
    }

    static encodePath(object) {
        let string = "<path ";
        string += "transform=\"rotate(" + this.rad2deg(object.rotation) + " " + (/*object.position.x +*/ object.position.x) + " " + (/*object.position.y + */object.position.y) + ")\" ";
        string += "style=\"fill:#" + object.obj.fillColor.toString().substr(2) + ";stroke:#" + object.obj.lineColor.toString().substr(2) + ";stroke-width:" + object.obj.lineWidth + "\" ";

        string += "d=\"";
        object.obj.shape.lines.forEach((element) => {
            switch(element.type) {
                case "M":
                    string += "M " + (element.x + object.position.x) + " " + (element.y + object.position.y) + " ";
                    break;
                case "L":
                    string += "L " + (element.x + object.position.x) + " " + (element.y + object.position.y) + " ";
                    break;
                case "Q":
                    string += "Q ";
                    break;
                case "C":
                    string += "C " + (element.cpX + object.position.x) + " " + (element.cpY + object.position.y) + "," + (element.cpX2 + object.position.x) + " " + (element.cpY2 + object.position.y) + "," + (element.toX + object.position.x) + " " + (element.toY + object.position.y) + " ";
                    break;
                case "Z":
                    string += "Z";
                    break;
            }
        });

        string += "\" />\n";
        return string;
    }

    static rad2deg(val) {
        return val *(180/Math.PI);
    }
}