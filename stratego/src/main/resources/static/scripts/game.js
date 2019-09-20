let canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

let pieces = [];
let ctx = canvas.getContext('2d');
let redButton = new Image();
let blueButton = new Image();
let board = new Image();
let logo = new Image();
let canvasOffset=$("#canvas").offset();
let offsetX=canvasOffset.left;
let offsetY=canvasOffset.top;
let canvasWidth=canvas.width;
let canvasHeight=canvas.height;
let isDragging=false;

/*
 * 1 flag
 * 6 bomb
 * 1 spy
 * 8 scouts
 * 5 miners
 * 4 sergants
 * 4 lieutenants
 * 4 captains
 * 3 majors
 * 2 colonels
 * 1 general
 * 1 marshall
 */

function generatePieces(array){
	for (var i = 0; i < 40; i++) {
		//40 pieces
		let temp = new Image();
		if (i == 0) {
			//1 flag
			temp.src = "../../resources/static/assets/stratego-flag.svg";
		} else if (i > 0 && i < 7) {
			//6 bombs
			temp.src = "../../resources/static/assets/stratego-bomb.svg";
		} else if (i == 7) {
			//1 spy
			temp.src = "../../resources/static/assets/stratego-spy.svg";
		} else if (i >= 8 && i < 16) {
			//8 scouts
			temp.src = "../../resources/static/assets/stratego-scout.svg";
		} else if (i >= 16 && i < 21) {
			//5 miners
			temp.src = "../../resources/static/assets/stratego-miner.svg";
		} else if (i >= 21 && i < 25) {
			//4 sergants
			temp.src = "../../resources/static/assets/stratego-sergeant.svg";
		} else if (i >= 25 && i < 29) {
			//4 lieutenants
			temp.src = "../../resources/static/assets/stratego-lieutenant.svg";
		} else if (i >= 29 && i < 33) {
			//4 captains
			temp.src = "../../resources/static/assets/stratego-captain.svg";
		} else if (i >= 33 && i < 36) {
			//3 majors
			temp.src = "../../resources/static/assets/stratego-major.svg";
		} else if (i >= 36 && i < 38) {
			//2 colonels
			temp.src = "../../resources/static/assets/stratego-colonel.svg";
		} else if (i == 38) {
			//1 general
			temp.src = "../../resources/static/assets/stratego-general.svg";
		} else if (i == 39) {
			//1 marshall
			temp.src = "../../resources/static/assets/stratego-marshal.svg";
		}
		temp.isDragging = false;
		array.push(temp);
		$("#canvas").mousemove(function(e){handleMouseMove(e,ctx,temp);});
	}
	return array;
}

function drawPieces(ctx, images){
	for (var i = 0; i < images.length; i++){
		if (!images[i].complete){
			setTimeout(function(){
					draw(ctx, images[i]);
					}, 50);
		}
		images[i].currentX = (i%5)*70;
		images[i].currentY = (Math.floor(i/5)*70)+150;
		images[i].currentWidth = 100;
		images[i].currentHeight = 100;
		ctx.drawImage(images[i], (i%5)*70, (Math.floor(i/5)*70)+150, 100, 100);
	}
}

function drawBoard(ctx, board) {
	if (!board.complete){
		setTimeout(function(){
				draw(ctx, board);
				}, 500);
	}
	board.currentX = 150;
	board.currentY = 0;
	board.currentWidth = board.width;
	board.currentHeight = board.height;
	ctx.drawImage(board, 150, 0);	
}

function drawRedButton(ctx, redButton) {
	if (!redButton.complete){
		setTimeout(function(){
				draw(ctx, redButton);
				}, 50);
	}
	redButton.currentX = -30;
	redButton.currentY = 830;
	redButton.currentWidth = 175;
	redButton.currentHeight = 100;
	ctx.drawImage(redButton, -30, 830, 175, 100);
}

function drawBlueButton(ctx, blueButton) {
	if (!blueButton.complete){
		setTimeout(function(){
				draw(ctx, blueButton);
				}, 50);
	}
	blueButton.currentX = 1750;
	blueButton.currentY = 0;
	blueButton.currentWidth = 175;
	blueButton.currentHeight = 100;
	ctx.drawImage(blueButton, 1750, 0, 175,100);
}

function drawLogo(ctx, logo) {
	if (!logo.complete){
		setTimeout(function(){
				draw(ctx, logo);
				}, 500);
	}
	logo.currentX = 25;
	logo.currentY = -25;
	logo.currentWidth = 500;
	logo.currentHeight = 300;
	ctx.drawImage(logo, 25, -25, 500, 300);	
}

function handleMouseDown(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// set the drag flag
	isDragging=true;
}

function handleMouseUp(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// clear the drag flag
	isDragging=false;
}

function handleMouseOut(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// user has left the canvas, so clear the drag flag
	//isDragging=false;
}

function handleMouseMove(e, ctx, img){
	//We want to adjust it so it works for each individual object and keeps the other images drawn.
	//NOW WE GOT THE OBJECT ARRAY WITH ALL THE CURRENT X AND Y VALUES, NOW CREATE THE FOR LOOP CHECKING IF THE DRAGGED OBJECT IS BEING HOVERED OVER THE RADIUS OF OTHER OBJECTS
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// if the drag flag is set, clear the canvas and draw the image
	if(isDragging){
		ctx.clearRect(e.clientX-50,e.clientY-50,100,100);
		//only clear the area in which the image being drawn is located and redraw images that are within the path of it
		for (var i = 0; i < pieces.length; i++){
			//Now create a for loop checking each object in the pieces array and check if it needs to be redrawn 
			//detect mouse movement
			if (canMouseX-100/2 > pieces[i].currentX && canMouseX-100/2 < pieces[i].currentX + pieces[i].currentWidth && canMouseY-100/2 > pieces[i].currentY && canMouseY-100/2 < pieces[i].currentY + pieces[i].currentHeight) {
				//if its within X boundaries
				ctx.drawImage(pieces[i], pieces[i].currentX, pieces[i].currentY, pieces[i].currentWidth, pieces[i].currentHeight);
			}
		}
		ctx.drawImage(img,canMouseX-100/2,canMouseY-100/2,100,100);
	}
}

board.onload = function () {
	drawBoard(ctx, board);
}

redButton.onload = function () {
	drawRedButton(ctx, redButton);
}

blueButton.onload = function () {
	drawBlueButton(ctx, blueButton);
}

logo.onload = function () {
	drawLogo(ctx, logo);
}

$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

board.src = "../../resources/static/assets/map.svg";
redButton.src = "../../resources/static/assets/redbutton.svg";
blueButton.src = "../../resources/static/assets/bluebutton.svg";
logo.src = "../../resources/static/assets/logo.svg";
pieces = generatePieces(pieces);
drawPieces(ctx, pieces);
let objects = [...pieces];
objects.push(redButton, blueButton, logo, board);
