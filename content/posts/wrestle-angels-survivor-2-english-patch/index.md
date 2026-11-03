---
title: "Wrestle Angels: Survivor 2 gets an English patch (beta)"
date: 2026-11-02
sheet: 5
draft: true
summary: "A public beta English patch for a 2008 PlayStation 2 joshi wrestling management game: 242 story scripts, about 60,000 lines of dialogue, and a rewritten text routine with proportional spacing."
tags: ["ps2", "release", "beta", "management", "joshi", "xdelta"]
game: "Wrestle Angels: Survivor 2"
platform: "PS2"
toc: true
---

*Wrestle Angels: Survivor 2* is a 2008 PlayStation 2 game, released only in Japan. You run a women's wrestling promotion: you recruit and train wrestlers, book shows, manage the money, and play the matches. Now there is an English patch for it.

It is a **public beta (v0.2)**. All the dialogue, menus and text pictures are translated, and I have played the game in English. But I have not seen every story path, event or late-game screen yet, so some text may still be cut off, overlapping or in Japanese. If you find any, please tell me (see the end of this post).

{{< shot src="story.png" alt="A story scene: Foxy Maho in a blue swimsuit top in front of a waterfall, with English dialogue in the text box" caption="A story scene. Foxy Maho has never eaten a president." scale="1" >}}

## Download

{{< patch name="Wrestle Angels: Survivor 2 (English)" version="0.2 beta" format="xdelta" file="https://github.com/kactusken/Wrestle-Angels-Survivor-2-English/releases/latest" platform="PlayStation 2" year="2008" >}}

The release zip has three patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **Wrestle Angels - Survivor 2 (English)** | The translation, with the game otherwise unchanged. |
| **Wrestle Angels - Survivor 2 (English) (All Unlocked)** | The translation, with every gallery picture viewable. Your save's own gallery progress is kept and comes back without this patch. |
| **Wrestle Angels - Survivor 2 (Japan) (All Unlocked)** | The original Japanese game, with every gallery picture viewable. |

You need your own copy of the original Japanese disc image. The game is serial SLPM-55056, and the image must match exactly:

- `Wrestle Angels Survivor 2 (Japan).iso`
- 4074340352 bytes
- CRC32 `275d9e6f`
- SHA-1 `ea5d4f86102205b885e15a09b5e4d4318d839136`

Apply the `.xdelta` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser (it may not cope with a multi-GB DVD image), with Delta Patcher, or on the command line:

```
xdelta3 -d -s "Wrestle Angels Survivor 2 (Japan).iso" "patch.xdelta" "patched.iso"
```

I tested it in PCSX2. That emulator shows some visual glitches early in the game. The software renderer fixes most of them, but then the intro screens look half cut off. The original Japanese game does the same in PCSX2, so it isn't the patch.

Saves from the original Japanese game work with the patch.

There is also a [player's guide](https://kactusken.github.io/Wrestle-Angels-Survivor-2-English/guide/) with how matches and the card system work, how to run a promotion through to the Final Series, and all 242 wrestlers and 223 moves. An [event timeline](https://kactusken.github.io/Wrestle-Angels-Survivor-2-English/timeline/) shows what can happen each month and what unlocks it.

<!-- TODO: confirm the v0.2 release is published on GitHub and the "latest" link resolves -->

## What's translated

- All 242 story scripts, about 60,000 lines of dialogue
- Menus, match commentary and announcer lines
- The roster, 189 moves, venues, coaches and special skills
- 247 text pictures: menus, banners, status screens, finance reports, move cards, month banners, and the ring names under all 158 portraits

{{< shot src="office.png" alt="The office screen with the main menu, the Staff submenu and a help line reading Book a freelancer for a set period" caption="The office. Main menu, submenu and help line." scale="1" >}}

{{< shot src="profile.png" alt="A wrestler profile page showing ring name Royal Hojo, hometown Toyama, birthday, age 20 and six special skills" caption="A wrestler's profile." scale="1" >}}

{{< shot src="training.png" alt="The training schedule screen with four options: Style Growth, Offense Up, Power Up and Fix Weakness, and a Start Training button" caption="The training schedule." scale="1" >}}

## What's still in Japanese

- The title logo
- The staff credits and voice cast
- Counter words after some numbers (名, 日目)
- The kanji grid on the name-entry screen
- The voices, which are spoken Japanese
- Debug strings, and the special-skill descriptions, which are designer notes that the game doesn't show

The v0.2 changelog also notes a few strings that were still Japanese in v0.1. I found them through a player report and an audit of the executable.

## Known gaps

This is why it's called a beta.

- Not every story path, event or late-game screen has been seen in the English version.
- Some text may still be cut off, overlap, or have been missed.

I'm not claiming more than the project files say.

## How the English got in

This is the short version. The long one is in the repository docs.

**Text.** The story is 242 event scripts, one per wrestler and per second persona or foreign wrestler. Each message is a block with the Japanese source and the English. A script that grew is moved to a new place on the disc, and the game's file position table is updated to match. Menus, commentary and the other text in the executable are in a separate table.

**Font.** The game drew every Latin letter in a fixed 11-pixel cell, which makes English look sparse and doesn't fit. I rewrote the game's text-drawing code so letters are spaced by their real width. A message box holds 3 lines of 440 pixels, which comes to roughly 44 to 48 characters a line. A checking tool measures every line.

**Text pictures.** Many labels are images rather than text. I lettered 247 of them in English, in Barlow Condensed (SIL OFL) in the original's own fill, outline and glow colours, and kept each label inside the original label's box.

{{< shot src="match-cards.png" alt="A match screen: Hikaru Ogawa against Sakie Hori, with two move-type cards in the middle and card rows at the bottom" caption="Move-type cards, with the English word running down each card like the original kanji." scale="1" >}}

{{< shot src="match-commentary.png" alt="A match in progress with a hold on the mat and commentary reading Ogawa goes from the Cavernaria into a dragon-style hold, This is agony" caption="Move names and play-by-play commentary." scale="1" >}}

## Translation decisions

- **You are "President".** The player is the president of the promotion. Wrestlers call him "Boss", or "President" in formal scenes.
- **Western name order.** Given name first: Suzumi Ishikawa. Characters who go by a surname keep it.
- **Honorifics are dropped,** except *senpai*, which carries seniority that matters in joshi wrestling.
- **Verbal tics stay.** Each wrestler keeps her register and her tics (うきゅ becomes "Ukyu").
- **CPU.** COM in menus and text is "CPU".
- **Team order** 先次中副大 is Lead / 2nd / Mid / Vice / Capt.
- **Main menu:** Staff / Business / Info / Gym / End Month.
- **Portraits** keep their Japanese name tags, with the English ring name added at the bottom of the character.

{{< shot src="rankings.png" alt="The roster rankings table with English column headers: Rating, HP, Trust, Popularity and Morale" caption="Rankings. The headers were re-lettered to fit the original columns." scale="1" >}}

## Hidden content

The All Unlocked patches make the game's gallery check always say "seen", so all 316 slots and all 914 pictures are viewable, including 56 variant pictures no event ever shows. Nothing is written to your save.

Beyond that, the executable still contains developer debug screens (a script viewer, a battle cheat window, sound tests), and the secretary is a complete wrestler with her own stats and 26 moves. These are documented in the repository, marked *from the code* or *verified in game*. They are not in the release patches. <!-- TODO: confirm the debug build groups are not shipped in the release zip; PATCHES.md says debug-* groups apply only when named -->

## Notes

- **Prior art:** I found no TCRF or Data Crystal page for any Wrestle Angels game, and no earlier translation is mentioned in the project. <!-- TODO: confirm there is no earlier English patch for this game -->
- **Source:** Everything needed to rebuild the patches from the original disc is in the [GitHub repository](https://github.com/kactusken/Wrestle-Angels-Survivor-2-English): the translated text, the Python build code and notes on the game's formats.
- **AI disclosure:** The project was made with AI assistance (Claude) for reverse-engineering the game's text routines. The translation was made with AI assistance, then edited and play-tested by me.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data that would let anyone play without owning the game. The patches only work on your own copy of the disc.

<!-- TODO: developer and publisher are not stated in the project docs; add them to the intro if wanted -->

## Reporting problems

Open an [issue](https://github.com/kactusken/Wrestle-Angels-Survivor-2-English/issues) with a screenshot, which patch you used, and where you were: the mode and menu, or roughly what had just happened. Cut-off text, overlapping text and leftover Japanese are especially useful.
