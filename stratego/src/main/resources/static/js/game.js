// Turn 0 = Setup
// Turn 1 = Player 1 and Turn 2 = Player 2 and so on....

$(function() {
    // Render Map
    renderMap(initGame(setMap()));
});

function initGame(Map) {
    var p1pieces = [];
    var p2pieces = [];

    // Add 1 Marshall
    p1pieces.push(makePiece("9", "0"));
    p2pieces.push(makePiece("9", "0"));

    // Add 1 General
    p1pieces.push(makePiece("8", "0"));
    p2pieces.push(makePiece("8", "0"));

    // Add 2 Marshall
    for (var i = 0; i < 2; i++) {
        p1pieces.push(makePiece("7", i));
        p2pieces.push(makePiece("7", i));
    }

    // Add 3 Major
    for (var i = 0; i < 3; i++) {
        p1pieces.push(makePiece("6", i));
        p2pieces.push(makePiece("6", i));
    }

    // Add 4 Captains
    for (var i = 0; i < 4; i++) {
        p1pieces.push(makePiece("5", i));
        p2pieces.push(makePiece("5", i));
    }

    // Add 4 Lieutenants
    for (var i = 0; i < 4; i++) {
        p1pieces.push(makePiece("4", i));
        p2pieces.push(makePiece("4", i));
    }

    // Add 4 Sergeants
    for (var i = 0; i < 4; i++) {
        p1pieces.push(makePiece("3", i));
        p2pieces.push(makePiece("3", i));
    }

    // Add 5 Miners
    for (var i = 0; i < 5; i++) {
        p1pieces.push(makePiece("2", i));
        p2pieces.push(makePiece("2", i));
    }

    // Add 8 Scouts
    for (var i = 0; i < 8; i++) {
        p1pieces.push(makePiece("1", i));
        p2pieces.push(makePiece("1", i));
    }

    // Add 1 Spy
    p1pieces.push(makePiece("S", "0"));
    p2pieces.push(makePiece("S", "0"));

    // Add 6 Bombs
    for (var i = 0; i < 6; i++) {
        p1pieces.push(makePiece("B", i));
        p2pieces.push(makePiece("B", i));
    }

    // Add 1 Flag
    p1pieces.push(makePiece("F", "0"));
    p2pieces.push(makePiece("F", "0"));


    var game = {
        map: Map,
        p1: p1pieces,
        p2: p2pieces,
        turn: 0
    }

    return game;
};

function getSVG(piece, player) {
    var svg = $("<img>");

    if (player == 1) {
        svg.attr("class", ' piece');
        svg.attr("id", 'player1' + piece.id);
    } else {
        svg.attr("class", 'enemypiece');
        svg.attr("id", 'player2' + piece.id);
    }

    var charVal = piece.value;
    switch (charVal) {
        case "1":
            svg.attr("src", "../assets/stratego-scout.svg")
            break;
        case "2":
            svg.attr("src", "../assets/stratego-miner.svg")
            break;
        case "3":
            svg.attr("src", "../assets/stratego-sergeant.svg")
            break;
        case "4":
            svg.attr("src", "../assets/stratego-lieutenant.svg")
            break;
        case "5":
            svg.attr("src", "../assets/stratego-captain.svg")
            break;
        case "6":
            svg.attr("src", "../assets/stratego-major.svg")
            break;
        case "7":
            svg.attr("src", "../assets/stratego-colonel.svg")
            break;
        case "8":
            svg.attr("src", "../assets/stratego-general.svg")
            break;
        case "9":
            svg.attr("src", "../assets/stratego-marshal.svg")
            break;
        case "B":
            svg.attr("src", "../assets/stratego-bomb.svg")
            break;
        case "F":
            svg.attr("src", "../assets/stratego-flag.svg")
            break;
        case "S":
            svg.attr("src", "../assets/stratego-spy.svg")
            break;
    }

    return svg;
}

function makePiece(charVal, multiVal) {
    var piece = {
        placed: false,
        lost: false,
        X: -1,
        Y: -1,
        value: "",
        id: ""
    }

    switch (charVal) {
        case "1":
            piece.value = "1";
            piece.id = "Scout" + multiVal;
            break;
        case "2":
            piece.value = "2";
            piece.id = "Miner" + multiVal;
            break;
        case "3":
            piece.value = "3";
            piece.id = "Sergeant" + multiVal;
            break;
        case "4":
            piece.value = "4";
            piece.id = "Lieutenant" + multiVal;
            break;
        case "5":
            piece.value = "5";
            piece.id = "Captain" + multiVal;
            break;
        case "6":
            piece.value = "6";
            piece.id = "Major" + multiVal;
            break;
        case "7":
            piece.value = "7";
            piece.id = "Colonel" + multiVal;
            break;
        case "8":
            piece.value = "8";
            piece.id = "General" + multiVal;
            break;
        case "9":
            piece.value = "9";
            piece.id = "Marshall" + multiVal;
            break;
        case "B":
            piece.value = "B";
            piece.id = "Bomb" + multiVal;
            break;
        case "F":
            piece.value = "F";
            piece.id = "Flag" + multiVal;
            break;
        case "S":
            piece.value = "S";
            piece.id = "Spy" + multiVal;
            break;
    }

    return piece;
}

function placePiece(player, pieceIndex, game, newX, newY) {
    var piece;
    if (player == 1) {
        piece = game.p1[pieceIndex];
    } else {
        piece = game.p2[pieceIndex];
    }

    if (piece.placed == false) {
        if (player == 1 && newY < 10 && newY > 5 && newX < 10 && newX > -1 && isEmpty(newX, newY)) {
            //Player 1
            game.map[newY][newX] = player + piece.value;
            piece.X = newX;
            piece.Y = newY;
            piece.placed = true;
            return 0;
        } else if (player == 2 && newY > -1 && newY < 4 && newX < 10 && newX > -1 && isEmpty(newX, newY)) {
            //Player 2
            game.map[newY][newX] = player + piece.value;
            piece.X = newX;
            piece.Y = newY;
            piece.placed = true;
            return 0;
        } else {
            return -1;
        }
    } else if (piece.taken == true) {
        if (player == 1) {
            $("#P2SideBoard").append(getSVG(piece, 1));
            game.map[piece.Y][piece.X] = 0;
            piece.X = -1;
            piece.Y = -1;
        } else {
            $("#P1SideBoard").append(getSVG(piece, 2));
            game.map[piece.Y][piece.X] = 0;
            piece.X = -1;
            piece.Y = -1;
        }
        return 0;
    } else {
        if (piece.value == "1") {
            if (
                ((newX != piece.X && newY == piece.Y) ||
                    (newX == piece.X && newY != piece.Y)) &&
                newY < 10 && newY > -1 && newX < 10 && newX > -1 && isEmpty(newX, newY)) {
                game.map[newY][newX] = game.map[piece.Y, piece.X]
                game.map[piece.Y][piece.X] = 0
                piece.X = newX;
                piece.Y = newY;
                $("#X" + newX + "Y" + newY).append(getSVG(piece, player));
                return 0;
            } else {
                return -1;
            }
        } else if (
            ((newX == piece.X + 1 && newY == piece.Y + 0) ||
                (newX == piece.X - 1 && newY == piece.Y + 0) ||
                (newX == piece.X + 0 && newY == piece.Y + 1) ||
                (newX == piece.X + 0 && newY == piece.Y + 1)) &&
            newY < 10 && newY > -1 && newX < 10 && newX > -1 && piece.value != "B" && piece.value != "F" && isEmpty(newX, newY)) {
            game.map[newY][newX] = game.map[piece.Y][piece.X]
            game.map[piece.Y][piece.X] = 0
            piece.X = newX;
            piece.Y = newY;
            $("#X" + newX + "Y" + newY).append(getSVG(piece, player));
            return 0;
        } else {
            return -1;
        }
    }
}

// Check if spot is empty

function isEmpty(X, Y) {
    return $("#X" + X + "Y" + Y).hasClass("empty") || $("#X" + X + "Y" + Y).hasClass("noMove");
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
            block.attr("id", "X" + j + "Y" + i);
            if (mapVal == -1) {
                block.attr("class", "noMove boardPlace");
            } else {
                block.attr("class", "empty boardPlace");
            }
            row.append(block);
        }
        table.append(row);
    }

    $("#gameBoard").append(table);

    // Takes Pieces from array and sets on board
    for (var i = 0; i < game.p1.length; i++) {
        $("#P1SideBoard").append(getSVG(game.p1[i], 1));
    }

    for (var i = 0; i < game.p2.length; i++) {
        $("#P2SideBoard").append(getSVG(game.p2[i], 2));
    }

    playerTurn(0, game);
}

function getPieceIndex(game, dragId) {
    var id = dragId.substr(7);
    var player = dragId.substr(6, 1);

    if (player == 1) {
        for (var i = 0; i < game.p1.length; i++) {
            if (game.p1[i].id == id) {
                return i;
            }
        }
    } else {
        for (var i = 0; i < game.p2.length; i++) {
            if (game.p2[i].id == id) {
                return i;
            }
        }
    }
    return -1;
}

// Logic for Each Turn
function playerTurn(game) {
    var turnNumber = game.turnNumber;

    // 0 is setup
    if (turnNumber == 0) {

        $(".piece").each(function () {
            $(this).draggable({
                snap: ".boardPlace",
                revert: true,
                helper: "clone"
            });
        });

        $(".boardPlace").each(function () {
            $(this).droppable({
                drop: function (event, ui) {
                    var dragId = ui.draggable.attr("id");
                    var id = $(this).attr("id");
                    var Y = id.substr(id.length - 1);
                    var X = id.substr(id.length - 3, 1);
                    if (placePiece(1, getPieceIndex(game, dragId), game, X, Y) == 0) {
                        ui.draggable.detach().appendTo($(this));

                        $(ui.helper).remove();
                        $(ui.draggable).draggable("destroy");
                        $(this).droppable("destroy");

                        if ($("#P1SideBoard").children().length == 0) {
                            nextTurn(game);
                        }
                    }
                    for (int i = 0; i < boardValues.length; i++) {
                        index = correlateValues(j, game);
                        placePiece(2, index, game, j % 10, Math.floor(j / 10));
                    }
                }
            });
        });

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
        // cant move back and forth 3 consecutive turns
    }

}

// Iterator for turns
function nextTurn(game) {
    console.log(game);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/sendGameData",
        data: JSON.stringify(game),
        dataType: 'json'
    }).done(function (data) {
        console.log("Data Loaded!");
        game.turnNumber++;
        playerTurn(game);
    });

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
