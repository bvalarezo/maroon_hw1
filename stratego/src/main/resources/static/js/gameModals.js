/* BUTTON
* Timestamp (String)
*
* MODAL 
* Timestamp (String)
* Player 1 (Human/AI) (boolean)
* Player 2 (AI) (String)
* Winner (-1 = nobody, 0 = Player 1, 1 = Player 2) (int)
* total turns (int)
*/

// pull json text from bryan

var jsonObjectList = JSON.parse(json);
var keys = Object.keys(jsonObjectList); //Create a list of keys
var gameTime;
var player1;
var player2 = "AI";
var winner;
var totalTurns;
keys.forEach(function(key, index) {
	
	var button = document.createElement("BUTTON");

	gameTime = key.timeStamp;	
	player1 = key.player;
	winner = key.winner;
	totalTurns = key.turn;

	button.innerHTML = "Game " + index;
	
	var modal = document.createElement("div");
	var closeButton = document.createElement("span");
	var gameTimeText = document.createElement("p");
	var playerText = document.createElement("p");
	var winnerText = document.createElement("p");
	var totalTurnsText = document.createElement("p");
	modal.className = "modal-content";
	closeButton.className = "x";
	closeButton.innerHTML = "&times;"
	gameTimeText.innerHTML = gameTime;
	playerText.innerHTML = player1;
	winnerText.innerHTML = winner;
	totalTurnsText.innerHTML = totalTurns;

	document.body.appendChild(button);
	document.body.appendChild(modal);
	modal.appendChild(closeButton);
	modal.appendChild(gameTimeText);
	modal.appendChild(playerText);
	modal.appendChild(winnerText);
	modal.appendChild(totalTurnsText);

});


