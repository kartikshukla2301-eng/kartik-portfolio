/**
 * Sound for the intro loader: a mechanical watch / stopwatch.
 *
 *  - crisp tick, tock, tick, tock ... (two alternating clicks, like an escapement), speeding up as the counter climbs
 *  - at 100: the stopwatch "stops" with a double click and a very small bell
 *
 * It is synthesised with the Web Audio API (no audio files, nothing to license). The pure helpers at
 * the top are unit-tested; LoaderSound only needs a BaseAudioContext, so it can run live (AudioContext)
 * or be rendered to a file (OfflineAudioContext) for a preview.
 */

export const SOUND_STORAGE_KEY = "ks-sound";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Ticks per second at a given counter value (0..100): a calm watch at the start, a racing stopwatch at the end. */
export function tickRate(progress: number): number {
  const p = clamp(Number.isFinite(progress) ? progress : 0, 0, 100) / 100;
  return 6 + 5 * p; // 6 -> 11 per second
}

export interface TickProfile {
  /** Band-pass centre of the click, Hz */
  click: number;
  /** Pitch of the small "case" ring that follows the click, Hz */
  ring: number;
  /** Centre of the second, lighter transient a few ms later, Hz */
  echo: number;
  /** Click loudness 0..1 */
  level: number;
  /** Delay of the second transient, seconds */
  echoDelay: number;
  /** Stereo position -1..1 */
  pan: number;
}

/** Even indexes are the "tick", odd ones the "tock": slightly lower, softer and a touch later. */
export function tickProfile(index: number): TickProfile {
  const tock = Math.abs(Math.round(Number.isFinite(index) ? index : 0)) % 2 === 1;
  return tock
    ? { click: 2900, ring: 1650, echo: 4300, level: 0.42, echoDelay: 0.013, pan: 0.12 }
    : { click: 3600, ring: 2100, echo: 5200, level: 0.55, echoDelay: 0.011, pan: -0.12 };
}

export interface TickPlan {
  ticks: { at: number; index: number }[];
  nextAt: number;
  nextIndex: number;
}

/**
 * Which ticks fall before `horizon`? Called repeatedly by a look-ahead scheduler, so ticks are placed on
 * the audio clock (steady) instead of on timers (jittery). Spacing follows the current counter value.
 */
export function planTicks(nextAt: number, nextIndex: number, horizon: number, progress: number): TickPlan {
  const ticks: TickPlan["ticks"] = [];
  let at = nextAt;
  let index = nextIndex;
  const step = 1 / tickRate(progress);
  while (at < horizon && ticks.length < 64) {
    ticks.push({ at, index });
    at += step;
    index += 1;
  }
  return { ticks, nextAt: at, nextIndex: index };
}

type Ctx = BaseAudioContext;

function noiseBuffer(ctx: Ctx, seconds = 0.6): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  // Fixed seed so a rendered preview is identical every time.
  let seed = 1337;
  for (let i = 0; i < data.length; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    data[i] = (seed / 0xffffffff) * 2 - 1;
  }
  return buffer;
}

export class LoaderSound {
  private readonly master: GainNode;
  private readonly noise: AudioBuffer;
  private progress = 0;
  private nextAt = 0;
  private nextIndex = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private ended = false;

  /**
   * @param live schedule ticks with a timer (real playback). Pass false when you call pump() yourself
   *             (offline rendering).
   */
  constructor(
    private readonly ctx: Ctx,
    private readonly options: { volume?: number; live?: boolean } = {}
  ) {
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -14;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.12;
    compressor.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = options.volume ?? 0.9;
    this.master.connect(compressor);
    this.noise = noiseBuffer(ctx);
  }

  /** Begin ticking from `progress`. The first tick lands a few ms from now. */
  start(progress = 0, at = this.ctx.currentTime + 0.03): void {
    this.progress = progress;
    this.nextAt = at;
    this.nextIndex = 0;
    this.pump();
    if (this.options.live !== false) this.timer = setInterval(() => this.pump(), 25);
  }

  /** Follow the counter (it sets how fast the watch ticks). */
  setProgress(progress: number): void {
    this.progress = progress;
  }

  /** Schedule every tick that falls before `horizon` (default: 150 ms ahead of the audio clock). */
  pump(horizon = this.ctx.currentTime + 0.15): void {
    if (this.ended) return;
    const plan = planTicks(this.nextAt, this.nextIndex, horizon, this.progress);
    for (const t of plan.ticks) this.tick(t.index, t.at);
    this.nextAt = plan.nextAt;
    this.nextIndex = plan.nextIndex;
  }

  /** One mechanical click: a noise burst, a lighter second transient, and a tiny ring from the "case". */
  private tick(index: number, at: number, gain = 1): void {
    const p = tickProfile(index);
    const ctx = this.ctx;

    const pan = ctx.createStereoPanner();
    pan.pan.value = p.pan;
    pan.connect(this.master);

    const burst = (centre: number, q: number, level: number, when: number, decay: number) => {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = centre;
      band.Q.value = q;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.linearRampToValueAtTime(level * gain, when + 0.0006);
      g.gain.exponentialRampToValueAtTime(0.0001, when + decay);
      src.connect(band);
      band.connect(g);
      g.connect(pan);
      // A different slice of the noise each time so no two ticks are identical.
      src.start(when, (index * 0.0371) % 0.4);
      src.stop(when + decay + 0.01);
    };

    burst(p.click, 3.5, p.level, at, 0.02);
    burst(p.echo, 4, p.level * 0.55, at + p.echoDelay, 0.012);

    const ring = ctx.createOscillator();
    const rg = ctx.createGain();
    ring.type = "sine";
    ring.frequency.value = p.ring;
    rg.gain.setValueAtTime(0.0001, at);
    rg.gain.linearRampToValueAtTime(0.1 * gain, at + 0.001);
    rg.gain.exponentialRampToValueAtTime(0.0001, at + 0.05);
    ring.connect(rg);
    rg.connect(pan);
    ring.start(at);
    ring.stop(at + 0.06);
  }

  /**
   * The ending: the watch stops with a firm double click ("tk-TAK") and one very small bell.
   * Timed to the moment the digits start to zoom (see PageLoader).
   */
  finish(at = this.ctx.currentTime + 0.02): void {
    if (this.ended) return;
    this.stopTimer();
    this.ended = true;
    const ctx = this.ctx;

    // Two stronger clicks, the second heavier, with a short low "thunk" under it.
    this.tick(0, at, 1.5);
    this.tick(1, at + 0.09, 1.9);

    const thunk = ctx.createOscillator();
    const tg = ctx.createGain();
    thunk.type = "sine";
    thunk.frequency.setValueAtTime(240, at + 0.09);
    thunk.frequency.exponentialRampToValueAtTime(110, at + 0.17);
    tg.gain.setValueAtTime(0.0001, at + 0.09);
    tg.gain.linearRampToValueAtTime(0.32, at + 0.093);
    tg.gain.exponentialRampToValueAtTime(0.0001, at + 0.2);
    thunk.connect(tg);
    tg.connect(this.master);
    thunk.start(at + 0.09);
    thunk.stop(at + 0.22);

    // A tiny bell, like a timer finishing: quiet and short.
    for (const [mult, level] of [
      [1, 1],
      [2.76, 0.22],
    ] as const) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 1568 * mult;
      g.gain.setValueAtTime(0.0001, at + 0.2);
      g.gain.linearRampToValueAtTime(0.055 * level, at + 0.204);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 1.1);
      osc.connect(g);
      g.connect(this.master);
      osc.start(at + 0.2);
      osc.stop(at + 1.15);
    }
  }

  /** Fade everything out (skip, mute). */
  fadeOut(seconds = 0.25, at = this.ctx.currentTime): void {
    if (this.ended) return;
    this.stopTimer();
    this.ended = true;
    this.master.gain.cancelScheduledValues(at);
    this.master.gain.setTargetAtTime(0, at, seconds / 4);
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
