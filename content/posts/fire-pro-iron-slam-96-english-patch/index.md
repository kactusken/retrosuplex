---
title: "Fire Pro Wrestling Iron Slam '96 gets an English patch (beta)"
date: 2026-11-02
sheet: 3
draft: true
summary: "A first public beta (v0.1) of an English patch for the 1996 PlayStation wrestling game, with all 246 messages translated and an optional unlock for the two hidden bosses."
tags: ["ps1", "playstation", "release", "beta", "fire-pro-wrestling", "xdelta"]
game: "Fire Pro Wrestling Iron Slam '96"
platform: "PlayStation"
toc: true
---

*Fire Pro Wrestling Iron Slam '96* is a 1996 PlayStation wrestling game that was only released in Japan. <!-- TODO: add developer/publisher; the project docs don't state them -->

This is a **first public beta, v0.1**. The README says all the text is translated, and that circuit mode, exhibition matches, belt bets, belt history, belt name entry and the memory card screens have been played through. It is still a beta, so expect to find things I missed.

{{< shot src="wrestler-select.png" alt="The wrestler select screen with English names centred under each portrait" caption="Wrestler select, with the names of the real wrestlers the characters parody." scale="1" >}}

## Download

{{< patch name="Fire Pro Wrestling Iron Slam 96 (English)" version="0.1 (beta)" format="xdelta" file="https://github.com/kactusken/Fire-Pro-Wrestling-Iron-Slam-96-English/releases/latest" platform="PlayStation" >}}

The release zip has three patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **Fire Pro Wrestling Iron Slam 96 (English)** | The translation, with the game otherwise unchanged. |
| **Fire Pro Wrestling Iron Slam 96 (English) (Bosses Unlocked)** | The translation, with the two hidden bosses, Minoru Suzuki and Antonio Inoki, selectable from the start. |
| **Fire Pro Wrestling Iron Slam 96 (Japan) (Bosses Unlocked)** | The original Japanese game, with the two bosses selectable from the start. |

You need your own copy of the original Japanese disc (serial SLPS-00277). The image must be the Redump dump, a single-track .bin with a .cue:

- `Fire Pro Wrestling - Iron Slam '96 (Japan).bin`
- 556894800 bytes
- CRC32 `ff62bf08`
- SHA-1 `2b06e910a32742579cf17280fed22f5533cd5d3a`

To patch it:

1. Apply the `.xdelta` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, with Delta Patcher, or on the command line: `xdelta3 -d -s "Fire Pro Wrestling - Iron Slam '96 (Japan).bin" "patch.xdelta" "patched.bin"`.
2. Rename the patched .bin to the name in the patch's `.cue` file from the zip, and keep both files in the same folder.
3. Open the `.cue` in your emulator. I tested in DuckStation.

The patch doesn't change save data, so saves from the original game work with the patched one and the other way round.

## What's translated

All 246 messages, which covers:

- Menus, match settings, and the wrestler select and results screens
- The names of the 71 finishing moves
- Circuit mode, the belt bet and belt history screens, and belt name entry
- The memory card prompts

{{< shot src="match-settings.png" alt="The match settings screen with every option and value in English" caption="Match settings, drawn with the game's own font." scale="1" >}}

{{< shot src="results.png" alt="The results screen showing the winner, the finishing move and the match time" caption="Results. The finish name is English; the match time keeps the Japanese minutes and seconds." scale="1" >}}

{{< shot src="rematch.png" alt="The results screen after a rematch, with a tally of each bout" caption="After a rematch, the results screen keeps a tally of each bout." scale="1" >}}

## What's still Japanese

- The match time on the results screen (分 = minutes, 秒 = seconds). The game draws the digits over those strings at fixed places, and I judged 4分38秒 clear enough.
- The save's title and icon in the memory card manager. I didn't want to touch the save data.
- The movies, the voices and the music.

The logos, staff credits and mode menu were already in English in the original, so they are unchanged.

## Translation decisions

- **Real names.** The twelve characters are parodies of real wrestlers, and the patch uses the real names: Jushin Liger, The Great Muta, Mitsuharu Misawa, Stan Hansen, Nobuhiko Takada, Big Van Vader, Super Delfin, Yoshiaki Fujiwara, Hulk Hogan and Akira Maeda, plus the bosses Minoru Suzuki and Antonio Inoki.
- **Name order.** Given name first, as in MINORU SUZUKI. The short names are surnames.
- **Centred names.** The original mixed centred and full-width names; all names are now centred.
- **Uppercase.** The game's font only has uppercase Latin letters, so the English is uppercase.

{{< shot src="narrow-names.png" alt="Wrestler names drawn in narrow letters on the select screen" caption="Names too long for the 16-pixel letters are drawn in narrow letters made for the patch." scale="1" >}}

## How the English got in

**Text.** Strings are lists of 16-bit codes ending in `0x0600`. The 246 message pointers sit in one table in the executable, and the strings fill the area before it exactly. The game draws each string into a fixed place in video memory and shows it as a sprite, so the English can't be wider than the Japanese it replaces. The build refuses to run if one is.

**Font.** The game has three 4-bit font images, one 8x16 and two 16x16, and no lowercase. Names that were too long got narrow letters, which I drew into blank cells of the fonts (`tools/narrow.py`).

**Space.** Some English needs more room than the original strings. The build reuses dead data in the executable, checking each piece by SHA-1 before using it. It includes the debug names of sound effects (`SE_PUNCH_2` and friends).

**The hook.** The game draws its text into video memory once and never clears it. English shorter than the Japanese left fragments of the old text behind. I added a 128-byte hook to the text routine, with two new codes: one draws blank cells, the other moves the drawing position back. The build starts each narrower string with them, so it blanks the whole place, then left-aligns or centres the text. I checked the hook by running the game's own renderer in a small MIPS simulator (`tools/mipsim.py`) against every English string, and then in game.

## Hidden bosses

The game has two hidden wrestlers, Minoru Suzuki and Antonio Inoki. Wrestler select normally cycles through ten wrestlers, and a single byte in memory widens it to twelve. To unlock them the normal way, win circuit mode with each of the ten starting wrestlers and save each champion belt to the memory card. They appear at wrestler select after the memory card is read before a match.

The Bosses Unlocked patches skip all that. One instruction changes: instead of clearing the byte at start-up, the game stores a 1 in it. I verified in game that both bosses show up in exhibition mode with the right names and portraits. I did not play through the card unlock itself. The two can also come up as random CPU opponents, as they do after a normal unlock.

{{< shot src="bosses.png" alt="Minoru Suzuki and Antonio Inoki on the wrestler select screen" caption="Suzuki and Inoki, selectable from the start with the Bosses Unlocked patches." scale="1" >}}

The project also documents other finds, such as a second costume on R1 at wrestler select, a cut 2-COUNT MATCH setting, and two finishing moves no match can end with. Most are marked "from the code" rather than seen in game. See `docs/HIDDEN_CONTENT.md` in the repository.

{{< shot src="memory-card.png" alt="A memory card prompt in English with controller button icons" caption="The memory card prompts are translated, with the button icons kept." scale="1" >}}

## Known gaps in the beta

- The match time still shows 分 and 秒.
- The save title and icon are Japanese.
- The movies and voices are untouched.
- The memory card unlock for the bosses was not played through.
- Two spare-data tables used for extra room are not yet confirmed in game.

## Notes

- **Prior art:** <!-- TODO: the docs only say no earlier documentation of the game's hidden content was found; confirm whether a prior English translation exists --> I haven't confirmed whether anyone translated this game before.
- **Source:** The translated text, the Python build code and notes on the game's formats are in the [GitHub repository](https://github.com/kactusken/Fire-Pro-Wrestling-Iron-Slam-96-English).
- **AI disclosure:** AI (Claude) assisted with reverse-engineering the game's text routines, and with the translation. I checked it by playing the game.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data. The patches only work on your own copy of the game.

If you find a problem, open an [issue](https://github.com/kactusken/Fire-Pro-Wrestling-Iron-Slam-96-English/issues) with a screenshot, which patch you used and where you were (the mode and menu, or what had just happened). Cut-off text, overlapping text, leftover fragments or Japanese other than the match time are especially useful.
