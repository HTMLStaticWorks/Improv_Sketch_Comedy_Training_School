# "The Setup" Improv & Sketch Comedy Training School — System Architecture

## 1. Project Overview
"The Setup" is a premier multi-page theatrical website and LMS educational platform designed for an improv and sketch comedy conservatory. It incorporates:
- **Design Concept**: "Comedy Marquee" — theatrical crimson velvet, warm spotlight gold, and ink black stage tones.
- **Architecture**: LMS core (Student Dashboard, class enrollment, progression milestones, billing, schedule) layered with showcase booking and troupe highlights.
- **Motion & 3D**: Mouse-tracking 3D tilt cards with dynamic cursor-following spotlight glow, and 3D stage canvas with sweeping spotlight beams and ambient dust motes.
- **Accessibility & Internationalization**: WCAG 2.1 AA compliance, Dark/Light mode engine, and mirrored RTL layout support for Arabic and Hebrew.

---

## 2. Palette & Design Tokens

| Variable | Token Name | Hex / Value | Role |
|---|---|---|---|
| `--curtain-crimson` | Primary | `#C41E3A` | Velvet curtain red, primary call-to-actions, brand accents |
| `--spotlight-gold` | Secondary | `#F5B700` | Warm marquee gold, illuminated borders, badges, highlights |
| `--stage-violet` | Accent | `#2D1B4E` | Deep stage lighting purple, backstage ambiance |
| `--ink-black` | Dark Base | `#121212` | Near-black stage backdrop, high contrast theater floor |
| `--marquee-cream` | Light Base | `#FFF8ED` | Warm off-white foundation, crisp playbill typography |

### Typography
- **Headings & Display**: `Bungee` (Google Fonts) — theatrical poster marquee boldness.
- **Body & Controls**: `Poppins` (Google Fonts, weights: 300, 400, 500, 600, 700) — optimal readability.
- **Quotes & Accents**: `Caveat` (Google Fonts, weights: 600, 700) — handwritten comedy marker feel.

---

## 3. Mandatory Card Architecture (Section 6)
- **Strict Center Alignment**: In all viewport sizes (Mobile, Tablet, 1024px, Desktop, Large), card icons, headlines, subtitles, descriptions, and action buttons are center-aligned.
- **3D Mouse-Tracking Tilt**: Built via `perspective(1000px)`, `rotateX()`, and `rotateY()` with dynamic CSS custom properties (`--mouse-x`, `--mouse-y`) rendering an expanding radial spotlight on hover.
- **Entrance Animation**: `IntersectionObserver` curtain-reveal and staged translation on scroll.

---

## 4. Strictly Segregated Breakpoint Architecture (Section 7)

```
Mobile:          < 640px         Stacked layout, 44px+ tap targets, drawer menu, table -> cards
Tablet:          640px – 1023px  2-column grid, adjusted spacing, drawer menu
1024px Boundary: 1024px – 1024px Explicit non-inherited boundary check; zero layout leak
Desktop:         1024px – 1280px Standard grid layouts, visible navbar
Large:           > 1280px        Expanded container width (1240px)
```

---

## 5. Page Directory Index
1. `index.html` / `pages/index.html` — Home 1 (Find Your Funny, Alumni Carousel, Curriculum, Upcoming Shows, Testimonials, Community CTA)
2. `pages/home-2.html` — Home 2 (Comedy Is a Skill, Interactive Path Selector, Teaching Philosophy, Studio Life, Corporate Offsites, 3-Step Journey)
3. `pages/classes.html` — Classes & Conservatory (4 Levels Grid, Comparison Table, FAQ, Enroll CTA)
4. `pages/shows.html` — Stage & Showcases (Upcoming Bills, Past Highlights, Performer Registration Explainer)
5. `pages/instructors.html` — Faculty Directory (Directors, 3D tilt headshots, Deep Spotlight, Join Faculty CTA)
6. `pages/about.html` — History & Heritage (Story, Mission, Core Values, Interactive Milestones)
7. `pages/contact.html` — Box Office & Studio (Netlify/Formspree form, Validation, Google Maps placeholder, Hours, FAQ)
8. `pages/login.html` — Student Portal Auth (3D Stage background, Centered card, Demo 1-click login)
9. `pages/dashboard.html` — Student LMS Portal (Skeleton loaders, Course progress tracker, Catalog enrollment, Showcase RSVP, Schedule, Billing)
10. `pages/404.html` — Scene Not Found (Playful director blackout theme)
11. `pages/coming-soon.html` — Underground Stage Teaser (Live countdown, VIP ticket waitlist)
