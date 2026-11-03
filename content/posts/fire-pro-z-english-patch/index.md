---
title: "Fire Pro Wrestling Z gets an English patch (beta)"
date: 2026-10-31
sheet: 11
draft: true
summary: "A first public beta of an English translation of the 2003 PS2 game Fire Pro Wrestling Z: menus, seven story scenarios, 244 wrestlers and 1,448 moves."
tags: ["ps2", "release", "beta", "fire-pro-wrestling"]
game: "Fire Pro Wrestling Z"
platform: "PS2"
toc: true
---

*Fire Pro Wrestling Z* is a PlayStation 2 game released in 2003, only in Japan. I've translated all of it, and v0.1 is out as a **first public beta**.

Beta means this. Every game mode has been played in PCSX2, and the wrestler and team names are checked in both name sets. I have not played every story route and ending through, I haven't tested the difficulty of the Liger scenario, and nothing has been tried on a real PS2. Some story lines leave a small gap before a wrestler's name.

{{< shot src="story-dialogue.webp" alt="A story mode page with English text drawn into the game's text window" caption="Story mode. The English is drawn into the game's own text window." scale="1" >}}

## Download

{{< patch name="Fire Pro Wrestling Z (English)" version="v0.1 (beta)" format="xdelta" file="https://github.com/kactusken/Fire-Pro-Wrestling-Z-English/releases/latest" platform="PS2" year="2003" >}}

The release zip has four patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **(Real Names)** | The translation with the real wrestlers' names. The game is otherwise unchanged. |
| **(Parody Names)** | The translation with the game's own parody names, translated. |
| **(Real Names) (All Unlocked)** / **(Parody Names) (All Unlocked)** | The same, plus every unlock. All six story scenarios and the hidden seventh (Jushin Thunder Liger), Title Match open, the top edit point budget, all 244 wrestlers, 39 preset teams and 404 faces from the start, seven extra rings, six extra moves and the dojo venue. |

You need your own copy of the original Japanese disc: *Fire Pro Wrestling Z* (Japan), serial SLPM-62342. The image must match `Fire Pro Wrestling Z (Japan).bin`, 462,422,016 bytes, CRC32 `5a32af02`, SHA-1 `da2a656e562cb85db3ececacc0d483eb650cb782`. Other releases haven't been checked.

Apply the `.xdelta` patch with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser (it is meant for CD images and may not cope with a multi-GB DVD image), with Delta Patcher, or on the command line:

```sh
xdelta3 -d -s "Fire Pro Wrestling Z (Japan).bin" "patch.xdelta" "patched.bin"
```

The zip has a `.cue` for each patch. Name the patched `.bin` to match it and keep the two together. I tested in PCSX2.

Saves from the original Japanese game, or from another patch, may not be compatible. Start a new save with the patch you plan to keep.

There's also a [player's guide](https://kactusken.github.io/Fire-Pro-Wrestling-Z-English/guide/): how to play, every mode and rule, walkthroughs and a route map for every story, profiles of all 244 wrestlers, a guide to creating wrestlers, and all 1,448 moves.

## What's translated

- Every mode and menu
- The seven story scenarios, over 12,000 pages of text
- The 244 wrestlers' names and profiles
- All 1,448 moves
- Menu graphics that had Japanese text, including the main menu, which I redrew as large English labels
- The Japanese character grid in name entry, which is now an English keyboard

{{< shot src="main-menu.webp" alt="The main menu with large English labels" caption="The main menu, redrawn in English." scale="1" >}}

{{< shot src="wrestler-select.webp" alt="The wrestler select screen with English names, nicknames, finishers and a profile" caption="Wrestler select: names, nicknames, finishers and profiles." scale="1" >}}

{{< shot src="move-edit-list.webp" alt="The Move Edit screen with a list of English move names" caption="Move Edit, with 1,448 moves in English." scale="1" >}}

{{< shot src="story-select.webp" alt="The story select screen listing the scenarios in English" caption="Story select. The hidden seventh scenario only appears in the All Unlocked patches." scale="1" >}}

## What is still Japanese

- The staff credits
- The title logo and the promotion logos
- In-world art: signs, T-shirts, arena graphics
- The memory card save title

## Translation decisions

- **Two name sets.** Real Names uses the actual wrestlers' names. Parody Names keeps the game's own parody names, translated. That also covers promotions and titles: in the real build, for example, IGP is IWGP, NEO-ONE is ZERO-ONE, Yurakuen Hall is Korakuen Hall and Butokan is Budokan.
- **Short names.** A wrestler's short name, the one the story prints, is the family or ring name. Given name comes first, in Hepburn romanization without macrons.
- **Voice.** Wrestlers are blunt and fiery, announcers excited, presidents gruff. Kansai dialect became folksy casual English.
- **Story limits.** Dialogue is quoted, narration isn't, and the window gets 40 characters a line.
- **Fatman Dave's patch** is credited as inspiration, but this translation was made from scratch.

{{< shot src="name-entry.webp" alt="The name entry screen with an English keyboard" caption="Name entry. The kana and kanji grid became an English keyboard." scale="1" >}}

## How the English got in

The short version of the hard part. The story window holds 20 Japanese characters a line, and the game draws Shift-JIS text live from a font, one character per cell. Plain English letters in those cells would waste half of each one and not fit.

So every English string is written two characters to a double-byte code, and the glyph for that code holds both letters. I generated those glyphs from DejaVu Sans Mono Bold, which is monospaced, so letters space evenly in their half cells. The pair glyphs are drawn into the game's font files, using about 5,100 glyph slots. The story window then holds 20 cells by 4 lines.

Centred menus centre a string by its cells, so a string with an odd number of letters sat half a letter to the left of the others. Those are drawn with the glyphs shifted half a letter to the right.

Other things the build changes beyond text and images are small code patches to the game's executable. The always-on ones brighten the title and main menu (the original draws them at about 60 to 75 percent grey), move the CPU Logic labels away from the diamonds, and replace the pure green that stood for unset costume colours with neutral greys.

<!-- TODO: say how the text was found and extracted if I want a longer account; the docs cover this in TECHNICAL.md -->

## Bugs fixed, extras and hidden content

The game holds a seventh story scenario, Jushin Thunder Liger's, that nothing in the game can open. Its matches were only a Win or Lose menu. The All Unlocked patches open it and I rebuilt it as a working story: 26 real matches with their own rings, venues and referees, Game Over and Retry, and both endings.

{{< shot src="match-settings-1.webp" alt="The match settings screen in English, with the dojo venue selected" caption="Match settings. This one shows the dojo venue from the All Unlocked patches." scale="1" >}}

The All Unlocked patches also add six finished moves that no move list offers: Phoenix Kick, Eiffel de Parachute, Blazing Tornado, Super Muscle Buster, Deadly Go-Round and Jumping Splash. Seven extra rings come from sets that were on the disc but in no menu. Everything found is documented in the repository's `HIDDEN_CONTENT.md`.

The story-mode loss to Pegasus in the Liger scenario is a Game Over with Retry, because the original has no losing scene there.

## Notes

- **Prior art:** Fatman Dave's 2004 partial menu patch was the first English work on this game.
- **Source:** Everything needed to rebuild the patches from the original disc is in the [GitHub repository](https://github.com/kactusken/Fire-Pro-Wrestling-Z-English): the translated text, the Python build code and notes on the game's formats.
- **AI disclosure:** AI assisted with the translation.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no copyrighted game data that would let anyone play without owning the game. The patches only work on your own copy of the disc.

If you find a problem, open an [issue](https://github.com/kactusken/Fire-Pro-Wrestling-Z-English/issues) with a screenshot, which patch you used and where you were (the mode and menu, or roughly what had just happened). Cut-off text, overlapping text or leftover Japanese are especially useful.
