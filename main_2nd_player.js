var turn = 1;
var player = 1;
var board_size = 3;
var won;

// cell creation
var game = document.getElementById("game");
var tbl = document.createElement("table");
var tblBody = document.createElement("tbody");
var cellID = 0;

for (var j = 0; j < board_size; j++) {
	// tr creation
	var row = document.createElement("tr");
	for (var i = 0; i < board_size; i++) {
		var cell = document.createElement("td");
		cell.id = cellID;
		cellID++;

		row.appendChild(cell);
	} tblBody.appendChild(row);
}
tbl.appendChild(tblBody);
game.appendChild(tbl);

// notifies whose turn it is and  when somebody wins
var display = document.createElement('h1');
document.body.appendChild(display);
display.innerHTML = playerLetter(turn) + " turn";

// sets up actual board array for checking who wins
var board = [];
for (var j = 0; j < board_size; j++) {
	board[j] = [];
	for (var i = 0; i < board_size; i++) {
		board[j][i] = '_';
	}
}

function clear_board() {
	for (var j = 0; j < board_size; j++) {
		for (var i = 0; i < board_size; i++) {
			board[j][i] = '_';
		}
	}
	for (var i = 0; i < cells.length; i++) {
		document.getElementById(i).innerText = ' ';
	}
	turn = 1;
	display.innerHTML = playerLetter(turn) + ' turn';
	won = false;
}

function playerLetter(turn) {
	player = turn % 2;
	return (player ? 'X' : 'O');
}

function click(cell) {
	show(cell.target.id);
}

function show(cellID) {
	var row = Math.trunc(cellID / 3); // j
	var col = Math.trunc(cellID % 3); // i

	if ((board[row][col] != '_') || (won)) {
		return;
	}

	display.innerHTML = playerLetter(turn + 1) + " turn";

	document.getElementById(cellID).innerText = playerLetter(turn);
	board[row][col] = playerLetter(turn);

	if (win(row, col, turn)) {
		display.innerHTML = playerLetter(turn) + " wins";
		won = true;
	}

	turn++;
}

function win(j, i, turn) {
	var letter = playerLetter(turn);
	if (_check_col(i, letter)) {
		return true;
	} if (_check_row(j, letter)) {
		return true;
	} if (_check_left_diagonal(letter)) {
		return true;
	} if (_check_right_diagonal(letter)) {
		return true;
	}
}

function _check_col(i, letter) {
	for (var j = 0; j < board_size; j++) {
		if (board[j][i] != letter) {
			return false;
		}
	} return true;
}

function _check_row(j, letter) {
	for (var i = 0; i < board_size; i++) {
		if (board[j][i] != letter) {
			return false;
		}
	} return true;
}

function _check_left_diagonal(letter) {
	for (var x = 0; x < board_size; x++) {
		if (board[x][x] != letter) {
			return false;
		}
	} return true;
}

function _check_right_diagonal(letter) {
	var i = 2;
	for (var j = 0; j < board_size; j++) { // [0][2], [1][1], [2][0]
		if (board[j][i] != letter) {
			return false;
		} i--;
	} return true;
}
	
const cells = document.querySelectorAll('td');

for (var i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", click, false); //"click", script, false
}
