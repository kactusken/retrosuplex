---
title: "Fire Pro Wrestling S - 6Men Scramble gets an English patch (v0.1 beta)"
date: 2026-11-02
draft: true
summary: "A first public beta of an English patch for the 1996 Saturn wrestling game: 160 wrestlers, about 1,600 lines of story interviews, and 184 new two-letter characters to make the English fit."
tags: ["saturn", "release", "beta", "human", "fire-pro", "xdelta"]
game: "Fire Pro Wrestling S - 6Men Scramble"
platform: "Sega Saturn"
kind: "Patch"
toc: true
---

*Fire Pro Wrestling S - 6Men Scramble* is a 1996 Sega Saturn game from Human, released only in Japan. This is an English patch for it. It is a **first public beta, v0.1**, so I'd call it ready to try, not finished.

Everything a player reads is in English. The wrestling is the same game, and the voices and music are unchanged.

{{< shot src="mode-select.png" alt="The Mode Select screen with every mode name and description in English" caption="Mode Select, with the new Story mode line for Victory Road." scale="2" >}}

## Status

This is a beta. The README says all the text is translated, and that every mode has been played or reached in an emulator: Victory Road title wins and defences, the leagues and tournaments, Wrestler Edit and the Unlocked patches. The endings were checked through the developers' ending viewer, not by finishing Victory Road myself.

Known gaps:

- Loading saves made with the Japanese game has not been tested.
- Some short names are cut to fit the Wrestler Select grid (for example "Fujinam" and "Hashim"), because the game's name fields require it.
- Names in the staff credits, text that is part of the scenery, and the kana rows of the name-entry keyboard are still Japanese (more below).

## Download

{{< patch name="Fire Pro Wrestling S - 6Men Scramble (English)" version="0.1 (beta)" format="xdelta" file="https://github.com/kactusken/Fire-Pro-Wrestling-S-Six-Men-Scramble-English/releases/download/v0.1/Fire.Pro.Wrestling.S.-.6Men.Scramble.English.Patch.v0.1.zip" platform="Sega Saturn" year="1996" publisher="Human" size="0.5 MB zip" >}}

The zip has five patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **(English) (Real Names)** | The translation, with the real names of the wrestlers the characters stand for (Tatsumi Fujinami, Stan Hansen...). |
| **(English) (Parody Names)** | The translation, with the game's own parody names (Fighter Yamato, Star Bison...). |
| **(English) (Real Names) (Unlocked)** | Real names, with everything a full game clear unlocks from the start: all 24 hidden wrestlers (including the Legends promotion), the full Music Test and 255 Wrestler Edit points. Also nine hidden Wrestler Edit presets and the secret "G Gundam Theme" in Wrestler Edit. |
| **(English) (Parody Names) (Unlocked)** | Parody names with the same unlocks. |
| **(Japan) (Unlocked)** | The original Japanese game, untranslated, with the same unlocks. |

You need your own copy of the original Japanese disc. It must be the two-track BIN/CUE dump whose data track is `Fire Prowrestling S - 6Men Scramble (Japan) (2M) (Track 1).bin`:

- Size: 488,802,048 bytes
- CRC32: `18b025ae`
- SHA-1: `cd78bd2d77c2de30f640d38663e2111fbf576c2a`

Other dumps, such as the "(1M)" one, won't patch.

Apply the `.xdelta` to the Track 1 `.bin` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, with Delta Patcher, or on the command line:

```sh
xdelta3 -d -s "Fire Prowrestling S - 6Men Scramble (Japan) (2M) (Track 1).bin" "patch.xdelta" "patched.bin"
```

The patch changes only the data track. Keep Track 2 and the `.cue` as they are, or use the `.cue` from the zip. If you give the patched file another name, change its `FILE` line in the `.cue` to match. It was tested in Ymir and in Mednafen's Saturn core, and you need a Saturn BIOS.

There's also a [player's guide](https://kactusken.github.io/Fire-Pro-Wrestling-S-Six-Men-Scramble-English/guide/) with every mode, the controls, how matches work, Wrestler Edit, all 160 wrestlers with their move lists, and a Japanese glossary.

## What's translated

- Every menu and mode, and messages and save titles
- The 160-wrestler roster: names, nicknames and profiles, in two versions
- About 600 move names
- Wrestler Edit
- The Victory Road story with all of its pre-match interviews, about 1,600 lines, plus the endings
- Title Match mode
- Pictures with text: the Wrestler Select labels and the five result banners (TITLE WON!, TITLE DEFENDED!, CONQUERED!, CHAMPION!, VICTORY!)

{{< shot src="wrestler-select.png" alt="The Wrestler Select screen showing a wrestler's profile with English labels" caption="Wrestler Select. The field labels were redrawn as English pictures." scale="2" >}}

{{< shot src="interview.png" alt="A Victory Road pre-match interview in an English text box" caption="A Victory Road interview, fitted to the in-ring box." scale="2" >}}

{{< shot src="match-moves.png" alt="A match in progress with an English move name displayed" caption="Move names appear as they happen." scale="2" >}}

### Still in Japanese

- The names in the staff credits, kept as they are
- Text that only decorates the scenery, such as signs and the ring apron
- The kana rows of the name-entry keyboard. Its English letter rows work; its kanji were removed to make room for the English lettering.

## Translation decisions

- **Two name sets.** Every wrestler is kept twice: the real wrestler the character stands for, and the game's parody name romanized. That's why there are two English patches. The real-names patch uses the names established by the English patches of the series' other games (Fire Pro G, Iron Slam '96).
- **Given name first.** "Keiji Mutoh", "Ken Shundo". In story speech the short name is usually used.
- **Legends.** The hidden promotion HIDE is called "Legends" in the real-names build.
- **Voice.** Punchy wrestling-promo English, like a well-localized 1990s wrestling game. Heels are rude, veterans gruff, rookies eager. Shouts such as "Ora!" and "Kora!" are kept.
- **A new translation.** It isn't built on the earlier fan patch (see Notes).

## How the English got in

The short version. The full details are in the repository docs.

**One sprite per letter.** The game draws every letter as its own 16x16 sprite and allows only 46 per line of text. English runs out of that quickly. The patch adds 184 two-letter characters, common letter pairs drawn as one sprite, so the English fits without shrinking the font. The endings' fixed-width lettering was made proportional.

**Letters as single bytes.** Two half-width katakana tables in `1ST.BIN` are rewritten, so bytes A6-DD stand for a-z, A-Z and `. , ' -`. They are drawn with the font's full-width Latin glyphs. No code changes were needed for that.

**A tighter font.** In the font, the Latin glyphs are moved flush left and their advances in the width table are set to ink width plus 1. Periods and commas take 3 px instead of 8. Digits keep 8 px so number columns line up.

**Pointers.** Every pointed string in `1ST.BIN` and `2ND.BIN` is written into the freed string areas of its file, and every pointer to it is rewritten. The build then follows every pointer again and stops if one doesn't lead to its text. Records and move names are written in place; the move pool is deduplicated.

**Pictures.** Text that is part of a picture was redrawn as English graphics, like the result banners above.

{{< shot src="title-defended.png" alt="The TITLE DEFENDED! result banner in English" caption="A redrawn result banner." scale="2" >}}

The patches are delivered as xdelta against the Track 1 image.

## Wrestler Edit

Wrestler Edit is translated too, with the profile labels written in full words (Promotion, Height, Weight, Reversal, Critical, Recovery).

{{< shot src="wrestler-edit.png" alt="A Wrestler Edit screen listing move choices in English" caption="Wrestler Edit." scale="2" >}}

## Endings

{{< shot src="ending.png" alt="An ending scene with English narration text" caption="An ending. I checked these through the developers' ending viewer." scale="2" >}}

## Hidden content and the Unlocked patches

Without an Unlocked patch, the 24 hidden wrestlers appear once both Victory Road singles titles are won, or one by one as you beat them. Title Match mode appears once you hold a Victory Road title.

The Unlocked patches treat the game-clear flag as set in the seven places the code tests it, and the save is never changed. They also raise the Edit point pool to 255, extend the Wrestler Edit presets list to 212, and let Wrestler Edit pick the secret G Gundam theme.

{{< shot src="legends.png" alt="The roster showing the hidden Legends promotion unlocked" caption="The Legends promotion, unlocked." scale="2" >}}

The game also contains developer tools: a debug menu, a match monitor, an ending selector, a pad test and more. These are a build option in my tooling and are not in any released patch. I documented them, along with cut moves and unused files, in the repository's `docs/HIDDEN_CONTENT.md`.

## Notes

- **Prior art:** Malenko's [English patch v0.91](https://segaxtreme.net/resources/fire-pro-wrestling-6-men-scramble.106/) (SegaXtreme, 2022) was the first effort. It translated most of the game, but some of the Victory Road dialogue was left in Japanese. I made this translation from scratch rather than building on it, and the earlier work deserves credit for going first.
- **Debug research:** 32bits' [Expansion Hack write-up](https://32bits.substack.com/p/expansion-hack-fire-prowrestling) first documented the debug menu and the hidden Edit characters.
- **Source:** the translated text, the Python patching code (no dependencies for the build) and documentation of the game's formats are in the [GitHub repository](https://github.com/kactusken/Fire-Pro-Wrestling-S-Six-Men-Scramble-English). The code is MIT licensed.
- **AI disclosure:** AI assisted with the translation.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no copyrighted game data that would let anyone play without owning the game. The patches only work on your own copy of the disc.

<!-- TODO: confirm the release date; the CHANGELOG gives none, so 2026-11-02 is a placeholder. -->

## Reporting problems

Open an [issue](https://github.com/kactusken/Fire-Pro-Wrestling-S-Six-Men-Scramble-English/issues) with a screenshot, which patch you used, and where you were: the mode and menu, or roughly what had just happened. Cut-off text, overlapping text or leftover Japanese are especially useful.
