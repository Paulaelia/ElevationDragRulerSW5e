export function registerSettings() {
	game.settings.register('elevation-drag-ruler-sw5e', 'tokenTerrain', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.tokenTerrain.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.tokenTerrain.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'elevationSwitching', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.elevationSwitching.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.elevationSwitching.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'flyingElevation', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.flyingElevation.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.flyingElevation.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'forceFlying', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.forceFlying.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.forceFlying.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'forceSwimming', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.forceSwimming.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.forceSwimming.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'forceBurrowing', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.forceBurrowing.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.forceBurrowing.hint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: true
	});

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
	
	game.settings.register('elevation-drag-ruler-sw5e', 'hideTerrainButton', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.hideTerrainButton.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.hideTerrainButton.hint'),
		scope: 'client',
		config: true,
		type: Boolean,
		default: false
	});
	
	game.settings.register('elevation-drag-ruler-sw5e', 'restrictTerrainButton', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.restrictTerrainButton.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.restrictTerrainButton.hint'),
		scope: "world",
		config: true,
		type: String,
		default: "1",
		choices: {1: "Player", 2: "Trusted", 3: "Assistant", 4: "Game Master"}
	});

	game.settings.register('elevation-drag-ruler-sw5e', 'teleport', {
		name: game.i18n.localize('SW5eDragRulerIntegration.settings.teleport.name'),
		hint: game.i18n.localize('SW5eDragRulerIntegration.settings.teleport.hint'),
		scope: "world",
		config: true,
		type: Boolean,
		default: false
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