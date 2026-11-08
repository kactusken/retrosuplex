---
title: "Toukon Retsuden 4 - Sixteen Letters in an Eight-Letter Box"
date: 2026-11-08
draft: false
sheet: 15
summary: "Toukon Retsuden 4's name entry types English as full-width Japanese characters, so an Edit wrestler got 8 wide letters while every real wrestler's name was narrow. I kept the keyboard as it is and changed what gets saved: plain ASCII, 16 letters, the same width as the rest of the game."
tags: ["dreamcast", "yukes", "tomy", "name-entry", "sh4", "full-width", "character-spacing"]
game: "Shin Nihon Pro Wrestling - Toukon Retsuden 4"
platform: "Dreamcast"
toc: true
---

## One Name, Two Widths

{{% sec %}}

{{< shot src="name-entry-jp.png" alt="The original name entry, ABC/123 page, with Suplex M typed" caption="The original game's ABC/123 page with \"Suplex M\" typed. Eight wide letters and the name is full." >}}

*Shin Nihon Pro Wrestling - Toukon Retsuden 4* (新日本プロレス 闘魂烈伝4) is Yuke's 1999 New Japan game for the Dreamcast, published by Tomy and released only in Japan. Its Edit Wrestler mode lets you build eight wrestlers of your own, and each one needs a name.

Character spacing is the problem every one of these translations runs into sooner or later. Japanese text is built from *full-width* characters: every kana and kanji fills the same square cell. English wants *half-width* letters, about half as wide. Write English in full-width cells and you get Ｔ Ｈ Ｉ Ｓ, which takes twice the room.

For most of this game it was never a problem. The game's own fixed-pitch font already draws plain ASCII at half the width of a Japanese character, so a 20-character Japanese line simply becomes a 40-letter English line, with no font work. Every wrestler name, menu line and help text in the patch is ASCII.

The name entry screen was the exception. In play-testing the English letters on it came out "spaced much wider than everywhere else, so few letters fit". The keyboard's ABC/123 page doesn't type ASCII at all: it types the full-width Japanese versions of the letters. An Edit wrestler could have 8 wide letters, standing next to real wrestlers whose names were narrow and up to twice as long.

{{% /sec %}}

## Full-Width and Half-Width, in Bytes

{{% wide %}}

The game stores text in *Shift-JIS*, the standard Japanese encoding of the time. Plain ASCII characters (`A` is `41`, a space is `20`) take one byte. Everything Japanese takes two: a *lead byte* that picks a block (`81` for punctuation and symbols, `82` for full-width letters, digits and hiragana, `83` for katakana) and a second byte that picks the character in it. The full-width `Ｓ` is `82 72`, and the full-width space is `81 40`.

The wrestler's name is a 16-byte field in the Edit record, followed by a 0 byte that ends it. Here is that field read out of RAM after typing the same name in both versions:

{{< bytes ruler="17" caption="The Edit wrestler's name field (RAM `0x8C2827E6`), read from the emulator after pressing OK, under the same name as Edit Settings draws it. Top: the original stores \"Suplex M\" as eight two-byte cells, and the field is full. Bottom: the patch stores \"Suplex Machine 2\" in the same 16 bytes, and the screen gives it the same bracket." >}}
Original | full-width, 2 bytes a letter | 8272:Ｓ 8295:ｕ 8290:ｐ 828C:ｌ 8285:ｅ 8298:ｘ 8140:␣ 826C:Ｍ 00:end | strip-jp.png
Patched | ASCII, 1 byte a letter | 53:S 75:u 70:p 6C:l 65:e 78:x 20:␣ 4D:M 61:a 63:c 68:h 69:i 6E:n 65:e 20:␣ 32:2 00:end | strip-en.png
{{< /bytes >}}

Same field, same 16 bytes, same bracket on screen, twice the letters. And because the bottom row is ordinary ASCII, every screen that shows the name draws it with the same narrow letters as the built-in wrestlers. The rest of this post is how to get from the top row to the bottom one without rewriting the keyboard.

{{% /wide %}}

## How the Keyboard Works

{{% sec %}}

{{< shot src="name-entry-jp-wrap.png" alt="The original name entry showing achine 2 after typing Suplex Machine 2" caption="The original after typing all 16 letters of \"Suplex Machine 2\". At the eighth cell the cursor wraps back to the first, so letters 9-16 overwrote 1-8: \"achine 2\" is what's left." >}}

The name entry is one editor object, built by a constructor at `0x8C095CC0` in the main program (`1ST_READ.BIN`). Whoever opens it says how many *cells* the name gets, 1 to 20, and everything inside it is counted in full-width cells:

- the name being edited is a buffer at offset `+0x50` in the object, one two-byte cell per character, padded with full-width spaces (`81 40`);
- the cell count is at `+0xC8`;
- when you press OK, it copies the buffer to an output address kept at `+0x84` and blanks out the trailing spaces.

The keyboards themselves are just strings, reached through a table at `0xD694C`: three groups of seven rows per page. Hiragana, Katakana, ABC/123 and Kanji are pages, and the ABC/123 page is made of the full-width `Ａ`, `ａ`, `２` and `！`. Whatever you pick is a two-byte cell, so there is no way to type a one-byte letter.

Edit mode opens the editor from two places: the wrestler name, and the names of the four *Thinking patterns*, the computer's fighting plans for your wrestler, in 17-byte slots at `0x8C282840`. Both ask for **8 cells**. Eight two-byte cells are exactly the 16 bytes of the field they fill, so for Japanese that is a sensible fit, and for English it's 8 letters.

When I tested the original headless for the picture beside this, there was a surprise: it doesn't stop you at the eighth letter. The cursor goes back to the first cell and you keep typing over your own name.

{{% /sec %}}

## Why Not Just Ask for 16 Cells?

{{% sec %}}

The editor takes 1 to 20 cells, so asking for 16 is one byte in one instruction (`mov #8,r5` becomes `mov #16,r5`). That's the easy half. The hard half is everything around it:

1. **The parent object.** Each of the two screens creates a small 28-byte object that owns the editor and keeps its own copy of the name at `+8`. 16 cells plus the end byte is 33 bytes, which runs straight off the end of it.
2. **The record.** The name field in the wrestler record is 16 bytes, and the Thinking slots are 17. Sixteen full-width letters need 32.
3. **The width.** Even if both had room, the stored name would still be full-width, and wide everywhere it appears.

{{< asm title="the byte budget" tag="calc" >}}
16 cells x 2 + end byte  = 33 bytes  ; room at +8: 20
16 letters, full-width   = 32 bytes  ; field: 16
16 letters, ASCII        = 16 bytes  ; fits
{{< /asm >}}

Making the record bigger would mean moving every field after the name, in a record the save file and the rest of the game read. That's a much bigger change than this deserves.

So the decision was: let the keyboard keep its full-width cells while you type, which is what its cursor and layout are drawn for, and store the name as ASCII. The letters look wide on the keyboard screen only, and narrow everywhere else.

{{% /sec %}}

## Cells on Screen, ASCII in Memory

{{% sec %}}

{{< shot src="name-entry-en.png" alt="The patched name entry with Suplex Machine 2 typed" caption="The patched game: 16 cells, \"Suplex Machine 2\" typed. Still full-width while you type; it becomes ASCII on OK." >}}

The patch (`tools/nameentry.py` in the project) splits the job in two, at the two moments the name crosses between the record and the editor.

**When the screen opens (LOAD).** The stored name is copied into the parent's buffer cell by cell. A two-byte character goes in as it is. An ASCII byte is turned back into its full-width cell, so the editor can show and edit it. The rest is padded with full-width spaces up to 16 cells.

**After OK (STORE).** The buffer is read cell by cell and written into the 16-byte field. Full-width letters, digits and the common symbols become one ASCII byte. Anything else, kana or kanji, stays two bytes. A character that no longer fits is dropped, and a 0 byte ends the field, as the original copy did.

The conversion is mostly arithmetic, because Shift-JIS lays the full-width alphabet out in the same order as ASCII:

{{< asm title="STORE: one full-width cell to ASCII" tag="math" >}}
82 4F..82 58   ０..９   -> second byte - 0x1F   = 30..39   '0'..'9'
82 60..82 79   Ａ..Ｚ   -> second byte - 0x1F   = 41..5A   'A'..'Z'
82 81..82 9A   ａ..ｚ   -> second byte - 0x20   = 61..7A   'a'..'z'
81 xx          symbols  -> 18-entry table     ; 81 40 ' ', 81 49 '!' ...
anything else  kana, kanji -> copied, 2 bytes
{{< /asm >}}

LOAD is the same table run backwards: `0`-`9` and `A`-`Z` get `82` and the byte plus `0x1F`, `a`-`z` get `82` and the byte plus `0x20`, and the symbols come from the table. The table pairs the second byte of each `81` symbol with its ASCII character: space, `! ? & . - ' / + ( ) # @ % = < > ;`. That's what the ABC/123 page can type, minus things like `♪` and `☆` that have no ASCII to go to; those stay two bytes.

{{< asm title="STORE, \"Suplex Machine 2\"" tag="calc" >}}
cell 1   82 72  Ｓ   72 - 1F = 53  'S'    15 bytes left
cell 2   82 95  ｕ   95 - 20 = 75  'u'    14 left
cell 7   81 40  space  table   = 20  ' '    9 left
...
cell 16  82 51  ２   51 - 1F = 32  '2'    0 left
end      00                                 at field + 16
{{< /asm >}}

Mixed names work too, at their real cost. Three kana and twelve letters come out as the three kana (six bytes) and the first ten letters; sixteen hiragana come out as eight. Both are what fits in 16 bytes.

The same two routines serve both screens. The wrestler name and the Thinking pattern names call LOAD and STORE with different addresses, so the Thinking names got 16 letters for free.

{{% /sec %}}

## Fitting It Into 364 Bytes

{{% sec %}}

{{% side %}}
| Region | Bytes | Now holds |
|---|---|---|
| `8C096E8E` | 90 | name setup, symbol table, half of LOAD |
| `8C096FC6` | 116 | name after OK, STORE |
| `8C0970A2` | 102 | Thinking setup, LOAD |
| `8C0971D4` | 56 | Thinking after OK, symbol lookup |
{{% /side %}}

There was no free space in the program to add code to, and I didn't want to move anything. The Dreamcast's SH-4 CPU uses 16-bit instructions, so a few hundred bytes go a long way, and the original code around the editor had some to spare. Its two setup routines padded the name with spaces in loops of their own, copied it with an unrolled copy, and made a label update it didn't need. All of that is replaced by a call to LOAD or STORE, and the bytes that frees up hold the routines themselves.

That's four regions, 364 bytes in all, plus four one-instruction changes: the two parent objects allocated at 44 bytes instead of 28, and the two editors asked for 16 cells instead of 8. The routines call each other across the regions, and the symbol table sits in the middle of the first one. The new code fills its regions to within a few bytes, and the rest is padded with `nop`.

Because the patch overwrites code it doesn't keep, the build checks first: it holds the SHA-1 of each original region and refuses to patch if the bytes there are not the original game's. If a text change ever moved something into those addresses, the build would stop with a message instead of producing a broken name screen.

{{% /sec %}}

## The Result

{{% sec %}}

{{< shot src="edit-settings-en.png" alt="Edit Settings with the name Suplex Machine 2" caption="Edit Settings after OK: \"Suplex Machine 2\" in the same narrow letters as \"Shinya Hashimoto\" one line below." >}}

Back on the Edit Settings screen, the name sits in its brackets at the same width as the base wrestler's name below it. It's stored as ASCII, so the character select and the match draw it the way they draw the built-in names.

I checked it headless first: 16 letters typed and stored; names with symbols such as `a-z (A&B) #1?.'/` and `+=<>@%;x` saved and reopened unchanged; the kana cases above; and a 16-letter Thinking name with the next slot left intact. Then came a real play-test, in which a 16-letter wrestler went into an exhibition match. The verdict was "works fantastic".

The only visible trace is on the keyboard screen itself: while you type, the letters are still the wide full-width ones. Reopen the name and they come back wide, because LOAD turns them back into cells. That's the trade I chose, and it means the editor's cursor, its cell box and its delete all work exactly as Yuke's wrote them.

{{% /sec %}}

## Three Games, Three Answers

{{% sec %}}

{{% side %}}
| Game | Keyboard | Name stored as |
|---|---|---|
| Toukon Retsuden 4 (DC) | original, full-width | ASCII, 16 letters |
| Fire Pro Z (PS2) | rebuilt, letter pairs | pair codes |
| Six Men Scramble (Saturn) | original letter rows | full-width |
{{% /side %}}

This isn't the first wrestling game where I've had to decide what an English name entry should be, and the answer has been different each time, because it depends on how the rest of the game draws English.

- **Fire Pro Wrestling Z** draws all its English as *pair glyphs*: one two-byte code whose picture holds two letters. A name typed as ASCII would match nothing there, so its keyboard was rewritten instead. The pages became "Letters" and "More", and you pick a first letter, then the pair that starts with it. Names are stored as the same pair codes as the roster.
- **Fire Pro Wrestling S: 6Men Scramble** already had full-width letter rows, and its default names are full-width in the original. Switching to one-byte letters there broke deleting and typing, so names stay full-width.
- **Toukon Retsuden 4** sits in between. Its font already draws narrow ASCII everywhere, so the cheapest fix was to keep the keyboard and convert at the edges.

{{% /sec %}}

## What's Left

{{% wide %}}

A third object in the game uses the same editor, with its cell count passed in by its own caller. I left it alone, since it isn't one of the two Edit screens and nothing about it changes for English.

The next step would be a true half-width ABC/123 page, so the letters are narrow while you type too. That means teaching the editor that a cell can be one byte, in its cursor, its delete and its drawing. That's a much deeper change than converting at the edges, and the screen works well as it is.

{{< patch name="Shin Nihon Pro Wrestling - Toukon Retsuden 4 (English)" version="1.0" format="xdelta / UDP" file="https://github.com/kactusken/Shin-Nihon-Pro-Wrestling-Toukon-Retsuden-4-English/releases/latest" platform="Dreamcast" year="1999" publisher="Tomy" size="GD-ROM image" >}}

The [patch page](/patches/shin-nihon-pro-wrestling-toukon-retsuden-4/) has the download and the [player's guide](https://kactusken.github.io/Shin-Nihon-Pro-Wrestling-Toukon-Retsuden-4-English/guide/), and the name entry code is `tools/nameentry.py` in the [repository](https://github.com/kactusken/Shin-Nihon-Pro-Wrestling-Toukon-Retsuden-4-English).

{{% /wide %}}
