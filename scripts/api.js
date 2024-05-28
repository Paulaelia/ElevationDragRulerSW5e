import { getConfiguredEnvironments, getHighestMovementSpeed, getTokenSpeeds, getMovementMode } from './util.js';

export function registerAPI() {
	game.modules.get('elevation-drag-ruler-sw5e').api = {
		getConfiguredEnvironments,
		getHighestMovementSpeed,
		getTokenSpeeds,
		getMovementMode
	};
}