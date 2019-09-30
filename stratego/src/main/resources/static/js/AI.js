/* PIECE ARRANGEMENT
 * 6 2 2 5 2 6 3 10 2 6
 * 5 4 B S 9 2 7 7 8 2
 * 4 B 4 7 8 5 B 5 6 4
 * 2 3 B 2 3 B F B 3 3
 */

//33 movable pieces
//Each piece will be put on a hashmap
//bestValue is pieceValue - enemyValue
//For special characters S - Marshall = 11
//You can't find the value of a bomb
var bestPieceValue = null;
var worstPieceValue = null;
var bestValue = null;
var worstValue = null;
var pieces = []; //Array of piece objects
var boardValues = ['6','2','2','5','2','6','3','10','2','6','5','4','B','S','9','2','7','7','8','2','4','B','4','7','8','5','B','5','6','4','2','3','B','2','3','B','F','B','3','3'];
var directions = [0,1,2,3]; //0 = up, 1 = left, 2 = down, 3 = right

$(function() {
		//initialize enemy map
		map = initEnemyMap();
		generateArrays();
		});

function canCapture(piece) {
	//This loops through the captureArray and checks for a non arbitrary value	
	let captureArray = getCaptureArray(piece);
	for (let i = 0; i < captureArray.length; i++) {
		if (captureArray[i] != -11) {
			return true;
		}
	}
	return false;
}

function initEnemyMap() {
	var map = setMap();
	var initVal = 60;
	for (let i = initVal; i < 100; i++) {
		map[Math.floor(i/10)][i%10] = "1?";
	}
	return map;
}

function getCaptureArray(piece) {
	//Checks all 4 directions if a piece is within capture range and its values	
	//By default is -11 if no enemy piece is there
	var captureArray = [-11,-11,-11,-11];
	for (let i = 0; i < directions.length; i++) {
		if (directions[i] == 0) {
			//up
			if ((game.map[piece.y-1][piece.x])[0] == "1") {
				captureArray[i] = (game.map[piece.y-1][piece.x])[1];
			}
		} else if (direction[i] == 1) {
			//left
			if ((game.map[piece.y][piece.x-1])[0] == "1") {
				captureArray[i] = (game.map[piece.y][piece.x-1])[1];
			}
		} else if (direction[i] == 2) {
			//down
			if ((game.map[piece.y+1][piece.x])[0] == "1") {
				captureArray[i] = (game.map[piece.y+1][piece.x])[1];
			}
		} else if (direction[i] == 3) {
			//right
			if ((game.map[piece.y-1][piece.x])[0] == "1") {
				captureArray[i] = (game.map[piece.y][piece.x+1])[1];
			}
		}
	}
	return captureArray;
}

function findCaptureValue(piece) {
	//This function gets the best capture value if its greater than 0
	//Otherwise returns worst capture value
	//For individual piece
	//If this function returns 11 then there is no capture value
	let capArray = getCaptureArray(piece);	
	let bestCapValue = 11; //Highest possible number
	let worstCapValue = 11; //Highest possible number
	for (let i = 0; i < capArray.length; i++) {
		if (capArray[i] < bestCapValue && capArray[i] > 0) {
			//Choose the lowest difference in capture value but greater than 0
			bestCapValue = piece.value - capArray[i];
		}
		if (capArray[i] < worstCapValue) {
			worstCapValue = piece.value - capArray[i];
		}
	}

	if (bestCapValue < 11) {
		return bestCapValue;
	} else {
		return worstCapValue;
	}
}

function correlateValues(index, game) {
	//This correlates the values from boardValues to game.p2
	for (let i = 0; i < game.p2.length; i++) {
		if (boardValues[index] == game.p2[i].value && game.p2[i].placed == false) {
			return i;
		}
	}
}

function capture(piece, value) {
	//Execute capture	
	let direction = -1; //null by default
	//Search piece.captureArray for the value then move in that direction
	for (let i = 0; i < piece.captureArray.length; i++) {
		if (piece.value - piece.captureArray[i].enemyValue == value) {
			direction = piece.captureArray[i].direction;
		}
	}
	if (direction == 0) {
		piece.y -= 1;
	} else if (direction == 1) {
		piece.x -= 1;
	} else if (direction == 2) {
		piece.y += 1;
	} else if (direction == 3) {
		piece.x += 1;
	}
	//Update captureArray
	piece.captureArray[i].enemyPiece.lost = true;
	$.ajax({
type: "POST",
contentType: "application/json",
url: "/sendGameData",
data: JSON.stringify(piece),
dataType: 'json',
cache: false,
timeout: 600000,
success: function(data) {
var json = JSON.stringify(data, null, 4);
}
,
error: function(e) {

} 

});
}
function run(piece, value) {
	//Run in random direction
	let direction = -1; //null by default
	//Search piece.captureArray for the value then move in that direction
	for (let i = 0; i < piece.captureArray.length; i++) {
		if (piece.value - piece.captureArray[i].enemyValue == value) {
			direction = piece.captureArray[i].direction;
		}
	}
	if (direction == 0) {
		piece.y -= 1;
	} else if (direction == 1) {
		piece.x -= 1;
	} else if (direction == 2) {
		piece.y += 1;
	} else if (direction == 3) {
		piece.x += 1;
	}
	$.ajax({
type: "POST",
contentType: "application/json",
url: "",
data: JSON.stringify(piece),
dataType: 'json',
cache: false,
timeout: 600000,
success: function(data) {
var json = JSON.stringify(data, null, 4);

},
error: function(e) {

} 
});
}

function getValue() {
	//Generates the best valued moved for all pieces
	let bestValue = 0;
	let worstValue = 0;
	for (let i = 0; i < game.p2.length; i++) {
		if (canCapture(game.p2[i])) {
			let tempVal = findCapturePiece(game.p2[i]);
			if (tempVal > bestValue) {
				bestValue = tempVal; 
			}
			if (tempVal < worstValue) {
				worstValue = tempVal;
			}
		}
	}
	if (bestValue == 11) {
		//If no piece has a solified capture value then return worst value and run away
		return worstValue;
	} else {
		//Otherwise return bestValue
		return bestValue;
	}
}

function move(piece) {
	let captureArray = getCaptureArray(piece);
	for (let i = 0; i < directions.length; i++) {
		if (captureArray[i] == 0) {
			//Moves the game in the first direction that is available
			getPieceIndex(game, piece.id);
		}
	}
	//if all spots are taken then just do another piece
}

function attack(piece) {
	let value = findCaptureValue(piece);
	//If you can find a valid capture, capture with the most value
	if (value > 0 && value < 11) {
		capture(piece, value);
	} else if (value < 0) {
		run(piece, value);
	}
	//Otherwise find the worst value and try to run away
	//If both bestValue and worstValue are null, pick a random piece and move it in a random direction
	else {
		//Move random piece
		pieceToMove = game.p2[Math.random() * game.p2.length]; 
		move(pieceToMove)
	}
}
