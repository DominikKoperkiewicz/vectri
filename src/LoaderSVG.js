
class LoaderSVG {

    static fileInput = document.getElementById("file-input");
    static content = null;

    static load() {
      let elements = LoaderSVG.content.querySelectorAll('rect,ellipse,circle,path');
      elements.forEach((element)=>{
        switch(element.tagName) {
          case 'rect':
            LoaderSVG.decodeRectangle(element);
            break;
          case 'ellipse':
            LoaderSVG.decodeEllipse(element);
            break;
          case 'circle':
            LoaderSVG.decodeEllipse(element);
            break;
          case 'path':
            LoaderSVG.decodePath(element);
            break;
        }
      });

    }

    static loadFile(e) {
        let file = e.target.files[0];
        if (!file) {
            LoaderSVG.content = null;
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            LoaderSVG.content = e.target.result;
            LoaderSVG.content = "<div>" + LoaderSVG.content  + "</div>";
            LoaderSVG.content = LoaderSVG.createElementFromHTML(LoaderSVG.content.toString());
            LoaderSVG.load();
        };
        reader.readAsText(file);
      }

      static createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        return div.firstChild;
      }

      static decodeRectangle(element) {
        let newObject = Factory.create(new PIXI.Rectangle(0,0,0,0));
        LoaderSVG.setAttributes(element, newObject);
        newObject.obj.render();
        return;
      }

      static decodeEllipse(element) {
        let newObject = Factory.create(new PIXI.Ellipse(0,0,0,0));
        LoaderSVG.setAttributes(element, newObject);
        newObject.obj.render();
        return;
      }

      static decodePath(element) {
        let newObject = Factory.create(new Path());
        LoaderSVG.setAttributes(element, newObject);
        newObject.obj.render();
        return;
      }

      
      static setAttributes(element, newObject) {
        for(let i = 0; element.attributes[i] != undefined; i++) {
          let attribute = element.attributes[i];
          switch(attribute.name) {
            case 'x':
                newObject.pivot.x = -parseFloat(attribute.value);
              break;
            case 'y':
                newObject.pivot.y = -parseFloat(attribute.value);
              break;
            case 'cx':
                newObject.position.x = parseFloat(attribute.value);
              break;
            case 'cy':
                newObject.position.y = parseFloat(attribute.value);
              break;
            case 'rx':
                newObject.obj.shape.width = parseFloat(attribute.value);
              break;
            case 'ry':
                newObject.obj.shape.height = parseFloat(attribute.value);
              break;
            case 'r':
                newObject.obj.shape.width = parseFloat(attribute.value);
                newObject.obj.shape.height = parseFloat(attribute.value);
              break;
            case 'width':
                newObject.obj.shape.width = parseFloat(attribute.value);
              break;
            case 'height':
                newObject.obj.shape.height = parseFloat(attribute.value);
              break;
            case 'style':
              let str = '{' + LoaderSVG.css2json(attribute.value) + '"}';
              let json = JSON.parse(str);
              if(json.fill === "none") {
                newObject.obj.fillColor = 0xAAAAAA;
              } else {
                newObject.obj.fillColor = '0x' + json.fill.substr(1);
              }
              if(json.stroke === "none") {
                newObject.obj.lineWidth = 0;
              } else {
                newObject.obj.lineColor = '0x' + json.stroke.substr(1);
                newObject.obj.lineWidth = Number(json["stroke-width"]);
              }
              break;
            case 'transform':
                LoaderSVG.transformAttribute(attribute, newObject);
              break;
            case 'd':
              LoaderSVG.pathAttribute(attribute, newObject);
              break;
          }
        }
      }

      static css2json(str) {
        return str
          .replace(/(\w*:)/g, '$1"')
          .replace(/[;]/g, '";')
          .replace(/(\'{2,})/g, '"')
          .replace(/;/g, ',')
          .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:/g, '"$2": ')
          .replace(/,\s*\}/, '}')
          .trim();
      }
      static transform2json(str) {
        str = "{" + str
          .replaceAll("(", ":[")
          .replaceAll(" ", ",")
          .replaceAll("rotate", '"rotate"')
          .replaceAll("translate", '"translate"')
          .replaceAll(")", "]")
          .trim() + "}";
        return JSON.parse(str);
      }

      static transformAttribute(attribute, newObject) {
        let json = LoaderSVG.transform2json(attribute.value);
        if(json.rotate != undefined) {
          newObject.rotation = json.rotate[0]*Math.PI / 180;
        }
        if(newObject.obj.shape.type != 4) {return; }
        if(json.rotate[1] != undefined) { newObject.position.x = json.rotate[1]; }
        if(json.rotate[2] != undefined) { newObject.position.y = json.rotate[2]; }
      }

      static pathAttribute(attribute, newObject) {
        let str = ("[" + attribute.value + "]")
        .replaceAll(' ', ',')
        .replaceAll('m', '"m"')
        .replaceAll('l', '"l"')
        .replaceAll('c', '"c"')
        .replaceAll('q', '"q"')
        .replaceAll('z', '"z"')
        .replaceAll('M', '"M"')
        .replaceAll('L', '"L"')
        .replaceAll('C', '"C"')
        .replaceAll('Q', '"Q"')
        .replaceAll('Z', '"Z"');
        let arr = JSON.parse(str);
        console.log(arr);
        LoaderSVG.decodePathCommands(arr, newObject);
      }
      
      static decodePathCommands(arr, newObject) {
        let lastCommand = null;
        let path = newObject.obj.shape;
        let point = {"x": 0, "y": 0};
        for(let i = 0; i < arr.length; i++) {
          if(typeof(arr[i]) === "string") {
            lastCommand = arr[i];
          }
          else {
            switch(lastCommand) {
              case 'm':
                  point.x += arr[i];
                  i++;
                  point.y += arr[i];
                  path.addMoveTo(point.x, point.y);
                  break;
              case 'M':
                  point.x = arr[i];
                  i++;
                  point.y = arr[i];
                  path.addMoveTo(point.x, point.y);
                  break;
              case 'l':
                point.x += arr[i];
                i++;
                point.y += arr[i];
                path.addLine(point.x, point.y);
                break;
              case 'L':
                point.x = arr[i];
                i++;
                point.y = arr[i];
                path.addLine(point.x, point.y);
                break;
              case 'c':
                let p1 = {"x": 0, "y": 0};
                let p2 = {"x": 0, "y": 0};
                p1.x = point.x + arr[i];
                i++;
                p1.y = point.y + arr[i];
                i++;
                p2.x = point.x + arr[i];
                i++;
                p2.y = point.y + arr[i];
                i++;
                point.x = point.x + arr[i];
                i++;
                point.y = point.y + arr[i];
                path.addCubicCurve(p1.x, p1.y, p2.x, p2.y, point.x, point.y);
                break;
              case 'C':
                let p3 = {"x": 0, "y": 0};
                let p4 = {"x": 0, "y": 0};
                p3.x = arr[i];
                i++;
                p3.y = arr[i];
                i++;
                p4.x = arr[i];
                i++;
                p4.y = arr[i];
                i++;
                point.x = arr[i];
                i++;
                point.y = arr[i];
                path.addCubicCurve(p3.x, p3.y, p4.x, p4.y, point.x, point.y);
                break;
            }
          }

        }
        if(lastCommand === "z" || lastCommand === "Z") { path.addClosePath(); }
      }
}

LoaderSVG.fileInput.addEventListener('change', LoaderSVG.loadFile, false);