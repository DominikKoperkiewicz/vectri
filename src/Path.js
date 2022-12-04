
class Path {
        lines = new Array();
        isPath = true;
        type = 4;

        constructor() {
            
        }

        addMoveTo(x,y) {
            this.lines.push(
                {
                    type: 'M',
                    x: x,
                    y: y
                }
            );
        }

        addLine(x,y) {
            this.lines.push(
                {
                    type: 'L',
                    x: x,
                    y: y
                }
            );
        }

        addQuadraticCurve(cpX, cpY, toX, toY) {
            this.lines.push(
                {
                    type: 'Q',
                    cpX: cpX,
                    cpY: cpY,
                    toX: toX,
                    toY: toY
                }
            );
        }
        
        addCubicCurve(cpX, cpY, cpX2, cpY2, toX, toY) {
            this.lines.push(
                {
                    type: 'C',
                    cpX: cpX,
                    cpY: cpY,
                    cpX2: cpX2,
                    cpY2: cpY2,
                    toX: toX,
                    toY: toY
                }
            );
        }

        addClosePath() {
            this.lines.push(
                {
                    type: 'Z'
                }
            );
        }

        drawPath(graph) {
            this.lines.forEach((element) => {
                switch(element.type) {
                    case 'M':
                        graph.moveTo(element.x, element.y);
                        break;
                    case 'L':
                        graph.lineTo(element.x, element.y);
                        break;
                    case 'Q':
                        graph.quadraticCurveTo(element.cpX, element.cpY, element.toX, element.toY);
                        break;
                    case 'C':
                        graph.bezierCurveTo(element.cpX, element.cpY, element.cpX2, element.cpY2, element.toX, element.toY);
                        break;
                    case 'Z':
                        graph.closePath();
                        break;
                }
                
            });
        }
}