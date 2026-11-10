export interface LimitResult {
  allowed: boolean;
  retryAfterSec: number;
}

/**
 * Sliding-window limiter kept in memory. On serverless hosting each instance has its own memory,
 * so this slows guessing down rather than being a hard global cap; the long password is the real defence.
 */
export function createLimiter({ max, windowMs }: { max: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  function recent(key: string, now: number): number[] {
    const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (list.length) hits.set(key, list);
    else hits.delete(key);
    return list;
  }

  return {
    /** Check without counting. */
    peek(key: string, now = Date.now()): LimitResult {
      const list = recent(key, now);
      if (list.length < max) return { allowed: true, retryAfterSec: 0 };
      return { allowed: false, retryAfterSec: Math.ceil((list[0] + windowMs - now) / 1000) };
    },
    /** Record one failed attempt. */
    fail(key: string, now = Date.now()): void {
      if (hits.size > 2000) hits.clear(); // hard cap on memory
      const list = recent(key, now);
      list.push(now);
      hits.set(key, list);
    },
    reset(key: string): void {
      hits.delete(key);
    },
  };
}
