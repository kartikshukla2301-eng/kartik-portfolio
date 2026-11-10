import { z } from "zod";

/**
 * Everything the admin panel can edit lives in one validated document (SiteContent).
 * The same schema validates what the admin sends AND what is read back from the database,
 * so a bad row can never break the public site (it falls back to the defaults).
 */

const optionalText = (max: number) => z.string().trim().max(max, `Max ${max} characters`).default("");
const requiredText = (max: number) =>
  z.string().trim().min(1, "Required").max(max, `Max ${max} characters`);

/** http(s) link, or empty. Blocks javascript:, data: and anything else. */
export const httpUrl = z
  .string()
  .trim()
  .max(2000, "Link is too long")
  .refine((v) => v === "" || /^https?:\/\/[^\s]+$/i.test(v), "Must start with http:// or https://")
  .default("");

// Site path, https link, or http on this machine only (a local Supabase serves uploads over http).
const IMAGE_RULE = (v: string) =>
  /^\/(?!\/)[^\s]*$/.test(v) ||
  /^https:\/\/[^\s]+$/i.test(v) ||
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/[^\s]*$/i.test(v);
const IMAGE_MESSAGE = "Use a site path like /images/me.jpg or an https:// image link";

/** Site path ("/images/me.jpg") or https URL. Required. */
export const imageSrc = z.string().trim().max(2000).refine(IMAGE_RULE, IMAGE_MESSAGE);

/** Same as imageSrc but may be empty. */
export const optionalImageSrc = z
  .string()
  .trim()
  .max(2000)
  .refine((v) => v === "" || IMAGE_RULE(v), IMAGE_MESSAGE)
  .default("");

const id = z.string().trim().min(1).max(60);
const tagList = (max: number, each: number) => z.array(requiredText(each)).max(max, `At most ${max} items`).default([]);

export const SKILL_ICONS = [
  "Monitor",
  "Server",
  "Sparkles",
  "Terminal",
  "Layers",
  "Shield",
  "Cloud",
  "Database",
  "Cpu",
] as const;

export const EXPERIENCE_VISUALS = ["generic", "pristyn", "oncare", "infosys", "arena"] as const;

const profileSchema = z.object({
  name: requiredText(80),
  primaryTitle: requiredText(80),
  secondaryTitle: requiredText(120),
  description: requiredText(1200),
  heroDescription: requiredText(600),
  location: optionalText(80),
  email: z.email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .max(24, "Max 24 characters")
    .regex(/^[+0-9()\-\s]*$/, "Digits, spaces and + ( ) - only")
    .default(""),
  /** The phone number is only printed on the site when this is on. */
  showPhone: z.boolean().default(false),
  github: httpUrl,
  linkedin: httpUrl,
  leetcode: httpUrl,
  geeksforgeeks: httpUrl,
  instagram: httpUrl,
  /** Google Drive share link for the resume. */
  resumeUrl: httpUrl,
  portrait: z.object({
    src: imageSrc,
    thumb: imageSrc,
    alt: requiredText(160),
  }),
  education: z.object({
    degree: requiredText(120),
    college: requiredText(160),
    university: requiredText(160),
    period: requiredText(40),
    cgpa: requiredText(60),
    expectedGraduation: requiredText(20),
  }),
  dsaSolved: optionalText(40),
  leadership: optionalText(160),
});

const experienceSchema = z.object({
  id,
  company: requiredText(80),
  legalName: optionalText(120),
  role: requiredText(120),
  period: requiredText(60),
  mode: optionalText(120),
  isOngoing: z.boolean().default(false),
  /** Small label above the title, e.g. "Healthcare information systems". */
  domain: optionalText(60),
  /** Big card title. Falls back to the company name when empty. */
  displayTitle: optionalText(60),
  visual: z.enum(EXPERIENCE_VISUALS).default("generic"),
  technologies: tagList(20, 40),
  highlights: z.array(requiredText(400)).max(12, "At most 12 items").default([]),
});

const projectSchema = z.object({
  id,
  title: requiredText(100),
  description: requiredText(800),
  tags: tagList(12, 30),
  repo: httpUrl,
  live: httpUrl,
  status: optionalText(60),
});

const secondaryProjectSchema = z.object({
  id,
  title: requiredText(100),
  description: requiredText(400),
  tags: tagList(12, 30),
  repo: httpUrl,
  isPrivate: z.boolean().default(false),
});

const certificationSchema = z.object({
  id,
  title: requiredText(140),
  issuer: requiredText(140),
  year: requiredText(12),
  category: optionalText(60),
  location: optionalText(140),
  /** Google Drive share link. Empty hides the "View document" button. */
  driveUrl: httpUrl,
  /** Public verification link (Credly etc.). Empty hides the "Verify badge" button. */
  credentialUrl: httpUrl,
  /** Optional thumbnail shown on the card. */
  image: optionalImageSrc,
});

const skillSchema = z.object({
  id,
  category: requiredText(60),
  icon: z.enum(SKILL_ICONS).default("Terminal"),
  items: z.array(requiredText(40)).max(30, "At most 30 items").default([]),
});

const timelineSchema = z.object({
  id,
  year: requiredText(12),
  title: requiredText(120),
  description: requiredText(500),
});

export const siteContentSchema = z.object({
  profile: profileSchema,
  experiences: z.array(experienceSchema).max(30),
  projects: z.array(projectSchema).max(30),
  secondaryProjects: z.array(secondaryProjectSchema).max(40),
  certifications: z.array(certificationSchema).max(60),
  skills: z.array(skillSchema).max(20),
  timeline: z.array(timelineSchema).max(20),
});

export type SiteContent = z.output<typeof siteContentSchema>;
export type Profile = SiteContent["profile"];
export type Experience = SiteContent["experiences"][number];
export type Project = SiteContent["projects"][number];
export type SecondaryProject = SiteContent["secondaryProjects"][number];
export type Certification = SiteContent["certifications"][number];
export type Skill = SiteContent["skills"][number];
export type TimelineItem = SiteContent["timeline"][number];

export type ParseResult = { ok: true; data: SiteContent } | { ok: false; errors: string[] };

/** Validate unknown input (admin request body or a database row). */
export function parseContent(input: unknown): ParseResult {
  const result = siteContentSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };
  const errors = result.error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(".") : "content";
    return `${path}: ${issue.message}`;
  });
  return { ok: false, errors };
}

/** Short random id for new list items. */
export function newId(): string {
  return globalThis.crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}
