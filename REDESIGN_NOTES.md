# Redesign notes

Run: `npm install` then `npm run dev`.

- Design system: `src/index.css` (palette, fonts, textures, buttons, motion)
- Icons: `src/components/ornaments/icons.jsx` / Decorations: `ornaments/decor.jsx`
- Shared UI: `src/components/ui/` (OrnateFrame, SectionHeading, JourneyThread)
- Fonts are self-hosted via @fontsource (no Google Fonts request).
- Translations: the only new key is `addressLabel` in each `family.json`.

Please check (content, not changed): venue.json shows the ceremony at 6:17 PM,
while every other section says 12:17 PM. Contact numbers look like placeholders.
