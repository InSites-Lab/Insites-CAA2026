# Design fixes for Claude Code — conference demo site

Two paste-ready prompts. Run Part 1 first (Closing tab), then Part 2.

---

## Part 1 — Closing tab

```
In the Closing tab only, make these local design fixes. Do NOT change the
design language (colors, fonts, card styles) or any content/copy:

1. QR code: generate a static SVG QR code for
   https://github.com/InSites-Lab/insites and embed it inline at the right
   end of the dark GitHub card, ~120px, white on the dark background,
   vertically centered. No external libraries or network requests.

2. Punchline: "Who assesses is part of what is assessed." — raise to
   28-32px, change color from light gray to the dark heading navy,
   keep it as the last line of the card.

3. Email links: restyle the two emails as inline chips matching the
   existing card language — 1px light border, 8px radius, small envelope
   icon, dark-navy text, no underline, single flex row with 12px gap.

4. Lab paragraph: cap at max-width 60ch; reduce bolding to only
   "InSites Knowledge Lab" and one key phrase.

5. Block order for closing: punchline card → GitHub card + QR →
   contact chips → lab paragraph. Slightly reduce the H1 size (~15%).

6. Projector pass: no text below 22px in this tab; darken any gray
   text lighter than #4b5563.
```

---

## Part 2 — All other tabs

```
Local design polish across tabs. Do NOT change the design language
(colors, fonts, card styles) or any content/copy, except where noted:

== "What is InSites" tab ==
1. Quote cards (rabbit/hatter): align both to one pattern — avatar left,
   text, chevron right. Same for both cards.
2. Quote card colors: replace the off-palette brown/green text with the
   dark heading navy; keep a colored left accent border from the existing
   palette (indigo / orange) to differentiate speakers.
3. Illustration image: add the same thin border + soft shadow the cards
   use, so it doesn't look pasted on.

== "The Dual Tension" tab ==
4. Heading: merge the eyebrow into the headline — first line becomes
   "Challenge: Give it freedom — it hallucinates." (remove the separate
   small "THE CHALLENGE" label). Second line unchanged.
5. Gallery images: equal heights, object-fit: cover.
6. Caption overlay: add a bottom gradient scrim (transparent → rgba
   navy ~0.65) behind caption text so it reads on bright skies.
7. Carousel dots: 1.5x size, brand indigo for the active dot.

== "The Landscape" tab ==
8. Gallery sizing — IMPORTANT for projector: make the gallery image the
   dominant element. Give the carousel a fixed stage sized to the space
   under the value cards (~68vh tall, full content width), all slides
   the SAME dimensions, images object-fit: contain within it, centered
   on a neutral background. No layout jumps between slides.
9. The two value cards: equal height (align-items: stretch), uniform
   padding; keep them compact (single row) so the image gets the space.
10. Yellow squiggle marks: add one small legend line under the cards
    ("~ LLM-inferred value") in caption size, once per tab.

== All tabs ==
11. Tab bar: shorten "Epistemic Notati..." label so it never truncates
    (e.g. "Notation"), keep pill widths stable across tabs.
12. Projector pass: body text >= 22px everywhere; darken grays lighter
    than #4b5563.
```

---

### Note on Part 2, item 8
The Landscape gallery mixes aspect ratios (color dolmen photo vs. double
B/W illustration) — a fixed stage with `object-fit: contain` is correct
here; `cover` would crop the double illustration.
