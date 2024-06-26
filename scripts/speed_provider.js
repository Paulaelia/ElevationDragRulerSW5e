import { isTokenInCombat, hasCondition, hasFeature, getMovementMode, getMovementTotal } from './util.js';

//Hooking into Drag Ruler.
Hooks.once('dragRuler.ready', (SpeedProvider) => {
	class SW5eSpeedProvider extends SpeedProvider {
		//An array of colors to be used by the movement ranges.
		get colors() {
			return [
				{id: 'walk', default: 0x00FF00, 'name': 'Walking'},
				{id: 'fly', default: 0x00FFFF, 'name': 'Flying'},
				{id: 'swim', default: 0x0000FF, 'name': 'Swimming'},
				{id: 'burrow', default: 0xFFAA00, 'name': 'Burrowing'},
				{id: 'climb', default: 0xAA6600, 'name': 'Climbing'},
				{id: 'dash', default: 0xFFFF00, 'name': 'Dashing'},
				{id: 'bonusDash', default: 0xFF6600, 'name': 'Bonus Dashing'}
			]
		}

		//This is called by Drag Ruler once when a token starts being dragged. Does not get called again when setting a waypoint.
		getRanges(token) {
			const tokenDocument = token.document
			//Retrieves the total movement in the token's movement history to be used by the teleportation range.
			var movementTotal = 0;
			if (isTokenInCombat(tokenDocument) && game.settings.get('drag-ruler', 'enableMovementHistory')) movementTotal = getMovementTotal(token) || 0;

			//Retrieves and compiles relevant movement data of the token.
			var walkSpeed = 0;
			var swimSpeed = 0;
			var flySpeed = 0;
			var burrowSpeed = 0;
			var climbSpeed = 0;

			const tokenMovement = tokenDocument.actor.system?.attributes?.movement;
			const tokenType = tokenDocument.actor.type;
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

			const movementModes = {'walk': walkSpeed, 'fly': flySpeed, 'swim': swimSpeed, 'burrow': burrowSpeed, 'climb': climbSpeed};
			
			const movementMode = getMovementMode(token) || 'walk';
			tokenDocument.setFlag('elevation-drag-ruler-sw5e', 'movementMode', movementMode);

			//Applies various modifiers to the movement speeds of the token depending on its conditions and features.
			const settingconditionMovement = game.settings.get('elevation-drag-ruler-sw5e', 'conditionMovement');

			//Any of these conditions set a creature's speed to 0.
			const movementRestricted = !settingconditionMovement ? false : (getProperty(token, 'actor.system.attributes.death.failure') == 3 || getProperty(token, 'actor.system.attributes.exhaustion') >= 5 || hasCondition(tokenDocument, ['dead', 'grappled', 'incapacitated', 'paralysis', 'petrified', 'restrain', 'sleep', 'stun', 'unconscious']));

			//Creatures can be slowed or hasted to half or double their available movement speeds respectively.
			const movementMultiplier = !settingconditionMovement ? 1 : (((hasCondition(tokenDocument, ['slowed']) || getProperty(token, 'actor.system.attributes.exhaustion') >= 2) ? 0.5 : 1) * (hasCondition(tokenDocument, ['hasted']) ? 2 : 1));

			//Retrieves if the token has a bonus action dash available.
			const bonusDashMultiplier = hasFeature(tokenDocument, 'hasBonusDash', ['Deliberate Movement']) ? 3 : 2;

			const movementRange = movementRestricted ? 0 : (movementModes[movementMode] * movementMultiplier);
			return [{range: movementRange, color: movementMode}, {range: movementRange * 2, color: 'dash'}, {range: movementRange * bonusDashMultiplier, color: 'bonusDash'}];
		}
	}
	//Registers the speed provider to be used by Drag Ruler's API.
	dragRuler.registerModule('elevation-drag-ruler-sw5e', SW5eSpeedProvider)
});