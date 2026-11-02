---
title: "Fight da Pon gets an English patch"
date: 2026-11-02
draft: true
summary: "The first English translation of a 1994 Super Famicom wrestling card game: 861 lines of story, 42 cards, a new variable-width font and a 16 Mbit ROM."
tags: ["snes", "release", "natsume", "card-game"]
game: "Zen Nippon Pro Wrestling - Fight da Pon"
platform: "SNES"
kind: "Patch"
toc: true
---

*Zen Nippon Pro Wrestling - Fight da Pon* is a 1994 Super Famicom game, published by Masaya and developed by Natsume. It was only ever released in Japan, and as far as I could find, nobody had translated it. Now it's in English.

{{< shot src="street.png" alt="A story scene on a street, with dialogue in English in the original text box" caption="A story scene. The dialogue box is the original; the text is new." scale="1" >}}

## Download

{{< patch name="Zen Nippon Pro Wrestling - Fight da Pon (English)" version="1.0" format="BPS" file="https://github.com/kactusken/Zen-Nippon-Pro-Wrestling-Fight-da-Pon-English/releases/latest" platform="Super Famicom" year="1994" publisher="Masaya" size="16 Mbit" >}}

The release zip has two patches. Pick one; they don't stack.

| Patch | What you get |
|---|---|
| **(English)** | The translation, with the game otherwise unchanged. |
| **(English) (Debug Menu)** | The same, plus the developers' debug menu, which the original game has switched off. Hold X and press Select on any screen. Several entries show corrupted graphics, as they do in the original code. |

You need your own copy of the original Japanese game: `Zennihon Pro Wrestling - Fight da Pon! (J).smc`, 1,048,576 bytes, CRC32 `379645bd`. Apply the `.bps` with [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/) in a browser, or with [Flips](https://github.com/Alcaro/Flips). I tested everything in Mesen 2.

There's also a [player's guide](https://kactusken.github.io/Zen-Nippon-Pro-Wrestling-Fight-da-Pon-English/guide/) covering matches, every card and wrestler, maps of all seven boards, passwords and secrets.

## What's translated

- All 861 lines of story dialogue, through every scenario and the ending
- All 42 card labels, plus the card messages
- Wrestler names and the villains' names
- Menus, prompts, the password screen, and the win and lose messages

Still in Japanese: the title logo, the copyright line and the staff credits.

{{< shot src="guide-scenario.webp" alt="The Scenario Select screen with English chapter titles" caption="Scenario Select. The chapter titles use the new font." scale="1" >}}

{{< shot src="guide-match.webp" alt="A match screen with the card row and wrestler name bars in English" caption="In a match, the card row, name bars and card labels are in English." scale="1" >}}

## What kind of game this is

Listings call it turn-based. Reading the code shows otherwise: matches run in real time, and you play cards that go on a cooldown. The story mode wraps those matches in a board game, with seven boards and six scenarios, so there's a lot of dialogue between fights.

{{< shot src="hotel.png" alt="Baba being accused by the other characters in a hotel scene" caption="Baba, accused by the others, denies everything." scale="1" >}}

The game has no battery save. Instead it gives you a password, so the password screen is translated too.

{{< shot src="password.png" alt="The password screen in English" caption="Passwords instead of saves." scale="1" >}}

## How the English got in

This is the part I want to write up properly in later posts, so here is the short version.

**Text.** Every character in the original is one byte, drawn from a fixed 16x16 font. The 862 message strings sit in one bank of the ROM. I didn't rewrite the pointers to them. Instead, a copy of that area lives in a new bank, and the first three bytes of each message there are a jump to the English text. Because nothing that points at the messages had to change, the game keeps finding them where it always did.

**Font.** The Japanese font is fixed-width, which makes English look sparse and eats space. I wrote a variable-width renderer in 65816 assembly and a new font. English is wrapped to the 176 pixel dialogue box, two lines at a time.

**Space.** All of that doesn't fit in the original 8 Mbit ROM, so the patch expands it to 16 Mbit.

**Cards.** The 42 card labels are graphics, not text. I rebuilt them, and abbreviated the labels (B.BUSTER, 16 MON, THROAT and so on) to fit a 29 pixel space.

{{< shot src="guide-card.webp" alt="A new card message with its label in English" caption="Card labels had to fit 29 pixels." scale="1" >}}

{{< shot src="guide-deck.webp" alt="The deck screen with card labels in English" caption="The deck screen." scale="1" >}}

## Translation decisions

A few choices people will notice:

- **Wrestler names are the real wrestlers' names.** The villains' names are this translation's own: Villains Inc., Black Wrestling Gang, Hyperspace Mask, Tutan Mask, Red Bear, Zebra Mask and Grand Director Spider Crab.
- **Verbal tics stay.** Each character keeps theirs (zumida, Weee!, y'know, usa, kuma, Poh!). The foreign wrestlers' broken English stays broken, as the Japanese has it.
- **A pun became a different pun.** "Bold/Bald" stands in for the ハゲしい/ハゲ joke.
- **Chapter 1 is called "All Japan Pro Wrestling Roll Call!"**

{{< shot src="guide-team.webp" alt="The Wrestler Select screen with English names" caption="Wrestler Select." scale="1" >}}

## Two bugs fixed

The patch also fixes two bugs in the original game. Before a scene's first line, a portrait could be drawn over a wrestler's sprite, and a gauge stayed on screen. Both fixes are small hooks in the new code.

## Hidden content

The original game contains a switched-off debug menu. The separate Debug Menu patch changes a single byte to bring it back (a branch that always skips the menu becomes the conditional branch it was written to be). I've documented that and other unlockables and unused content in the project repository.

## Notes

- **Prior art:** I found no earlier English translation or partial patch.
- **Source:** Everything needed to rebuild the patches from the original ROM is in the [GitHub repository](https://github.com/kactusken/Zen-Nippon-Pro-Wrestling-Fight-da-Pon-English): the translated text, the Python build code and notes on the game's formats.
- **AI disclosure:** AI assisted with the translation.
- **Legal:** This is a non-commercial fan translation. It isn't affiliated with or endorsed by the game's developers or publishers, and it contains no game data. The patches only work on your own copy of the game.

If you find a problem, open an [issue](https://github.com/kactusken/Zen-Nippon-Pro-Wrestling-Fight-da-Pon-English/issues) with a screenshot, which patch you used and where you were. Cut-off text, overlapping text or leftover Japanese are especially useful.
