# Kartik Shukla - Portfolio

Full Stack Developer and AI Engineer. Live site: https://kartik-portfolio-chi-eight.vercel.app/

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger, SplitText), Lenis and Framer Motion.

The design follows the visual language of [theinfinitysocks.com](https://theinfinitysocks.com/): heavy condensed type, a count-up intro, text that rises into place, a staircase colour-fill heading, and a pinned sideways card sequence. All code, copy and assets here are original; no code, text, images or fonts were taken from that site.

## What is on the page

| Section | What it does |
| :-- | :-- |
| Intro loader | Counter 00 to 100 seen through a photo mask, then the digits scale up into the page. Plays once per session. Skippable. |
| Hero | Edge-to-edge title with the portrait in front of it, role line that rises letter by letter, stats that count up. |
| Tech strip | Infinite marquee built from the skills data. |
| About | Staircase colour-fill heading, portrait, four pillar cards. |
| Experience | Four internships as a pinned sideways card sequence (01/04 to 04/04) on screens 1024px and wider. Stacked cards on phones and tablets. |
| Skills, Projects, Credentials | One shared card presentation (`ShowCard`): scroll-in, pointer light, corner brackets. |
| Timeline | Line that draws itself as you scroll. |
| Open source | Live GitHub numbers, a real contribution heatmap and top repositories. Shows an "unavailable" state instead of invented numbers if GitHub cannot be reached. |
| Stitched | Type a name and the initials are "stitched" onto a patch. |
| Contact | The one light section. The form opens your email app with the message filled in. |

A fixed scroll counter (bottom right) shows progress and the current chapter. The footer has a "Pause motion" switch, and `prefers-reduced-motion` is respected everywhere.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000   (add ?noloader to skip the intro)
npm run build
npm start
npm test         # unit tests for the pure helpers
npm run lint
```

Optional `.env.local`:

```env
# Raises the GitHub API rate limit used by /api/github
GITHUB_TOKEN=your_github_personal_access_token
```

## Admin panel (edit the site without touching code)

Open `/admin` (for example https://your-site.vercel.app/admin) and sign in with the admin password.
From there you can change, and the live site updates within seconds:

- **Profile and contact:** hero photo (upload), email, phone (with a switch to show or hide it), location, resume Drive link, social links, intro texts, education.
- **Internships:** add, edit, reorder, delete. Old ones stay; new ones appear on top.
- **Projects** and **More experiments**
- **Certificates:** title, issuer, year, Google Drive link, optional verification link and card picture.
- **Skills** and **Timeline**

The **Backup** button downloads everything as a JSON file.
A Drive link left empty simply hides its button. The phone number is not even sent to visitors' browsers unless "Show my phone number" is on.

### One-time setup

1. **Supabase:** create a free project at supabase.com. In **SQL Editor** run the SQL shown in the admin panel's setup box (also in `src/lib/content/store.ts`). It creates the `site_content` table and a public `portfolio` storage bucket.
2. **Keys:** in Supabase **Project Settings > API** copy the project URL and the `service_role` (secret) key.
3. **Environment variables** (Vercel > Project > Settings > Environment Variables, and `.env.local` for local work). See `.env.example`:

   | Name | What |
   | :-- | :-- |
   | `SUPABASE_URL` | the project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | the secret key. Server only, never shared with the browser |
   | `ADMIN_PASSWORD` | your admin password, at least 10 characters (use a long passphrase) |
   | `ADMIN_SESSION_SECRET` | 32+ random characters: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

4. Redeploy, open `/admin`, sign in, make a change and press **Save changes**. The first save copies the built-in content into the database.

Until the variables exist the site keeps working from the built-in content (`src/lib/content/defaults.ts`).

### Safety notes

- Login sets an HTTP-only, SameSite=Strict cookie that expires after 12 hours. Every change request must come from the same site (CSRF check) and carry that cookie.
- Wrong passwords are limited to 5 per 15 minutes per address. The limiter lives in server memory, so treat the long password as the real protection.
- Everything you save is validated on the server: only `http(s)` links, images must be site paths or `https`, size and length limits.
- Uploaded files are checked by their real bytes (JPG, PNG, WebP only, max 4 MB), and photos are shrunk in your browser first.
- The service key stays on the server. `/admin` is `noindex` and disallowed in `robots.txt`.
## Ads

`AdSenseBanner` stays at zero height and is hidden from assistive tech until AdSense marks the slot `filled`.
With an ad blocker, no approved account or no fill, nothing appears.

## Structure

```
src/
  app/                  root layout (fonts, intro boot script), (site)/ the public page + SEO, admin/ the editor,
                        api/admin/ (login, logout, content, upload), api/github, sitemap, robots, manifest
  components/
    motion/             CountUp, SplitReveal, StairHeading
    providers/          MotionProvider (the single Lenis + GSAP scroll engine)
    sections/           Hero, TechMarquee, About, Experience, Skills, Projects, Certifications,
                        Timeline, GitHub, RecruiterDashboard, StitchDemo, Contact
    ui/                 PageLoader, Intro, ChapterHud, ShowCard, InfinityButton, SectionHeading, AdSenseBanner, ...
    layout/             Navbar, Footer
  lib/                  content/ (schema, built-in defaults, Supabase store), admin/ (session token, rate limit, image check),
                        gsap (plugin setup), motion / drive / adsense / mail (pure helpers + tests),
                        intro (loader gate), github (REST + contributions)
```

Fonts (Bebas Neue, Geist, Geist Mono, Caveat) are self-hosted through `next/font`.

## Author

**Kartik Shukla** - B.Tech CSE, AKTU (2023-2027)
[GitHub](https://github.com/kartikshukla2301-eng) /
[LinkedIn](https://www.linkedin.com/in/kartik-shukla-cse) /
[LeetCode](https://leetcode.com/u/cdlPAR9B41/) /
[GeeksforGeeks](https://www.geeksforgeeks.org/profile/kartikshum7i0) /
[Email](mailto:kartikshukla2301@gmail.com)
