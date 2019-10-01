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
var boardValues = ['6','2','2','5','2','6','3','10','2','6','5','4','B','1','9','2','7','7','8','2','4','B','4','7','8','5','B','5','6','4','2','3','B','2','3','B','F','B','3','3'];
var directions = [0,1,2,3]; //0 = up, 1 = left, 2 = down, 3 = right

$(function() {
		//initialize enemy map
		map = initEnemyMap();

		});

function canCapture(piece, game) {
	//This loops through the captureArray and checks for a non arbitrary value	
	let captureArray = getCaptureArray(piece, game);
	for (let i = 0; i < captureArray.length; i++) {
		if (captureArray[i] != -11 && captureArray[i] !== 0 && captureArray[i] != -1) {
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

function getCaptureArray(piece, game) {
	//Checks all 4 directions if a piece is within capture range and its values	
	//By default is -11 if no enemy piece is there
	//Only the AI is going to use this function so hard code player 2
	var captureArray = ["-11","-11","-11","-11"];
	var value = piece.value;
	for (let i = 0; i < directions.length; i++) {
		if (directions[i] == 0) {
			//up
			if (piece.Y > 0) {
				if (game.map[piece.Y-1][piece.X].substring(0,1) == "1") {
					captureArray[i] = game.map[piece.Y-1][piece.X];
				} else if (game.map[piece.Y-1][piece.X] == "0") {
					captureArray[i] = 0;
				} else if (game.map[piece.Y-1][piece.X] == "-1") {
					captureArray[i] = "-1";
				} 
			}
		} else if (directions[i] == 1) {
			//left
			if (piece.X > 0) {
				if (game.map[piece.Y][piece.X-1].substring(0,1) == "1") {
					captureArray[i] = game.map[piece.Y][piece.X-1];
				} else if (game.map[piece.Y][piece.X-1] == "0") {
					captureArray[i] = 0;
				} else if (game.map[piece.Y][piece.X-1] == "-1") {
					captureArray[i] = "-1";
				} 
			}

		} else if (directions[i] == 2) {
			//down
			if (piece.Y < 9) {
				if (game.map[piece.Y+1][piece.X].substring(0,1) == "1") {
					captureArray[i] = game.map[piece.Y+1][piece.X];
				} else if (game.map[piece.Y+1][piece.X] == "0") {
					captureArray[i] = 0;
				} else if (game.map[piece.Y+1][piece.X] == "-1") {
					captureArray[i] = "-1";
				} 
			}

		} else if (directions[i] == 3) {
			//right
			if (piece.X < 9) {
				if (game.map[piece.Y][piece.X+1].substring(0,1) == "1") {
					captureArray[i] = game.map[piece.Y][piece.X+1];
				} else if (game.map[piece.Y][piece.X+1] == "0") {
					captureArray[i] = 0;
				} else if (game.map[piece.Y][piece.X+1] == "-1") {
					captureArray[i] = "-1";
				}
			}
		}
	}
	return captureArray;
}

function findCaptureValue(piece, game) {
	//This function gets the best capture value if its greater than 0
	//Otherwise returns worst capture value
	//For individual piece
	//We either want the lowest positive best value or the lowest negative worst value
	let capArray = getCaptureArray(piece, game);	
	let bestCapValue = 11; //Highest possible number
	let worstCapValue = 11; //Highest possible number
	for (let i = 0; i < capArray.length; i++) {
		//This if statement will check if the index in the capture array is of better value and still positive (assuming combat)
		var value = parseCapValue(game, piece, capArray, i);
		if (capArray[i] >= 0) {
			//Only change bestCapValue if it is positive
			if (value < bestCapValue && typeof capArray[i] == "string") {
				//Choose the lowest difference in capture value but greater than 0
				//Need to find a way to differentiate between two pieces of equal value and just terrain (no combat)
				//equal value = string | just terrain = int 
				bestCapValue = piece.value - value;
			} else if (typeof capArray[i] == "number") {
				//This assumes walking through terrain
				bestCapValue = capArray[i];
				break;
			}
		}
		var worseValue = parseInt(piece.value) - parseInt(parseCapValue(game, piece, capArray, i));
		if (worseValue < worstCapValue && capArray[i] != -11 && typeof capArray[i] == "string") {
			//This checks for the worst value
			worstCapValue = worseValue; 
		}
	}

	if (bestCapValue >= 0 && bestCapValue != 11) {
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

function checkIfOnSideboard(id) {
	for (var i = 0; i < 8; i++) {
		if ($("#P2SideBoard").has("#player2" + id + i.toString())) {
			return ("#player2" + id);
		}
	}
}

function parseCapValue(game, piece, captureArray, index) {
	var str = ""
	if (captureArray[index] == "-1") {
		return -11;
	}
		if (index == 0) {
			//up
			if (piece.Y > 0) {
				str = game.map[piece.Y-1][piece.X];
			} else {
				return -11;
			}
		} else if (index == 1) {
			//left
			if (piece.X > 0) {
				str = game.map[piece.Y][piece.X-1];
			} else {
				return -11;
			}
		} else if (index == 2) {
			//down
			if (piece.Y < 9) {
				str = game.map[piece.Y+1][piece.X];
			} else {
				return -11;
			}
		} else if (index == 3) {
			//right
			if (piece.X < 9) {
				str = game.map[piece.Y][piece.X+1];
			} else {
				return -11;
			}
		}
	return str.substring(1,str.length);
}

function capture(piece, value, game) {
	//Execute capture
	let direction = -1; //null by default
	var capArray = getCaptureArray(piece, game);
	var id;
	//Search piece.captureArray for the value then move in that direction
	for (let i = 0; i < capArray.length; i++) {
		//Map to direction
		if (parseCapValue(game, piece, capArray, i) != "B" && parseCapValue(game, piece, capArray, i) != "F") {
			if (piece.value - parseInt(parseCapValue(game, piece, capArray, i)) == value) {
				direction = i; 
			}
		}
	}
	id = getPieceIndex(game, piece.id);
	if (direction == 0) {
		//up
		placePiece(2, id, game, piece.X, piece.Y-1);
	} else if (direction == 1) {
		//left
		placePiece(2, id, game, piece.X-1, piece.Y);
	} else if (direction == 2) {
		//down
		placePiece(2, id, game, piece.X, piece.Y+1);
	} else if (direction == 3) {
		//right
		placePiece(2, id, game, piece.X+1, piece.Y);
	}
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

function getBestValuePiece(game) {
	//Generates the best valued moved for all pieces
	var bestValue = -11; //Lowest possible value
	var worstValue = 11; //Highest possible value
	var bestPiece = null;
	var worstPiece = null;
	for (let i = 0; i < game.p2.length; i++) {
		if (canCapture(game.p2[i],game)) {
			//If you can capture, get the best/worst value out of capture array
			let tempVal = findCaptureValue(game.p2[i], game);
			if (tempVal > bestValue) {
				bestValue = tempVal; 
				bestPiece = game.p2[i];
			}
			if (tempVal < worstValue) {
				worstValue = tempVal;
				worstPiece = game.p2[i];
			}
		}
	}
	if (bestValue == -11) {
		//If no piece has a solid capture value then return worst valued piece and run away
		return worstPiece;
	} else {
		//Otherwise return bestValue
		return bestPiece;
	}
}

function getAIPiece(piece, game) {
	for (var i = 0; i < game.p2.length; i++) {
		if (game.p2[i].id == piece.id) {
			return game.p2[i];
		}
	}
}

function getAIPieceIndex(piece, game) {
	for (var i = 0; i < game.p2.length; i++) {
		if (game.p2[i].id == piece.id) {
			return i;
		}
	}
}

function move(piece, game) {
	let captureArray = getCaptureArray(piece, game);
	for (let i = directions.length - 1; i > 0; i--) {
		if (captureArray[i] == "0" && piece.value != "B" && piece.value != "F") {
			//Moves the piece in the first direction that is available
			if (i == 0) {
				//Move up
				placePiece(2, getAIPieceIndex(piece, game), game, piece.X.toString(), (piece.Y-1).toString());
				return 0;
			} else if (i == 1) {
				//Move left
				placePiece(2, getAIPieceIndex(piece, game), game, (piece.X-1).toString(), piece.Y.toString());
				return 0;
			} else if (i == 2) {
				//Move down
				placePiece(2, getAIPieceIndex(piece, game), game, piece.X.toString(), (piece.Y+1).toString());
				return 0;
			} else if (i == 3) {
				//Move right
				placePiece(2, getAIPieceIndex(piece, game), game, (piece.X+1).toString(), piece.Y.toString());
				return 0;
			}

		}
	}
	//if all spots are taken then just do another piece
	return -1;
}

function AIMove(game) {
	var piece = getBestValuePiece(game);

	if (piece == null) {
		//Move random piece
		var pieceToMove;
		pieceToMove = game.p2[Math.floor(Math.random() * game.p2.length)]; 
		while(move(pieceToMove, game) == -1) {
			pieceToMove = game.p2[Math.floor(Math.random() * game.p2.length)]; 
		}
		return;
	}

	var value = findCaptureValue(piece, game);
	//If you can find a valid capture, capture with the most value
	if (value >= 0 && value < 11) {
		capture(piece, value, game);
		return;
	} else if (value < 0) {
		run(piece, value);
		return;
	}
	//Otherwise find the worst value and try to run away
	//If both bestValue and worstValue are null, pick a random piece and move it in a random direction
}
