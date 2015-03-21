function drawSquare(event) {
// Our function takes the event object as a parameter
var myCanvas=document.getElementById("myCanvas");
// obtain the coordinates with respect to the canvas
var x = event.clientX - myCanvas.offsetLeft;
var y = event.clientY - myCanvas.offsetTop;
// to access the canvas, we need its context
var myContext = myCanvas.getContext("2d");
// set the color to red
myContext.fillStyle="#FF0000";
// draw a 10 by 10 square starting at the click event position
myContext.fillRect(x, y, 10, 10);
}
document.getElementById("myCanvas").addEventListener("click", drawSquare, false);
