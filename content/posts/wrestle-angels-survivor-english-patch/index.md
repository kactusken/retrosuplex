---
title: "Wrestle Angels Survivor gets an English patch (v0.1)"
date: 2026-11-02
draft: true
summary: "A v0.1 English patch for the 2006 PS2 women's wrestling promotion-management game: 8,348 event messages, 206 wrestlers and 911 re-lettered pictures."
tags: ["ps2", "release", "beta", "management-sim", "joshi"]
game: "Wrestle Angels Survivor"
platform: "PS2"
kind: "Patch"
toc: true
---

*Wrestle Angels Survivor* is a 2006 PlayStation 2 game from Success, released only in Japan. You run a women's wrestling promotion: scout and sign wrestlers, train them, book matches, and play the matches themselves in exhibition mode. Now there's an English patch.

This is **v0.1, the first public release**. I tested it in PCSX2 across exhibition mode (Special Match, Tournament, League) and management mode. That is not the same as a full playthrough, so expect rough edges and please report them.

{{< shot src="cover.png" alt="The title screen of Wrestle Angels Survivor with the English patch" caption="The title screen. The logos stay as they are." scale="1" >}}

## Download

{{< patch name="Wrestle Angels Survivor (English)" version="0.1" format="xdelta" file="https://github.com/kactusken/Wrestle-Angels-Survivor-English/releases/latest" platform="PlayStation 2" year="2006" size="2,396,487,680 bytes (original ISO)" >}}

The release zip has three patches. Pick one; each applies to the original disc on its own.

| Patch | What you get |
|---|---|
| **Wrestle Angels Survivor (English)** | The translation, with the game otherwise unchanged. |
| **Wrestle Angels Survivor (English) (Unlocked)** | The translation, plus the gallery shows every picture from the start, and the 52 alternate ("2P") wrestlers can be found in tryouts and scouting from year 1 of management mode instead of years 3-11. |
| **Wrestle Angels Survivor (Japan) (Unlocked)** | The original Japanese game with the same unlocks. |

The zip also has a `cheats` folder of PCSX2 cheat files for each patch and for the original game: money, wrestler stats, every random event on or off, the full gallery and hidden scenes.

You need your own copy of the original Japanese disc: `Wrestle Angels Survivor (Japan).iso`, serial SLPM-66239, 2,396,487,680 bytes, CRC32 `484c321b`, SHA-1 `8f7f823bdae30bfa0431714c4c0bced83b9e51bb`. The budget "Good Price" reissue (SLPM-66927) is a different image. I haven't tested it, and the patches won't apply to it.

Apply the `.xdelta` with Delta Patcher (the easiest for an image this size), or on the command line:

```sh
xdelta3 -d -s "Wrestle Angels Survivor (Japan).iso" "patch.xdelta" "patched.iso"
```

Rom Patcher JS in a browser may not cope with a 2.4 GB image. I tested in PCSX2.

**PCSX2 can crash during the opening movie.** This is a known PCSX2 issue with this game, the original Japanese version included ([issue 12179](https://github.com/PCSX2/pcsx2/issues/12179)). Press START as soon as the movie begins to skip it, or set the EE Cycle Rate to 50% before the movie plays and put it back afterwards.

There's also a [player's guide](https://kactusken.github.io/Wrestle-Angels-Survivor-English/guide/) covering how matches and cards work, running a promotion through to the Final Series, the whole roster and every move.

## What's translated

- All 8,348 event messages: management-mode events, scouting and signing scenes, vacations, photo books, title changes and retirements
- Menus and help text in exhibition and management mode
- All 206 wrestlers: names, finishers, nicknames and titles, and their voiced lines
- 384 venues, the ring announcer and the pre-match quotes
- 911 pictures with Japanese lettering: menus, buttons, banners, match screens, name strips and portraits
- Screens where English didn't fit, reworked in the game's code: wrestler info pages, rankings, save/load slots, map titles, menu highlights and list columns

{{< shot src="office.png" alt="Management mode's main menu with the Staff submenu open and a help line at the bottom, all in English" caption="The office: main menu, Staff submenu and help line." scale="1" >}}

{{< shot src="signing.png" alt="An event dialogue where a wrestler is being signed, with the speaker's name in the name box" caption="A signing scene. The speaker's name sits in the name box." scale="1" >}}

## What is still Japanese

- The logos and the opening movie
- The voices (Japanese audio)
- The staff credits
- The kana side of the name-entry keyboard, because players type Japanese names there
- The Japanese name at the top of each wrestler's face picture. I added the English name along the bottom so the art isn't cut.

Saves from the original Japanese game haven't been tested with the patch. A new save is safest.

## Known gaps

This is v0.1, so here is what I can't vouch for:

- It is tested in PCSX2 only, across the modes listed above. <!-- TODO: say how much of management mode (how many years, endings reached) was actually played, if known -->
- The "Unlocked" patches' unlock groups are marked "not yet verified in game" in the project's patch notes. The gallery and alternates patch changes are described below.
- Some of the English names are new choices that the project notes list as "to confirm" (see translation decisions).

## Translation decisions

- **Names are in Western order**, given name first (Suzumi Ishikawa). Ring names stay as ring names. Names that also appear in the *Wrestle Angels Survivor 2* English translation match it.
- **The player is the President.** Wrestlers call him "Boss", or "President" in formal scenes such as contracts, ceremonies and outsiders. His own narration in parentheses is first person.
- **Honorifics are dropped**, except *senpai*, which carries the seniority that matters in joshi wrestling.
- **Verbal tics stay.** Wrestlers keep their register and catchphrases, for example *Ukyu*.
- **Promotion names follow each promotion's own logo.** The rival groups are Revolution Army and Rebel Army, with the regulars as "the regulars".
- **Lettering** is Barlow Condensed in the original colours.

{{< shot src="wrestler-info.png" alt="A wrestler's info page shown during transfer talks, with English stats" caption="A wrestler info page. The value slots were reworked to fit English." scale="1" >}}

## How the English got in

The short version of what the project's notes describe. The longer version is in `docs/TECHNICAL.md` in the repository.

**Event scripts.** The scripts live in an LZ-compressed archive of 330 entries. A small virtual machine runs one at a time. Message text is Shift-JIS, and the English replaces it in the rebuilt entries. I checked the extraction by unpacking and repacking all 329 scripts. Control codes such as `FF 01` plus a number insert a name the game fills in.

**Font.** The game's font is 22x22, 4 bits per pixel, and its ASCII range is a narrow half-width serif set drawn in fixed 11 pixel cells. The English text uses that, at 36 letters per line. The notes say a proportional font, as in the *Wrestle Angels Survivor 2* translation, is a later step that needs in-game testing.

**Menus and names.** The executable's 1,061 menu and message strings, and the 279 roster records (206 wrestlers plus coaches and staff), are extracted and written back. The game copies a name only if it is short enough, so the length matters.

**Pictures.** Text in pictures sits in TIM2 images inside the LZ files. 911 of them are re-lettered, either from a lettering description or hand-made.

**Code.** Where English didn't fit a screen, I changed the game's code to move or resize things. The two unlock patches are tiny code changes, described next.

{{< shot src="finances.png" alt="The end-of-month accounts screen with expenses and profit in English" caption="The month's accounts, re-lettered in the original style." scale="1" >}}

## Unlocks and extras

**Gallery.** The game keeps 400 seen-flags, protected by a checksum, and wipes them if the checksum is wrong. The Unlocked patches make that check never wipe, and make every cell count as seen. The flags in your save are untouched, so removing the patch brings back your earned gallery.

**Alternate wrestlers.** The 52 domestic 2P alternates normally join the tryout and scouting pool in years 3-11. The Unlocked patches set their debut year to 1. Finding them still depends on the tryout roll and region, and you need a new game, because the records are read at New Game.

**Hold R1 during events** to hide the message window and see the picture behind it. That is original game behaviour, and the project notes mark it verified in game.

## Hidden content

The project's notes found no button codes, passwords or debug menus in the executable. What they did find:

- A cut **Team Event** slot in the title menu that the cursor skips. Choosing it does nothing.
- A developer "Expression check" scene that no code plays
- Two fully voiced but unused event scenes, 240 lines in total
- 66 unused beach pictures
- Two wrestlers, Sophie Sierra and Holly Sierra, that management mode never uses

Most of these are marked "not checked in game yet" in `docs/HIDDEN_CONTENT.md`. The cheat files make them reachable for testing.

## Matches

{{< shot src="match-setup.png" alt="The exhibition match card before the bell, with controller and Watch settings in English" caption="The match card before the bell." scale="1" >}}

{{< shot src="vs-singles.png" alt="Singles introduction screen with the two wrestlers' name strips in English" caption="Name strips, re-lettered for all 206 wrestlers." scale="1" >}}

{{< shot src="match-cards.png" alt="Choosing move-type cards during a match, with attack and defence ratings shown" caption="Choosing cards in a match." scale="1" >}}

## Notes

- **Prior art:** The project notes say no Cutting Room Floor page or English write-up of the hidden content exists. <!-- TODO: confirm whether any earlier English patch for this game exists; the docs don't say -->
- **Source:** The translated text, the Python patching code and notes on the game's formats are in the [GitHub repository](https://github.com/kactusken/Wrestle-Angels-Survivor-English).
- **AI disclosure:** AI assisted with the translation.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data. The patches only work on your own copy of the disc.

If you find a problem, open an [issue](https://github.com/kactusken/Wrestle-Angels-Survivor-English/issues) with a screenshot, which patch you used and where you were: the mode and menu, or roughly what had just happened. Cut-off text, overlapping text or leftover Japanese are especially useful.
