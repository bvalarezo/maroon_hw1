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
let stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
let stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
let styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
let styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
let html = document.body.parentNode;
let htmlTop = html.offsetTop;
let htmlLeft = html.offsetLeft;
let selection = null;
let dragoffx = 0;
let dragoffy = 0;
let valid = false;
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

function drawPiecesInitial(ctx, images){
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

function handleMouseDown(e) {
	var mouse = getMouse(e);
	var mx = mouse.x;
	var my = mouse.y;
	var l = pieces.length;
	for (var i = l-1; i >= 0; i--) {
		if (pieces[i].currentX <= mx && pieces[i].currentX + pieces[i].currentWidth >= mx && pieces[i].currentY <= my && pieces[i].currentY + pieces[i].currentHeight >= my) {
			var mySel = pieces[i];
			// Keep track of where in the object we clicked
			// so we can move it smoothly (see mousemove)
			dragoffx = mx - mySel.x;
			dragoffy = my - mySel.y;
			dragging = true;
			selection = mySel;
			valid = false;
			console.log("REEE")
			return;
		}
		console.log("currentX = ", pieces[i].currentX, "currentY = ", pieces[i].currentY, "mx = ", mx, "my = ", my, "pieces[i] = ", pieces[i], "currentWidth = ", pieces[i].currentWidth, "currentHeight = ", pieces[i].currentHeight);
	}
	// havent returned means we have failed to select anything.
	// If there was an object selected, we deselect it
	if (selection) {
		selection = null;
		valid = false; // Need to clear the old selection border
	}
}
function handleMouseUp(e){
	isDragging=false;
}

function handleMouseMove(e) {
	if (isDragging){
		var mouse = getMouse(e);
		// We don't want to drag the object by its top-left corner, we want to drag it
		// from where we clicked. Thats why we saved the offset and use it here
		selection.x = mouse.x - dragoffx;
		selection.y = mouse.y - dragoffy;   
		valid = false; // Something's dragging so we must redraw
	}
}

function getMouse(e) {
	var element = canvas, offsetX = 0, offsetY = 0, mx, my;
	// Compute the total offset
	if (element.offsetParent !== undefined) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}
	// Add padding and border style widths to offset
	// Also add the <html> offsets in case there's a position:fixed bar
	offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
	offsetY += stylePaddingTop + styleBorderTop + htmlTop;

	mx = e.pageX - offsetX;
	my = e.pageY - offsetY;

	// We return a simple javascript object (a hash) with x and y defined
	return {x: mx, y: my};
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
$("#canvas").mousemove(function(e){handleMouseMove(e);});
board.src = "../../resources/static/assets/map.svg";
redButton.src = "../../resources/static/assets/redbutton.svg";
blueButton.src = "../../resources/static/assets/bluebutton.svg";
logo.src = "../../resources/static/assets/logo.svg";
pieces = generatePieces(pieces);
drawPiecesInitial(ctx, pieces);
let objects = [...pieces];
objects.push(redButton, blueButton, logo, board);
