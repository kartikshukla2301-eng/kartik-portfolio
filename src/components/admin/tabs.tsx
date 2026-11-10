"use client";

import {
  AreaField,
  ImageField,
  ItemList,
  LinesField,
  Section,
  SelectField,
  TagsField,
  TextField,
  Toggle,
  Wide,
} from "@/components/admin/fields";
import {
  EXPERIENCE_VISUALS,
  SKILL_ICONS,
  newId,
  type Certification,
  type Experience,
  type Profile,
  type Project,
  type SecondaryProject,
  type Skill,
  type TimelineItem,
} from "@/lib/content/schema";

interface ListProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
}

export function ProfileTab({
  profile,
  onChange,
  canUpload,
}: {
  profile: Profile;
  onChange: (p: Profile) => void;
  canUpload: boolean;
}) {
  const set = (patch: Partial<Profile>) => onChange({ ...profile, ...patch });

  return (
    <div className="space-y-6">
      <Section title="Hero photo" description="Shown in the intro, hero, About and dossier. It is shrunk in your browser before upload.">
        <Wide>
          <ImageField
            label="Photo"
            value={profile.portrait.src}
            canUpload={canUpload}
            onChange={(url) => set({ portrait: { ...profile.portrait, src: url, thumb: url } })}
            hint="Square or portrait photos work best."
          />
        </Wide>
        <Wide>
          <TextField
            label="Photo description (for screen readers)"
            value={profile.portrait.alt}
            onChange={(alt) => set({ portrait: { ...profile.portrait, alt } })}
          />
        </Wide>
      </Section>

      <Section title="Contact" description="Email and phone appear in the Contact section and the footer.">
        <TextField label="Email" type="email" inputMode="email" value={profile.email} onChange={(email) => set({ email })} />
        <TextField label="Phone / WhatsApp" inputMode="tel" value={profile.phone} onChange={(phone) => set({ phone })} placeholder="+91-XXXXXXXXXX" />
        <Wide>
          <Toggle
            label="Show my phone number on the website"
            checked={profile.showPhone}
            onChange={(showPhone) => set({ showPhone })}
            hint="Off by default. When on, it appears in Contact as a tap-to-call link."
          />
        </Wide>
        <TextField label="Location" value={profile.location} onChange={(location) => set({ location })} />
      </Section>

      <Section title="Links" description="Paste full links. Leave one empty to hide it.">
        <Wide>
          <TextField
            label="Resume (Google Drive link)"
            inputMode="url"
            value={profile.resumeUrl}
            onChange={(resumeUrl) => set({ resumeUrl })}
            hint='Drive > Share > "Anyone with the link" > Copy link.'
          />
        </Wide>
        <TextField label="GitHub" inputMode="url" value={profile.github} onChange={(github) => set({ github })} />
        <TextField label="LinkedIn" inputMode="url" value={profile.linkedin} onChange={(linkedin) => set({ linkedin })} />
        <TextField label="LeetCode" inputMode="url" value={profile.leetcode} onChange={(leetcode) => set({ leetcode })} />
        <TextField label="GeeksforGeeks" inputMode="url" value={profile.geeksforgeeks} onChange={(geeksforgeeks) => set({ geeksforgeeks })} />
        <TextField label="Instagram" inputMode="url" value={profile.instagram} onChange={(instagram) => set({ instagram })} />
      </Section>

      <Section title="Introduction">
        <TextField label="Name" value={profile.name} onChange={(name) => set({ name })} />
        <TextField label="Main title" value={profile.primaryTitle} onChange={(primaryTitle) => set({ primaryTitle })} />
        <Wide>
          <TextField label="Second title" value={profile.secondaryTitle} onChange={(secondaryTitle) => set({ secondaryTitle })} />
        </Wide>
        <Wide>
          <AreaField label="Hero text (short)" rows={3} value={profile.heroDescription} onChange={(heroDescription) => set({ heroDescription })} />
        </Wide>
        <Wide>
          <AreaField label="About text (long)" rows={6} value={profile.description} onChange={(description) => set({ description })} />
        </Wide>
      </Section>

      <Section title="Education and stats">
        <TextField label="Degree" value={profile.education.degree} onChange={(degree) => set({ education: { ...profile.education, degree } })} />
        <TextField label="College" value={profile.education.college} onChange={(college) => set({ education: { ...profile.education, college } })} />
        <TextField label="University" value={profile.education.university} onChange={(university) => set({ education: { ...profile.education, university } })} />
        <TextField label="Years" value={profile.education.period} onChange={(period) => set({ education: { ...profile.education, period } })} />
        <TextField label="CGPA" value={profile.education.cgpa} onChange={(cgpa) => set({ education: { ...profile.education, cgpa } })} />
        <TextField label="Graduation year" value={profile.education.expectedGraduation} onChange={(expectedGraduation) => set({ education: { ...profile.education, expectedGraduation } })} />
        <TextField label="DSA problems solved" value={profile.dsaSolved} onChange={(dsaSolved) => set({ dsaSolved })} placeholder="200+ Solved" />
        <TextField label="Leadership line" value={profile.leadership} onChange={(leadership) => set({ leadership })} />
      </Section>
    </div>
  );
}

export function ExperienceTab({ items, onChange }: ListProps<Experience>) {
  return (
    <ItemList
      items={items}
      onChange={onChange}
      addLabel="Add internship / job"
      emptyText="No internships yet."
      itemTitle={(e) => [e.company, e.role].filter(Boolean).join(" - ")}
      create={() => ({
        id: newId(),
        company: "New company",
        legalName: "",
        role: "Role",
        period: "Month Year - Month Year",
        mode: "",
        isOngoing: false,
        domain: "",
        displayTitle: "",
        visual: "generic" as const,
        technologies: [],
        highlights: [],
      })}
      render={(e, set) => (
        <>
          <TextField label="Company" value={e.company} onChange={(company) => set({ company })} />
          <TextField label="Role" value={e.role} onChange={(role) => set({ role })} />
          <TextField label="Period" value={e.period} onChange={(period) => set({ period })} placeholder="June 2026 - August 2026" />
          <TextField label="Mode / place" value={e.mode} onChange={(mode) => set({ mode })} placeholder="On-site, Gurgaon" />
          <TextField label="Small label above title" value={e.domain} onChange={(domain) => set({ domain })} hint="e.g. Healthcare information systems" />
          <TextField label="Big card title" value={e.displayTitle} onChange={(displayTitle) => set({ displayTitle })} hint="Leave empty to use the company name" />
          <TextField label="Legal company name (optional)" value={e.legalName} onChange={(legalName) => set({ legalName })} />
          <SelectField
            label="Card illustration"
            value={e.visual}
            options={EXPERIENCE_VISUALS}
            onChange={(visual) => set({ visual })}
            hint='"generic" draws one from the technologies below'
          />
          <Wide>
            <Toggle label="I am still working here" checked={e.isOngoing} onChange={(isOngoing) => set({ isOngoing })} />
          </Wide>
          <Wide>
            <TagsField label="Technologies" value={e.technologies} onChange={(technologies) => set({ technologies })} />
          </Wide>
          <Wide>
            <LinesField label="What you did (highlights)" value={e.highlights} onChange={(highlights) => set({ highlights })} />
          </Wide>
        </>
      )}
    />
  );
}

export function ProjectsTab({
  projects,
  secondary,
  onProjects,
  onSecondary,
}: {
  projects: Project[];
  secondary: SecondaryProject[];
  onProjects: (items: Project[]) => void;
  onSecondary: (items: SecondaryProject[]) => void;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-3 font-display text-2xl uppercase tracking-wide text-[#F6F0E2]">Flagship projects</h2>
        <ItemList
          items={projects}
          onChange={onProjects}
          addLabel="Add flagship project"
          emptyText="No flagship projects."
          itemTitle={(p) => p.title}
          create={() => ({ id: newId(), title: "New project", description: "What it does.", tags: [], repo: "", live: "", status: "" })}
          render={(p, set) => (
            <>
              <Wide>
                <TextField label="Title" value={p.title} onChange={(title) => set({ title })} />
              </Wide>
              <Wide>
                <AreaField label="Description" rows={4} value={p.description} onChange={(description) => set({ description })} />
              </Wide>
              <TextField label="Live link" inputMode="url" value={p.live} onChange={(live) => set({ live })} />
              <TextField label="Source code link" inputMode="url" value={p.repo} onChange={(repo) => set({ repo })} hint="Empty shows 'Private repository'" />
              <TextField label="Status badge (optional)" value={p.status} onChange={(status) => set({ status })} placeholder="In development" />
              <TagsField label="Tech tags" value={p.tags} onChange={(tags) => set({ tags })} />
            </>
          )}
        />
      </div>

      <div>
        <h2 className="mb-3 font-display text-2xl uppercase tracking-wide text-[#F6F0E2]">More experiments</h2>
        <ItemList
          items={secondary}
          onChange={onSecondary}
          addLabel="Add experiment"
          emptyText="No experiments."
          itemTitle={(p) => p.title}
          create={() => ({ id: newId(), title: "New experiment", description: "What it does.", tags: [], repo: "", isPrivate: false })}
          render={(p, set) => (
            <>
              <Wide>
                <TextField label="Title" value={p.title} onChange={(title) => set({ title })} />
              </Wide>
              <Wide>
                <AreaField label="Description" rows={3} value={p.description} onChange={(description) => set({ description })} />
              </Wide>
              <TextField label="Source code link" inputMode="url" value={p.repo} onChange={(repo) => set({ repo })} />
              <TagsField label="Tech tags" value={p.tags} onChange={(tags) => set({ tags })} />
              <Wide>
                <Toggle label="Private repository" checked={p.isPrivate} onChange={(isPrivate) => set({ isPrivate })} />
              </Wide>
            </>
          )}
        />
      </div>
    </div>
  );
}

export function CertificationsTab({ items, onChange, canUpload }: ListProps<Certification> & { canUpload: boolean }) {
  return (
    <ItemList
      items={items}
      onChange={onChange}
      addLabel="Add certificate"
      emptyText="No certificates yet."
      itemTitle={(c) => c.title}
      create={() => ({
        id: newId(),
        title: "New certificate",
        issuer: "Issuer",
        year: String(new Date().getFullYear()),
        category: "",
        location: "",
        driveUrl: "",
        credentialUrl: "",
        image: "",
      })}
      render={(c, set) => (
        <>
          <Wide>
            <TextField label="Certificate title" value={c.title} onChange={(title) => set({ title })} />
          </Wide>
          <TextField label="Issued by" value={c.issuer} onChange={(issuer) => set({ issuer })} />
          <TextField label="Year" value={c.year} onChange={(year) => set({ year })} />
          <TextField label="Small label above title" value={c.category} onChange={(category) => set({ category })} hint="e.g. Cloud and foundation models" />
          <TextField label="Place (optional)" value={c.location} onChange={(location) => set({ location })} />
          <Wide>
            <TextField
              label="Google Drive link of the certificate"
              inputMode="url"
              value={c.driveUrl}
              onChange={(driveUrl) => set({ driveUrl })}
              hint='Empty hides the "View document" button.'
            />
          </Wide>
          <Wide>
            <TextField
              label="Verification link (Credly etc., optional)"
              inputMode="url"
              value={c.credentialUrl}
              onChange={(credentialUrl) => set({ credentialUrl })}
            />
          </Wide>
          <Wide>
            <ImageField
              label="Card picture (optional)"
              value={c.image}
              canUpload={canUpload}
              onChange={(image) => set({ image })}
              hint="A screenshot of the certificate. Without one, the card shows the label only."
            />
          </Wide>
        </>
      )}
    />
  );
}

export function SkillsTab({ items, onChange }: ListProps<Skill>) {
  return (
    <ItemList
      items={items}
      onChange={onChange}
      addLabel="Add skill group"
      emptyText="No skill groups."
      itemTitle={(s) => s.category}
      create={() => ({ id: newId(), category: "New group", icon: "Terminal" as const, items: [] })}
      render={(s, set) => (
        <>
          <TextField label="Group name" value={s.category} onChange={(category) => set({ category })} />
          <SelectField label="Icon" value={s.icon} options={SKILL_ICONS} onChange={(icon) => set({ icon })} />
          <Wide>
            <TagsField label="Skills" value={s.items} onChange={(next) => set({ items: next })} />
          </Wide>
        </>
      )}
    />
  );
}

export function TimelineTab({ items, onChange }: ListProps<TimelineItem>) {
  return (
    <ItemList
      items={items}
      onChange={onChange}
      addLabel="Add milestone"
      emptyText="No milestones."
      itemTitle={(t) => `${t.year} - ${t.title}`}
      create={() => ({ id: newId(), year: String(new Date().getFullYear()), title: "New milestone", description: "What happened." })}
      render={(t, set) => (
        <>
          <TextField label="Year" value={t.year} onChange={(year) => set({ year })} />
          <TextField label="Title" value={t.title} onChange={(title) => set({ title })} />
          <Wide>
            <AreaField label="Description" rows={3} value={t.description} onChange={(description) => set({ description })} />
          </Wide>
        </>
      )}
    />
  );
}
