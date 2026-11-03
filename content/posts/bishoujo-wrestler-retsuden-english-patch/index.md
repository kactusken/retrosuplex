---
title: "Bishoujo Wrestler Retsuden gets an English patch"
date: 2026-11-02
sheet: 7
draft: true
summary: "A first English release (v0.1) of a 1996 Super Famicom women's wrestling management game: 3,413 lines of story, new 8x16 font, and names packed into the old name font."
tags: ["snes", "release", "kss", "management", "joshi"]
game: "Bishoujo Wrestler Retsuden: Blizzard Yuki Rannyuu!!"
platform: "SNES"
toc: true
---

*Bishoujo Wrestler Retsuden: Blizzard Yuki Rannyuu!!* (美少女レスラー列伝 ブリザードYuki乱入!!) is a women's pro wrestling management game by KSS for the Super Famicom, released in 1996 and only in Japan. It now has an English patch.

This is **v0.1, the first public release**, not a finished 1.0. All the text is translated. Every ending was reached in an emulator, but I have not played every route and mode through from start to finish. Please report anything that looks wrong.

{{< shot src="story.png" alt="A story scene with Eri Kishima speaking, her face beside an English dialogue box" caption="A Champion Road story scene in the new 8x16 font." scale="1" >}}

## Download

{{< patch name="Bishoujo Wrestler Retsuden - Blizzard Yuki Rannyuu!! (English)" version="0.1" format="BPS" file="https://github.com/kactusken/Bishoujo-Wrestler-Retsuden-English/releases/latest" platform="Super Famicom" year="1996" publisher="KSS" >}}

The release zip contains one patch: the translation, with the game otherwise unchanged.

You need your own copy of the original Japanese game (serial SHVC-A3QJ-JPN): 2,621,440 bytes, no copier header, CRC32 `f4d20413`, SHA-1 `de5fc2caae6803bfcb2eaf831a346b0e422a4e77`. Apply the `.bps` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, or with Floating IPS (Flips) on Windows or Linux, or MultiPatch on macOS. If the patcher refuses, you have a different dump, or your ROM has a 512-byte copier header (Rom Patcher JS can remove it). I tested in Mesen.

Start a new game. Saves from the Japanese game, or from another version of the patch, store names in the old letter codes, so the names show up garbled.

## What's translated

- All 3,413 lines of story across Champion Road (the career mode, with nine endings) and the World Circuit
- The wrestlers' names and profiles
- Every menu, the schedule and training help
- Move names, the match commentary and the winners' quotes

Still in Japanese, on purpose: the title logo, the same logo repeated as the menu background, the ticket picture on the save screen and the copyright line on the title screen.

{{< shot src="heroine-select.png" alt="The heroine select screen with five names in capital letters and a wide selection bar" caption="Choosing a heroine. The names use the game's name font." scale="1" >}}

{{< shot src="weekly-plan.png" alt="The weekly plan screen with English title art, day labels and a help message" caption="The weekly plan: title art, day labels and help text." scale="1" >}}

{{< shot src="training.png" alt="The training menu with English buttons and the wrestler's info box" caption="The training hub." scale="1" >}}

{{< shot src="stats-up.png" alt="The Stats Up screen with English stat names and headers" caption="Stats Up, redrawn for the game's high-resolution screens." scale="1" >}}

{{< shot src="learn-moves.png" alt="The Learn screen with English move names, tabs and learn panel" caption="Learning moves." scale="1" >}}

{{< shot src="match.png" alt="A match in progress with English commentary along the top and strategy icons" caption="A match, with the commentary ticker and strategy icons." scale="1" >}}

{{< shot src="profile.png" alt="Mighty Yukiko's wrestler profile screen in English" caption="A profile, as shown in the title screen's attract mode." scale="1" >}}

## Known gaps

The changelog lists nothing else outstanding for v0.1, but two things are worth saying plainly. Not every route and mode has been played through. And the project notes record the belt names as translated but "not seen yet" in game.

<!-- TODO: confirm with the author whether any other known gaps exist -->

## Translation decisions

- **Names are Western order,** family name last. The game draws names in capitals in its own name font.
- **Readings follow the game's own kana records.** 新咲 is Shinzaki and 羽田 is Hada. ブリッド, in two of the ending titles, is "Hybrid".
- **Some minor characters' names are guesses:** Zail, Peil, Kima, Maegami, Sae / Saeko and Kana Kozuki. They may change if a better source turns up.
- **Honorifics are dropped,** except "senpai".
- **Offensive language is translated as written.** I did not rewrite the script.
- **Foreign characters' broken Japanese** became lightly broken English.
- **Buttons:** 決定 is "OK", メニューに戻る is "Back", and the strategy styles are Safe, Fight, Even and Rush. The label space is fixed, and "Manual" and "Steady" did not fit.

## How the English got in

The game draws its text as 16x16 kanji. A line holds about 13 glyphs, and English needs 26 to 30 letters, so the patch adds its own renderer.

**Text.** A new 8x16 English font is drawn into the game's text by a renderer hook, one letter per 8-pixel column. It reuses the original's 16-bit code list, 4 KB buffer and VRAM area. Narration starts at column 2 and everything else at column 6, because the speaker's face fills the left of the window.

**Names.** Names were drawn from 16x16 glyphs. I rebuilt the name font so each tile holds two letters. The font has only codes 1 to $BF, and mixed-case letter pairs would need about 230, so names are in capitals.

**Space.** The patch expands the ROM to 32 Mbit.

**Graphics.** Many labels are art, not text: buttons, headers, the schedule screen's title art and the match strategy icons. I redrew them, and made several layout fixes for the longer English, such as a wider selection bar and a larger dialogue buffer.

**Commentary and help text.** The match commentary and winners' quotes are rendered on the fly by two hooks. The schedule help texts use half-width letters so 11 kanji per line become 22 letters.

Each build step checks the original bytes before writing. The release patch has no gameplay changes. The details are in the repository's docs.

## Hidden content

The project documents hidden content in the repository, each item marked as verified in game or from the code:

- Two main menu button codes that open every Champion Road rating gate, and the second also lets you start at a chosen chapter. I verified both in the English build in Mesen.
- Four hidden wrestlers (Megumi Muto, Chigusa Yuki, Reiko Kanamori and Narumi Otaka), who are also the opponents at the World Circuit's last stop.
- 519 lines of cut story, which you can read on the [cut-content page](https://kactusken.github.io/Bishoujo-Wrestler-Retsuden-English/cut-content/).

There is also a [Champion Road field guide](https://kactusken.github.io/Bishoujo-Wrestler-Retsuden-English/champion-road/) with the rating gates, training, how matches are decided and how to reach each ending.

## Notes

- **Prior art:** <!-- TODO: state whether an earlier English translation exists; the project docs do not say -->
- **Source:** Everything needed to rebuild the patch from the original ROM is in the [GitHub repository](https://github.com/kactusken/Bishoujo-Wrestler-Retsuden-English): the translated text, the Python build code and documentation of the game's formats.
- **AI disclosure:** This translation was made with the assistance of AI.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data that would let anyone play without owning the game. The patch only works on your own copy of the ROM.

If you find a problem, open an [issue](https://github.com/kactusken/Bishoujo-Wrestler-Retsuden-English/issues) with a screenshot, which patch version you used and where you were. Cut-off text, overlapping text or leftover Japanese are especially useful.
