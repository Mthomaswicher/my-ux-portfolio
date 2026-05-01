/**
 * Tiny Web Audio synthesizer — chiptune-style SFX with no asset files.
 * All sounds are generated from oscillators + gain envelopes at call time.
 */

type Wave = OscillatorType; // "sine" | "square" | "sawtooth" | "triangle"

class ArcadeAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private enabled = false;

  /** Initialize on first user gesture. Safe to call repeatedly. */
  init() {
    if (this.ctx) return;
    if (typeof window === "undefined") return;
    const Ctor =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor() as AudioContext;
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.15;
    this.master.connect(this.ctx.destination);
  }

  setEnabled(v: boolean) {
    this.enabled = v;
    if (v) this.init();
    if (this.ctx?.state === "suspended" && v) {
      this.ctx.resume().catch(() => {});
    }
  }

  isEnabled() {
    return this.enabled;
  }

  /** Schedule a single tone with a soft envelope to avoid clicks. */
  private tone({
    freq,
    duration,
    type = "square",
    volume = 0.5,
    delay = 0,
    slideTo,
  }: {
    freq: number;
    duration: number;
    type?: Wave;
    volume?: number;
    delay?: number;
    slideTo?: number;
  }) {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(slideTo, 1),
        t0 + duration,
      );
    }
    // Envelope: fast attack, hold, fast release — keeps things snappy + click-free
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + 0.005);
    gain.gain.linearRampToValueAtTime(volume * 0.7, t0 + duration * 0.7);
    gain.gain.linearRampToValueAtTime(0, t0 + duration);
    osc.connect(gain).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  }

  /** Short white-noise burst (for "rolls" and "errors"). */
  private noise({
    duration,
    volume = 0.15,
    delay = 0,
  }: {
    duration: number;
    volume?: number;
    delay?: number;
  }) {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const samples = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, samples, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + 0.01);
    gain.gain.linearRampToValueAtTime(0, t0 + duration);
    src.connect(gain).connect(this.master);
    src.start(t0);
    src.stop(t0 + duration + 0.05);
  }

  // ─── Named SFX ──────────────────────────────────────────────────────────

  /** Tiny soft blip on hover. */
  hover() {
    this.tone({ freq: 1320, duration: 0.04, type: "square", volume: 0.18 });
  }

  /** Subtle click confirmation. */
  click() {
    this.tone({ freq: 880, duration: 0.05, type: "square", volume: 0.32 });
  }

  /** "Select" — short ascending arpeggio. */
  select() {
    this.tone({ freq: 523, duration: 0.07, type: "square", volume: 0.32 });
    this.tone({
      freq: 784,
      duration: 0.09,
      type: "square",
      volume: 0.32,
      delay: 0.06,
    });
  }

  /** Back / cancel. */
  back() {
    this.tone({
      freq: 440,
      duration: 0.1,
      type: "square",
      volume: 0.28,
      slideTo: 220,
    });
  }

  /** Coin-insert two-tone. */
  insertCoin() {
    this.tone({ freq: 1318, duration: 0.08, type: "square", volume: 0.4 });
    this.tone({
      freq: 1760,
      duration: 0.12,
      type: "square",
      volume: 0.4,
      delay: 0.07,
    });
  }

  /** 1-UP arpeggio (major triad → octave). */
  oneUp() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => {
      this.tone({
        freq: n,
        duration: 0.1,
        type: "triangle",
        volume: 0.4,
        delay: i * 0.07,
      });
    });
  }

  /** Save / submit success — softer 3-note. */
  save() {
    const notes = [392, 494, 587];
    notes.forEach((n, i) => {
      this.tone({
        freq: n,
        duration: 0.09,
        type: "triangle",
        volume: 0.36,
        delay: i * 0.06,
      });
    });
  }

  /** Slot-machine roll — sweep up. */
  roll() {
    this.noise({ duration: 0.18, volume: 0.08 });
    this.tone({
      freq: 320,
      duration: 0.18,
      type: "square",
      volume: 0.28,
      slideTo: 1100,
    });
  }

  /** Error / blocked. */
  error() {
    this.tone({ freq: 220, duration: 0.07, type: "sawtooth", volume: 0.3 });
    this.tone({
      freq: 196,
      duration: 0.12,
      type: "sawtooth",
      volume: 0.3,
      delay: 0.07,
    });
  }

  /** Pop — for color picks, small confirmations. */
  pop() {
    this.tone({ freq: 660, duration: 0.04, type: "square", volume: 0.24 });
  }

  /** Test ping when sound is toggled on. */
  test() {
    this.tone({ freq: 988, duration: 0.06, type: "triangle", volume: 0.3 });
    this.tone({
      freq: 1318,
      duration: 0.1,
      type: "triangle",
      volume: 0.3,
      delay: 0.05,
    });
  }

  /** Cartridge thunk into slot — low noise burst + descending tone. */
  cartridge() {
    this.noise({ duration: 0.12, volume: 0.18 });
    this.tone({
      freq: 220,
      duration: 0.18,
      type: "sawtooth",
      volume: 0.4,
      slideTo: 110,
    });
    this.tone({
      freq: 88,
      duration: 0.22,
      type: "square",
      volume: 0.32,
      delay: 0.12,
    });
  }

  /** Console power-up swell — low to high sweep + bright cap. */
  power() {
    this.tone({
      freq: 80,
      duration: 0.45,
      type: "sawtooth",
      volume: 0.32,
      slideTo: 720,
    });
    this.tone({
      freq: 880,
      duration: 0.14,
      type: "triangle",
      volume: 0.4,
      delay: 0.42,
    });
    this.tone({
      freq: 1318,
      duration: 0.18,
      type: "triangle",
      volume: 0.4,
      delay: 0.5,
    });
  }
}

export const arcade = new ArcadeAudio();
export type SfxName =
  | "hover"
  | "click"
  | "select"
  | "back"
  | "insertCoin"
  | "oneUp"
  | "save"
  | "roll"
  | "error"
  | "pop"
  | "test"
  | "cartridge"
  | "power";
