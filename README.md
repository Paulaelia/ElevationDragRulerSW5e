# ElevationDragRuler
A Foundry VTT module which adds a dnd5e speedprovider for Drag Ruler to pick between different movement options based on elevation and terrain from the Enhanced Terrain Layer module.
## Requirements
- Dnd5e System
- [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler) module by Manuel Vögele
- [Terrain Ruler](https://github.com/manuelVo/foundryvtt-terrain-ruler) module by Manuel Vögele
- [Enhanced Terrain Layer](https://github.com/ironmonk88/enhanced-terrain-layer) module by IronMonk
## Movement Options
### Walking
A creature's default movement option is walking.
### Flying
Creatures will be set to fly, and thus use their flying speed, when the token's elevation is above 0. When flying, creatures will ignore all difficult terrain set by the Enhanced Terrain Layer module.

Additionally, this speedprovider includes two settings to streamline setting up flying creatures.
- **Force Hovering**: When enabled, changes the default movement option to flying instead of walking for creatures that can hover. The creature will still burrow or swim when its elevation is below 0. Enabled by default.
- **Force Flying**: When enabled, changes the default movement option to flying instead of walking for creatures with a greater flying than walking speed. The creature will still burrow or swim when its elevation is below 0. Disabled by default.

### Swimming
Creatures will be set to swim, and thus use their swimming speed, when the token's elevation is below 0 and is within "water" terrain from the Enhanced Terrain Layer module. If the creature has no swimming speed, it will use the greater of their walking or flying speed but water will count as difficult terrain.

### Burrowing
Creatures will be set to swim, and thus use their swimming speed, when the token's elevation is below 0 and not within "water" terrain. While burrowing, creatures will ignore all difficult terrain set by the Enhanced Terrain Layer module.

### Urban Terrain
Because elevation is useful for more than just determining a creature's movement type, all elevation based movement switching can be disabled using the "urban" terrain environment. Instead, the creature will use its highest movement option between walking and flying.