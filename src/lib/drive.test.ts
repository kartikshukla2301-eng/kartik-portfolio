import { describe, expect, it } from "vitest";
import { parseGoogleDriveUrl } from "./drive";

describe("parseGoogleDriveUrl", () => {
  const id = "1l7RdUSiIk6kHgYRdxfYx5Vao14-DUm9N";

  it("parses a standard share link", () => {
    const r = parseGoogleDriveUrl(`https://drive.google.com/file/d/${id}/view?usp=sharing`);
    expect(r.isValid).toBe(true);
    expect(r.fileId).toBe(id);
    expect(r.viewUrl).toBe(`https://drive.google.com/file/d/${id}/preview`);
    expect(r.downloadUrl).toBe(`https://drive.google.com/uc?export=download&id=${id}`);
  });

  it("parses the open?id= form", () => {
    const r = parseGoogleDriveUrl(`https://drive.google.com/open?id=${id}`);
    expect(r.isValid).toBe(true);
    expect(r.fileId).toBe(id);
  });

  it("treats empty and placeholder values as invalid, so buttons stay hidden", () => {
    for (const value of ["", "   ", "#", "[ADD_MONGODB_CERTIFICATE_LINK]", undefined, null]) {
      const r = parseGoogleDriveUrl(value as string | undefined | null);
      expect(r.isValid).toBe(false);
      expect(r.viewUrl).toBeNull();
    }
  });

  it("accepts other https links as plain external links", () => {
    const r = parseGoogleDriveUrl("https://example.com/cert.pdf");
    expect(r.isValid).toBe(true);
    expect(r.viewUrl).toBe("https://example.com/cert.pdf");
    expect(r.downloadUrl).toBeNull();
  });

  it("rejects non http(s) protocols", () => {
    expect(parseGoogleDriveUrl("javascript:alert(1)").isValid).toBe(false);
    expect(parseGoogleDriveUrl("data:text/html,hi").isValid).toBe(false);
    expect(parseGoogleDriveUrl("not a url").isValid).toBe(false);
  });
});
