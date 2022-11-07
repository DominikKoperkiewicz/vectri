
class Camera {
    static x = 0;
    static y = 0;
    static zoom = 1;
    static scrollDown = false;
}

app.stage.position.x = canvas.clientWidth * 0.5;
app.stage.position.y = canvas.clientHeight * 0.5;

canvas.addEventListener('wheel', (event) => {
    const zoomInSpeed = 1.1;
    const zoomOutSpeed = 1 / zoomInSpeed;

    app.stage.position.x = canvas.clientWidth * 0.5;
    app.stage.position.y = canvas.clientHeight * 0.5;

    if(event.deltaY > 0) {
        Camera.zoom = Math.max(0.0009765, Camera.zoom * zoomOutSpeed);
    }else{
        Camera.zoom = Math.min(1024, Camera.zoom * zoomInSpeed);
    }
    app.stage.scale.x = Camera.zoom;
    app.stage.scale.y = Camera.zoom;
});

canvas.addEventListener('mousedown', (event) => {
    if(event.button === 1) {
        Camera.x = event.clientX;
        Camera.y = event.clientY;
        Camera.scrollDown = true;
    }
});

document.addEventListener('mousemove', (event) => {
    if(Camera.scrollDown) {
        app.stage.pivot.x -= (event.clientX - Camera.x) / Camera.zoom;
        app.stage.pivot.y -= (event.clientY - Camera.y) / Camera.zoom;
        //app.stage.position.x += event.clientX - Camera.x;
        //app.stage.position.y += event.clientY - Camera.y;
        Camera.x = event.clientX;
        Camera.y = event.clientY;
    }
});

document.addEventListener('mouseup', (event) => {
    if(event.button === 1) {
        Camera.scrollDown = false;
    }
});