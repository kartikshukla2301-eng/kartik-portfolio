import { describe, expect, it } from "vitest";
import { buildMailto } from "./mail";

describe("buildMailto", () => {
  it("targets the right address", () => {
    expect(buildMailto("me@example.com", "Ann", "ann@x.io", "hi").startsWith("mailto:me@example.com?")).toBe(true);
  });

  it("round-trips special characters through URL encoding", () => {
    const href = buildMailto("me@example.com", "A & B", "ab@x.io", "line one\nline two & more = ? #hash");
    const url = new URL(href);
    expect(url.searchParams.get("subject")).toBe("Portfolio contact from A & B");
    expect(url.searchParams.get("body")).toBe("line one\nline two & more = ? #hash\n\nFrom: A & B (ab@x.io)");
  });

  it("does not let typed text inject extra mail headers", () => {
    const href = buildMailto("me@example.com", "x&bcc=evil@x.io", "a@b.c", "m");
    const url = new URL(href);
    expect(url.searchParams.get("bcc")).toBeNull();
  });
});
