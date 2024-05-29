import { registerSettings } from './settings.js';
import { registerKeybindings } from './keybindings.js';
import { registerAPI } from './api.js';
import { addConfig } from './token_config.js';
import { addSpeedButton } from './token_hud.js';

//Register this module's settings to Foundry
Hooks.once('init', () => {
	registerSettings();
	registerKeybindings();
	registerAPI();
});

Hooks.on('renderTokenHUD', (app, html, data) => {
	const tokenDocument = app.object.document
	if (!game.settings.get('elevation-drag-ruler-sw5e', 'hideSpeedButton') && !tokenDocument.getFlag('elevation-drag-ruler-sw5e', 'hideSpeedButton') && game.user.role >= game.settings.get('elevation-drag-ruler-sw5e', 'restrictSpeedButton'))
		addSpeedButton(tokenDocument, html);
});

Hooks.on('renderTokenConfig', (config, html) => {
	addConfig(config, html);
});