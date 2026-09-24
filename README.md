# "The Setup" — Improv & Sketch Comedy Training School

A state-of-the-art multi-page website and Student LMS portal for **The Setup Improv & Sketch Comedy Training School**, built with a theatrical "Comedy Marquee" aesthetic, 3D spotlight tilt card mechanics, animated stage lighting, and WCAG 2.1 AA accessibility.

---

## 🎭 Theatrical Design System

- **Curtain Crimson**: `#C41E3A`
- **Spotlight Gold**: `#F5B700`
- **Stage Violet**: `#2D1B4E`
- **Ink Black**: `#121212`
- **Marquee Cream**: `#FFF8ED`
- **Typography**: Google Fonts — **Bungee** (Marquee Display), **Poppins** (Body text), **Caveat** (Comedic handwritten quotes).

---

## 🌟 Key Features

1. **11 Complete Themed Pages**:
   - **Home 1 (`index.html` & `pages/index.html`)**: Stage spotlight hero, alumni success stories, why train with us, class preview, upcoming shows, and student quote carousel.
   - **Home 2 (`pages/home-2.html`)**: Interactive "Pick Your Comedy Path" split-screen, teaching philosophy narrative, studio life behind-the-scenes gallery, corporate offsite workshops, and a 3-step enrollment journey.
   - **Classes (`pages/classes.html`)**: 4-level conservatory curriculum (Foundations, Scene Work, Harold, Troupe Prep) as 3D tilt cards, schedule comparison table (with responsive mobile stacking), and FAQ.
   - **Shows (`pages/shows.html`)**: Live performances calendar, Friday Improv Cagematch, Midnight Sketch Revue, past show highlights, and performer showcase registration explainer.
   - **Instructors (`pages/instructors.html`)**: Faculty roster of Second City and late-night TV veterans with 3D tilt headshots, artistic director spotlight, and join our faculty CTA.
   - **About Us (`pages/about.html`)**: Founding story, theatrical core values, interactive historical milestones, and community troupe CTA.
   - **Contact (`pages/contact.html`)**: Netlify/Formspree-ready contact form with full client-side validation and inline friendly error messages, box office hours, and Google Maps embed placeholder.
   - **Login (`pages/login.html`)**: Centered auth card floating over 3D stage canvas with 1-click demo student sign-in.
   - **Student Dashboard (`pages/dashboard.html`)**: Post-login LMS portal featuring skeleton shimmer loaders, visual course progression tracker, class enrollment, showcase call-time RSVP, class calendar, and billing/invoice history.
   - **404 Page (`pages/404.html`)**: Themed "Scene Not Found" error page.
   - **Coming Soon (`pages/coming-soon.html`)**: "Underground Stage & Sketch Lab" teaser with live countdown timer and VIP ticket capture.

2. **3D Motion & Interactions**:
   - **3D Tilt Cards**: Dynamic mouse-tracking perspective elevation and spotlight glow following the cursor.
   - **Card Alignment Rule**: Strictly center-aligned icons and text across all viewports.
   - **3D Animated Stage Canvas**: Sweeping spotlight beams and ambient golden stage dust motes.
   - **Card Entrance Reveal**: Smooth staggered curtain-reveal entrance on scroll via `IntersectionObserver`.

3. **Responsive Breakpoints**:
   - Strictly segregated, non-inherited media query blocks: Mobile (`<640px`), Tablet (`640px–1023px`), 1024px Boundary (`1024px–1024px`), Desktop (`1024px–1280px`), and Large (`>1280px`).

4. **Universal Accessibility & Global Support**:
   - Dark/Light mode toggle with persistence and system-preference detection.
   - Mirrored RTL layout stylesheet for Arabic/Hebrew (`assets/css/rtl.css`).
   - WCAG 2.1 AA compliant color contrast, focus rings, and skip link.

---

## 🚀 Running Locally

To preview the website locally using Python's built-in HTTP server:

```bash
# From the project root directory:
python -m http.server 8000
```

Then visit [http://localhost:8000/](http://localhost:8000/) or [http://localhost:8000/pages/index.html](http://localhost:8000/pages/index.html) in your browser.
