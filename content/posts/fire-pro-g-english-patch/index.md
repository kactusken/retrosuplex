---
title: "Fire Pro Wrestling G gets an English patch (beta)"
date: 2026-10-19
draft: true
summary: "A first public beta English patch for the 1999 PlayStation game: all 522 Fighting Road scenes, the menus, 194 wrestlers and 840 move names, with most story routes still unplayed."
tags: ["psx", "release", "beta", "human-entertainment", "fire-pro"]
game: "Fire Pro Wrestling G"
platform: "PlayStation"
kind: "Patch"
toc: true
---

*Fire Pro Wrestling G* (ファイヤープロレスリングG) is a 1999 PlayStation game from Human Entertainment, released only in Japan. This is an English translation patch for it.

It is a **beta**. Everything is translated, but most of the story routes have not been played through yet, so there will be text that runs out of its box, names that don't fit, and lines that read oddly. I'm releasing it so people can find those for me.

{{< shot src="cover.png" alt="Fighting Road story mode with English dialogue in the text box" caption="Fighting Road. The story text uses a new variable-width font." scale="1" >}}

## Download

{{< patch name="Fire Pro Wrestling G (English)" version="0.3" format="xdelta" file="https://github.com/kactusken/Fire-Pro-Wrestling-G-English/releases/latest" platform="PlayStation" year="1999" publisher="Human Entertainment" >}}

The release zip has five patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **(English)** | The translation, with the game otherwise unchanged. Wrestlers, Edit Mode rewards and other extras unlock as you play, as in the original. |
| **(English) (All Unlocked)** | The translation with everything unlocked from the start: every wrestler, every Edit Ranking reward, and the story-clear extras. It also adds some unused heads and body parts found on the disc to Wrestler Make, and fixes three moves. |
| **(English) (Fake Names)** | The translation with the game's own made-up names for wrestlers, promotions, venues and referees instead of the real ones. Unlocks as in the original. |
| **(English) (Fake Names) (All Unlocked)** | The Fake Names translation with everything unlocked. |
| **(Japan) (All Unlocked)** | The original Japanese game with everything unlocked and the three move fixes. Not tested in the game. |

You need your own copy of the original Japanese disc as a `.bin`/`.cue` image: *Fire Pro Wrestling G*, serial **SLPS-02065**, 303,368,016 bytes, CRC32 `d9b6b206`, SHA-1 `8dbba0ddad40f4b669a88b688417d67c21eb792d`. The later Spike Library reissue (SLPS-02817) is a different disc and won't patch.

Apply the `.xdelta` to the `.bin` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, with Delta Patcher, or with `xdelta3`. Then rename the patched `.bin` to match the `.cue` that comes with the patch and keep both in one folder. I tested in DuckStation.

There's also a [player's guide](https://kactusken.github.io/Fire-Pro-Wrestling-G-English/guide/) with the controls, every mode, a map of every Fighting Road branch and ending, and profiles of all the wrestlers.

## What's translated

- All 522 scenes of the Fighting Road story mode, about 9,400 messages
- About 1,000 menu and system strings: main menus, match setup, results, Edit Mode, CPU logic, Edit Ranking, memory card and PocketStation screens, the paint editor
- All 194 wrestlers' names and nicknames, plus the bonus edit wrestlers
- 840 move names
- All 43 Dojo tutorial lessons, with their button icons repositioned
- 26 images: the mode-select names, the wrestler-select labels and the victory captions
- The save titles on the memory card

{{< shot src="mode-select.png" alt="The mode select screen with English mode names" caption="Mode select. The mode names are redrawn images; the description at the bottom is menu text." scale="1" >}}

{{< shot src="wrestler-select.png" alt="The wrestler select screen with English names and profile labels" caption="Wrestler select. The labels on the left of the profile are redrawn images." scale="1" >}}

## What is still Japanese

- The title logo, the arena banners and the promotion logos, because they're artwork
- The kana grids on the name-entry screen
- The staff credits after the story ending. This is a known gap.

## Known gaps and testing status

The honest summary is in [docs/TESTING.md](https://github.com/kactusken/Fire-Pro-Wrestling-G-English/blob/main/docs/TESTING.md) in the repository.

- Most story routes and endings haven't been played through. The prologue is only partly checked.
- About 36 story lines are close to the edge of the text box. They should be readable, but I want them looked at.
- The English (All Unlocked) patch is my main test build. The plain English and Fake Names patches are partly checked, and the Japanese (All Unlocked) patch hasn't been tested in the game.
- Several modes are untested, among them Open League, Elimination Match, Battle Royal, Death Match, Title Match, Options and the memory card screens.

If you play a route to its end, a report saying everything looked fine is as useful as one listing problems.

## Translation decisions

- **Real names by default.** The original game uses made-up stand-ins for real wrestlers, promotions and referees. The main patches use the real names where they're known, for example "New Japan" rather than "View Japan".
- **Fake Names patches exist for a reason.** A player asked for the game's own names (Hurricane Rikimaru, View Japan, Nippon Butokan), so there are two patches that keep them. A few story lines that no longer fit were re-wrapped or rewritten by hand.
- **Saves are untouched.** The save format is unchanged, so memory cards from the Japanese game should work. With an All Unlocked patch, loading an old save also unlocks everything.

## How the English got in

The short version. [docs/HOW_IT_WORKS.md](https://github.com/kactusken/Fire-Pro-Wrestling-G-English/blob/main/docs/HOW_IT_WORKS.md) has the long one.

**Text.** The game's Japanese is Shift-JIS, two bytes per character. The story renderer only understood two-byte characters, so plain English letters came out blank. The game's font has full-width Latin letters, but each takes a 20 pixel square, which leaves room for about 21 letters on a line.

**Font.** I added two small pieces of MIPS assembly to the game, one for the story text box and one for the menu renderer. They draw each English letter at its real width and pack the letters into the same 20 or 12 pixel tiles the game already uses, so windows keep their layout.

**Space.** The disc has no spare room: `FPG.BIN`, the 42 MB archive with 291 entries, ends exactly where `FPG.XA` begins. The Japanese story script used about half its space, so English fits there. Menu strings are written in place when they fit. Otherwise they go in a new block at the end of the module and every reference is changed. The main program has no free space, so its strings are shuffled and packed into the space the Japanese used. The project's compressor packs slightly tighter than the original, which leaves some room.

**Graphics.** Mode names, labels and victory captions are pictures. The English versions are drawn as PNGs, converted to each picture's own palette and written back into the texture data.

**Screens that needed more.** Move Edit and the Dojo needed button icons moved to make room for longer labels. The match setup screen got wider boxes, and the Skill Edit screen was reorganised.

{{< shot src="move-edit.png" alt="The Move Edit screen with English labels and repositioned button icons" caption="Move Edit. The button icons were moved to fit the longer English labels." scale="1" >}}

## Move fixes and extras

The All Unlocked patches fix three moves that behave differently from the same move in another position. The face-up Arching Boston Crab can now make the opponent give up, Low Blow from behind counts as a foul, and the Haruki Special from behind can cause criticals.

The game also holds a developer menu, cut story scenes, unused art and more. The retail game doesn't reach the developer menu, and the build can restore it for testing. I've written up what I found in [docs/HIDDEN_CONTENT.md](https://github.com/kactusken/Fire-Pro-Wrestling-G-English/blob/main/docs/HIDDEN_CONTENT.md).

## Notes

- **Releases:** v0.1 came out on 2026-10-15 as the first public beta. v0.2 added the Fake Names patches and v0.3 added the move fixes, both on 2026-10-19.
- **Source:** Everything needed to rebuild the patches from the original disc is in the [GitHub repository](https://github.com/kactusken/Fire-Pro-Wrestling-G-English): the translated text, the Python build code and notes on the game's formats.
- **AI disclosure:** Since the initial release I've used Claude to help with documentation and with extra reverse engineering of how costumes and moves work.
- **Legal:** This is a non-commercial fan translation. It contains no copyrighted game data that would let anyone play without owning the game. The patches only work on your own copy of the disc.
<!-- TODO: README does not say whether earlier English patches exist; add a prior-art line if known. -->
<!-- TODO: confirm the release URL (derived from the git remote) once the first release is public. -->

## Reporting problems

Open an [issue](https://github.com/kactusken/Fire-Pro-Wrestling-G-English/issues) with a screenshot, which patch you used and where you were: the mode or menu, or in story mode, roughly what had just happened. Cut-off text, overlapping text and leftover Japanese are especially useful.
