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
		this.direction = direction;
		this.enemyValue = null;
	}
}

class Piece {
	// This will contain a value
	constructor(value) {
		this.captureArray = []; // Array of capture objects, capture object contains direction, enemyValue 
		this.value = value; //This should change

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
		piece = new Piece(boardValues[j]); //Initialize piece with value
		for (var i = 0; i < pieces.length; i++) {
			//Push 4 capture objects onto piece.captureArray
			for (var j = 0; i < 4; j++) {
				temp = new Capture(j);
				piece.captureArray.push(temp);
			}
		}
		pieces.push(piece);
	}
}

function getValue() {
	//For all pieces
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
	}
	//Otherwise find the worst value and try to run away
	//If both bestValue and worstValue are null, pick a random piece and move it in a random direction
}
