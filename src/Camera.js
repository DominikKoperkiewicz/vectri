
class Camera {
    static x = 0;
    static y = 0;
    static zoom = 1;
    static scrollDown = false;
}

canvas.addEventListener('wheel', (event) => {
    const zoomInSpeed = 1.1;
    const zoomOutSpeed = 1 / zoomInSpeed;
    if(event.deltaY > 0) {
        Camera.zoom = Math.max(0.125, Camera.zoom * zoomOutSpeed);
    }else{
        Camera.zoom = Math.min(4, Camera.zoom * zoomInSpeed);
    }
    app.stage.scale.x = Camera.zoom;
    app.stage.scale.y = Camera.zoom;
    console.log(Camera.zoom);
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
        app.stage.position.x += event.clientX - Camera.x;
        app.stage.position.y += event.clientY - Camera.y;
        Camera.x = event.clientX;
        Camera.y = event.clientY;
    }
});

document.addEventListener('mouseup', (event) => {
    if(event.button === 1) {
        Camera.scrollDown = false;
    }
});