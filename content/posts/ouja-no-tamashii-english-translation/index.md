---
title: "Ouja no Tamashii: a PlayStation wrestling game in English"
date: 2026-11-02
sheet: 2
draft: true
summary: "An English translation of Zen Nippon Pro Wrestling: Ouja no Tamashii for the PlayStation, with menus and images redrawn and a patch that can also unlock the hidden modes."
tags: ["playstation", "release", "all-japan", "xdelta", "translation"]
game: "Zen Nippon Pro Wrestling: Ouja no Tamashii"
platform: "PlayStation"
toc: true
---

*Zen Nippon Pro Wrestling: Ouja no Tamashii* is a Japan-only PlayStation wrestling game based on All Japan Pro Wrestling. This is my English translation of it. The repository is tagged 1.0.0.

<!-- TODO: add the release year, developer and publisher; the project docs only give the disc code SLPS-01849 -->

{{< shot src="title-menu.png" alt="The English title menu" caption="The title menu in English." scale="1" >}}

## Download

{{< patch name="Ouja no Tamashii (English)" version="1.0.0" format="xdelta" file="https://github.com/kactusken/Ouja-no-Tamashii-English-Translation/releases" platform="PlayStation" >}}

<!-- TODO: confirm the GitHub release for 1.0.0 exists and link to it directly; the README points to the Releases page and the repo has a 1.0.0 tag -->

Each release zip has three patches. Apply one to the original image on its own. They don't stack, because the translation moves data around the disc and a second patch would land on the wrong bytes.

| Patch | What you get |
|---|---|
| **(English)** | The translation only. |
| **(English + Unlocks)** | The translation with every unlock below. |
| **(Japan + Unlocks)** | The original Japanese game with every unlock below. |

You need your own copy of the Redump image of the Japanese disc, as a single-track BIN/CUE:

| | |
|---|---|
| File | `Zen Nihon Pro Wres - Ouja no Tamashii (Japan).bin` |
| Size | 498,751,008 bytes |
| CRC32 | `8ae69263` |
| SHA-1 | `1bc41b753496de3487538a68bbf49714001d7f03` |

If your copy is a CHD, convert it back with `chdman extractcd -i "game.chd" -o "game.cue"` first.

To apply the patch, use [Delta Patcher](https://github.com/marco-calautti/DeltaPatcher) on Windows, UniPatcher on Android, [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, or `xdelta3 -d -s "<Japanese .bin>" "<patch>.xdelta" "<output>.bin"` on the command line. Save the result under the patch's name with `.bin`, and put the matching `.cue` from the release next to it, because the `.cue` refers to the `.bin` by name. The `README.txt` in each release lists the checksums of the patched images.

There is also a [player's guide](https://kactusken.github.io/Ouja-no-Tamashii-English-Translation/guide/) with the modes, controls, Path of the Five Crowns week by week, every Edit Wrestler part and a Japanese glossary.

## Current state

The README doesn't say how much of the game I have played through, so I won't claim a full play-through here. The screenshots in the repository come from DuckStation.

<!-- TODO: state which emulator/version the patch was tested on and how much of the game was played -->

{{< shot src="mode-select.png" alt="The mode select screen with English mode names and a description" caption="Mode select. The buttons and descriptions are images, redrawn in English." scale="1" >}}

{{< shot src="five-crowns-intro.png" alt="Giant Baba explaining the goal of the first series in English" caption="Path of the Five Crowns: Giant Baba sets out your goal for the year." scale="1" >}}

{{< shot src="five-crowns-training.png" alt="The training screen of Path of the Five Crowns in English" caption="Training, in Path of the Five Crowns." scale="1" >}}

## What's translated

Most of the visible text in this game is graphics, not text strings. Menu buttons, mode descriptions, option labels and name plates are all images, so most of the work was redrawing them. The translation data lists every image with Japanese text, with its transcription, English, and a status of `done`, `keep` (stays Japanese) or `todo`.

The text strings that are real text live in the code overlays: costume names and memory-card titles (`PROG.BIN`), the staff credits and the Giant Baba tribute text (`STAFF.BIN`), and chapter names and dates (`CRW.BIN`). The credits are re-laid out automatically for the English.

<!-- TODO: say which images (if any) are still marked keep or todo in translation/graphics.csv; the docs don't give counts -->

## What is still Japanese

The README doesn't list what remains in Japanese. Images marked `keep` in the translation data stay Japanese on purpose.

<!-- TODO: list the known remaining Japanese -->

## How the English got in

**Images.** The disc's `DATALINK.ARC` archive holds 1,659 entries, including 262 TIM images and 96 IMG3 containers, some of them compressed (CMP1, a byte-pair encoding stream). I wrote tools to unpack these, render English into the same sizes and palettes, and put them back. Images that needed a uniform look are drawn by hand, and an editing guide in the repo covers that workflow.

**Text.** The game can't draw plain ASCII. The credits renderer steps two bytes per character and draws each 16-bit code, so the English is stored as full-width Shift-JIS. Spacing is proportional, because the loop treats full-width letters and digits as narrow and advances 10 pixels for them.

**Space.** The overlays all load at the same RAM address and can grow up to the heap, so strings that don't fit are relocated and appended. Files that outgrow their slot on the disc can move into the free sectors after `STAFF.BIN`. The translation moves `PROG.BIN` and regenerates the sector EDC/ECC, which is why the patches can't be stacked.

**Palettes.** The repository has two `.act` colour tables, `MenuColorTable.act` and `mode-select.act`. <!-- TODO: explain what these two colour tables are used for; the docs don't say -->

## Unlocks

The Unlocks patches change a few things in the game's code:

- **Survival Match** and Title Match are on the mode select from the start. Normally Survival can't be unlocked at all. No normal gameplay path sets its flag in this build.
- **Edit Wrestler:** every body, move set, logic and entrance type is open from the start, and the hidden bodies 44 to 50 are added at the end of the Body Type list. They are track-suit Inoue, Asako, Shiga and Kanemaru, Takeshi Morishima, track-suit Mossman and referee Kyohei Wada.
- **Path of the Five Crowns:** the full wrestler lists in both chapters. Normally a button code adds Fuchi, Ogawa, Tsuruta and Baba to Succession, and Kanemaru, Kikuchi and Asako to Ascent.

{{< shot src="edit-wrestler.png" alt="The Edit Wrestler screen in English" caption="Edit Wrestler." scale="1" >}}

The hidden bodies can also be reached in the original game: hold SELECT while confirming the Body page on Baba, Taue, Inoue, Asako, Shiga, Kanemaru or Mossman. The notes also describe a developer entrance editor and a debug handler that the game ships switched off.

## Translation decisions

<!-- TODO: add translation decisions people will notice; translation/glossary.md has the wrestler names and terms but I haven't summarised it here -->

## Notes

- **Prior art:** <!-- TODO: state whether an earlier English translation exists; the docs don't say -->
- **Source:** the tools, text tables and notes are in the [GitHub repository](https://github.com/kactusken/Ouja-no-Tamashii-English-Translation) under the MIT license. It includes no disc image, game files or artwork, apart from the screenshots.
- **AI disclosure:** <!-- TODO: the README makes no statement about AI use -->
- **Legal:** this is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data. The patches only work on your own copy of the disc.

If you find a problem, open an [issue](https://github.com/kactusken/Ouja-no-Tamashii-English-Translation/issues) with a screenshot, which patch you used and where you were. Cut-off text, overlapping text or leftover Japanese are especially useful.
