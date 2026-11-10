import { describe, expect, it } from "vitest";
import { defaultContent } from "./defaults";
import { toPublicContent } from "./public";

describe("toPublicContent", () => {
  it("removes the phone number unless the owner chose to show it", () => {
    const hidden = toPublicContent({ ...defaultContent, profile: { ...defaultContent.profile, phone: "+91 90000 11111", showPhone: false } });
    expect(hidden.profile.phone).toBe("");
    expect(JSON.stringify(hidden)).not.toContain("90000 11111");
  });

  it("keeps the phone number when showPhone is on", () => {
    const shown = toPublicContent({ ...defaultContent, profile: { ...defaultContent.profile, phone: "+91 90000 11111", showPhone: true } });
    expect(shown.profile.phone).toBe("+91 90000 11111");
  });

  it("does not change anything else and does not mutate the input", () => {
    const input = { ...defaultContent, profile: { ...defaultContent.profile, phone: "123", showPhone: false } };
    const out = toPublicContent(input);
    expect(out.experiences).toBe(input.experiences);
    expect(input.profile.phone).toBe("123");
  });
});
