import type { SiteContent } from "./schema";

/**
 * What visitors are allowed to receive. Everything in here is serialized into the page that
 * is sent to the browser, so a value that is "hidden" in the UI would still be readable in the page source.
 * The phone number therefore leaves the server only when the owner switched "show phone" on.
 */
export function toPublicContent(content: SiteContent): SiteContent {
  if (content.profile.showPhone) return content;
  return { ...content, profile: { ...content.profile, phone: "" } };
}
