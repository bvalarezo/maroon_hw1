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
var boardValues = [6,2,2,5,2,6,3,10,2,6,5,4,B,S,9,2,7,7,8,2,4,B,4,7,8,5,B,5,6,4,2,3,B,2,3,B,F,B,3,3];

class Capture {
	constructor(direction) {
		//0 = Up
		//1 = Left
		//2 = Down
		//3 = Right
		this.direction = direction;
		this.enemyValue = null;
		this.enemyPiece = null;
	}
}

class Piece {
	// This will contain a value
	constructor(value, priority, x, y) {
		this.captureArray = []; // Array of capture objects, capture object contains direction, enemyValue 
		this.value = value; //This should change
		this.priority = priority;
		this.x = x;
		this.y = y;
		this.lost = false;
	}

	function canCapture() {
		//This loops through the captureArray and checks for a non arbitrary value		
		for (let i = 0; i < captureArray.length; i++) {
			if (captureArray[i].enemyValue != null) {
				return true;
			}
		}
		return false;
	}

	function findCaptureValue() {
		//This function gets the best capture value if its greater than 0
		//Otherwise returns worst capture value
		//For individual piece
		let capArray = this.captureArray;
		if (capArray != null) {
			let enemyPiece = null;
			let capObj = this.captureArray;
			bestPieceValue = -11; //Arbitrary default low number
			for (let i = 0; i < capObj.length; i++) {
				if (this.value - capObj[i].enemyValue > bestValue) {
					enemyPiece = capObj[i];
					bestPieceValue = this.value - capObj[i].enemyValue;
				}
			}
			return bestPieceValue; 
		} else {
			//if enemy values are unknown, return bestPieceValue (-11)
			return -11;
		}
	}
}

function generateArrays() {
	//This initializes the capture arrays of each piece
	for (var j = 0; j < boardValues.length; j++) {
		let priority = 2;
		if (boardValues[j] == 8 || boardValues[j] == 9 || boardValues[j] == 10) {
			priority = 1;
		}
		piece = new Piece(boardValues[j], priority, j%10, Math.floor(j/10)); //Initialize piece with value
		for (var i = 0; i < pieces.length; i++) {
			//Push 4 capture objects onto piece.captureArray
			for (var j = 0; i < 4; j++) {
				temp = new Capture(j);
				piece.captureArray.push(temp);
			}
		}
		if (piece.value != "F" && piece.value != "B") {
			if (piece.priority == 1) {
				// If priority is 1 only add to pieces array once
				pieces.push(piece);
			} else {
				// If priority is 2 add to pieces array twice
				pieces.push(piece);
				pieces.push(piece);
			}
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
	piece.captureArray[i].enemyPiece.lost = true;
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

		}
	},
	error: function(e) {
	
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

		}
	},
	error: function(e) {
	
	}); 

}

function getValue() {
	//Generates the best valued move for all pieces
	for (var i = 0; i < movablePieces.length; i++) {
		if (movablePieces[i].canCapture()) {
			if (findCapturePiece(movablePieces[i] > bestValue) {
				bestValue = findCapturePiece(movablePieces[i]);
			}
			if (findCapturePiece(movablePieces[i] < worstValue) {
			worstValue = findCapturePiece(movablePieces[i]);
			}
		}
	}
	if (bestValue <= 0) {
	//get the worst value then have that piece run away
	return worstValue;
	}	
}

function attack() {
	let value = findCaptureValue(piece);
	//If you can find a valid capture, capture with the most value
	if (value > 0) {
		capture(piece, value);
	} else if (value < 0) {
		run(piece, value);
	}
	//Otherwise find the worst value and try to run away
	//If both bestValue and worstValue are null, pick a random piece and move it in a random direction
	else {
		//Move random piece
		pieceToMove = pieces[Math.random()*pieces.length];
		move(pieceToMove)
	}
}
