let canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

let images = [];
let ctx = canvas.getContext('2d');
let redButton = new Image();
let blueButton = new Image();
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

function generateArray(array){
	for (var i = 0; i < 40; i++) {
		//40 pieces
		let temp = new Image();
		if (i == 0) {
			//1 flag
			temp.src = "../assets/stratego-flag.svg";
		} else if (i > 0 && i < 7) {
			//6 bombs
			temp.src = "../assets/stratego-bomb.svg";
		} else if (i == 7) {
			//1 spy
			temp.src = "../assets/stratego-spy.svg";
		} else if (i >= 8 && i < 16) {
			//8 scouts
			temp.src = "../assets/stratego-scout.svg";
		} else if (i >= 16 && i < 21) {
			//5 miners
			temp.src = "../assets/stratego-miner.svg";
		} else if (i >= 21 && i < 25) {
			//4 sergants
			temp.src = "../assets/stratego-sergeant.svg";
		} else if (i >= 25 && i < 29) {
			//4 lieutenants
			temp.src = "../assets/stratego-lieutenant.svg";
		} else if (i >= 29 && i < 33) {
			//4 captains
			temp.src = "../assets/stratego-captain.svg";
		} else if (i >= 33 && i < 36) {
			//3 majors
			temp.src = "../assets/stratego-major.svg";
		} else if (i >= 36 && i < 38) {
			//2 colonels
			temp.src = "../assets/stratego-colonel.svg";
		} else if (i == 38) {
			//1 general
			temp.src = "../assets/stratego-general.svg";
		} else if (i == 39) {
			//1 marshall
			temp.src = "../assets/stratego-marshal.svg";
		}
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
		ctx.drawImage(images[i], (i%5)*70, (Math.floor(i/5)*70)+150, 100, 100);
	}
}

function drawBoard(ctx, board) {
	if (!board.complete){
		setTimeout(function(){
				draw(ctx, board);
				}, 500);
	}

	ctx.drawImage(board, 150, 0);	
}

function drawRedButton(ctx, redButton) {
	if (!redButton.complete){
		setTimeout(function(){
				draw(ctx, redButton);
				}, 50);
	}
	ctx.drawImage(redButton, -30, 830, 175, 100);
}

function drawBlueButton(ctx, blueButton) {
	if (!blueButton.complete){
		setTimeout(function(){
				draw(ctx, blueButton);
				}, 50);
	}
	ctx.drawImage(blueButton, 1750, 0,175,100);
}

function drawLogo(ctx, logo) {
	if (!logo.complete){
		setTimeout(function(){
				draw(ctx, logo);
				}, 500);
	}

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
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// if the drag flag is set, clear the canvas and draw the image
	if(isDragging){
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		ctx.drawImage(img,canMouseX-128/2,canMouseY-120/2,128,120);
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

board.src = "../assets/map.svg";
redButton.src = "../assets/redbutton.svg";
blueButton.src = "../assets/bluebutton.svg";
logo.src = "../assets/logo.svg";
images = generateArray(images);
drawPieces(ctx, images);
