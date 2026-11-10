import { describe, expect, it } from "vitest";
import { readAdStatus, shouldShowAd } from "./adsense";

describe("ad visibility", () => {
  it("reads the status AdSense writes on the <ins> element", () => {
    expect(readAdStatus("filled")).toBe("filled");
    expect(readAdStatus("unfilled")).toBe("unfilled");
  });

  it("treats a missing or unknown status as pending", () => {
    expect(readAdStatus(null)).toBe("pending");
    expect(readAdStatus(undefined)).toBe("pending");
    expect(readAdStatus("")).toBe("pending");
    expect(readAdStatus("something-else")).toBe("pending");
  });

  it("only shows the banner when an ad was actually served", () => {
    expect(shouldShowAd("filled")).toBe(true);
    expect(shouldShowAd("unfilled")).toBe(false);
    expect(shouldShowAd("pending")).toBe(false);
  });
});
