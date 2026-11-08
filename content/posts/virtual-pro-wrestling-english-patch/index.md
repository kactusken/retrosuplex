---
title: "Virtual Pro Wrestling - How Many Backdrop Variants Can There Be???"
date: 2026-11-06
draft: false
sheet: 2
summary: "I wanted a full profile for every wrestler in a 1996 PS1 game, which meant knowing every move. So I taught the emulator's debugger to perform and film all of them, and I dug into how spirit and counters decide a match."
tags: ["ps1", "asmik", "aki", "patch", "capture", "debugger", "roster-guide", "spirit"]
game: "Virtual Pro Wrestling"
platform: "PS1"
toc: true
---

## Game Overview

{{% sec %}}

{{< shot src="select.webp" alt="The wrestler select screen with English name tiles and bio box" caption="Wrestler select. The bio box lists name, height, weight, signature move and promotion." scale="1" >}}

*Virtual Pro Wrestling* (バーチャル・プロレスリング) is a one-on-one 3D wrestling game from Asmik Ace Entertainment, developed by AKI Corporation, released on the PlayStation in Japan on 13 September 1996. It never left Japan under this name, but it did come to North America in a different form: as *WCW vs. the World* (SLUS-00455), built on the same engine. The Western release swapped out part of the roster. Comparing the two discs, 17 of the Japanese wrestlers have no counterpart there, and 17 of the American ones are replacements. It has sixty wrestlers from several real promotions, a grapple system driven by how close you are when you tap, and no health bar.

The English patch translates everything the player reads: the seven modes, rule settings, match banners, tournament and league screens, belt screens, Memory Card prompts, and the name tiles and bio boxes for all 60 wrestlers. The wrestler names come in two flavours, real names or the game's own parody names. The hard part was text. The game draws Japanese from the console's BIOS font, so the patch adds an English half-width text routine and redraws the text-in-picture graphics by hand.

The menus were the easy part to explain. What I was really excited about was the guide: a full profile for every wrestler, moves included.

{{% /sec %}}

## The Goal: A Profile for Every Wrestler

{{% sec %}}

When the translation was done I wanted to go further and make a proper roster guide: a profile for each of the 60 wrestlers, with stats and a full move list. Knowing what moves someone has is the heart of a profile, so I needed to find every move, see it and name it.

The challenge is that the game keeps its moves to itself. There is no move list, no announcer text and no move name in the data or the executable. The bio box has a "signature move" label, but it is only part of the picture. If I wanted names, I would have to perform every move, watch it, and name it myself.

The scale made it interesting. Here are the real numbers, counted from the data and the finished captures:

{{% side %}}
| | Count |
|---|---|
| Wrestlers | 60 |
| Action records per wrestler | 42 (39 are moves, two hold stats) |
| Named moves, wrestler by slot | 2,263 (about 38 per wrestler) |
| Distinct animations | 538 |
| Distinct move names | 480 |
| Clips filmed | 539 |
| Frames of animation to watch | 50,411 |
| Footage | about 32 minutes, 3.6 seconds a move |
{{% /side %}}

Most of that is reuse. 393 of the 538 animations are used by more than one wrestler, and one of them turns up 44 times. How much variety a slot has depends on what it is:

{{% side %}}
| Action | Distinct animations |
|---|---|
| Basic strike, Cross tap near | 7 |
| Far tap grapple, none / Up / Down | 23 / 20 / 10 |
| Close tap grapple, none / Up / Down | 17 / 9 / 18 |
| Hold grapple, none / Up / Down | 24 / 32 / 32 |
| Special move | 36 |
| Taunt (L2) | 53 |
{{% /side %}}

And the question in the title: there are **48 backdrops** across 42 wrestlers. They come in 6 names (Backdrop, Backdrop Suplex, Backdrop Suplex Pin, Backdrop Suplex Snap, Lift-up Backdrop and Spinning Backdrop), and underneath those are **9 distinct animations**.

Getting the game to throw a particular move by hand means being at the right distance, facing the right way, pressing the right buttons, with the opponent in the right state. Doing that over 500 times, for about 32 minutes of footage, was not appealing.

So the plan was to make the game do it for me. The aim was one short animated clip per move, so the guide could show it and I could look any move up in a few seconds.

{{% /sec %}}

## Filming the Moves

{{% wide %}}

### Step one: where the moves live

Each wrestler is one file on the disc, `DAnn.DAT`. It holds 42 action records of 13 bytes each, then 102 animation headers of 32 bytes. A record says how hard the move hits (power), how much spirit each side gains or loses, which body part wears, and what *kind* of move it is: plain hit, hit with a KO check, throw, hold.

{{< record caption="The file for one wrestler, and one 13-byte action record from it. Bytes 1, 2 and 12 are mostly constant and I could not tie them to any behaviour, so I labelled them as not decoded instead of guessing." >}}

The important part: the *game itself* chooses a record from your inputs. The grapple selector is only a few dozen instructions in `MAIN.EXE`. It reads Up and Down (Left and Right do nothing), whether Circle was tapped or held, and the distance to the opponent. Closer than 0x74 (116 units) is a close tap, records 7/8/9. Further is a far tap, 4/5/6. Hold gives 10/11/12. Behind the opponent is 17-20.

Because the numbers belong to the slot and not the wrestler, **the same slot is the same input on every wrestler**. I only had to understand 42 slots, and then name what each of 60 wrestlers does in them.

### Step two: let the debugger be the player

I run the game in DuckStation, which has a GDB server. A small Python library talks to it over the network and can read and write RAM and registers while the game runs. That gave me three tricks.

**A reset button.** I played into a match once, then froze the game at a fixed point in the frame loop (`0x8003BAB4`, right before player 1's pad is copied). At that stop I save the registers, the 2 MB of RAM and the scratchpad. To reset, I write back only the 1 KB blocks that differ plus the registers. It takes about 0.4 s, and it works even after a match has *finished*: the double count-out result screen came back to the ring.

**Fake controller input.** The game reads the pad at two instructions. I overwrite them in memory with a load of a constant, so player 1 "presses" whatever I say:

{{< asm title="player 1's pad, patched" tag="pseudo" >}}
; every frame, just before the game copies player 1's pad:
held_buttons = PAD     ; was: held_buttons = read_pad(1)
new_presses  = PAD     ; was: new_presses  = read_pad(1)

; Circle = 0x20.  A tap is PAD for 1-3 frames, a hold is about 6.
{{< /asm >}}

**Any wrestler's moves on one model.** The ring is already loaded with Benoit and Takada, and I can't reload the match for every wrestler. But the action code reads records and animations straight from the wrestler file. So I copy `DAnn.DAT` over player 1's file at `0x80142000`, relocate its 102 animation offsets, and the model performs *that* wrestler's moves. They share a skeleton, so Lyger's powerbomb played on Benoit's body looks fine. The victim's animations come from the attacker's file too.

Not every move is reachable by inputs and a still opponent, so for a few I force the record and let the game play it. Counters, for instance: the attacker is made to select a close tap, then the victim's counter flag is set at the right instant.

### Step three: film it

The emulator window turns black while the debugger holds the game, so I can't screenshot a stopped frame. The solution is to let the game run and record in real time at 15-30 fps. One stop at the selector costs only the first frame.

Each job is a line in a TSV: wrestler, record, mode (`front`, `behind`, `counter`) and a label. A driver script restores the scene, loads the wrestler, presses the buttons, films the moves and writes a GIF. Raw frames are about 20 MB a move, so the script deletes them once the GIF exists. Then another script builds a labelled contact sheet.

{{< clips >}}
{{< clip src="clip-powerbomb.webp" alt="Toshiaki Kawada lifts his opponent, slams him down in a powerbomb and goes for the pin" caption="A powerbomb into a pin: record 12, hold grapple + Down. The same animation is shared by Benoit, Sasaki, Tenzan and several others. Filmed by the script with nobody holding the controller." >}}
{{< clip src="clip-dive.webp" alt="Chris Benoit runs at the ropes and dives over them onto the floor, onto his opponent" caption="Benoit's Suicide Dive, record 40: Triangle plus a direction to run, then Circle held. He lands outside the ring, so the referee starts a count-out." >}}
{{< /clips >}}

{{< shot src="benoit-sheet.webp" alt="A contact sheet of Chris Benoit's moves, one row of frames per move, each labelled" caption="Part of one wrestler's contact sheet: Benoit's hold grapples, each row a move running left to right in time. I used these sheets to review and name clips in bulk." scale="1" >}}

The full run was 218 jobs, nine batches, about 24 minutes, with no one touching the controller: 202 main signatures plus 16 counters, with 0 errors and 0 re-runs. Every wrestler's signature for grapple records 4 to 20 got a clip. In total the capture covers about 590 clips.

### What went wrong along the way

* **Top rope.** The first attempt had Benoit climb and dive *out of the ring*. I had poked a flag on the opponent that I guessed meant "lying", and it meant "outside the ring". A crashed script also let the match run to a double count-out; the snapshot restore recovered it. The real trigger turned out to be touching the ropes within 17 units of a corner, holding the diagonal and pressing Cross.
* **Mislabelled records.** I first assumed a far tap was records 7/8/9. Playing it in the debugger said the opposite: close is 7/8/9. I also first took records 14/15/16 for the *attacker's* follow-up. They are the *defender's* counter, played through the attacker's data.
* **Whiffs.** Some strikes missed at the default distance (115). I re-filmed them from 90.
* **Debugger artefacts.** Counter clips start with one half-drawn frame, and behind-the-opponent clips start face to face because the setup turns the opponent around. Both are dropped or trimmed.

### From clips to names

Filming does not name anything. For that I used the Western release, *WCW vs. the World*, which runs on the same engine and does have move names. Where a slot's animation matches a WCW wrestler's, the WCW name is a good first suggestion. I matched files by comparing how many of a file's slot names agree with what other files call the same animation; one of them (a list that was word for word a different wrestler's) was thrown out as a source error, and for six or so wrestlers there is no WCW list at all.

Then I watched. Each suggestion went on a validation page with its clip, and I marked it OK or typed the correct name. Several suggestions were wrong in a way that only the clip shows, such as a "360 Degree" something that turns out to be a Rolling Elbow. The result is 60 wrestlers and 2,263 named moves, and every one of the 39 move records is accounted for.

{{% /wide %}}

## Spirit

{{% sec %}}

Once I knew how a move was stored, the next question was how it plays out in the real engine, because the same move does not always go the same way. The biggest variable is spirit. It decides whether you can counter a grab, whether a pin sticks, and whether you get your finisher at all. So how does spirit change what you can attack with, and what you can defend against?

{{< shot src="hud.webp" alt="A match at the bell with the clock at the top and a SPIRIT icon in each bottom corner" caption="The match screen. No health bar: just the clock and a SPIRIT icon in each bottom corner." scale="1" >}}

There is no health bar. Every wrestler has 255 hidden health, and the only gauge is the SPIRIT icon in each bottom corner. It runs from 0 to 100, everyone starts every fall at 50, and the icon's colour tells you where it is.

| Spirit | Icon | What it means |
|---|---|---|
| 0-29 | almost black | no counters, easy to pin |
| 30-49 | dark red | counters possible from 36 |
| 50-69 | bright red | where every fall starts |
| 70-89 | salmon | counters likely, harder to pin |
| 90-99 | white | cannot be pinned or forced to submit |
| 100 | flashing white | the special |

It drifts back to 50 on its own: about every four seconds it falls by 1 above 50, or rises by 2 below (3 below 31). You raise it by landing moves (0 to +7), taunting with L2 (+5), leapfrogging a runner with L1 (+3), blocking a strike with Square (+2) and kicking out of a pin (+10). Getting hit costs 2-7, and going over the top rope costs 5.

{{< shot src="spirit-full.webp" alt="The bottom of the match screen: the 1P SPIRIT icon at left is white, the 2P icon at right is red" caption="Left: white, full spirit. Right: bright red, around 50." scale="1" >}}

Four thresholds do the work. These come from the code, and the key ones were checked in game:

* **36:** below this you cannot counter.
* **48 health:** below it, every move you land gives 3 extra spirit. This is the comeback rule.
* **90:** you cannot be pinned and cannot be made to give up.
* **100:** the special.

At 100 your wrestler strikes a flash pose and the icon turns white. For the next 30 seconds, hold Circle next to the opponent for about a second and let go. That is the special move, record 13, with power 30 for 54 of the 60 wrestlers. The other six (Hase, Hashimoto, Baba, Fujiwara, Kitao and Hogan) have a hold instead. During those 30 seconds your spirit cannot fall and you cannot be knocked out. After exactly 30 seconds it resets to 50.

Spirit also decides how pins go. This is the formula as I traced it from the code:

{{< asm title="kickout timer" tag="math" >}}
T = pinner_spirit/4 + 110 - victim_HP (min -100) - victim_spirit   ; at least 2
if victim_spirit >= 90 : T = min(T, 80)
T falls 1 per tick, and 1 more per 3 face-button presses
pinfall when the count reaches 3
{{< /asm >}}

A pinner at 100 spirit adds 25 ticks to that timer, against 12 at spirit 50. The practical lesson is that a fresh opponent kicks out at once, and pinning someone at 90 or more spirit never works. Wear him down first, then pin while your own spirit is high.

{{% /sec %}}

## Countering Moves

{{% sec %}}

{{< shot src="guard.webp" alt="A wrestler blocking a strike with the guard" caption="Guard (hold Square) blocks Cross strikes completely, and each block gives a little spirit. It does not stop a grab." scale="1" >}}

There are four different answers, depending on what is coming.

| What is coming | What to do | Chance |
|---|---|---|
| A close tap grab (or a tap from behind) | any face button right as he grabs | your spirit in percent, from 36 |
| A strong grab while dazed in a corner | face buttons straight away | each press: 3 x spirit in 1000 |
| A Cross strike | Square to guard, or Square + Cross to catch | a caught strike is reversed |
| A grab | R1 to step back | the grab misses |

{{< clip src="clip-counter.webp" alt="Jyushin Lyger counters a grab by rolling his attacker up into a pin" caption="Lyger's counter, the Small Package (record 16): the grabbed wrestler rolls the grabber up and the referee counts the pin on the grabber." >}}

The grab counter is the interesting one. The window is **three frames** right after the grab connects. In that window you must press a face button, your spirit has to be at least 36, and then the game rolls a random number from 0 to 1000 and the counter works if it is at most ten times your spirit. At spirit 70 that is 70%; at 100 it is guaranteed. It only works against a close tap or one from behind, never a far tap or a hold.

{{< asm title="grab counter" tag="calc" >}}
You are at spirit 70 and he grabs you with a close tap.
  press a face button within 3 frames   -> ok
  spirit >= 36                          -> ok
  roll 0..1000, counter if roll <= 700  -> 70% to succeed
{{< /asm >}}

What happens next depends on the wrestler. Most counters just free the grabbed man. In 23 of 60 wrestlers the close-tap-plus-Down counter is a throw that ends in a pin, so the grabber is the one on the mat with the referee counting. This is why the guide has a counter entry at the end of every wrestler's move list.

A few more habits follow from this:

* Taunt when you are safe. A counter you cannot afford at spirit 20 becomes a coin flip at 50 and a sure thing at 100.
* A far tap gives the *defender* +8 spirit, so the weak grapple is the wrong way to start a fight against someone near the threshold.
* If you are the one at 90 or more, you cannot be pinned, so hold your counters for the close taps and take the strikes.

{{% /sec %}}

## The Roster Guide

{{% wide %}}

All of this ended up in the [player's guide](https://kactusken.github.io/Virtual-Pro-Wrestling-PSX-English/guide/): how to play, the rules, all 60 wrestlers with stats and moves, and the secrets. The full move list with inputs and names is also in `docs/MOVES.md` in the repository.

{{% /wide %}}

## Download

{{% wide %}}

{{< patch name="Virtual Pro Wrestling (English)" version="1.0" format="xdelta" file="https://github.com/kactusken/Virtual-Pro-Wrestling-PSX-English/releases/latest" platform="PlayStation" year="1996" publisher="Asmik Ace" size="CD image" >}}

There are four patches in the zip: real names or parody names, each with an optional all-wrestlers-unlocked version. Patch your own copy of the Japanese disc (SLPS-00449) with Delta Patcher, then open the original `.cue`. It was tested in DuckStation. 

{{% /wide %}}
