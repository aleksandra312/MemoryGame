const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	console.log('you just clicked', event.target);

	//change backgound color when clicking a card (amx is 2)
	let maxClicks = 2;
	changeStyleOnClick(event, maxClicks);

	//select clicked elements and compare if colors are the same
	let allClickedDivs = document.querySelectorAll('div:not([isMatch])[style]');
	let clickedColors = [];
	for (let clickedDiv of allClickedDivs) {
		const color = clickedDiv.style.backgroundColor;
		clickedColors.push(color);
	}

	if (clickedColors.length > 1) {
		let colorsMatch = allValuesSame(clickedColors);
		//hide the colors after 1 second if they are not a match
		if (!colorsMatch) {
			setTimeout(() => {
				for (let clickedDiv of allClickedDivs) {
					clickedDiv.removeAttribute('style');
				}
			}, 1000);
		} else {
			for (let clickedDiv of allClickedDivs) {
				clickedDiv.setAttribute('isMatch', 'true');
			}
		}
	}
}

//function to change background color of clicked cards
function changeStyleOnClick(event, maxClicks) {
	//get all color divs
	let allDivs = document.querySelectorAll('#game>div');
	let count = 0;
	for (let div of allDivs) {
		if (div.getAttribute('style') && !div.getAttribute('isMatch')) {
			count++;
		}
	}
	if (count < maxClicks) {
		if (event.target.tagName === 'DIV') {
			event.target.style.setProperty('background-color', event.target.className);
		}
	}
}

//function to compare values in an array
function allValuesSame(array) {
	if (array.length) {
		for (let i = 1; i < array.length; i++) {
			if (array[i] !== array[0]) {
				return false;
			}
		}
	} else {
		console.log('Cannot compare array values, array is empty!');
	}
	return true;
}

// when the DOM loads
createDivsForColors(shuffledColors);
