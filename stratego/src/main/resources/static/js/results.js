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

$.ajax({
url: "/getGames",
type: "GET",
data: "application/json",
success: function(result) {
console.log(result);
var gameTime;
var player1;
var player2 = "AI";
var winner;
var totalTurns;

result.forEach(function(key, index) {

		var button = document.createElement("BUTTON");

		gameTime = key.timestamp;	
		player1 = key.owner;
		winner = key.winner;
		totalTurns = key.turns;

		button.innerHTML = "Game " + index;

		var modal = document.createElement("div");
		var closeButton = document.createElement("span");
		var gameTimeText = document.createElement("p");
		var winnerText = document.createElement("p");
		var totalTurnsText = document.createElement("p");
		var playerText = document.createElement("p");
		modal.className = "modal-content";
		closeButton.className = "x";
		closeButton.innerHTML = "&times;"
		gameTimeText.innerHTML = gameTime;
		if (winner == -1) {
			winnerText.innerHTML = "Winner : Nobody"
		} else if (winner == 0) {
			winnerText.innerHTML = "Winner : Player 1"
		} else {
			winnerText.innerHTML = "Winner : AI"
		}
		totalTurnsText.innerHTML = totalTurns;
		playerText.innerHTML = "Player 1 : " + player1;
		var leaderBoard = document.getElementById("leaderboard");
		leaderBoard.appendChild(button);
		document.body.appendChild(modal);
		modal.appendChild(closeButton);
		modal.appendChild(gameTimeText);
		modal.appendChild(playerText);
		modal.appendChild(winnerText);
		modal.appendChild(totalTurnsText);

});


},
error: function(e) {
	       console.log("this errored out");	
       }
});

