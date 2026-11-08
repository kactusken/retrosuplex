---
title: "Fire Pro D - Hey, Where Did Spike's Modem Go?"
date: 2026-11-08
draft: false
sheet: 16
summary: "Spike let Fire Pro Wrestling D players download 100 moves and 50 wrestlers to a memory card, and the servers are long gone. This is how the (All Unlocked) patches put all of it into the disc: how the game loads a download, the 600 KB block that replaces the card, a 60-byte boot hook, and the save guard that keeps your own wrestlers safe."
tags: ["dreamcast", "fire-pro", "sh4", "spike", "patch"]
game: "Fire Pro Wrestling D"
platform: "Dreamcast"
toc: true
---

## The Downloads Are Gone, the Files Are Not

{{% sec %}}

{{< shot src="select-downloaded-wrestler.png" alt="Wrestler select, NOAH list, N. Marufuji highlighted, finisher Shiranui" caption="NOAH's list in the patched game. 2 Cold, N. Mar(ufuji) and T. Mori were never on the disc; they came over the modem in 2001. Here they sit in their promotion with everyone else, with no memory card in the console." >}}

*Fire Pro Wrestling D* is Spike's 2001 Dreamcast game. Besides the 220 wrestlers and the move list on the disc, it could dial a server and download more onto a VMU, the Dreamcast's memory card: new moves, and new *edit wrestlers*, meaning wrestlers built in the game's own editor. The servers are shut down, so nobody can fetch them any more. People saved the files, though, and the community kept them in circulation.

That gives 100 downloadable moves and 50 downloadable wrestlers. Moves W00-W56 are Spike's own downloads. W57-W99 were backported from *Fire Pro Wrestling Z* by the Fire Pro community, some of them fixed so they can finish a match. The wrestlers include 2 Cold Scorpio, Naomichi Marufuji, Tajiri, Rey Mysterio Jr., the Hardys and the Dudleys. I wanted the English patch to have all of it, for people who never owned the memory card and for people who will play it on an emulator or a flash cartridge. Nobody should need to find 150 files and a VMU image first.

So the "(All Unlocked)" builds carry the downloads inside the disc. This post is how: how the game loads a download, what to build in its place, where 600 KB fits on a full disc, how to hook it into the boot, and what to guard so a player's own saves are never touched. The [patch page]({{< relref "/patches/fire-pro-wrestling-d" >}}) has the download and the rest of what the patch does.

{{% /sec %}}

## How the Game Loads a Download

{{% wide %}}

Nothing downloaded is saved inside the game. Every time the Dreamcast is switched on, a routine called the *autoload* (at `0x8C03E3D8` in the main program, `1ST_READ.BIN`) walks all eight memory card slots (A1 to D2) and loads every game file it finds there. For the moves it asks for `FIREPROD.W00` to `FIREPROD.W99`, and for the wrestlers `FIREPROD.E01` to `FIREPROD.E04`. The result lives in RAM only and is rebuilt from the cards on the next power-on.

Where it lands matters, because that is exactly what a patch has to reproduce:

{{< memmap caption="Part of the game's RAM, lowest address first. The magenta rows are what one block on the disc has to fill: four edit-wrestler groups of 0x7D38 bytes, then the 0x78000-byte pool for the moves. The pointer table sits in front of the save files, so it is not part of this span." >}}
0x8C1BBA8C | Pointer table: 100 addresses, one per move slot | 400 bytes + a count | tbl
0x8C1BBC48 | System data, Promotion 1-5, Renames, Recostumes | the other save files | sav
0x8C1D4B60 | Ext Data 1 (E01) - edit wrestlers | 0x7D38 bytes | edit
0x8C1DC898 | Ext Data 2 (E02) | 0x7D38 bytes | edit
0x8C1E45D0 | Ext Data 3 (E03) | 0x7D38 bytes | edit
0x8C1EC308 | Ext Data 4 (E04) | 0x7D38 bytes, ends at 0x8C1F4040 | edit
0x8C1F4040 | Downloaded move pool: the moves, back to back | 0x78000 = 491,520 bytes | pool
0x8C26C040 | Network data | 0x1000 bytes | net
{{< /memmap >}}

A move file's loader (`0x8C016042`) reads the move's *slot number* from inside the file, copies the move into the next free place in the pool and writes its address into that slot of the pointer table. If the slot is already filled, the file is skipped, so the first one found wins. If the pool is full the game stops with a "DOWNWAZA MEMORY OVER" error. A wrestler's move list stores each move as a 16-bit number, with the downloaded ones marked by the bit `0x800`: `0x8006` means "downloaded move 6", and the game finds it through the table.

{{% /wide %}}

## What the Two File Types Hold

{{% wide %}}

{{< bytes ruler="8" caption="The first eight bytes of W06 \"The Worm\", read from a memory card image. The game inverts every byte of a move file (a bitwise NOT, hence `ED` for `12`) and then reads a small header: which Move Edit list the move belongs to (here 18), its slot number (6), and the file's size (7,861 bytes, stored low byte first, so `B5 1E 00 00`). The move script itself, starting with the letters `GS`, follows the 44-byte name." >}}
On the card | every byte inverted | EDFF:~ F9FF:~ 4AE1:~ FFFF:~
After the NOT | what the loader keeps | 1200:list 0600:slot B51E:size 0000:size
{{< /bytes >}}

{{< bytes ruler="16" caption="Bytes 8 to 23 of the same move: the name, at +8, as eight full-width Shift-JIS letters, then padding up to +0x34, where the move's script begins." >}}
Name | at +8, 44 bytes | 8273:Ｔ 8288:ｈ 8285:ｅ 8140:␣ 8276:Ｗ 828F:ｏ 8292:ｒ 828D:ｍ
{{< /bytes >}}

A move file is small: the whole 100 together come to 488,480 bytes, which is why the pool holds all of them with about 3 KB to spare. Each one is a header, a name and a *move script*, which the game runs when the move is performed (damage, animation, how it is blocked). I did not need to understand the scripts to bake the moves in. The loader treats each file as an opaque block, and so can a patch.

A wrestler file, `FIREPROD.E01` to `E04`, is 0x7D38 bytes: 50 flag bytes saying which of the 50 slots are used, 50 records of 640 bytes, and a four-byte checksum, the plain sum of every byte before it. A record starts with the same layout as a built-in wrestler (names, ratings, 78 move slots) and continues with edit-only data: custom colours, the appearance and a finisher name typed as free text. Wrestler ids carry the group in their top three bits, so `0xC000 | n` is wrestler *n* of Ext Data 4.

Those two formats are everything the loader needs. Where do the bytes come from? I read them from the community's preserved memory card images, un-invert the move files, and check the roster's checksum, once, when the patch is built. The images stay on my disk, and the patch carries only the changes.

{{% /wide %}}

## Where Do 600 KB Go on a Full Disc?

{{% wide %}}

The disc is a GD-ROM and close to full. The game's main archive, `SBL.BIN` (about 80 MB, 370 numbered entries of pictures and data), has `1ST_READ.BIN` right behind it, and only 149 free sectors after that. A patch that grows anything has to make room. The structure is described in the [technical notes](https://github.com/kactusken/Fire-Pro-Wrestling-D-English/blob/main/docs/TECHNICAL.md); the downloads need only one thing from it: a new entry at the end of the archive, which the game can read through the same function it uses for its own pictures.

The entry is a *memory image*: a copy of exactly the RAM from the start of E01 to the end of the pool, so a single read puts everything in place. Here is its size:

{{< asm title="Size of SBL.BIN entry 370" tag="calc" >}}
E01-E04     4 x 0x7D38                      =   128,224 bytes
move pool   0x78000                         =   491,520 bytes
100 moves   packed, each rounded up to 4    =   488,480 bytes   (3,040 spare)
entry       E01 start .. pool end - 0x800   =   617,696 bytes   = 302 sectors
{{< /asm >}}

A disc sector is 2,048 bytes, so 617,696 bytes takes 302 of them. The trick in the last line is the 0x800: the game's reader (`0x8C012E2C`) always reads whole sectors, so a read can run up to 2,047 bytes past the end of the data. I stop the image 2 KB before the end of the pool, so the overrun lands in the pool's unused tail instead of on the network data. The pointer table lives far from the E block, with the save files in between, so it can't be part of the same read. The image carries a copy of it (101 words) in the pool's spare bytes instead, and the boot routine copies it into place.

Those 302 sectors are not free. The translation's own picture changes already need about 260 sectors, and the downloads add 302 more, which is far past the 149 available. So the build moves `1ST_READ.BIN` (808 sectors) to the empty start of track 3, and `SBL.BIN` grows in place into the room it leaves, 957 sectors in all.

{{% /wide %}}

## A 60-Byte Hook on the Boot Path

{{% wide %}}

The image is on the disc. Now something has to read it into RAM at the right moment, which is *after* the game has cleared its work area and *before* it looks at any memory card. The autoload is entered from exactly one place in the boot code, through a four-byte literal at `0x8C015AB4`, which holds the autoload's address. That is the hook: I change the literal to point to a new routine, and the routine ends by jumping to the address the literal used to hold.

{{< flow caption="The cold boot with the patch. Step 3 is the only new code. It ends by running the original step 4, so everything after it behaves as it always did." >}}
Clear the work area | The game wipes the table, the pool and the E group area at power-on | std
Jump to the autoload | The literal at `0x8C015AB4` normally holds `0x8C03E3D8` | std
Read entry 370 | A 60-byte routine reads the 302 sectors over E01 to the pool, then copies the 101-word table | new
Card autoload | Cards are searched as usual and can add to or replace what was loaded | std
Main menu | All 100 moves and 50 wrestlers are in place | std
{{< /flow >}}

The order is deliberate. Because the baked content goes in first, a memory card still wins afterwards: its `E01` to `E04` files overwrite the baked groups, and its move files are skipped for slots that are already filled. A player who still owns their original downloads loses nothing, and anything they saved themselves loads exactly as before.

{{< asm title="the boot routine, in words" tag="pseudo" >}}
save the return address
read SBL.BIN entry 370 straight to 0x8C1D4B60   ; E01 .. end of pool
copy 101 words from the pool's spare tail to 0x8C1BBA8C   ; 100 pointers + bytes used
restore the return address
jump to the card autoload (0x8C03E3D8)
{{< /asm >}}

Where does 60 bytes of new code go, when the game has no free space? I put it in a function that, as far as I can tell from the code, is never called: the leftovers of a *match information overlay* at `0x8C030A80`. Overwriting dead code costs nothing, and the build checks the original bytes first: every code patch stores the bytes it expects to replace, and the build stops with a message if they are not the original game's.

{{% /wide %}}

## Never Overwrite a Player's Wrestlers

{{% sec %}}

{{< shot src="memory-card-list.png" alt="Memory Card save list with System Data, Promotions and Ext Data 1 to 4, all Empty" caption="The Memory Card save list. Every file, Ext Data 1 to 4 included, has a status (Empty, New, Edited or Saved) and a unit, and the save code decides from those. Here no card is inserted, so everything reads Empty." >}}

Building 50 wrestlers into the game raises a worry, and it is the one that matters most to players. Somebody has their own edit wrestlers on a memory card. Could the built-in ones ever replace them?

The wrestlers are in **Ext Data 4**, not Ext Data 1. Edit Mode has four groups, and the original download set used the first one. If the roster filled group 1, players would have to edit their own wrestlers into a group that already looked full. With the built-in roster in the last group, groups 1 to 3 stay empty for the player's own work, and their files load beside the roster instead of hiding it. Only a player's own Ext Data 4 interacts with the built-in one, and it simply replaces it.

The game itself helps. It writes a card file only when the player saves it. It has no autosave, and "Overwrite All" writes only files that were changed, each one back to the card it came from. I traced the save code to check each of these, and ran most of them in an emulator with test memory card images (the Ext Data 4 and move-file rows I read from the code rather than ran):

| Situation | What happens |
|---|---|
| No card | All 100 moves and 50 wrestlers are there from boot |
| Card with your own Ext Data 1 to 3 | They load beside the roster. In RAM they match the card byte for byte; the card is untouched |
| Card with an Ext Data 4 file | It replaces the built-in roster |
| Card with a move file for a slot already filled | Skipped; the baked one stays |
| Card inserted after power-on, saving a group the card already holds | The original game asks "Overwrite?" and Yes replaced the card's file. The patch refuses |

The last row is a hole in the original game that the downloads made easier to reach, so I closed it. The save screen's file search at `0x8C15E202` is wrapped by a short routine, placed next to the boot one in the same dead function. An overwrite is allowed only if that file's status is *Edited* or *Saved* with this very card as its unit, meaning the game actually loaded it from there. Otherwise nothing is written, the error sound plays and the screen says **"Can't overwrite: load it first."** The Japanese build shows the same message in Japanese.

<!-- TODO: shot guard-message: the "Can't overwrite: load it first." screen. Needs a card inserted after power-on that already holds the file; asked of the owner. -->

{{% /sec %}}

## Making the Downloads Speak English

{{% wide %}}

The files are Japanese-era data, so a few things had to be fixed before they could read properly in an English game.

- **Moves.** Most downloaded moves are already named in English letters, written full-width. Six are named in Japanese on the cards (Shiranui, written 不知火, is one). The build replaces the 43-byte name field at +8 of those six moves with an English name from a small table, in the English builds only.
- **Finisher names.** A wrestler's finisher name is not looked up in the move table. It is free text inside the wrestler's record, 42 bytes at +0x24C, so it is Japanese in the original files (Marufuji's field holds `95 73 92 6D 89 CE`, 不知火). The build writes the English text over it from `dlc_roster.csv`, using the same name tokens as the rest of the patch, so the Real Names and Parody Names releases each get their own set.
- **The checksum.** The file ends with the sum of every byte before it. Changing a name means recomputing it; if it were wrong the game would reject a wrestler file from a card. The build refreshes it after every change.
- **Three records.** The Dudleys' records had each other's names (D-Von and Bubba Ray swapped) and one Hardy was filed under his last name first, so the lists showed "Hardy" for Matt. Those are corrected before the image is packed, in every build.
- **Left alone.** The 10 bytes after the finisher name (+0x276) are the wrestler's appearance data, a sibling of the colours earlier in the record. I don't touch them. One consequence: an edit wrestler has a single appearance, so all four costume choices on the select screen look the same, as they do for any wrestler a player makes.

{{< asm title="one finisher field, in the file" tag="calc" >}}
original   +0x24C  95 73 92 6D 89 CE 00 ...      不知火    (42-byte field)
English    +0x24C  "Shiranui" from dlc_roster.csv, same field, rest zero
checksum   +0x7D34 = sum of bytes 0 .. 0x7D33, recomputed
{{< /asm >}}

{{% /wide %}}

## What to Try Next

{{% wide %}}

The method should carry to any game that loads content from a card on boot: find the loader, find where it puts things, reproduce that as one block on the disc, and slip a call in ahead of the loader so the original still gets the last word. I have only done it for this game. Two things are still open:

- **Other games.** I haven't looked at whether other Dreamcast games with downloads, from Spike or anyone else, keep their loaded content in a layout that suits the same trick.
- **Appearance.** Edit wrestlers have one appearance, while built-in wrestlers have four, one per costume. Giving the downloaded roster all four would need new appearance data for each wrestler.

Thanks to the Fire Pro community for preserving the downloads and for the backports. The [player's guide](https://kactusken.github.io/Fire-Pro-Wrestling-D-English/guide/) lists every downloaded move and wrestler, and the [patch page]({{< relref "/patches/fire-pro-wrestling-d" >}}) has the download.

{{% /wide %}}
