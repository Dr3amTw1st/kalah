var a, b, c, d, e, f, p1, g, h, i, j, k, l, p2;
var slots = ["a", "b", "c", "d", "e", "f", "p1", "g", "h", "i", "j", "k", "l", "p2"];
var playerTurn = 1;

function initialize() {
	a=4, b=4, c=4, d=4, e=4, f=4, p1=0, g=4, h=4, i=4, j=4, k=4, l=4, p2=0;
	document.getElementById("playerTurn").innerHTML = "It is player " + playerTurn + "'s turn.";
	
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
	
	document.getElementById("playerTurn").innerHTML = "It is player " + playerTurn + "'s turn.";
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
			
			// This part is kind of complex... basically just place a pebble in the current slot.
			document.getElementById(slots[currentSlot]).value = parseInt(document.getElementById(slots[currentSlot]).value) + 1;
			
			// Get the last slot (used to check for captures and extra turns)
			if (pebbles === 1) {
				lastSlot = currentSlot;
			}
		}
		
		// Whose turn is it now?
		if (playerTurn === 1 && lastSlot === 6) {
			playerTurn = 1;
		}
		else if (playerTurn === 2 && lastSlot === 13) {
			playerTurn = 2;
		}
		else {
			updateTurn();
		}
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
