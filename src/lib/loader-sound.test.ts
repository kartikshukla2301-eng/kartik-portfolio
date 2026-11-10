import { describe, expect, it } from "vitest";
import { planTicks, tickProfile, tickRate } from "./loader-sound";

describe("tickRate", () => {
  it("speeds up as the counter climbs", () => {
    expect(tickRate(0)).toBe(6);
    expect(tickRate(100)).toBe(11);
    expect(tickRate(50)).toBeGreaterThan(tickRate(10));
    expect(tickRate(90)).toBeGreaterThan(tickRate(50));
  });

  it("stays between 6 and 11 per second for any input", () => {
    for (const v of [-20, 0, 33.3, 100, 400, Number.NaN, Number.POSITIVE_INFINITY]) {
      const r = tickRate(v);
      expect(r).toBeGreaterThanOrEqual(6);
      expect(r).toBeLessThanOrEqual(11);
    }
  });
});

describe("tickProfile", () => {
  it("alternates tick and tock", () => {
    const tick = tickProfile(0);
    const tock = tickProfile(1);
    expect(tock.click).toBeLessThan(tick.click);
    expect(tock.level).toBeLessThan(tick.level);
    expect(tickProfile(2)).toEqual(tick);
    expect(tickProfile(3)).toEqual(tock);
  });

  it("pans the two clicks to opposite sides", () => {
    expect(tickProfile(0).pan).toBeLessThan(0);
    expect(tickProfile(1).pan).toBeGreaterThan(0);
  });

  it("copes with odd input", () => {
    expect(tickProfile(Number.NaN)).toEqual(tickProfile(0));
    expect(tickProfile(-1)).toEqual(tickProfile(1));
  });
});

describe("planTicks", () => {
  it("places ticks evenly at the current rate", () => {
    // 6 per second: ticks at 0, 1/6, ... 5/6. The horizon sits just inside 1 s so a tick landing exactly
    // on the boundary (floating point) cannot make the count ambiguous.
    const plan = planTicks(0, 0, 0.99, 0);
    expect(plan.ticks.map((t) => t.index)).toEqual([0, 1, 2, 3, 4, 5]);
    const gaps = plan.ticks.slice(1).map((t, i) => t.at - plan.ticks[i].at);
    for (const g of gaps) expect(g).toBeCloseTo(1 / 6, 6);
  });

  it("continues where it left off, so repeated calls never double up or skip", () => {
    const first = planTicks(0, 0, 0.5, 0);
    const second = planTicks(first.nextAt, first.nextIndex, 1, 0);
    const all = [...first.ticks, ...second.ticks];
    expect(all.map((t) => t.index)).toEqual(all.map((_, i) => i));
    for (let i = 1; i < all.length; i++) expect(all[i].at).toBeGreaterThan(all[i - 1].at);
  });

  it("ticks closer together at a higher counter value", () => {
    const slow = planTicks(0, 0, 1, 0).ticks.length;
    const fast = planTicks(0, 0, 1, 100).ticks.length;
    expect(fast).toBeGreaterThan(slow);
  });

  it("schedules nothing when the next tick is beyond the horizon", () => {
    const plan = planTicks(5, 7, 1, 50);
    expect(plan.ticks).toEqual([]);
    expect(plan.nextAt).toBe(5);
    expect(plan.nextIndex).toBe(7);
  });

  it("never schedules an unbounded burst", () => {
    expect(planTicks(0, 0, 10_000, 100).ticks.length).toBeLessThanOrEqual(64);
  });
});
