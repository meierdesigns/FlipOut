// Shop tab secrets (shipped with the game). A tab listed here stays hidden until the secret obstacle in that stage was hit.
// Format: { <tab>: { stage: <1..number of stages>, obs: 'bumper' | 'block' | 'brick' | 'boss', idx: <optional exact obstacle> } }, tab: 0 UPS, 1 LOOK, 2 GFX, 3 CHEAT, 4 HARD
// A stage cluster can get another background: "bgmap": { '<cluster scene id>': '<background scene id>' }
// Tabs that are not listed are always visible. Edit it in the dev mode (F9 in the game, local only) and paste the exported text here.
window.FLIPPOUT_SECRETS = {};
