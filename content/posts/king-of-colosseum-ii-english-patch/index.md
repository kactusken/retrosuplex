---
title: "King of Colosseum II gets an English patch (public beta)"
date: 2026-11-02
sheet: 13
draft: true
summary: "A public beta English patch for the PS2 pro wrestling game King of Colosseum II: 16,997 text entries and 292 menu pictures, drawn in the game's own proportional font."
tags: ["ps2", "release", "beta", "xdelta"]
game: "King of Colosseum II"
platform: "PS2"
toc: true
---

*King of Colosseum II* is a PlayStation 2 pro wrestling game that was only released in Japan. There is now an English patch for it. It is a public beta, and I want to be plain about that.

Everything in scope is translated, but I have not played every mode through in English. The Dojo dialogue and lessons and the Match Maker briefings and verdicts in particular haven't been checked on screen. You may find text that runs out of its box, a name that doesn't fit, or a line that reads oddly. The current release is v0.2 (beta).

{{< shot src="cover.png" alt="The Exhibition Match menu with English labels" caption="The Exhibition Match menu. The labels and the screen title are redrawn pictures; the help line at the bottom is regular menu text." scale="1" >}}

## Download

{{< patch name="King of Colosseum II (English)" version="0.2 (beta)" format="xdelta" file="https://github.com/kactusken/King-of-Colosseum-II-English/releases/latest" platform="PlayStation 2" >}}

The release zip has three patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **King of Colosseum II (English)** | The translation, with the game otherwise unchanged. Wrestlers, rings and shop items unlock as you play, as in the original. |
| **King of Colosseum II (English) (All Unlocked)** | The translation with everything unlocked from the start: every wrestler and costume, every ring, every Secret Shop item. It also unlocks content the game itself never gives you: hidden wrestlers and the cut Pancrase parts, rings and options. |
| **King of Colosseum II (Japan) (All Unlocked)** | The original Japanese game with the same unlocks. |

You need your own copy of the original Japanese disc as an `.iso` image: *King of Colosseum II* (Japan), serial SLPM-65602, 4,593,778,688 bytes, CRC32 `fad699da`, SHA-1 `f519ef2b98c0340c9ccd876e4988507d49787785`. Apply the patch to the clean original image, not to a v0.1 image.

Use an xdelta tool such as Delta Patcher (Windows, macOS, Linux), or on the command line:

```sh
xdelta3 -d -s "King of Colosseum II (Japan).iso" "patch.xdelta" "patched.iso"
```

Browser patchers like Rom Patcher JS may not cope with a 4.5 GB DVD image. I tested the patch in [PCSX2](https://pcsx2.net/).

The repository also has optional 16:9 widescreen `.pnach` files for PCSX2 by Arapapa. See the README for the install notes.

There is a [Player's Guide](https://kactusken.github.io/King-of-Colosseum-II-English/guide/) too. It covers the controls (which the game only teaches in the Dojo), how a match is won without a life bar, every mode, Edit Mode, the special skills and the secrets, with a Japanese glossary. Reference pages go with it: the [wrestlers](https://kactusken.github.io/King-of-Colosseum-II-English/wrestlers/), [Survival Road](https://kactusken.github.io/King-of-Colosseum-II-English/survival-road/), [Match Maker](https://kactusken.github.io/King-of-Colosseum-II-English/matchmaker-map/) and the [Secret Shop](https://kactusken.github.io/King-of-Colosseum-II-English/secret-shop/).

## What's translated

- All on-screen text: 16,997 entries
- All 292 menu and text-window pictures
- Menus, options, help lines, results, configuration, match types, titles and leagues
- Wrestler rosters, nicknames, data, Edit Mode templates and move names
- The Dojo tutorial: trainer dialogue, lessons and goals
- Match Maker: shows, briefings, verdicts, advice and loading tips
- Survival Road, the Secret Shop, Edit Mode, teams, promotions and title holders

{{< shot src="wrestler-select.png" alt="The wrestler select screen with English names, nicknames and finishers" caption="Wrestler select. Names, nicknames and finishers use the official English spellings; the promotion logos are artwork and stay as they are." scale="1" >}}

{{< shot src="survival-road.png" alt="The Survival Road mode screen in English" caption="Survival Road." scale="1" >}}

{{< shot src="match-maker.png" alt="A Match Maker briefing in English with names highlighted in yellow" caption="A Match Maker briefing. Names stay in yellow, as in the Japanese." scale="1" >}}

{{< shot src="dojo.png" alt="The Pro Wrestling Dojo screen with trainer dialogue in English" caption="The Dojo: the trainers' dialogue and all 84 lessons are in English." scale="1" >}}

## What is still Japanese

- The title logo, the promotion and belt logos, costumes and ring art, because they're artwork
- The three movies and the spoken commentary
- The kana and kanji grids on the name-entry screen. English names use the A-Z grid.
- The staff credits
- The save's title on the memory card
- A few debug screens drawn as pictures (the match-state readout and commentary categories)

## Translation decisions

- **Real names are official spellings.** Real wrestlers, promotions, titles and venues use their own official English names, given name first. The game's made-up venues get English names (Oedo Kokugikan, Rinkai Colosseum).
- **Name order in the game's data stays.** Japanese wrestlers keep surname first in full names, such as "Chono Masahiro".
- **Surnames are shortened where the list needs it.** The wrestler list has a fixed-size name canvas, and longer names wrap and shift the list. So a few became "Yanagi", "Kaiser", "HighSpurt" and "Ogasa".
- **Move names are established wrestling terms.** I checked them against the 2004 GameFAQs move guide and Fire Pro usage, and only translated literally where nothing established exists.
- **Vulgarity is not softened.** Chono's ファックオフ is "Fuck off!", as strong as the Japanese.
- **Saru the Man.** サル・ザ・マン keeps Saru rather than becoming "Sal" or "Monkey". He is an alias of the wrestler later known as Crazy Monkey.
- **Name entry.** The character-set buttons read ABC and !?#.

## How the English got in

This is the short version. The full notes are in the repository's `docs` folder.

**Archives.** The game's data lives in `KC2FIRE.AFS` and the packs `KC2FIRE.000`, `.001` and `.MVS`. The build unpacks them, replaces text and pictures, and repacks them.

**Text.** The game's text renderer only draws two-byte Shift-JIS. Any other single byte draws nothing, except space and new line. So plain English would have had to be stored full-width, two bytes a letter, and that is too long for fixed fields like the roster names. I patched the executable so that ASCII text is converted to the matching full-width codes just before drawing. The code sits in an unused 520-byte library routine in the executable. Multi-line dialogs still have to be stored full-width, because their line splitting breaks on single-byte characters.

**Font.** English is drawn with the game's own proportional font, so it fits the original windows and reads like normal text.

**Pictures.** The 292 menu pictures were redrawn with new lettering in Barlow Condensed, which is under the SIL Open Font License. Where the game already had English lettering, the new labels copy it.

**Space.** The changed text makes `KC2FIRE.000` grow. In v0.1 I moved it elsewhere on the disc, which made the patches 78 MB. Now it stays in place and the files after it move forward, taking the room from a zero-padding file. The patches are about 4 MB.

**Dojo quotes.** The Dojo draws text inside 「」 in yellow. The English puts move names in curly quotes, so I changed those two entries in the game's token table to match.

## Quirks of the original

The Music Test under Sound Option shows only the first few letters of a title, a different number each frame, so it flickers. The untouched Japanese disc does the same in PCSX2 2.8.2, so I left it alone.

## Extras and hidden content

The game holds an unlock-everything password, a developers' camera test viewer that nothing calls, a cut Pancrase promotion with its rings and options, and more. The two All Unlocked patches switch on the game's own unlock-all and the content that nothing in the game unlocks. Saves: with an All Unlocked patch, loading an old save keeps everything unlocked, but Survival Road's souls and records are reset to the unlocked values at every load. The patch doesn't change the save format, so memory cards from the Japanese game should work.

I've written up the findings in [HIDDEN_CONTENT.md](https://github.com/kactusken/King-of-Colosseum-II-English/blob/main/docs/HIDDEN_CONTENT.md).

## Known gaps in v0.2

- The Dojo dialogue and lessons, and the Match Maker dialogue, have not been checked on screen.
- Not every mode has been played through in English.

v0.2 fixed the Load Sample list in Edit Wrestler, which broke when samples were still locked, and a doubled word in one line of text.

## Notes

- **Prior art:** I found no disc translation patch. A fan site offers an English texture replacement pack for PCSX2 that covers menus, rings and wrestlers, but it doesn't touch the disc. The GameFAQs guides from 2004 were my source for established English names.
- **Source:** Everything needed to rebuild the patches from the original disc is in the [GitHub repository](https://github.com/kactusken/King-of-Colosseum-II-English): the translated text, the Python patching code and notes on the game's formats.
- **AI disclosure:** AI assisted with this project. It builds on the tools and process from my Fire Pro Wrestling G translation. Claude was used to translate the text, to adapt that earlier code to the PS2, and to help reverse-engineer this game's formats.
- **Legal:** This is a non-commercial fan translation. It contains no copyrighted game data that would let anyone play without owning the game. The patches only work on your own copy of the disc.
- <!-- TODO: year, developer and publisher are not stated in the project docs; add an intro line if wanted. -->

If you find a problem, open an [issue](https://github.com/kactusken/King-of-Colosseum-II-English/issues) with a screenshot, which patch you used, and where you were: the mode and menu, or in the Dojo or Match Maker, which lesson or show. Cut-off text, overlapping text or leftover Japanese are especially useful. Reports from the Dojo and Match Maker are the most useful of all, even if everything looked fine.
