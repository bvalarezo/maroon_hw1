// Turn 0 = Setup
// Turn 1 = Player 1 and Turn 2 = Player 2 and so on....
$(function() {
    playGame(setMap());
});

// Game Loop
function playGame(map) {

    // Render Map
    renderMap(map);

    // Setup Pieces
    playerTurn(0, map);
}

// Set the Map
function setMap() {
    var map = Array.from(Array(10), () => Array(10));;

    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            map[x][y] = 0;
        }
    }

    return map;
}

// Prints Map
function renderMap(map) {
    console.log(map);
    // Takes Pieces from array and sets on board
    // Loads Grids and player sides
}

// Logic for Each Turn
function playerTurn(turnNumber, map) {

    // 0 is setup
    if (turnNumber == 0) {

    } else {
        // Select Piece
        // Lets player pick next move
        // Lets them know if not valid
        // If it is continues logic
        // If takes a pieces uses takePiece()
        // Else moves 
        // Updates piece and map
        // Check for win/lose
        // Send list of pieces to server of both player, piece moved, game won, whoWon
    }

}

// Check if Turn is Valid
function validTurn(map, piece, nextX, nextY) {
    // cant move diagnol
    // cant move back and forth 3 consecutive turns
    // cant move if bomb or flag
    // can only move one unless scout
    return false;
}

// Logic for taking a piece
function takePiece(map, piece, X, Y) {
    // Compares values
    // Removes Pieces
    // Sends win receipt if necessary and opens win modal
}

// Check if Someone Lost
function loseCondition() {
    var lose = false;

    // No pieces can move anymore

    return lose;
}

// Disables UI and displays modal
function endScreen(win) {
    // disables canvas below
    // if win then show win screen
    // if lose then show lose screen
}