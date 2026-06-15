# Authoring module content

Foundry loads compendium content as **LevelDB packs** (the `packs/` directory,
declared in `module.json`). We author content as readable **source JSON** under
`src/packs/<name>/` and compile it — so changes are diff-friendly and the built
packs are reproducible.

```
src/packs/
  scenes/    title.json, ...     -> packs/scenes/   (type Scene)
  journals/  (placeholder)       -> packs/journals/ (type JournalEntry)
  actors/    (placeholder)       -> packs/actors/   (type Actor,  system pf2e)
  items/     (placeholder)       -> packs/items/    (type Item,   system pf2e)
assets/
  cover.webp                     module cover / title-scene background
  scenes/                        battle-map art
```

## Build

```bash
npm install        # one-time: installs @foundryvtt/foundryvtt-cli locally (no sudo)
npm run pack       # src/packs/<name>/*.json  ->  packs/<name>/  (LevelDB)
npm run unpack     # packs/<name>/  ->  src/packs/<name>/*.json   (round-trip)
```

Only non-empty source folders are compiled, so empty placeholders don't produce
broken packs. After building, declare the pack in `module.json` under `packs`
and **restart Foundry / return to Setup** so it discovers the new compendium.

## Source document rules

Every source JSON **must** include a `_key` of the form `!<collection>!<_id>`
(e.g. `"_key": "!scenes!AcdhMwcg4PdbjpV1"`) — the CLI silently skips documents
without one. `_id` is a 16-char `[A-Za-z0-9]` Foundry id. The easiest way to get
correctly-shaped source is to build content **inside Foundry**, export it to the
module's compendium, then `npm run unpack` to write the source JSON back here.

## Current content

- **Scenes → "Bandits on the River — Title"**: a gridless splash scene whose
  background is the module cover art (`assets/cover.webp`).
