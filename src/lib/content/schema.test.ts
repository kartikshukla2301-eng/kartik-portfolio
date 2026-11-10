import { describe, expect, it } from "vitest";
import { defaultContent } from "./defaults";
import { newId, parseContent } from "./schema";

const clone = () => structuredClone(defaultContent);

describe("default content", () => {
  it("is valid against the schema (so the site never starts from broken data)", () => {
    const result = parseContent(defaultContent);
    expect(result.ok).toBe(true);
  });

  it("has unique ids inside every list", () => {
    for (const list of [
      defaultContent.experiences,
      defaultContent.projects,
      defaultContent.secondaryProjects,
      defaultContent.certifications,
      defaultContent.skills,
      defaultContent.timeline,
    ]) {
      const ids = list.map((i) => i.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("parseContent", () => {
  it("accepts an empty Drive link (hides the button)", () => {
    const c = clone();
    c.certifications[0].driveUrl = "";
    expect(parseContent(c).ok).toBe(true);
  });

  it("accepts a Drive share link", () => {
    const c = clone();
    c.certifications[0].driveUrl = "https://drive.google.com/file/d/abc123/view?usp=sharing";
    expect(parseContent(c).ok).toBe(true);
  });

  it("rejects javascript:, data: and other non-http links", () => {
    for (const bad of ["javascript:alert(1)", "data:text/html,hi", "ftp://x.com/a", "drive.google.com/file/d/1", "//evil.com"]) {
      const c = clone();
      c.certifications[0].driveUrl = bad;
      const r = parseContent(c);
      expect(r.ok, bad).toBe(false);
    }
  });

  it("rejects an invalid email and phone with letters", () => {
    const a = clone();
    a.profile.email = "not-an-email";
    expect(parseContent(a).ok).toBe(false);

    const b = clone();
    b.profile.phone = "call me maybe";
    expect(parseContent(b).ok).toBe(false);
  });

  it("accepts a normal phone number", () => {
    const c = clone();
    c.profile.phone = "+91 63900 20374";
    expect(parseContent(c).ok).toBe(true);
  });

  it("limits image sources to site paths and https URLs", () => {
    const ok = clone();
    ok.profile.portrait.src = "https://abc.supabase.co/storage/v1/object/public/portfolio/uploads/x.jpg";
    expect(parseContent(ok).ok).toBe(true);

    for (const bad of ["http://insecure.com/a.jpg", "javascript:alert(1)", "//cdn.evil.com/a.jpg", "data:image/png;base64,AAAA", ""]) {
      const c = clone();
      c.profile.portrait.src = bad;
      expect(parseContent(c).ok, bad).toBe(false);
    }
  });

  it("requires the essential text and reports where the problem is", () => {
    const c = clone();
    c.experiences[1].company = "   ";
    const r = parseContent(c);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.some((e) => e.startsWith("experiences.1.company"))).toBe(true);
  });

  it("fills defaults for optional fields so old stored rows keep working", () => {
    const c = clone() as unknown as Record<string, unknown>;
    const experiences = (c.experiences as Record<string, unknown>[]).map((e) => {
      const copy = { ...e };
      delete copy.visual;
      delete copy.domain;
      delete copy.isOngoing;
      return copy;
    });
    const r = parseContent({ ...c, experiences });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.experiences[0].visual).toBe("generic");
      expect(r.data.experiences[0].isOngoing).toBe(false);
    }
  });

  it("rejects unknown skill icons and oversized lists", () => {
    const icon = clone();
    (icon.skills[0] as { icon: string }).icon = "Skull";
    expect(parseContent(icon).ok).toBe(false);

    const many = clone();
    many.experiences = Array.from({ length: 31 }, (_, i) => ({ ...many.experiences[0], id: `e${i}` }));
    expect(parseContent(many).ok).toBe(false);
  });

  it("rejects non-objects", () => {
    for (const bad of [null, undefined, 5, "x", []]) expect(parseContent(bad).ok).toBe(false);
  });
});

describe("newId", () => {
  it("makes short unique ids", () => {
    const ids = new Set(Array.from({ length: 200 }, () => newId()));
    expect(ids.size).toBe(200);
    expect([...ids][0]).toMatch(/^[a-f0-9]{12}$/);
  });
});

describe("image sources on this machine", () => {
  it("allows http only for localhost, never for other hosts", () => {
    const ok = clone();
    ok.profile.portrait.src = "http://127.0.0.1:54321/storage/v1/object/public/portfolio/uploads/a.jpg";
    expect(parseContent(ok).ok).toBe(true);

    for (const bad of ["http://127.0.0.1.evil.com/a.jpg", "http://localhost.evil.com/a.jpg", "http://192.168.1.5/a.jpg"]) {
      const c = clone();
      c.profile.portrait.src = bad;
      expect(parseContent(c).ok, bad).toBe(false);
    }
  });
});
