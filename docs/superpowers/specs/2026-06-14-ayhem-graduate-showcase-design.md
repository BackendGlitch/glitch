# Ayhem Belhassen — Graduate Showcase

## Summary
Celebrate Ayhem Belhassen's PFE graduation by adding a shareable graduate card page to the Glitch Inc website, a homepage spotlight section, and updates to the Fabrix product section.

## Changes

### 1. Graduate Data (`lib/graduates.ts`)
New data file following the pattern of `lib/pfe-projects.ts`:
- Name, slug, photo, graduation year
- Role: "Built the full Fabrix platform — frontend, backend, and printer agent"
- Links: GitHub, LinkedIn, Ducky Prints (Instagram), fabrix.sbs preview
- Statement about his PFE contribution

### 2. Graduate Card Page (`app/graduates/[slug]/page.tsx`)
Dedicated shareable page styled as a digital graduation card:
- Hero: graduation photo, "Class of 2026" badge, graduation cap icon
- Headline: "Ayhem Belhassen built Fabrix at Glitch Inc"
- Body: statement about building the full Fabrix platform as his PFE
- Link tree block with external links
- Strong Open Graph metadata for social sharing (Instagram, LinkedIn)

### 3. Graduate Spotlight Section (`components/sections/GraduateSpotlight.tsx`)
Homepage section after Products:
- Single celebratory card with photo, name, description
- Pill links to his profiles and fabrix.sbs
- CTA to full graduate card page
- Matches existing section styling (dark bg, accent borders)

### 4. Fabrix Product Card Updates (`components/sections/Products.tsx`)
- Add "Built by Ayhem Belhassen · PFE 2026" credit line on Fabrix card
- Add "Live Preview → fabrix.sbs" button in Fabrix dialog

### 5. Homepage (`app/page.tsx`)
- Import and add GraduateSpotlight section after Products

### 6. Photo Asset
- Download Ayhem's graduation photo to `public/graduates/ayhem.jpg`

## Files

| File | Action |
|------|--------|
| `lib/graduates.ts` | Create |
| `app/graduates/[slug]/page.tsx` | Create |
| `components/sections/GraduateSpotlight.tsx` | Create |
| `components/sections/Products.tsx` | Modify |
| `app/page.tsx` | Modify |
| `public/graduates/ayhem.jpg` | Add |

## Design Notes
- Follows existing design system: Space Grotesk + JetBrains Mono, black/purple (#7C3AED) accent
- Graduate page uses Open Graph metadata matching existing layout.tsx pattern
- Link tree uses the same external link styling as NexaPay dialog
- Graduate Spotlight matches Products section padding and border styling
