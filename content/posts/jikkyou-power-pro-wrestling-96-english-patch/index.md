---
title: "Jikkyou Power Pro Wrestling '96 - Max Voltage gets an English patch"
date: 2026-11-02
sheet: 8
draft: true
summary: "A full English patch for Konami's 1996 Super Famicom wrestling game: 50 wrestlers, 185 move names, interviews and the whole Max Voltage career mode."
tags: ["snes", "release", "konami", "career-mode"]
game: "Jikkyou Power Pro Wrestling '96 - Max Voltage"
platform: "SNES"
toc: true
---

*Jikkyou Power Pro Wrestling '96 - Max Voltage* is a 1996 Super Famicom wrestling game from Konami, released only in Japan. This patch puts the whole game in English. It is version 1.0, the first release.

{{< shot src="main-menu.png" alt="The English main menu with Versus selected and a description line at the bottom" caption="The main menu. The buttons and screen title are redrawn in English." scale="2" >}}

<!-- TODO: release date not given in CHANGELOG; the front matter date is a placeholder -->

The project README calls v1.0 complete: every mode is translated and has been played. I can't promise it is free of mistakes. If you find cut-off text, overlapping text or leftover Japanese, please report it (details at the bottom).

## Download

{{< patch name="Jikkyou Power Pro Wrestling '96 - Max Voltage (English)" version="1.0" format="BPS" file="https://github.com/kactusken/Jikkyou-Power-Pro-Wrestling-English/releases/latest" platform="Super Famicom" year="1996" publisher="Konami" >}}

The release zip has one patch: the translation, plus fixes for two bugs in the original story mode.

You need your own copy of the original Japanese cartridge ROM: *Jikkyou Power Pro Wrestling '96 - Max Voltage* (Japan), 4,194,304 bytes with no copier header, CRC32 `94c1d85c`, SHA-1 `e24b1dcf8e60ebfdb5b0c1d4fe20756ad53f4d61`. A 4,194,816 byte file has a 512-byte copier header. Remove it first, or the patcher will refuse the file.

Apply the `.bps` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, with Floating IPS (Flips) on Windows or Linux, or with MultiPatch on macOS. The patcher checks the ROM first, so a wrong dump is refused instead of patched badly. The README says it was tested in Mesen.

There is also a [player's guide](https://kactusken.github.io/Jikkyou-Power-Pro-Wrestling-English/guide/) in English. It covers modes, rules, controls, every wrestler's moves, the career mode with an interactive map of its story branches and endings (spoilers are folded away), and secrets.

Start a new save with the patched game. Saves from the unpatched Japanese game haven't been tested.

## What's translated

- All menus, rules and help lines
- The 50-wrestler roster and its 185 move names
- The post-match interviews
- The whole Max Voltage career mode: story, events, magazine and endings
- Screen titles and menu graphics, redrawn in English
- An English letter grid on the name entry screen

Still in Japanese: the title logo and some background art, such as the 優勝 ("champion") pattern behind tournament winners. Labels already in Latin letters (1P, CPU, WWK, BOM, REAL'S) stay as they were.

{{< shot src="setup.png" alt="The Versus setup screen with rules, players, time limit and two wrestlers, all in English" caption="Versus setup. Rule names and wrestler names are in English." scale="2" >}}

{{< shot src="interview.png" alt="A post-match interview with the winner's portrait, time, finishing move and his answer in English" caption="A post-match interview." scale="2" >}}

## Max Voltage career mode

Max Voltage is the career mode. You create a wrestler and play through a story that runs on a calendar, from March 1996 to March 2001. The name entry screen normally has a kana grid, so I replaced it with an English letter grid and career wrestlers get Western names.

{{< shot src="entry-form.png" alt="The Max Voltage entry form with an English letter grid for the wrestler's name" caption="The entry form with the English letter grid." scale="2" >}}

{{< shot src="career-hub.png" alt="The career hub showing month, ratings and a menu of Profile, Record, Magazine, Transfer, Moves, Costume and Diet" caption="The career hub." scale="2" >}}

{{< shot src="story.png" alt="The opening of the career story, in English" caption="The opening of the story." scale="2" >}}

{{< shot src="show-card.png" alt="A show card at the Tokyo Big Dome with five bouts and a result" caption="A show card. Roster names are shortened where the screen has no room." scale="2" >}}

## Translation decisions

- **Japanese names** are given name first, in Hepburn without macrons (Kagetora Nagata).
- **Parody ring names** take their English form (The G. Goemon, Richter Belmondo).
- **Some names are shortened** where the screen has no room (K. Nagata, L. Wyvern).
- **Yu Shiina's Tosa dialect** is a folksy drawl.
- **The narration** speaks to the player as "you".

The README notes one known limit: a career wrestler's name of 16 letters can reach the right-hand portrait when a match is announced. Shorter names fit.

This is a full translation from scratch. It is not based on the 1990s patch the project docs mention.

## How the English got in

The game draws its text from a font of square Japanese characters, so English in that font would be wide and wouldn't fit. The patch adds a small text engine that draws English as letter pairs inside the game's own renderer, so the English fits in the room the Japanese used.

**Text.** The script lives in two banks as 16-bit words. Each word is the address of a glyph in the font, 12 pixels wide for full-width characters and 6 for half-width. English strings are written in place and keep the word count of the Japanese they replace. That way nothing that points at the text has to change.

**Letter pairs.** An English word is split into chunks. A code of `$A000 + a*128 + b` means two letters, and `$D000 + d` is a dictionary chunk of up to 40 pixels. Hooks in the game's renderer draw these chunks with the game's own plotter.

**Padding.** Where the Japanese line ended in blanks, the English is padded with blank chunks to the old width. Otherwise a glyph could be drawn past the text area and overwrite part of the font. In one case that wiped the digits used by the match times.

**Graphics.** Screen titles and menu graphics are redrawn from a list of images with text, using the game's palette.

The details are in the repository's `TECHNICAL.md` and `PATCHES.md`.

## Two bugs fixed

The patch fixes two bugs in the original Max Voltage story. The new code is 38 bytes in padding at the end of a bank.

- **The faction choice (May 1999).** In the SJPW revolt event you pick a side. The original game read the answer after the next dialogue had reset it, so every player was counted as a Loyalist. The answer is now recorded as soon as the scene ends.
- **The Mercury reaction (December 1999).** SJPW's "no more time for faction wars" reaction to Max Mercury after the split never showed, because the split flag was cleared too early. It is cleared later now.

Both fixes were checked in game, according to the project notes.

## Hidden content

Nothing below is changed by the patch. It is all in the original game.

- **Legends.** Finish a career and the wrestler select gets a fifth group, Legends, with Max Mercury and the wrestler you played. There is also a button code: on the title screen, hold Up on controller 1 and press Up on controller 2, then press Start.
- **A debug menu** ("OPTION MODE") is still in the game, but nothing in normal play opens it. It has difficulty and sound settings, a sound test, and sound effect and voice tests. A Pro Action Replay code, `7E006804`, opens it from the title screen.
- **A credits viewer** also survives, with its labels lost.

The full list, with addresses, is in the repository's `HIDDEN_CONTENT.md`.

## Notes

- **Prior art:** The project docs mention a 1990s patch and existing English guides, and say this translation is not based on that patch. <!-- TODO: confirm which earlier patch/guides exist and how complete they were -->
- **Source:** Everything needed to rebuild the patch from the original ROM is in the [GitHub repository](https://github.com/kactusken/Jikkyou-Power-Pro-Wrestling-English): the translated text, the Python build code and notes on the game's formats.
- **AI disclosure:** AI assisted with the translation.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by Konami or anyone else involved in the game, and it contains no game data. The patch only works on your own copy of the game.

If you find a problem, open an [issue](https://github.com/kactusken/Jikkyou-Power-Pro-Wrestling-English/issues) with a screenshot, which patch you used and where you were (the mode and menu, or what had just happened). Cut-off text, overlapping text or leftover Japanese are especially useful.
