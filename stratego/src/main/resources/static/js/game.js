// Turn 0 = Setup
// Turn 1 = Player 1 and Turn 2 = Player 2 and so on....
$(function() {
    playGame(initGame(setMap()));
});

// Game Loop
function playGame(game) {

    // Render Map
    renderMap(game);

    // Setup Pieces
    playerTurn(0, game);
}

function initGame(Map) {
    var p1pieces = [];
    var p2pieces = [];

    // Add 1 Marshall
    p1pieces.push(makePiece("9"));
    p2pieces.push(makePiece("9"));

    // Add 1 General
    p1pieces.push(makePiece("8"));
    p2pieces.push(makePiece("8"));

    // Add 2 Marshall
    for (var i = 0; i < 2; i++) {
        p1pieces.push(makePiece("7"));
        p2pieces.push(makePiece("7"));
    }

    // Add 3 Major
    for (var i = 0; i < 3; i++) {
        p1pieces.push(makePiece("6"));
        p2pieces.push(makePiece("6"));
    }

    // Add 4 Captains
    for (var i = 0; i < 4; i++) {
        p1pieces.push(makePiece("5"));
        p2pieces.push(makePiece("5"));
    }

    // Add 4 Lieutenants
    for (var i = 0; i < 4; i++) {
        p1pieces.push(makePiece("4"));
        p2pieces.push(makePiece("4"));
    }

    // Add 4 Sergeants
    for (var i = 0; i < 4; i++) {
        p1pieces.push(makePiece("3"));
        p2pieces.push(makePiece("3"));
    }

    // Add 5 Miners
    for (var i = 0; i < 5; i++) {
        p1pieces.push(makePiece("2"));
        p2pieces.push(makePiece("2"));
    }

    // Add 8 Scouts
    for (var i = 0; i < 8; i++) {
        p1pieces.push(makePiece("1"));
        p2pieces.push(makePiece("1"));
    }

    // Add 1 Spy
    p1pieces.push(makePiece("S"));
    p2pieces.push(makePiece("S"));

    // Add 6 Bombs
    for (var i = 0; i < 6; i++) {
        p1pieces.push(makePiece("B"));
        p2pieces.push(makePiece("B"));
    }

    // Add 1 Flag
    p1pieces.push(makePiece("F"));
    p2pieces.push(makePiece("F"));


    var game = {
        map: Map,
        p1: p1pieces,
        p2: p2pieces
    }

    console.log(game);
    return game;
};

function makePiece(charVal) {
    var piece = {
        placed: false,
        lost: false,
        x: -1,
        y: -1,
        value: "",
        id: ""
    }

    switch (charVal) {
        case "1":
            piece.value = "1";
            piece.id = "Scout";
            break;
        case "2":
            piece.value = "2";
            piece.id = "Miner";
            break;
        case "3":
            piece.value = "3";
            piece.id = "Sergeant";
            break;
        case "4":
            piece.value = "4";
            piece.id = "Lieutenant";
            break;
        case "5":
            piece.value = "5";
            piece.id = "Captain";
            break;
        case "6":
            piece.value = "6";
            piece.id = "Major";
            break;
        case "7":
            piece.value = "7";
            piece.id = "Colonel";
            break;
        case "8":
            piece.value = "8";
            piece.id = "General";
            break;
        case "9":
            piece.value = "9";
            piece.id = "Marshall";
            break;
        case "B":
            piece.value = "B";
            piece.id = "Bomb";
            break;
        case "F":
            piece.value = "F";
            piece.id = "Flag";
            break;
        case "S":
            piece.value = "S";
            piece.id = "Spy";
            break;
    }

    return piece;
}

// Set the Map
function setMap() {
    var map = Array.from(Array(10), () => Array(10));

    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            if (((1 < x && x < 4) || (5 < x && x < 8)) && (3 < y && y < 6)) {
                map[y][x] = -1;
            } else {
                map[y][x] = 0;
            }

        }
    }

    return map;
}

// Prints Map
function renderMap(game) {

    var table = $("<table></table>");
    table.attr("class", "gameBoard");
    var n = 10;
    var m = 10;

    for (i = 0; i < n; i++) {
        var row = $("<tr></tr>");
        for (j = 0; j < m; j++) {
            var block = $("<td></td>");
            var mapVal = game.map[i][j];
            if (mapVal == -1) {
                block.attr("class", "noMove 'X" + j + " Y" + i + "'");
            } else {
                block.attr("class", "empty 'X" + j + " Y" + i + "'");
            }
            row.append(block);
        }
        table.append(row);
    }

    $("#gameBoard").append(table);

    // Takes Pieces from array and sets on board
    // 0 - Empty
    // 1 -     
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
function validTurn(game, piece, nextX, nextY) {
    // cant move diagnol
    // cant move back and forth 3 consecutive turns
    // cant move if bomb or flag
    // can only move one unless scout
    return false;
}

// Logic for taking a piece
function attack(game, piece, X, Y) {
    // 2- Bomb > S
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