---
title: "Super Wrestle Angels gets an English patch"
date: 2026-11-02
sheet: 6
draft: true
summary: "An early English release (v0.2) of a 1994 Super Famicom women's wrestling game: four modes, about 1,340 messages and 60 wrestlers, with a few known rough edges."
tags: ["snes", "release", "imagineer", "women's wrestling", "beta"]
game: "Super Wrestle Angels"
platform: "SNES"
toc: true
---

*Super Wrestle Angels* is a 1994 Super Famicom women's pro wrestling game, published by Imagineer. It was only released in Japan. I've translated it into English.

This is **v0.2**, a numbered early release and not a 1.0. The README says the whole game is translated and that every mode has been played through, and v0.2 fixes what players reported on v0.1. I still expect more problems, and there are known gaps listed below.

{{< shot src="title.png" alt="The title menu with the mode names in English" caption="The title menu, redrawn in the menu's own outlined letters." scale="1" >}}

## Download

{{< patch name="Super Wrestle Angels (English)" version="0.2" format="BPS" file="https://github.com/kactusken/Super-Wrestle-Angels-English/releases" platform="Super Famicom" year="1994" publisher="Imagineer" size="12 Mbit" >}}

<!-- TODO: confirm the v0.2 release exists on GitHub and link /releases/latest if wanted -->

There is one patch, with the game otherwise unchanged.

You need your own copy of the original Japanese cartridge (SHVC-AWAJ-JPN): `Super Wrestle Angels (J).smc`, 1,572,864 bytes, CRC32 `b697f8a0`, SHA-1 `1897062b952636ce0d2f9b714c7cd0b08cdc340b`. It has no copier header. If your patcher refuses the ROM, it is a different dump or has a 512-byte header.

Apply the `.bps` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, or with Floating IPS (Flips) on Windows or Linux, or MultiPatch on macOS. I tested in Mesen 2.

## What's translated

- All four modes: Exhibition, Promoter, League and Tournament, plus the system menu
- About 1,340 messages: match commentary, the promoter mode's events, scouting talks and the ending
- The 60 wrestlers' names and profiles
- The 8x8 menu text, and the labels, buttons and banners that are drawn as graphics

{{< shot src="exhibition.png" alt="The Exhibition screen with match types, buttons and the wrestler list in English" caption="Exhibition: match types, buttons and the wrestler list." scale="1" >}}

Still in Japanese: the title logo, and words drawn into a few event pictures (the text box says what is happening). The hiragana and katakana pages of name entry stay, so you can still enter Japanese names.

{{< shot src="promoter.png" alt="Promoter mode with the English menu bar and menus" caption="Promoter mode. The menu bar is relettered graphics; the menus use the game's own font." scale="1" >}}

## Known gaps in v0.2

- Numbers use the game's wide digits, so they look bigger than the letters around them.
- 3-4 player promoter games (multitap) are not tried.
- Saves from v0.1 should carry over to v0.2, but I haven't tested that with a real save. A promoter game started on v0.1 keeps the wide promotion names in its alliance menu.
- Battery saves from the Japanese version show names as random letters. Start a new game.
- Names are drawn two letters at a time, so a name with an odd number of letters ends in a space ("Pacific 's").

## Translation decisions

- **Names.** Western order, with long names shortened where the game has little room ("C. Nagahara"). Honorifics are dropped except *senpai*.
- **Speaker labels.** `President:` for the president, and the wrestler's short name for wrestlers.
- **Move names.** Uranage stays Uranage, and the Northern Lights Suplex finisher is "N.Lights Suplex". Players found "Throw" and "Hokuto-plex" odd in v0.1.
- **Menu bar.** STAFF TRAIN ADMIN COACH RAID INFO END, to fit 32-pixel buttons.
- **Move cards.** T, L, S and F in the original kanji's colours, and the OTHER, finisher and double-team cards as white symbols on solid colours, because flat letters were hard to tell apart in fast matches.
- **Naming wrestlers and promotions.** The kanji page is now PAIRS, with two-letter pieces in the narrow English letters, so a name can be up to 20 letters. The ABC page keeps the original wide letters.

{{< shot src="match.png" alt="A match in progress with English commentary and the move cards" caption="A match. Commentary is at most 28 letters to a line." scale="1" >}}

## How the English got in

**Font.** The game's text is 12x12 glyphs, and every word of text is a glyph code. I didn't change any code to make English fit. Instead, each glyph holds two 6-pixel letters, and every letter pair that's used takes over one of the glyphs freed from kanji. That gives 34 letters to a dialogue line.

**Space.** Most of the strings are reached through tables of 16-bit pointers. Those are repacked within their original span and the tables rewritten. The rest keep their place and length. Eleven strings that code loads by address stay where they are. The original has only about 6.7 KB of free space, and the patched ROM stays 12 Mbit.

**Graphics.** The menu bar, buttons, banners and title menu are compressed graphics. I redrew the labels in the original colours and recompressed them to the exact original size, because the game reads these blocks one after another and callers continue from where the last one ended.

**Letter pairs stay put.** Names live in RAM and the battery save as glyph codes, so each pair keeps its glyph from build to build. That's why v0.1 saves should still work.

{{< shot src="rankings.png" alt="The year-end rankings screen with English buttons and regions of Japan" caption="Year-end rankings: 18 redrawn buttons, with the regions of Japan." scale="1" >}}

## A famous bug, left alone

I didn't fix this one. The leg drop (GUILLOTINE) and the MOONSAULT were meant to be worse against a standing opponent. A mistake in the game makes them far better, so they win almost every round while the opponent is on her feet. I documented how matches work, with the numbers, in the repository.

## Hidden content

The code has three promoter-mode button codes, all tried in game. On the title screen with "Press Start" showing, hold Select on controller 2 and enter the code on controller 1. A chime plays.

- **Up Down Up Down B B B B**: hold L when choosing a COACH command to use it more than once a turn.
- **Select Select Select Select**: game length up to 10 years instead of 5.
- **Left Left Right Right B B B B**: any match on your card can be skipped, even title matches.

I searched for more and found no other codes, no debug menu and no hidden wrestlers. There is some unreachable content: ending dialogues for wrestler pairs that can never match, a dojo fire incident that's never picked, and one unused event picture. Harumi Minagawa is playable, but the attract demo never shows her. The notes are in `docs/HIDDEN_CONTENT.md` in the repository.

{{< shot src="ending.png" alt="The promoter ending, where the winning promotion's wrestlers speak" caption="The ending: the winning promotion's wrestlers have their say." scale="1" >}}

{{< shot src="awards.png" alt="The ending's award banners in English" caption="The ending's award banners." scale="1" >}}

## Notes

- **Prior art:** The Cutting Room Floor has no page for this game and GameFAQs has no guides or codes. <!-- TODO: state whether any earlier English translation exists; the docs only cover hidden-content sources -->
- **Source:** The [GitHub repository](https://github.com/kactusken/Super-Wrestle-Angels-English) has the translated text, the Python build code and notes on the game's formats, including how [promoter mode](https://github.com/kactusken/Super-Wrestle-Angels-English/blob/main/docs/PROMOTER.md) and [matches](https://github.com/kactusken/Super-Wrestle-Angels-English/blob/main/docs/MATCHES.md) work.
- **AI disclosure:** AI assisted with the translation (Claude).
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data that would let anyone play without owning the game. The patch only works on your own copy.

If you find a problem, open an [issue](https://github.com/kactusken/Super-Wrestle-Angels-English/issues) with a screenshot, which patch you used and where you were (the mode and menu, or what had just happened). Cut-off text, overlapping text or leftover Japanese are especially useful.
