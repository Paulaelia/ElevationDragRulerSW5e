import { getTokenSpeeds } from './util.js';

export var keybindForceTeleport;

export function registerKeybindings() {
	game.keybindings.register('elevation-drag-ruler-sw5e', 'cycleMovement', {
		name: game.i18n.localize('SW5eDragRulerIntegration.keybindings.cycleMovement.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.keybindings.cycleMovement.hint'),
		onDown: handleCycleMovement,
		editable: [
			{
				key: 'BracketRight',
			},
		],
		precedence: -1,
	});

	game.keybindings.register('elevation-drag-ruler-sw5e', 'cycleMovementReverse', {
		name: game.i18n.localize('SW5eDragRulerIntegration.keybindings.cycleMovementReverse.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.keybindings.cycleMovementReverse.hint'),
		onDown: handleCycleMovementReverse,
		editable: [
			{
				key: 'BracketLeft',
			},
		],
		precedence: -1,
	});
}

function handleCycleMovement(event) {
	const tokens = canvas.tokens.controlled;
	tokens.forEach(token => {
		const tokenSpeeds = getTokenSpeeds(token.document);
		const selectedMovementMode = token.document.getFlag('elevation-drag-ruler-sw5e', 'selectedSpeed');
		var indexSpeed = 1;
		if (tokenSpeeds.includes(selectedMovementMode)) {
			indexSpeed = tokenSpeeds.indexOf(selectedMovementMode) + 1;
		};
		if (indexSpeed >= tokenSpeeds.length) {
			indexSpeed = 0;
		};
		const movementMode = tokenSpeeds[indexSpeed];
		token.document.setFlag('elevation-drag-ruler-sw5e', 'selectedSpeed', movementMode);
	});
};

function handleCycleMovementReverse(event) {
	const tokens = canvas.tokens.controlled;
	tokens.forEach(token => {
		const tokenSpeeds = getTokenSpeeds(token.document);
		const selectedMovementMode = token.document.getFlag('elevation-drag-ruler-sw5e', 'selectedSpeed');
		var indexSpeed = 1;
		if (tokenSpeeds.includes(selectedMovementMode)) {
			indexSpeed = tokenSpeeds.indexOf(selectedMovementMode) - 1;
		};
		if (indexSpeed < 0) {
			indexSpeed = tokenSpeeds.length - 1;
		};
		const movementMode = tokenSpeeds[indexSpeed];
		token.document.setFlag('elevation-drag-ruler-sw5e', 'selectedSpeed', movementMode);
	});
};