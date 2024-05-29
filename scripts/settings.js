export function registerSettings() {
	game.settings.register('elevation-drag-ruler-sw5e', 'conditionMovement', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.conditionMovement.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.conditionMovement.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'hideSpeedButton', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.hideSpeedButton.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.hideSpeedButton.hint'),
		scope: 'client',
		config: true,
		type: Boolean,
		default: false
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'restrictSpeedButton', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.restrictSpeedButton.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.restrictSpeedButton.hint'),
		scope: "world",
		config: true,
		type: String,
		default: "1",
		choices: {1: "Player", 2: "Trusted", 3: "Assistant", 4: "Game Master"}
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'oneDnd', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.oneDnd.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.oneDnd.hint'),
		scope: "world",
		config: true,
		type: Boolean,
		default: false
	});
}