//Returns the highest movement mode of a given object of movement modes.
export function getHighestMovementMode(movementModes) {
	var highestSpeed = 0;
	var highestMovement = 'walk';
	for (const [key, value] of Object.entries(movementModes)) {
		if (value > highestSpeed && key != 'teleport') {
			highestSpeed = value;
			highestMovement = key;
		}
	}
	return highestMovement;
};

//Returns the highest movement speed of a token.
export function getHighestMovementSpeed(tokenDocument) {
	const actor = tokenDocument.actor || tokenDocument.parent;
	const walkSpeed = actor.system.attributes.movement.walk;
	const flySpeed = actor.system.attributes.movement.fly
	const burrowSpeed = actor.system.attributes.movement.burrow
	const climbSpeed = actor.system.attributes.movement.climb
	const swimSpeed = actor.system.attributes.movement.swim
	return Math.max(walkSpeed, flySpeed, burrowSpeed, climbSpeed, swimSpeed);
};

//Returns the non-zero movement speeds of a token, including the module's automatic mode and an optional teleportation mode.
export function getTokenSpeeds(tokenDocument) {
	const actor = tokenDocument.actor || tokenDocument.parent;
	if (!actor) return false;
	const defaultSpeeds = actor.system.attributes.movement;
	var tokenSpeeds = ['auto'] ;
	for (var [key, value] of Object.entries(defaultSpeeds)) {
		if (value > 0 && key != 'hover') {
			switch (key) {
				case 'land':
					key = 'walk';
					break;
				case 'water':
					key = 'swim';
					break;
				case 'air':
					key = 'fly';
					break;
			};
			tokenSpeeds.push(key);
		}
	}
	return tokenSpeeds;
};

//Returns the movement a token should used based on settings, terrain, and/or elevation.
export function getMovementMode(token) {
	const tokenDocument = token.document;
	const tokenType = tokenDocument.actor.type;
	var walkSpeed = 0;
	var swimSpeed = 0;
	var flySpeed = 0;
	var burrowSpeed = 0;
	var climbSpeed = 0;

	const tokenMovement = tokenDocument.actor.system.attributes.movement;
	if (tokenType == 'group') {
		walkSpeed = tokenMovement.land;
		swimSpeed = tokenMovement.water;
		flySpeed = tokenMovement.air;
	}
	else {
		walkSpeed = tokenMovement.walk;
		swimSpeed = tokenMovement.swim;
		flySpeed = tokenMovement.fly;
		burrowSpeed = tokenMovement.burrow;
		climbSpeed = tokenMovement.climb;
	}
	const movementModes = {'walk': walkSpeed, 'fly': flySpeed, 'swim': swimSpeed,'burrow': burrowSpeed, 'climb': climbSpeed};

	const selectedSpeed = tokenDocument.getFlag('elevation-drag-ruler-sw5e', 'selectedSpeed');

	//Default movement mode.
	const defaultMovementMode = 'walk';
	
	//If a token has a speed selected use that.
	if (selectedSpeed && selectedSpeed != 'auto')
		return selectedSpeed;
	//If the token has no speed selected and the 'Use Elevation' setting is off, use their swimming speed if they're in water or else their highest speed.
	if (selectedSpeed && selectedSpeed == 'auto')
		return getHighestMovementMode(movementModes);

	return defaultMovementMode;
};

//Returns the total movement already spent from Drag Ruler's movement history.
export function getMovementTotal(token) {
	const combatant = game.combat.getCombatantByToken(token.id);
	const dragRulerFlags = combatant.flags.dragRuler;
	if (!dragRulerFlags) return;
	if (!dragRulerFlags.passedWaypoints) return;
	if (dragRulerFlags.passedWaypoints.length === 0) return;

	var movementTotal = 0;
	var incompatible = false;
	dragRulerFlags.passedWaypoints.forEach(waypoint => {
		const visitedSpaces = waypoint.dragRulerVisitedSpaces;
		if (visitedSpaces) movementTotal += visitedSpaces[visitedSpaces.length - 1].distance;
		else incompatible = true;
	});
	if (incompatible) return dragRuler.getMovedDistanceFromToken(token);
	return movementTotal;
};

export function hasCondition(tokenDocument, searchList) {
	const conditionFound = searchList.find(condition => tokenDocument.hasStatusEffect(condition))
	return conditionFound !== undefined;
}

export function hasFeature(tokenDocument, flag, searchList) {
	const hasFlag = tokenDocument.getFlag('elevation-drag-ruler-sw5e', flag);
	if (hasFlag !== undefined) return hasFlag;
	
	const actor = tokenDocument.actor || tokenDocument.parent;
	if (!actor) return false;

	const actorFeatures = actor.items.filter(feature => feature.type == 'feat' || feature.type == 'maneuver').map(feature => feature.name);
	const featureFound = searchList.find(searchFeature => actorFeatures.includes(searchFeature));
	return featureFound !== undefined;
};

//Returns true if the token is in combat.
export function isTokenInCombat(tokenDocument) {
	return (game.combat && game.combat.getCombatantByToken(tokenDocument.id))
};