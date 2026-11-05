# Academy 0.4 — 05/11/2026

- Title screen appears on every page load; saved players explicitly choose Continue. Begin Story starts the existing 10-second illustrated movie. New players then enter the tutorial.
- Questions use a nonmodal dock: below the arena in portrait, beside it on desktop and short landscape screens. The arena remains visible without a backdrop. Long questions scroll inside the dock.
- Before each question choose easy / normal / hard: 100 / 125 / 150 HP of damage on correct answers. Enemy waves have 300 / 400 HP. Damage does not carry into the next wave.
- Explicit player → NPC → player phases. No extra player action during NPC animation. NPC deals 1 health after a correct answer, 2 after an incorrect answer/timeout. Player starts each map with 12 health. Defeated NPCs do not retaliate.
- Existing progress retained. Question decks switch with difficulty and subject.
- Fullscreen button attempts landscape lock where supported; responsive layout remains usable where browsers deny lock. Android source uses fullSensor; physical-device rotation has not been tested. No APK built.
- Automated tests: 18 passed, including damage ratios, NPC-only health changes, repeated-action guards, wave transitions and five-map completion.
- Browser QA: 10-second movie start/end, saved title entry, 125 HP attack, NPC reply, portrait 390×844 and landscape 844×390 question layouts. Educational review limits remain unchanged.
