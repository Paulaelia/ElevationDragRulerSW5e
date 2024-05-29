import {getTokenSpeeds} from "./util.js"

//Cycles through the token's speeds when the 'Switch Speed' button is clicked.
async function onSpeedButtonClick(tokenDocument, html) {
	const speeds = getTokenSpeeds(tokenDocument);
	const oldSelectedSpeed = tokenDocument.getFlag('elevation-drag-ruler-sw5e', 'selectedSpeed');
	var indexSpeed = 1;
	if (speeds.includes(oldSelectedSpeed)) indexSpeed = (speeds.indexOf(oldSelectedSpeed) + 1) % speeds.length;
	const selectedSpeed = speeds[indexSpeed];
	await tokenDocument.setFlag('elevation-drag-ruler-sw5e', 'selectedSpeed', selectedSpeed);
	
	html.find('#switch-speed').remove();
	addSpeedButton(tokenDocument, html);
}

// Basic button factory.
function createButton(title, id, innerHTML, clickFunction) {
	const button = document.createElement('div');
	button.classList.add('control-icon');
	button.title = title;
	button.id = id;
	button.innerHTML = innerHTML;
	button.addEventListener('click', clickFunction);
	return button;
}

// Returns an icon name based on the selected speed.
function getSpeedButtonIcon(selectedSpeed) {
	var buttonIcon = 'arrows-up-down-left-right';

	switch (selectedSpeed) {
		case 'walk':
			buttonIcon = 'walking';
			break;
		case 'swim':
			buttonIcon = 'swimmer';
			break;
		case 'fly':
			buttonIcon = 'crow';
			break;
		case 'burrow':
			buttonIcon = 'mountain';
			break;
		case 'climb':
			buttonIcon = 'grip-lines';
			break;
	};

	return buttonIcon;
}

//Creates clickable buttons and adds it to the Token HUD.
export function addSpeedButton(tokenDocument, html) {
	const selectedSpeed = tokenDocument.getFlag('elevation-drag-ruler-sw5e', 'selectedSpeed');
	const buttonIcon = getSpeedButtonIcon(selectedSpeed);
	const speedButton = createButton('Switch Speed', 'switch-speed', `<i class="fas fa-${buttonIcon} fa-fw"></i>`, function() {onSpeedButtonClick(tokenDocument, html)});

	html.find('div.left').append(speedButton);
}