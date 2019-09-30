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
success: function (result) {
console.log(result);
var gameTime;
var player1;
var player2 = "AI";
var winner;
var totalTurns;

result.forEach(function (key, index) {

		var button = document.createElement("BUTTON");

		gameTime = key.timestamp;
		player1 = key.owner;
		winner = key.winner;
		totalTurns = key.turns;
		//            board = key.boards;

		button.innerHTML = "Game " + index;

		var modal = document.createElement("div");
		var modalContent = document.createElement("div");
		modal.id = "modal" + index;
		modal.setAttribute("class", "modal");
		modal.style.display = "none";
		modalContent.setAttribute("class", "modal-content");
		var closeButton = document.createElement("span");
		var gameTimeText = document.createElement("p");
		var winnerText = document.createElement("p");
		var totalTurnsText = document.createElement("p");
		var playerText = document.createElement("p");
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
		var scroll = document.getElementsByClassName('scroll');
		button.id = "button" + index;
		button.onclick = function () {
			modal.style.display = "block";
		}
		closeButton.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		scroll[0].appendChild(button);
		document.body.appendChild(modal);
		modalContent.appendChild(closeButton);
		modalContent.appendChild(gameTimeText);
		modalContent.appendChild(playerText);
		modalContent.appendChild(winnerText);
		modalContent.appendChild(totalTurnsText);
		modal.appendChild(modalContent);
});


},
error: function (e) {
	       console.log("this errored out");
       }
});


