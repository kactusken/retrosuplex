---
title: "Fire Pro Wrestling D gets an English patch"
date: 2026-11-02
sheet: 12
draft: true
summary: "An English translation of Spike's 2001 Dreamcast wrestling game, with 220 wrestlers, 1,000 move names, Edit Mode, the network browser, and the downloadable content built in."
tags: ["dreamcast", "release", "spike", "fire-pro", "xdelta"]
game: "Fire Pro Wrestling D"
platform: "Dreamcast"
toc: true
---

*Fire Pro Wrestling D* is a 2001 Dreamcast game from Spike, released only in Japan. I've translated it into English. The patch is at v1.1, and the project README calls it complete. Some things are still in Japanese, and a few things couldn't be tested. Both are listed below.

{{< shot src="main-menu.webp" alt="The main menu with English buttons and an English help line under them" caption="The main menu. The buttons are redrawn pictures; the help line changes with the cursor." scale="1" >}}

## Download

{{< patch name="Fire Pro Wrestling D (English)" version="1.1" format="xdelta" file="https://github.com/kactusken/Fire-Pro-Wrestling-D-English/releases/latest" platform="Dreamcast" year="2001" publisher="Spike" >}}

The release zip has five patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **(English) (Real Names)** | The translation, with the real names of the wrestlers the characters stand for. |
| **(English) (Parody Names)** | The translation, with the game's own parody names for the wrestlers. |
| **(English) (Real Names) (All Unlocked)** | Real Names with everything unlocked from the start, plus 100 downloadable moves and 50 downloadable wrestlers built in. |
| **(English) (Parody Names) (All Unlocked)** | The same, with Parody Names. |
| **(Japan) (All Unlocked)** | The original Japanese game with the same unlocks and downloads. |

You need your own copy of the original Japanese disc. The README gives the serial as T-18805M, a 50-track BIN/CUE dump (Redump). The main track must match:

- `Fire Pro Wrestling D (Japan) (Track 50).bin`
- 112009296 bytes
- CRC32 `c0114432`
- SHA-1 `c6037b763e59b801101b9538cbf3ec406e14490b`

You patch two of the disc's files with [Delta Patcher](https://github.com/marco-calautti/DeltaPatcher/releases), then open the disc's original `.cue`. Nothing needs renaming. There's a [step-by-step guide](https://github.com/kactusken/Fire-Pro-Wrestling-D-English/blob/main/docs/HOW_TO_PATCH.md) in the repository. I tested in [Flycast](https://github.com/flyinghead/flycast).

There's also a [player's guide](https://kactusken.github.io/Fire-Pro-Wrestling-D-English/guide/) covering controls, every mode, Edit Mode, all 220 wrestlers, the 50 downloadable ones, every move and the secrets.

## Status

This is v1.1. What the README says about testing:

- I tested in Flycast over several rounds, including every Victory Road ending.
- The network mode could only be checked offline, because Sega's servers are gone and the online pages can't be reached.
- Loading saves made with the Japanese game hasn't been tested yet. The patches use the same save files, so they should carry over.

## What's translated

- Every menu and mode, help lines and messages, match settings, results, Title Match, league and tournament screens, Victory Road Kai, Options and Memory Card
- The 220-wrestler roster with names, nicknames and profiles
- All 1,000 move names
- All of Edit Mode: Edit Wrestler (appearance, skills, parameters, moves, CPU logic), Edit Promotion, Edit Referee and the belt editor
- The network mode's DreamPassport 3 browser: its 785 messages, its own strings and the upload form
- Pictures with text: the main menu buttons, the wrestler profile tags, the elimination order boards, the result banners, and 13 sheets of the browser's button, title and keyboard pictures

{{< shot src="select-real.webp" alt="The wrestler select screen with English names, nicknames and profile tags" caption="Wrestler select, Real Names patch." scale="1" >}}

{{< shot src="match-settings.webp" alt="The match settings screen for One Night Match, with English rule, ring, venue and referee settings" caption="Match settings for One Night Match." scale="1" >}}

## What is still in Japanese

- The staff credits
- Decorative art: logos, shirts, signs, ring art
- The intro movie's captions
- The kana and kanji keys of the name-entry keyboards. Their ABC page covers English names.
- In the network mode, the kana keys of the soft keyboard. The pages Sega's servers sent are gone and can't be translated.

Edit wrestlers named in Japanese keep their Japanese names. A few names are cut short in the wrestler list. That's known and I left it as is.

## Real names or parody names

The game gives its wrestlers parody names. The two name patches differ only here.

- **Real Names** uses the real wrestlers' names and nicknames, and the real promotions (NEW JAPAN, ALL JAPAN, NOAH, WWF, WCW and so on).
- **Parody Names** keeps the names the game itself uses, romanized from the game's kana and translated.

{{< shot src="select-parody.webp" alt="The wrestler select screen with the game's parody names in English" caption="The same screen in the Parody Names patch." scale="1" >}}

## Translation decisions

- **Names.** Given name first, Hepburn without macrons. Katakana English becomes the English word.
- **Moves.** Standard English names (German Suplex, Lariat, DDT). 雪崩式 is "Super", 高角度 is "Hi-Angle", 串刺し is "Corner", and リバース is "Rev". I used PB and PD only when a name was too long. 喉輪落とし is "Chokeslam".
- **Labels.** Menus and labels are in Title Case. Help lines and messages are sentences. Abbreviations have no periods (Def, Rev, Jr, KO, 5 Min).
- **Promotion names** that are the game's own (VIEW JAPAN, OLIVE JAPAN...) stay as they are in both patches.
- **Uncensored.** "Crazy Fuckin'" is left as written.
- **Victory Road Kai** keeps that name.
- **A fresh translation.** An earlier English patch from 2012 circulates (see Notes). I didn't use it.

## How the English got in

The short version, for this one. The rest is in the repository's `docs/`.

**Text.** The program's strings are Shift-JIS, in one region of `1ST_READ.BIN`, and each one is reached by 32-bit pointers. The game draws them live with a large proportional font that has every printable ASCII character except `#`, which starts a spacing code. Menus resize to their text, so most of them just grow. Where a field has a fixed size, the build measures the English in pixels and checks it.

**Space.** English is longer than the Japanese it replaces. The build repacks the whole pool of pointer-referenced strings (27,415 bytes) in order, aligned to 4 bytes, and updates every pointer. The English takes 23,151 bytes of it. Fixed fields such as save labels and referee names are written in place, and only those. A string in the pool moves, so writing at its old offset would damage whatever moved there, and the build refuses it.

**Pictures.** The menu text sheets in the network browser are 512x512 compressed (VQ) textures. The build redraws the text and re-encodes them. The lettering is in Noto Sans SemiCondensed Bold, in the original colours.

**Disc layout.** The extra content for the All Unlocked patches needs room on the disc, so the build moves `1ST_READ.BIN` to make space. The patches are xdelta files against two files of the disc, which is why the original names have to be kept.

{{< shot src="network-browser.webp" alt="The DreamPassport 3 browser with English buttons and menus" caption="The network browser. The servers it connected to are long gone." scale="1" >}}

## The downloadable content, built in

In 2001-2002 Spike offered new moves and wrestlers that players downloaded through the Dreamcast's modem onto a memory card. The servers are gone. The (All Unlocked) patches put it all in the game from the first boot, with no memory card needed.

- **100 downloadable moves** (W00-W99). W00-W56 are the official downloads. W57-W99 were backported from *Fire Pro Wrestling Z* by the Fire Pro community, some fixed so they can finish a match. They are at the end of Move Edit's lists, in red. Six of them are named in Japanese, and those have English names in the English patches.
- **50 downloadable wrestlers**, the edit wrestlers Spike released, each in their promotion on the wrestler select screen. The roster includes 2 Cold Scorpio, Naomichi Marufuji, Tajiri, Rey Mysterio Jr., the Hardys and the Dudleys, and Zangief.
- **Your own edit wrestlers** in groups 1-3 load beside them. The downloadable ones sit in edit group 4 (Ext Data 4), and your own Ext Data 4 file replaces them.
- **Your saves stay safe.** The All Unlocked patches won't save over a file on a card unless that file was loaded from it. The game shows "Can't overwrite: load it first." Insert your memory card before switching on.

The All Unlocked patches also open everything that winning every Victory Road title, or pressing L+R+Y at the main menu, opens: Credits, the full edit limit and all elimination teams.

{{< shot src="edit-wrestler.webp" alt="The Edit Wrestler screen with the profile card and editing menu in English" caption="Edit Wrestler." scale="1" >}}

{{< shot src="cpu-logic.webp" alt="The CPU Logic editor with English situation and move slot labels" caption="CPU Logic, the editor for how a CPU wrestler fights." scale="1" >}}

{{< shot src="victory-road.webp" alt="A Victory Road Kai screen with English championship and record text" caption="Victory Road Kai." scale="1" >}}

## Bugs fixed

v1.1 fixed a bug in my own work. In the Ring setting of match setup, most ring names showed as fragments ("JAPAN", "N", "ToryBIG JAPAN") or wrong entries in every English patch. All 18 now read correctly. The same bug had damaged the country Tonga and the first music title, which are fixed too. I also shortened two music titles that ran off the Match Music field.

## Hidden content

The game has debug menus and other leftovers that the normal game never reaches. I've documented them, along with unlockables and unused content, in `docs/HIDDEN_CONTENT.md` in the repository. The debug menus are a build option only and are not part of any released patch. <!-- TODO: decide whether to say more about the debug menus here -->

## Notes

- **Prior art:** An English translation by Irvgotti452, released in 2012, circulates as an "English patched" image on ROM sites. This project doesn't build on it. It's a fresh translation of all the text, move and wrestler names included, as a standalone patch, with the downloadable content built in. I found no technical documentation of the game's formats.
- **Source:** Everything needed to rebuild the patches from your own disc is in the [GitHub repository](https://github.com/kactusken/Fire-Pro-Wrestling-D-English): the translated text, the Python patching code and notes on the game's formats.
- **Thanks** to the Fire Pro community for preserving the downloads and for the backports.
- **AI disclosure:** AI assisted with the translation.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no copyrighted game data that would let anyone play without owning the game. The patches only work on your own copy of the disc.

If you find a problem, open an [issue](https://github.com/kactusken/Fire-Pro-Wrestling-D-English/issues) with a screenshot, which patch you used and where you were (the mode and menu, or roughly what had just happened). Cut-off text, overlapping text or leftover Japanese are especially useful.
