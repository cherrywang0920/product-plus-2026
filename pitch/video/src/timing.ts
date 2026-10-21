// Every cue in the video, in seconds from the start of that clip. Re-timing = editing numbers here.
// Film cues are timed to the takes in public/footage (speech times measured from their audio).
// Points are in 1920×1080 pixels of the footage.

export const T = {
  // 1 · Deck. "Did you know Aritzia could be losing | close to $100 million a year | on clothes clients ask for, but never get?"
  hook: { dur: 7, count: 0.4, countEnd: 2.6, round: 3.2, line: 3.6, foot: 4.0 },

  // 2–4 · shot2.mp4 (22.9 s). Dora at the rooms, phone out 10–21 s, walks off at ~21.5 s.
  // VO: "It slips away in moments like this. | Atelier logs it in CMT…"
  // The client (off-camera) asks 3.2–6.0: "Could you grab me a size 6?" (captioned: hard to hear). Dora replies 8.8–11.0.
  // The AO intro card sits on the clear wall at left until the phone comes up.
  s2: { dur: 22.9, intro: 2.8, introOut: 9.5, client: 3.1, clientSpeak: 2.7, clientOut: 6.8, phoneIn: 10.3, typeEnd: 13.2, send: 13.8, phoneOut: 20.8, leave: 21.2 },

  // 3 · shot3-1.mp4 (8.7 s). Brady folding, phone in back pocket. "…No alert. The runner never sees it."
  s31: { dur: 8.72, chip: 0.4, quote: 1.4, quoteOut: 8.4 },
  // 3 · shot3-2.mp4 (5.2 s). Close-up of the phone in the pocket. The take's own sound is muted.
  s32: { dur: 5.2, bubble: 0.5, phone: { x: 1080, y: 570 } },

  // 4 · Deck (no footage). "The client walks out, | and no system records what they wanted."
  walk: { dur: 5.5, left: 1.6, lost: 1.9, record: 2.9 },

  // 5–6 · shot6.mp4 (4.8 s). Dora speaks 1.1–4.2 (as filmed): "Hey Brady, can you get me a size 6 Effortless Pant in black?"
  s6: {
    dur: 4.8, title: 0.1, titleOut: 0.9, glow: 1.0, bubble: 1.1, logged: 3.3, out: 4.7,
    // "Hey Brady" opens the direct line: panel up, Brady picked (~when his name is said), line draws, label
    panel: 1.3, hl: 1.45, line: 1.5, direct: 2.2, speech: [1.05, 4.25],
    // earpiece track (time → x, y)
    ear: [[0, 1363, 540], [1, 1325, 540], [2, 1229, 538], [3, 1215, 536], [3.5, 1200, 536], [4.8, 1190, 536]] as [number, number, number][],
  },
  // 6 · shot6-1.mp4 (4.3 s). Close-up of Dora's earpiece; the request leaves toward Brady (right).
  s61: { dur: 4.32, waves: 0.2, chip: 0.8, ear: { x: 1020, y: 680 } },
  // 6–7 · shot6-2_7-1.mp4 (6.8 s). Arrives in Brady's ear 0.1–1.0; "Hey Joule, do we have it?" 5.3–6.3.
  s62: { dur: 6.84, arrive: 0.05, chime: 0.7, card: 0.8, cardOut: 4.6, ask: 5.1, speech: [5.25, 6.4], ear: { x: 744, y: 560 } },
  // 7 · shot7.mp4 (8.4 s). Joule answers: "Black 6 is sold out. | Navy 6, two on rack B."
  // Joule's voice: public/audio/joule-stock.wav (Kokoro neural TTS, voice af_heart, run locally); speech starts
  // voiceLead s into the file and lasts voiceDur. The take's sound is ducked under it.
  s7: { dur: 8.44, glow: 0.9, voice: 1.2, voiceLead: 0.33, voiceDur: 3.07, map: 2.0, out: 8.3, ear: { x: 1030, y: 560 } },

  // 8 · shot8-1.mp4 (3.6 s). Brady 0.9–2.7 (as filmed): "Hey Dora, does navy size 6 work?"
  s81: { dur: 3.56, ask: 0.7, speech: [0.85, 2.75] },
  // 8 · shot8-2.mp4 (2.0 s). Dora 0.7–1.5 (as filmed): "Navy's great!"
  s82: { dur: 2.0, reply: 0.45, speech: [0.65, 1.55] },

  // 9–10 · shot9-1.mp4 (18.4 s). Brady walks the navy pant over, hand-off ~15–17 s.
  // VO: "No refreshing. | No shouting. | Hands stay busy."
  s91: { dur: 18.44, onWay: 0.6, onWayOut: 5.5, ticks: 14.6 }, // ticks run as a lower third: the handheld camera moves both heads across the top
  // 9–10 · shot9-2.mp4 (3.9 s). Shorter take of the same hand-off.
  s92: { dur: 3.92, onWay: 0.2, onWayOut: 1.6, ticks: 1.7 },

  // 11 · Deck over the frozen hand-off. "And every request becomes demand data sales reports never see: |
  // what's tried on, | what's missing, | what clients take instead."
  data: { dur: 8, tags: [1.0, 2.0, 3.0], fly: 4.4, bdc: 4.2, label: 5.6 },

  // 12 · Deck. "Anonymized, it flows into SAP, | so Aritzia sees demand shift as it happens, | and every SAP retailer can too."
  dash: { dur: 8, bars: 0.6, kpi: 1.6, joule: 3.4, click: 5.3, done: 5.7, btp: 6.2 },

  // 13 · Deck. "Atelier, by Joule. | The fitting room, finally heard."
  end: { dur: 6, logo: 0.3, tag: 1.4, chips: 2.4, team: 3.4 },
};
