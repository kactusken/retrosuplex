---
title: "Fight da Pon - Teaching Baba the ABCs"
date: 2026-11-02
sheet: 1
draft: false
summary: "A 1994 Super Famicom wrestling card game, finally in English. How a fixed-width Japanese text engine learned the alphabet, and the one comparison that decides whether a move lands."
tags: ["snes", "natsume", "card-game", "ajpw", "patch"]
game: "Zen Nippon Pro Wrestling - Fight da Pon"
platform: "SNES"
toc: true
---

## Game Overview

{{% sec %}}

{{< shot src="street.png" alt="A story scene on a street, with dialogue in English in the original text box" caption="A story scene. The dialogue box is the original; the text is new." scale="1" >}}

*Zen Nippon Pro Wrestling - Fight da Pon* (ファイトだポン) came out on the Super Famicom on June 25, 1994. Natsume developed it and Masaya published it. It never left Japan, and I'm pretty hyped to finally make it playable in English.

By 1994, Natsume and Masaya had already made a run of serious Zen Nippon (All Japan) Pro Wrestling games for the system, complete with licensed rosters and a proper grappling engine. Natsume's [Natsume Championship Wrestling](https://en.wikipedia.org/wiki/Natsume_Championship_Wrestling) was the only one that got a US release. Fight da Pon is the goofy cousin. The wrestlers are squashed into chibi sprites that exaggerate everything you would say about them if you watched All Japan in the 90s. Baba is the boss, Misawa, Kawada, Kobashi, and Taue are the generation taking over, and Hansen, Gordy, and Williams are your big gaijin heavies.

{{< shot src="guide-match.webp" alt="A match screen with the card row and wrestler name bars in English" caption="A match. The row along the bottom is your hand. Face-down cards are recharging." scale="1" >}}

The game is a format that no one would expect, it's a board game. You play through six scenarios across seven boards, with chapter titles like "The Case of the Exploding Stretch Plum!" and "The Case of the Kidnapped President Baba". When you do get into a match, it is not a wrestling sim at all. It's a real-time timing based card battler. 

You get a hand of six cards, five attacks and a FALL card for pins. Pick a move, press A, and the card flips face down to recharge on a timer. The first person to hit a button starts their attack, and the other player has to survive the sequence by burning their own active cards to block. Find a balance between playing a counter and still leaving moves available to you to fight back.

{{< shot src="hotel.png" alt="Baba being accused by the other characters in a hotel scene" caption="Baba, accused by the others, denies everything." scale="1" >}}

Why play it today? A few reasons.

* **The tone.** It plays its gags completely straight and acts as a massive tribute to that specific golden era of puroresu. Giant Baba getting accused of a crime in a hotel room is a real storyline in the game.
* **The game system is odd and interesting.** Finding a real-time cooldown card fighter from 1994 on the Super Famicom is wild. I dig into the memory level of how this actually works later in this post.
* **No other game exists like it.** The battles are repetative but they are easy to game. The story is relatively short so it's easy to blast through. Nothing like this will ever be made again :)

{{% /sec %}}

## Scope of the Translation

{{% sec %}}

{{< shot src="guide-scenario.webp" alt="The Scenario Select screen with English chapter titles" caption="Scenario Select. The chapter titles run through the new font." scale="1" >}}

{{< shot src="guide-card.webp" alt="A new card message with its label in English" caption="Card labels had to fit 29 pixels." scale="1" >}}

{{< shot src="guide-team.webp" alt="The Wrestler Select screen with English names" caption="Wrestler Select." scale="1" >}}

The ROM is only 1 MB, and the whole message bank is about 13 KB of it. The size of the job came from everything around the text: card labels that are pictures, names drawn by three different systems, and a font that had never seen a Latin letter.

| What | Count |
|---|---|
| Dialogue Lines | 861, through all six scenarios and the ending |
| Move Cards | 42 labels |
| Wrestlers | 16 |
| Named villains | 7 |
| Boards | 7 |
| Messages | 862 strings |
| Dialogue box | 176 pixels wide, 2 lines |
| ROM size | 8 Mbit before, 16 Mbit after |

And here is what that covers:

- **Dialogue.** All of it, with the verbal tics kept per character (zumida, Weee!, y'know, usa, kuma, Poh!). The foreign wrestlers' broken English stays broken, because it is broken on purpose in the Japanese.
- **Menus and prompts.** Title menu, Scenario Select, Wrestler Select, deck edit, the partner screen, win and lose messages.
- **The password screen.** Its prompt strings are in their own table with their own routine.
- **Names.** Wrestler names appear in at least three different places that all work differently: a table for dialogue, sprite-based name bars in matches, and tilemap cells in the lists.
- **Graphics.** The 42 card labels are pictures, not text. I redrew them, and shortened them (B.BUSTER, 16 MON, THROAT and so on) to fit a 29 pixel strip. A few menu titles are built from 2x2 tile letters, so a title like PARTNER SELECT needed new letter tiles.
- **Two bugs the original had.** Not translation, but I hit them while testing the dialogue. A portrait could be drawn over a wrestler's sprite before a scene's first line, and a gauge stayed on screen. Both are fixed.

Still in Japanese: the title logo, the copyright line and the staff credits. None of them tell you anything you need to play.

One more translation decision worth a sentence. The Japanese uses ハゲしい and ハゲ as a pun, so "Bold" and "Bald" stand in for it. Wrestlers keep their real names, and the villains' names are this patch's own.

{{% /sec %}}

{{% wide %}}

## Technical Deep Dive: Teaching Baba the ABCs

The hard part of this project was not translating. It was getting an English alphabet into an engine that has never seen one.

### The problem

Fight da Pon stores every character as one byte, from `$10` to `$FF`, and every glyph is a 16x16 square, 32 bytes, in a table at `$C8:C01C`. The glyph for code `n` is at `n * 32`. The dialogue box is eleven of those squares across. That is 11 characters a line.

English does not fit this in three separate ways:

1. **There are no Latin letters** in the font, apart from a few full-width ones like Ｔ, Ｖ and Ｚ.
2. **A fixed 16 pixel cell is a terrible fit for English.** An "i" in a 16 pixel box looks like it fell out of a sentence.
3. **English is long.** One Japanese character becomes three or four English ones.

Here is the same 176 pixel box both ways. Type anything. The default line is a real one from the game, and it fills the box to exactly 176 pixels.

{{< demo name="width" caption="Top: how the original engine lays out text, one character per 16 px cell. Bottom: the new renderer, using the real glyph bitmaps and widths from the patch. The magenta line is the unused part of the row." >}}

Same box, 37 characters instead of 11. That is the whole job in one picture. A typical English letter in my font is about 5 pixels wide.

### The approach: hook the one routine that draws a glyph

I did not want to rewrite the game's text engine. It already knows how to find a message, parse its control codes (`$02` is a newline, `$05` clears the box, `$09` and `$0A` insert a wrestler's name), scroll lines, wait for input and fill a VRAM buffer. All of that works. The only thing wrong is the very last step, where it takes a character code and stamps 32 bytes of square glyph into the text buffer.

So I replaced that step only. At `$C0:1AC4` the original code shifts the character code left five times, which multiplies it by 32 to get an offset into the 16x16 font, and then copies 32 bytes from the table at `$C8:C01C`. I overwrote the first four bytes of that spot with a long jump to my own code in a new bank (`JSL $D10000`).

My renderer returns into the rest of the original routine's tail, so the caller never knows anything changed. Everything before this point (the message parser, the line-end test) is untouched. The end-of-line test even still works, because I kept the pen position in the game's own units: `$0802` holds the pen x times 4, so a full 176 pixel line is `$2C0`, which is the constant the original compares against at `$C0:1AAB`.

### Drawing a letter at any pixel

The text lives in a buffer at `$7E:E000`. Each 16x16 cell is four 8x8 tiles in 2bpp (top-left, top-right, bottom-left, bottom-right), `$40` bytes per cell. The game draws ink as a clear bit in the high plane. My glyphs are 8 columns wide and 16 rows tall, in a plain text file I edit by hand with a "width N" per character.

For each of the 16 rows I take the glyph byte, shift it right by `shift` bits as a 16-bit value, and the part that falls off the right edge spills into the next tile. So every row is two read-modify-write operations: one for the tile where the letter starts and one at x+8.

The AND is deliberate. Letters are stamped in with `AND`, not `OR`, because ink is a clear bit. Overlapping letters, which happen when a wide letter spills over the edge of the cell the next one starts in, simply merge.

Drag the slider to walk a letter across the buffer. Watch the spill: at shift 0 the glyph sits on one tile, and at any other shift part of it lands in the neighbour.

{{< demo name="stamp" caption="One glyph stamped at pen position x, on a two-cell strip of the text buffer. The offsets are the same arithmetic the `cell` routine does in the assembly." >}}

After a glyph is drawn, the pen moves by the glyph's width, read from a 96 entry table and multiplied by 4 because the pen is stored in quarter pixels. That is the entire font system. The one thing I cheated on is that the English text is plain ASCII. The message `Weee!` in the ROM is literally the bytes `57 65 65 65 21`. The renderer subtracts `$20`, bounds-checks against 96, and indexes the width and glyph tables. No translation table is needed.

### Getting the English into the ROM without touching a pointer

Drawing letters is half of it. The other half is where the text lives. The 862 original strings sit in bank `$C4`, and they are pointed to from event scripts, from tables and from a few literals scattered in code. Finding and rewriting every reference is the kind of job where you miss one and get a crash in chapter five.

I did not rewrite any. The patch expands the ROM to 16 Mbit and starts bank `$D0` with a copy of the original text area. At the start of each message there, the first three bytes are replaced with a jump. The jump is the control code `$0E`, which the game never used, followed by a two-byte address, and I taught the game's control code table about it. Reading that message, the engine hits `$0E`, my `follow` routine in bank `$D1` loads the new address, and the English plays from there. Nothing that pointed at the old text had to change, because the old text is still where it always was. Only the first three bytes of each message are different. Five instructions in the game that read text from bank `$C4` got changed to read from `$D0` (`LDA $C40000,X` becomes `LDA $D00000,X`).

This one bit me. The first version just jumped. It worked in dialogue and broke on the card screens, where text ended instantly. The end-of-message test at `$C0:4379` looks at the byte **before** the pointer, and after a bare jump that byte is the end code of whatever message came before in the original layout. The fix was to follow the jump and read the first English byte in the same tick, then return into the reader at `$C0:1956`, so the reader never sees the stale byte.

### Making it not feel slow

The original engine draws one character per tick. With 11 characters a line, that feels fine. A Japanese line is over quickly. But English is three or four times as long, and at one character per tick every line crawls. Dialogue is the bulk of this game, so that would have been miserable.

The fix is the smallest in the whole patch. The renderer takes a count of extra characters in Y. `draw_two` sets it to 1, so each tick draws a second character after the first. After a glyph is stamped, if the counter is non-zero the renderer peeks at the next byte in the message and decides whether it can keep going. That check is the important bit. If it is a control code (newline, clear, name insert, end), I stop and give it back to the engine, so I never swallow something the original parser needed to see. Only plain printable ASCII is drawn ahead.

{{< demo name="ticks" caption="The same sentence at one character per tick and two. The Japanese line is my own stand-in of similar length, not game text. Compare the tick counts, not the speed on screen." >}}

Two per tick is a compromise. A full 37 character English line still takes longer than an 11 character Japanese one, but it no longer crawls. Three or four per tick would match the original's line time but also make the text hard to follow.

### Where this technique goes next

None of this is specific to wrestling. The same recipe applies to a lot of fixed-width Japanese games:

- **Hook the leaf, not the engine.** Find the routine that blits one glyph, and replace only that. Everything above it (parsing, scrolling, pausing) keeps working.
- **Keep the game's units.** I stored the pen position the way the original did, so the line-end test needed no edits.
- **Put the new code in new space.** Expand the ROM, put the renderer and font in a new bank, and make the original site a three-instruction trampoline.
- **Redirect by jump, not by pointer.** If you cannot find every reference to a text block, leave the references alone and change what is at the other end.
- **Watch what reads backwards.** Anything that looks at the byte before a pointer will bite you after a trampoline.

If you are looking at a game with 8x8 or 16x16 tile text and one-byte characters, this is the first thing I would try.

## Game Mechanics Teardown - What Card Gets Played?

When you press a card, the game plays out the move. How does it decide whether the move works? That is a more interesting question than it sounds, because the answer is one comparison, and the comparison is hidden at a fixed point inside an animation script.

### The overall flow

Here is one move from the first press to the end. Step through it, and change how much the defender guards to see which branch it takes.

{{< demo name="flow" caption="One move as the game sees it. The yellow box is where you are, teal boxes are visited, and the dashed branch is the one not taken. The addresses are the routines in the original code." >}}

Every move is a little bytecode script from bank `$C4`. Most of it is animation, and one opcode, `$03`, is the referee. When the script reaches it, one handler at `$C0:ED18` runs.

### Step one: the attack number

The moment you press the card, the game computes an Attack value and stores it. Here is the COM side, from `$C0:CA85`, written out as math. The player's side at `$C0:CB5E` has the same shape.

{{< asm title="attack" tag="math" >}}
Attack = 109 + Power + rand(Random)
       + (Lit ? 80 : 0) + (255 - victim health) / 4
{{< /asm >}}

`Lit` is the signature move glow. In the code it is a short branch that adds `$50` (80) when the card is glowing.

Note the last term. `EOR #$00FF` is a cheap way to compute 255 minus health, since health is a byte. Then two right shifts divide by four. So a wrestler at full health takes no bonus, and one on the verge of falling over eats up to 63 extra points of incoming attack. The weaker you are, the easier it is to hit you.

### Step two: the defence number

Defence is the interesting half, because it does not exist until the other person acts.

{{< asm title="defence" tag="math" >}}
Defence = 104 + the Guard of every card
          the defender plays during this move
{{< /asm >}}

Every card has a Guard value, and a card being played during an opponent's move does not attack, it adds its Guard. The routine that does it is at `$C0:C985`.

So you do not "block". You pay a card, and the number on it goes into a pot. The Guard values run from 8 to 52. Because Guard and Power run opposite ways, the strongest attackers are the weakest defenders, and the cards you most want to throw are the ones you least want to spend on defence.

Defence is also reset to 104 on every neutral frame. Guards never carry over from one move to the next.

### Step three: the referee

Now the referee itself. The routine at `$C0:ED18` is about 12 instructions, mirrored for each side. It loads the attacker's attack number, compares it with the defender's defence number and branches. Four things stand out to me.

**1. It is `BCC`, so ties hold.** `CMP` sets the carry flag when A is greater than or equal to the operand. `BCC` only branches if the attack is strictly less than the defence. So if Attack is 170 and Defence is 170, the move lands. The defender needs to beat the attack, not match it.

**2. The pass case is nothing.** Passing is `LDA #$0003 / JMP $EC14`, and `$EC14` just adds A to the script pointer. The opcode and its two operand bytes are skipped, and the animation carries on as if the check never happened. A move that works is a move where nothing special happens.

**3. The fail case is a goto.** The two operand bytes of `$03` are the address of a different branch of the same script. On failure the routine reads those two bytes and makes them the new script pointer.

So every move has two endings baked into its bytecode: the happy path, and a reversal animation that was authored by hand. That is also why reversal damage is a fixed number per move (12 for most, 13 for Elbow Drop, 0 for strikes). It is whatever the author of that script's fail branch wrote down.

**4. The reversal is a state swap.** Right after, the same routine zeroes the attack and defence for both sides, flips `$019C` with `EOR #$FFFF` so the roles reverse, swaps the two wrestler indices in `$018A` and `$018C`, and adds one "Fail" point to the card that was reversed. That counter feeds the glowing signature moves: each time one of your cards gets reversed, your signature move gets more likely to light up. Five reversals guarantee it.

### What it looks like with real numbers

Say Baba has full health and throws a Brainbuster. Power is 60, Random is 0 to 12, no glow, and the target has not been hit yet:

{{< asm title="Brainbuster, full health" tag="calc" >}}
Attack  = 109 + 60 + (0..12) + 0 + (255-255)/4
        = 169 .. 181

Defence with no guards = 104       -> lands, always
{{< /asm >}}

Even the weakest card in the game clears 104 with no help (the minimum possible attack is 109 + 28 = 137). So to stop that Brainbuster you need guards worth more than the attack minus 104. That is 66 to 78 points of Guard, which is two or three cards, spent inside a window of around a second or two before the check fires. A single Tiger Suplex is worth 52. A Dropkick is worth 8.

Now take the same move against someone at 100 health:

{{< asm title="same move, defender at 100 HP" tag="calc" >}}
bonus = (255 - 100) / 4 = 38
Attack = 169 .. 181 + 38 = 207 .. 219
{{< /asm >}}

You now need roughly 104 to 116 points of Guard. That is most of your hand. Being hurt does not just cost health. It makes the next hit harder to stop, and I think that is deliberate: it is a snowball: the player who is losing is the one least able to stop the next hit.

Here is the whole referee as a toy. Pick a card, hurt the defender, spend some guard, and see where the check lands. The random term is computed the way the game does it (a byte times the range, shifted right by 8), so the percentage is exact, not a guess.

{{< demo name="referee" caption="The attack range (yellow) against the defence line (magenta). Everything at or above the line lands." >}}

### What was the developer thinking?

I can only guess, but a few things look intentional to me.

**A single number, not a minigame.** There is no reaction check, no timing window on the defender. There are two integers and a CMP. That is a very 1994 way to make a real-time game fair to two players who might be eight years old: nobody needs fast hands, they need to decide which cards to spend.

**The check is deliberately late.** Because it sits in the middle of the animation script, the defender gets a window to react, and that window is as long as the animation takes to get there. Designers could tune how generous a move is by moving the `$03` opcode earlier or later in the script, with no code change. A 102 frame Elbow gives you less to work with than a 364 frame Diving Headbutt, though I haven't mapped where each script puts its check.

**Holds check repeatedly.** A hold like Cobra Twist puts the opcode in a loop. It checks every tick, attack stays fixed, and each tick both defences go up by 2, which rewards the person who is escaping for hanging on. That makes holds feel like a struggle instead of a one-shot roll.

**The dead stats table.** This is my favourite part. There is a table in the ROM, `$C0:05CD`, with a row per wrestler: Tsuruta 116 attack and 120 guard, Hansen 113 and 128, Akiyama a glass-cannon 108 and 64. It is real, carefully tuned data. And it is never used. The routine that loads stats at `$C0:C398` reads the wrestler word at `$01D2` and masks it with `#$00FF`, which keeps only the low byte. But the wrestler number was stored in the high byte (`$01D2 = n << 8`), so the low byte is always zero and every wrestler reads row 0. In every mode, every wrestler is Baba: Attack 109, Guard 104. I sampled attacks from all 16 playable wrestlers (31 of them) and every value fits base 109.

My read is that the designers built a stat system, tuned it, and then a one-byte slip silently turned it off, and nobody noticed because the cards are different enough that the game plays like it has differences. Whether Tsuruta *should* hit harder than Baba is a question the game never gets to answer. I find that kind of thing weirdly moving. It means the balance everybody remembers is the card system's alone.

**Not a bug I fixed.** I left that one alone. The patch fixes two bugs (the portrait and the gauge) because they are visible defects, but changing the combat numbers would change the game. A translation should leave the game it translates as it found it.

{{% /wide %}}

---

{{% wide %}}

{{< patch name="Zen Nippon Pro Wrestling - Fight da Pon (English)" version="1.0" format="BPS" file="https://github.com/kactusken/Zen-Nippon-Pro-Wrestling-Fight-da-Pon-English/releases/latest" platform="Super Famicom" year="1994" publisher="Masaya" size="16 Mbit" >}}

The release zip has two patches and you pick one. **(English)** is the translation and nothing else. **(English) (Debug Menu)** adds the developers' debug menu, which the original game has switched off (hold X and press Select on any screen; several entries show corrupted graphics, same as in the original code).

You need your own copy of the Japanese game: `Zennihon Pro Wrestling - Fight da Pon! (J).smc`.

```
No-Intro: Zen-Nihon Pro Wres - Fight da Pon! (Japan)
Serial: SHVC-JF
File: Zennihon Pro Wrestling - Fight da Pon! (J).smc
Size: 1048576 bytes
CRC32: 379645BD
MD5: 97599530546821BFDEFAE6A658760170
SHA-1: 52AA5CE4612B81C90FD07F6C3DC9A712AFB32668
```

If you find a problem, open an [issue](https://github.com/kactusken/Zen-Nippon-Pro-Wrestling-Fight-da-Pon-English/issues) with a screenshot, which patch you used and where you were. Cut-off text, overlapping text and leftover Japanese are especially useful.

{{% /wide %}}