import { registerSettings } from './settings.js';
import { registerKeybindings } from './keybindings.js';
import { registerAPI } from './api.js';
import { addConfig } from './token_config.js';
import { addSpeedButton, addTerrainButton } from './token_hud.js';
import { getSW5eEnvironments } from './environments.js';
import { isTokenInCombat } from './util.js';
import { modifyPreviousMovementCost } from './movement_history.js';

//This function wraps Foundry's onDragLeftStart function.
//This function tracks if the last used movement option was teleportation to modify the movement history to the appropriate values.
let onDragLeftStart = async function (wrapped, ...args) {
	wrapped(...args);
	if (canvas != null) {
		const token = args[0].data.clones[0];
		const previousMovementMode = token.document.getFlag('elevation-drag-ruler-sw5e', 'movementMode');
		if (previousMovementMode == 'teleport' && isTokenInCombat(token.document) && game.settings.get('drag-ruler', 'enableMovementHistory') && game.modules.get('terrain-ruler')?.active) {
			const teleportCost = token.document.getFlag('elevation-drag-ruler-sw5e', 'teleportCost') || 0;
			modifyPreviousMovementCost(token, teleportCost);
		};
	}
}

//Register this module's settings to Foundry
Hooks.once('init', () => {
	registerSettings();
	registerKeybindings();
	registerAPI();
});

Hooks.once('canvasInit', () => {
	if (game.modules.get('enhanced-terrain-layer')?.active)
		libWrapper.register('elevation-drag-ruler-sw5e', 'canvas.terrain.getEnvironments', getSW5eEnvironments, libWrapper.OVERRIDE);
	if (game.settings.get('elevation-drag-ruler-sw5e', 'teleport'))
		libWrapper.register('elevation-drag-ruler-sw5e', 'Token.prototype._onDragLeftStart', onDragLeftStart, 'WRAPPER');
});

Hooks.on('renderTokenHUD', (app, html, data) => {
	const tokenDocument = app.object.document
	if (!game.settings.get('elevation-drag-ruler-sw5e', 'hideSpeedButton') && !tokenDocument.getFlag('elevation-drag-ruler-sw5e', 'hideSpeedButton') && game.user.role >= game.settings.get('elevation-drag-ruler-sw5e', 'restrictSpeedButton'))
		addSpeedButton(tokenDocument, html);
	if (!game.settings.get('elevation-drag-ruler-sw5e', 'hideTerrainButton') && !tokenDocument.getFlag('elevation-drag-ruler-sw5e', 'hideTerrainButton') && game.modules.get('terrain-ruler')?.active && game.user.role >= game.settings.get('elevation-drag-ruler-sw5e', 'restrictTerrainButton'))
		addTerrainButton(tokenDocument, html);
});

Hooks.on('renderTokenConfig', (config, html) => {
	addConfig(config, html);
});