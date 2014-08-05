var a, b, c, d, e, f, p1, g, h, i, j, k, l, p2;
var slots = ["a", "b", "c", "d", "e", "f", "p1", "g", "h", "i", "j", "k", "l", "p2"];
var playerTurn = 1; // There are plans to make this random.

function initialize() {
	a=4, b=4, c=4, d=4, e=4, f=4, p1=0, g=4, h=4, i=4, j=4, k=4, l=4, p2=0;
	
	if (playerTurn === 1) {
		document.getElementById("p1Turn").style.color = "#ffcc00";
	}
	else {
		document.getElementById("p2Turn").style.color = "#ffcc00";
	}
	
	document.getElementById("a").value = a;
	document.getElementById("b").value = b;
	document.getElementById("c").value = c;
	document.getElementById("d").value = d;
	document.getElementById("e").value = e;
	document.getElementById("f").value = f;
	document.getElementById("p1").value = p1;
	document.getElementById("g").value = g;
	document.getElementById("h").value = h;
	document.getElementById("i").value = i;
	document.getElementById("j").value = j;
	document.getElementById("k").value = k;
	document.getElementById("l").value = l;
	document.getElementById("p2").value = p2;
}

function updateTurn() {
	if (playerTurn === 1) {
		playerTurn = 2;
	}
	else {
		playerTurn = 1;
	}
		
	if (playerTurn === 1) {
		document.getElementById("p1Turn").style.color = "#ffcc00";
		document.getElementById("p2Turn").style.color = "#ccc";
	}
	else {
		document.getElementById("p2Turn").style.color = "#ffcc00";
		document.getElementById("p1Turn").style.color = "#ccc";
	}
}

function distribute(clickedSlot, pebbles) {
	this.clickedSlot = clickedSlot;
	this.clickedSlot = slots.indexOf(clickedSlot);
	this.pebbles = pebbles;
	pebbles = parseInt(pebbles);
	currentSlot = slots.indexOf(clickedSlot);
	
	if (validateMove(clickedSlot, pebbles) === true) {
		
		// Pick up all the pebbles.
		document.getElementById(clickedSlot).value = 0;

		// Distribute them, checking for captures and extra turns.
		for (pebbles; pebbles >= 1; pebbles--) { // Don't use 'i' here!! (It's already a slot name.)
			currentSlot = slots.indexOf(slots[currentSlot]) + 1;
			
			// If currentSlot exceeds 13, then start over at 0
			if (currentSlot > 13) {
				currentSlot = 0;
			}
			
			// Place a pebble in the current slot.
			document.getElementById(slots[currentSlot]).value = parseInt(document.getElementById(slots[currentSlot]).value) + 1;
			
			// Get the last slot (used to check for captures and extra turns)
			if (pebbles === 1) {
				lastSlot = currentSlot;
			}
		}
		
		// Captures?
		if (parseInt(document.getElementById(slots[lastSlot]).value) === 1 && checkSlotOwner() && checkAdjacent()) {
			alert("Capture!");
			opponentPebbles = document.getElementById(slots[adjacent]).value;
			document.getElementById(slots[lastSlot]).value = 0;
			document.getElementById(slots[adjacent]).value = 0;
			if (playerTurn === 1) {
				document.getElementById(slots[6]).value = parseInt(document.getElementById(slots[6]).value) + parseInt(opponentPebbles) + 1;
			}
			else if (playerTurn === 2) {
				document.getElementById(slots[13]).value = parseInt(document.getElementById(slots[13]).value) + parseInt(opponentPebbles) + 1;
			}
			else {
				console.log("Error qd412");
			}
		}
		
		// Extra Turn?
		if (playerTurn === 1 && lastSlot === 6) {
			playerTurn = 1;
		}
		else if (playerTurn === 2 && lastSlot === 13) {
			playerTurn = 2;
		}
		else {
			updateTurn();
		}
		
		checkEndGame();
	}
}

function validateMove(clickedSlot, pebbles) {
	if (playerTurn === 1 && (currentSlot === 0 || currentSlot === 1 || currentSlot === 2 || currentSlot === 3 || currentSlot === 4 || currentSlot === 5)) {
		if (pebbles === 0) {
			alert("There are no pebbles there!");
			return false;
		}
		else {
			return true;
		}
	}
	else if (playerTurn === 2 && (currentSlot === 7 || currentSlot === 8 || currentSlot === 9 || currentSlot === 10 || currentSlot === 11 || currentSlot === 12)) {
		if (pebbles === 0) {
			alert("There are no pebbles there!");
			return false;
		}
		else {
			return true;
		}
	}
	else {
		alert("It's not your turn!");
		return false;
	}
}

function checkAdjacent() {
	switch (lastSlot) {
		case 0:
			adjacent = 12;
			break;
		case 1:
			adjacent = 11;
			break;
		case 2:
			adjacent = 10;
			break;
		case 3:
			adjacent = 9;
			break;
		case 4:
			adjacent = 8;
			break;
		case 5:
			adjacent = 7;
			break;
		// Case 6 is Player 1's scoring bank
		case 7:
			adjacent = 5;
			break;
		case 8:
			adjacent = 4;
			break;
		case 9:
			adjacent = 3;
			break;
		case 10:
			adjacent = 2;
			break;
		case 11:
			adjacent = 1;
			break;
		case 12:
			adjacent = 0;
			break;
		// Case 13 is Player 2's scoring bank
		default:
			console.log("Error poq2r");
	}
	if (document.getElementById(slots[adjacent]).value > 0) {
		return true;
	}
}

function checkSlotOwner() {
	if (playerTurn === 1 && (lastSlot === 0 || lastSlot === 1 || lastSlot === 2 || lastSlot === 3 || lastSlot === 4 || lastSlot === 5)) {
		return true;
	}
	else if (playerTurn === 2 && (lastSlot === 7 || lastSlot === 8 || lastSlot === 9 || lastSlot === 10 || lastSlot === 11 || lastSlot === 12)) {
		return true;
	}
	else {
		return false;
	}
}

function checkEndGame() {
	var done = false;
	
	if (playerTurn === 1) {
		if (parseInt(document.getElementById(slots[0]).value) === 0 && parseInt(document.getElementById(slots[1]).value) === 0 && parseInt(document.getElementById(slots[2]).value) === 0 && parseInt(document.getElementById(slots[3]).value) === 0 && parseInt(document.getElementById(slots[4]).value) === 0 && parseInt(document.getElementById(slots[5]).value) === 0) {
			done = true;
		}
	}
	else if (playerTurn === 2) {
		if (parseInt(document.getElementById(slots[7]).value) === 0 && parseInt(document.getElementById(slots[8]).value) === 0 && parseInt(document.getElementById(slots[9]).value) === 0 && parseInt(document.getElementById(slots[10]).value) === 0 && parseInt(document.getElementById(slots[11]).value) === 0 && parseInt(document.getElementById(slots[12]).value) === 0) {
			done = true;
		}
	}
	else {
		done = false;
	}
	
	if (done === true) {
		alert("One side of the board is empty, the game is over.");
		
		a = parseInt(document.getElementById("a").value);
		b = parseInt(document.getElementById("b").value);
		c = parseInt(document.getElementById("c").value);
		d = parseInt(document.getElementById("d").value);
		e = parseInt(document.getElementById("e").value);
		f = parseInt(document.getElementById("f").value);
		
		g = parseInt(document.getElementById("g").value);
		h = parseInt(document.getElementById("h").value);
		i = parseInt(document.getElementById("i").value);
		j = parseInt(document.getElementById("j").value);
		k = parseInt(document.getElementById("k").value);
		l = parseInt(document.getElementById("l").value);
		
		// Clean the remaining pebbles and put them into the correct scoring pits
		document.getElementById("p1").value = parseInt(document.getElementById(slots[6]).value) + a + b + c + d + e + f;
		document.getElementById("p2").value = parseInt(document.getElementById(slots[13]).value) + g + h + i + j + k + l;
		
		document.getElementById("a").value = 0;
		document.getElementById("b").value = 0;
		document.getElementById("c").value = 0;
		document.getElementById("d").value = 0;
		document.getElementById("e").value = 0;
		document.getElementById("f").value = 0;
		
		document.getElementById("g").value = 0;
		document.getElementById("h").value = 0;
		document.getElementById("i").value = 0;
		document.getElementById("j").value = 0;
		document.getElementById("k").value = 0;
		document.getElementById("l").value = 0;
		
		if (parseInt(document.getElementById(slots[6]).value) > parseInt(document.getElementById(slots[13]).value)) {
			alert("Congratulations, Player 1! You win!");
		}
		else if (parseInt(document.getElementById(slots[13]).value) > parseInt(document.getElementById(slots[6]).value)) {
			alert("Congratulations, Player 2! You win!");
		}
		else if (parseInt(document.getElementById(slots[6]).value) === parseInt(document.getElementById(slots[13]).value)) {
			alert("It's a tie!");
		}
		else {
			alert("Error d0lq8");
		}
	}
}
