# Software Development Document: Appropriated Kitchen

> **Slogan:** "Your Food, My Way"
> **Status:** Planning Phase
> **Last Updated:** June 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Core Goals & Success Criteria](#2-core-goals--success-criteria)
3. [Tech Stack & Architecture](#3-tech-stack--architecture)
4. [Project Structure](#4-project-structure)
5. [Route Design & Page Layout](#5-route-design--page-layout)
6. [Data Model & Content Architecture](#6-data-model--content-architecture)
7. [Component Tree](#7-component-tree)
8. [Nutrition API Integration](#8-nutrition-api-integration)
9. [Development Roadmap](#9-development-roadmap)
10. [MVP Definition (Phase 1)](#10-mvp-definition-phase-1)
11. [Future Features](#11-future-features)
12. [Design System](#12-design-system)
13. [Deployment Strategy](#13-deployment-strategy)
14. [Risks & Mitigations](#14-risks--mitigations)

---

## 1. Project Overview

**Appropriated Kitchen** is a modern cooking blog where recipes are presented with personality, professional photography, detailed nutritional information, and printable recipe cards. The site bridges the gap between a traditional food blog and a lifestyle brand, with future expansion into newsletters, merchandise, and physical products.

### Brand Identity
- **Name:** Appropriated Kitchen
- **Slogan:** "Your Food, My Way"
- **Vibe:** Modern, professional, warm, approachable
- **Design Inspirations:** pinchofyum.com, seriouseats.com, food52.com

---

## 2. Core Goals & Success Criteria

### MVP Goals (Phase 1)
| Goal | Success Criteria |
|------|-----------------|
| Beautiful landing page | Hero section, featured recipes, about snippet, newsletter teaser |
| Recipe section | Browseable index + individual recipe pages with printable cards |
| Blog section | Blog index + individual posts with markdown rendering |
| Nutritional info | Auto-calculated from ingredients via API |
| Cloudflare deployment | Live on `appropriatedkitchen.com` (or similar domain) |
| Printable recipe cards | Print-friendly CSS layout accessible via button on recipe pages |

### Long-Term Goals
- Newsletter subscription & management
- Merchandise/apparel store
- Physical product store
- Social media integration (YouTube, Instagram, TikTok)
- Recipe ratings & comments
- Search & filtering

---

## 3. Tech Stack & Architecture

### Core Stack
| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| **Framework** | Next.js | 15+ (App Router) — Supports Cloudflare via Open Next |
| **Language** | TypeScript | Strict mode |
| **Styling** | Tailwind CSS v4 | CSS-based config via `@theme`, `@plugin "@tailwindcss/typography"` |
| **UI Components** | shadcn/ui | Radix Luma style (data-slot, no forwardRef) |
| **Content** | MDX / Markdown | Frontmatter via gray-matter |
| **Icons** | Lucide React | Bundled with shadcn |
| **Fonts** | Next.js Font Optimization | Google Fonts via `next/font` |
| **Deployment** | Cloudflare Pages | Via @opennextjs/cloudflare adapter |
| **Domain** | Cloudflare | DNS managed in Cloudflare dashboard |

### Key Packages
```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "react-markdown": "latest",
    "remark-gfm": "latest",
    "rehype-highlight": "latest",
    "gray-matter": "latest",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@opennextjs/cloudflare": "latest",
    "wrangler": "latest",
    "@tailwindcss/typography": "latest",
    "tw-animate-css": "latest",
    "typescript": "latest",
    "@types/node": "latest",
    "@types/react": "latest"
  }
}
```

### Architecture Diagram (High-Level)
```
┌─────────────────────────────────────────────────┐
│                   Cloudflare DNS                │
│                appropriatedkitchen.com          │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│              Cloudflare Pages                    │
│         (@opennextjs/cloudflare adapter)         │
│     Static generation at build time             │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│              Next.js App Router                  │
│   ┌─────────┐  ┌────────┐  ┌──────────┐       │
│   │ Landing │  │ Recipes│  │   Blog   │       │
│   └─────────┘  └────────┘  └──────────┘       │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│              Content Layer                       │
│   content/recipes/*.mdx   content/posts/*.md    │
│   (processed at build time via generateStaticParams)│
└─────────────────────────────────────────────────┘
```

---

## 4. Project Structure

```
appropriatedkitchen/
├── content/
│   ├── recipes/              # MDX recipe files with frontmatter
│   │   ├── sample-recipe.mdx
│   │   └── ...
│   └── posts/                # MD blog post files with frontmatter
│       ├── hello-world.md
│       └── ...
├── public/
│   ├── images/               # Static images, recipe photos
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, theme script, metadata)
│   │   ├── page.tsx          # Landing page (hero, featured, about, CTA)
│   │   ├── globals.css       # Tailwind v4 config + custom CSS vars
│   │   ├── not-found.tsx     # Custom 404 page
│   │   ├── sitemap.ts        # Auto-generated sitemap
│   │   ├── feed.xml/
│   │   │   └── route.ts      # RSS feed
│   │   ├── recipes/
│   │   │   ├── page.tsx      # Recipe index (grid/cards)
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Single recipe page
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Single blog post
│   │   └── about/
│   │       └── page.tsx      # About page
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Header.tsx    # Navigation, logo, theme toggle
│   │   │   ├── Footer.tsx    # Social links, copyright, newsletter teaser
│   │   │   └── MobileNav.tsx # Responsive mobile menu
│   │   ├── recipes/
│   │   │   ├── RecipeCard.tsx        # Card for recipe index
│   │   │   ├── RecipeHeader.tsx      # Title, image, meta on recipe page
│   │   │   ├── IngredientList.tsx    # Formatted ingredient list
│   │   │   ├── InstructionSteps.tsx  # Numbered instructions
│   │   │   ├── NutritionPanel.tsx    # Display nutritional info
│   │   │   ├── PrintableRecipe.tsx   # Print-optimized layout
│   │   │   └── PrintButton.tsx       # Triggers print dialog
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx          # Card for blog index
│   │   │   └── BlogContent.tsx       # Markdown renderer wrapper
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx       # Main hero with CTA
│   │   │   ├── FeaturedRecipes.tsx   # Spotlight recipes
│   │   │   ├── AboutPreview.tsx      # Brief about section
│   │   │   └── NewsletterTeaser.tsx  # Email signup placeholder
│   │   └── shared/
│   │       ├── ThemeToggle.tsx       # Dark mode toggle
│   │       ├── SocialLinks.tsx       # Social media icon links
│   │       └── SearchBar.tsx         # Future search component
│   ├── lib/
│   │   ├── recipes.ts        # Recipe content fetching + parsing
│   │   ├── posts.ts          # Blog post content fetching + parsing
│   │   ├── nutrition.ts      # Nutrition API client (Edamam/Nutritionix)
│   │   ├── utils.ts          # cn() helper, reading time, formatting
│   │   └── constants.ts      # Site-wide constants (name, URL, social links)
│   └── types/
│       ├── recipe.ts         # Recipe TypeScript types
│       └── post.ts           # Blog post TypeScript types
├── docs/
│   └── SDD.md                # This document
├── open-next.config.ts       # Open Next Cloudflare configuration
├── wrangler.toml             # Cloudflare Pages config
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json
├── AGENT.md                  # Agent instructions
└── README.md
```

---

## 5. Route Design & Page Layout

### Routes
| Path | Page | Purpose | Data Source |
|------|------|---------|-------------|
| `/` | Landing | Hero, featured recipes, about blurb, newsletter teaser | Static + latest recipes |
| `/recipes` | Recipe Index | Grid of all recipe cards | `content/recipes/*.mdx` |
| `/recipes/[slug]` | Recipe Detail | Full recipe with nutrition, printable | Single MDX file |
| `/blog` | Blog Index | All blog posts | `content/posts/*.md` |
| `/blog/[slug]` | Blog Post | Full blog post | Single MD file |
| `/about` | About | Chef/brand bio, story | Static |

### Navigation Structure
```
[Logo: Appropriated Kitchen]   [Recipes]  [Blog]  [About]  [☀/🌙]
```

### Page Layouts

**Landing Page (`/`)**
```
┌─────────────────────────────────────┐
│          HERO SECTION               │
│  Large hero image + tagline + CTA   │
│  "Your Food, My Way"                │
│  [Browse Recipes] button            │
├─────────────────────────────────────┤
│       FEATURED RECIPES (3-4)        │
│  Card grid with image, title, time  │
├─────────────────────────────────────┤
│        ABOUT PREVIEW                │
│  Short bio + link to full about     │
├─────────────────────────────────────┤
│      NEWSLETTER TEASER              │
│  Email input + "Subscribe" button   │
├─────────────────────────────────────┤
│              FOOTER                 │
│  Social icons, copyright, nav links │
└─────────────────────────────────────┘
```

**Recipe Detail Page (`/recipes/[slug]`)**
```
┌─────────────────────────────────────┐
│  Recipe Image (full-width hero)     │
├─────────────────────────────────────┤
│  Title | Prep Time | Cook Time      │
│  Servings | Difficulty              │
│  [Print Recipe] [Save]              │
├─────────────────────────────────────┤
│  INGREDIENTS          NUTRITION     │
│  • 2 cups flour       Calories: 350 │
│  • 1 tbsp sugar       Protein: 8g  │
│  • ...                Carbs: 45g   │
│                       Fat: 15g     │
├─────────────────────────────────────┤
│  INSTRUCTIONS                       │
│  1. Preheat oven...                 │
│  2. Mix dry ingredients...          │
│  3. ...                             │
├─────────────────────────────────────┤
│  NOTES / TIPS (MDX content)         │
├─────────────────────────────────────┤
│  [Print Button - triggers printable]│
└─────────────────────────────────────┘
```

**Blog Post Page (`/blog/[slug]`)**
```
┌─────────────────────────────────────┐
│  Title                              │
│  Date | Reading Time                │
├─────────────────────────────────────┤
│  Content (react-markdown rendered)  │
│                                     │
│  With embedded images, links, etc.  │
├─────────────────────────────────────┤
│  Share buttons                      │
│  Related posts / back to blog       │
└─────────────────────────────────────┘
```

**Printable Recipe Card**
```
┌─────────────────────────────────────┐
│  [LOGO]  Appropriated Kitchen       │
│  "Your Food, My Way"                │
├─────────────────────────────────────┤
│  RECIPE NAME                        │
│  Prep: X min | Cook: X min | Serves X│
├─────────────────────────────────────┤
│  INGREDIENTS                        │
│  • ingredient 1                     │
│  • ingredient 2                     │
│  ...                                │
├─────────────────────────────────────┤
│  INSTRUCTIONS                       │
│  1. Step one...                     │
│  2. Step two...                     │
│  ...                                │
├─────────────────────────────────────┤
│  NUTRITION per serving              │
│  Calories: XXX | Protein: Xg | ...  │
├─────────────────────────────────────┤
│  appropriatedkitchen.com            │
└─────────────────────────────────────┘
```

---

## 6. Data Model & Content Architecture

### Recipe MDX Frontmatter Schema (`content/recipes/*.mdx`)

```yaml
---
title: "Classic Margherita Pizza"
slug: "classic-margherita-pizza"
date: "2026-06-13"
featured: true
image: "/images/recipes/margherita.jpg"
excerpt: "A simple, authentic Margherita pizza with fresh mozzarella, basil, and san marzano tomatoes."
prepTime: "20 min"
cookTime: "12 min"
totalTime: "32 min"
servings: 4
difficulty: "easy"           # easy | medium | hard
tags:
  - italian
  - pizza
  - vegetarian
ingredients:
  - amount: "2 ¼ tsp"
    name: "active dry yeast"
  - amount: "1 cup"
    name: "warm water"
  - amount: "3 cups"
    name: "all-purpose flour"
  - amount: "2 tbsp"
    name: "olive oil"
  # ... more ingredients
nutrition:
  calories: 285
  protein: "12g"
  carbs: "36g"
  fat: "10g"
  fiber: "2g"
  sodium: "520mg"
---
```

Recipe body (MDX) contains:
- Notes/tips section
- Step-by-step instructions (can embed images, tips, video embeds)
- Serving suggestions

**Important:** Nutrition data is stored manually in frontmatter but *populated* via an automated API script. The workflow is:
1. Write recipe content with ingredient list
2. Run a nutrition API script that queries Edamam/Nutritionix with ingredient list
3. Script outputs the nutrition block to paste into frontmatter
4. (Future: fully automated during build)

### Blog Post Frontmatter Schema (`content/posts/*.md`)

```yaml
---
title: "Why I Started Appropriated Kitchen"
slug: "why-i-started-appropriated-kitchen"
date: "2026-06-13"
excerpt: "The story behind the blog and what 'Your Food, My Way' really means."
tags:
  - personal
  - behind-the-scenes
image: "/images/posts/kitchen-story.jpg"
---
```

### TypeScript Types

```typescript
// src/types/recipe.ts
export interface Ingredient {
  amount: string;
  name: string;
  notes?: string;
}

export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber?: string;
  sodium?: string;
  sugar?: string;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface RecipeFrontmatter {
  title: string;
  slug: string;
  date: string;
  featured: boolean;
  image: string;
  excerpt: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: Difficulty;
  tags: string[];
  ingredients: Ingredient[];
  nutrition: Nutrition;
}

export interface Recipe extends RecipeFrontmatter {
  content: string;  // MDX body
  readingTime: string;
}

// src/types/post.ts
export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags?: string[];
  image?: string;
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
}
```

---

## 7. Component Tree

```
<App>
  <Header>
    <Logo />
    <NavLinks />          # Recipes | Blog | About
    <ThemeToggle />
    <MobileNav />          # Hamburger menu (mobile)
  </Header>
  
  <PageContent>            # Dynamic per route
    ├── LandingPage
    │   ├── HeroSection
    │   ├── FeaturedRecipes
    │   │   └── RecipeCard[]      # Grid of cards
    │   ├── AboutPreview
    │   └── NewsletterTeaser
    │
    ├── RecipeIndex
    │   └── RecipeCard[]          # Filterable grid
    │
    ├── RecipeDetail
    │   ├── RecipeHeader
    │   │   └── PrintButton
    │   ├── IngredientList
    │   ├── NutritionPanel
    │   ├── InstructionSteps
    │   └── PrintableRecipe       # Hidden until print triggered
    │
    ├── BlogIndex
    │   └── BlogCard[]
    │
    ├── BlogPost
    │   └── BlogContent           # react-markdown wrapper
    │
    └── AboutPage
  </PageContent>
  
  <Footer>
    <SocialLinks />
    <NavLinks />
    <Copyright />
  </Footer>
</App>
```

---

## 8. Nutrition API Integration

### Recommended API: Edamam Nutrition Analysis API

**Why Edamam:**
- Purpose-built for recipe/ingredient nutrition analysis
- Free tier: 10 requests/min, 5000/month (enough for initial use)
- Returns detailed breakdown (calories, macros, micros, diet labels)
- Natural language ingredient parsing

**Integration Strategy:**

1. **Phase A (Script-based):** Build a CLI script that:
   - Takes a list of ingredient strings as input
   - Calls Edamam API
   - Outputs formatted nutrition frontmatter
   - User paste into MDX frontmatter

2. **Phase B (Build-time automated):** Future enhancement
   - Hook into build process
   - Auto-fetch nutrition data for new/modified recipes
   - Cache results to avoid repeated API calls

### API Call Pattern
```
POST https://api.edamam.com/api/nutrition-details?app_id={ID}&app_key={KEY}
{
  "title": "Recipe Name",
  "ingr": [
    "2 cups all-purpose flour",
    "1 tbsp olive oil",
    "3 cloves garlic"
  ]
}
```

### Environment Variables
```bash
EDAMAM_APP_ID=
EDAMAM_APP_KEY=
NEXT_PUBLIC_SITE_URL=https://appropriatedkitchen.com
```

---

## 9. Development Roadmap

### Phase 1: MVP (Weeks 1-2)

| Step | Task | Est. Time | Dependencies |
|------|------|-----------|--------------|
| 1.1 | Initialize Next.js + Tailwind + shadcn | 1 hr | Node.js installed |
| 1.2 | Set up project structure & directories | 30 min | Step 1.1 |
| 1.3 | Configure TypeScript, ESLint, tsconfig paths | 30 min | Step 1.1 |
| 1.4 | Create global CSS with Tailwind v4 theme + custom vars | 30 min | Step 1.1 |
| 1.5 | Build Header + Navigation + ThemeToggle | 2 hrs | Step 1.4 |
| 1.6 | Build Footer with SocialLinks | 1 hr | Step 1.5 |
| 1.7 | Create Root Layout (fonts, metadata, theme script) | 1 hr | Steps 1.5-1.6 |
| 1.8 | Build Landing Page (Hero, Featured, About Preview, Newsletter) | 3 hrs | Step 1.7 |
| 1.9 | Create sample recipe + post content files | 30 min | — |
| 1.10 | Build recipe lib (fetch, parse, generateStaticParams) | 2 hrs | Step 1.9 |
| 1.11 | Build blog lib (fetch, parse, generateStaticParams) | 1 hr | Step 1.9 |
| 1.12 | Build Recipe Index page | 1.5 hrs | Step 1.10 |
| 1.13 | Build Recipe Detail page (ingredients, instructions, nutrition) | 3 hrs | Step 1.10 |
| 1.14 | Build PrintButton + PrintableRecipe component | 2 hrs | Step 1.13 |
| 1.15 | Build Blog Index page | 1 hr | Step 1.11 |
| 1.16 | Build Blog Post page (react-markdown) | 2 hrs | Step 1.11 |
| 1.17 | Build About page | 1 hr | Step 1.7 |
| 1.18 | Nutrition API script (CLI tool for generating frontmatter) | 3 hrs | Edamam account |
| 1.19 | Set up Cloudflare Pages + Wrangler config | 1 hr | Cloudflare account |
| 1.20 | Configure Open Next adapter | 1 hr | Step 1.19 |
| 1.21 | Build + deploy to Cloudflare | 1 hr | Steps 1.19-1.20 |
| 1.22 | Custom 404 page, sitemap, RSS feed | 1.5 hrs | Step 1.7 |
| 1.23 | Final polish, responsive testing, print testing | 2 hrs | All above |

**Total MVP: ~25-30 hours**

### Phase 2: Content Onboarding (Week 3+)
| Task | Description |
|------|-------------|
| Create 5-10 initial recipes | Content with frontmatter, photos, nutrition |
| Create 3-5 initial blog posts | Content for blog section |
| Set up image optimization pipeline | Image compression, CDN strategy |
| SEO pass | Meta tags, OG images, structured data (Recipe schema) |

### Phase 3: Newsletter (Month 2)
| Task | Description |
|------|-------------|
| Research & choose newsletter provider | Buttondown, Mailchimp, Beehiiv, etc. |
| Integrate signup form | React component, API integration |
| Build newsletter landing page | Dedicated subscribe page |

### Phase 4: Store (Month 3+)
| Task | Description |
|------|-------------|
| Determine e-commerce platform | Shopify, Snipcart, Medusa, or custom |
| Build store section | Product listing, cart, checkout |
| Social commerce integration | Link Instagram/TikTok shop |
| Merchandise design | Apparel, branded items |

### Phase 5: Social & Growth (Ongoing)
| Task | Description |
|------|-------------|
| YouTube video integration | Embed recipe videos in posts |
| Instagram/TikTok feeds | Social media embed widgets |
| Recipe ratings & reviews | User interaction features |
| Search & filtering | Full-text search, tag/category filters |

---

## 10. MVP Definition (Phase 1)

### What's INCLUDED in MVP

✅ Landing page with hero, featured recipes, about preview, newsletter teaser (non-functional placeholder)
✅ Recipe index page (grid of recipe cards)
✅ Recipe detail pages with:
  - Ingredient list
  - Step-by-step instructions
  - Nutritional info panel (manually populated via Nutrition API script)
  - Printable recipe card (print CSS + print button)
✅ Blog index page
✅ Blog post pages (markdown rendered)
✅ About page
✅ Dark mode toggle
✅ Responsive design (mobile, tablet, desktop)
✅ Custom 404 page
✅ Basic SEO (meta tags, sitemap)
✅ Cloudflare Pages deployment with custom domain

### What's NOT in MVP (Future)

❌ Newsletter signup (UI placeholder only — no backend)
❌ User accounts / authentication
❌ Recipe ratings or comments
❌ Search functionality
❌ Store / merchandise
❌ Social media feed integration
❌ Commenting system
❌ Analytics dashboard

---

## 11. Future Features

| Feature | Timeline | Notes |
|---------|----------|-------|
| **Newsletter** | Phase 3 | Signup form → provider API → subscriber management |
| **Merch Store** | Phase 4 | T-shirts, aprons, hats — Shopify or Printful integration |
| **Physical Products** | Phase 4 | E-books, meal plans, recipe cards, kitchen tools |
| **YouTube Integration** | Phase 5 | Embed recipe videos on recipe pages |
| **Instagram/TikTok Feed** | Phase 5 | Social proof wall, embeddable galleries |
| **Search** | Phase 5 | Full-text search across recipes + posts |
| **Recipe Collections** | Phase 5 | Curated groups (e.g., "30-Minute Meals") |
| **Meal Planner** | Future | Weekly meal planning tool |
| **Comments** | Future | Disqus, or custom comment system |
| **Recipe Scaling** | Future | Auto-scale ingredient amounts by serving count |

---

## 12. Design System

### Color Palette (Tailwind v4 oklch)

```css
:root {
  --background: oklch(0.985 0.003 75);       /* Warm off-white */
  --foreground: oklch(0.13 0.02 260);        /* Deep navy-charcoal */
  --primary: oklch(0.45 0.24 280);           /* Vibrant indigo */
  --primary-foreground: oklch(0.985 0 0);
  --accent: oklch(0.65 0.22 20);             /* Warm coral */
  --accent-foreground: oklch(0.985 0 0);
  --muted: oklch(0.95 0.008 265);
  --muted-foreground: oklch(0.55 0.025 265);
  --card: oklch(0.985 0 0);
  --card-foreground: oklch(0.13 0.02 260);
  --border: oklch(0.89 0.01 260);
  --ring: oklch(0.45 0.24 280);
  --radius: 0.75rem;
}

.dark {
  --background: oklch(0.1 0.02 260);
  --foreground: oklch(0.93 0.005 265);
  --primary: oklch(0.65 0.24 280);
  --accent: oklch(0.7 0.22 20);
  --muted: oklch(0.18 0.025 265);
  --border: oklch(1 0 0 / 10%);
}
```

### Typography
- **Headings:** Playfair Display (serif — elegant, food-blog feel)
- **Body:** Inter (sans-serif — clean, readable)
- **Code/Badges:** JetBrains Mono or monospace system font

### Key Design Principles
- **Generous whitespace** — food blogs need room to breathe
- **Large, high-quality imagery** — hero images for recipes
- **Clear typographic hierarchy** — headings, subheadings, body
- **Print-optimized CSS** — recipe cards stripped of chrome, clean layout
- **Subtle shadows & rounded corners** — modern, approachable
- **Warm accent color** — coral/orange tones evoke food and appetite

---

## 13. Deployment Strategy

### Cloudflare Pages Setup
1. Push project to GitHub repository
2. Connect repo to Cloudflare Pages dashboard
3. Configure build settings:
   - Build command: `npx @opennextjs/cloudflare build`
   - Build output: `.vercel/output/static`
   - Environment variables: Add `EDAMAM_APP_ID`, `EDAMAM_APP_KEY`, `NEXT_PUBLIC_SITE_URL`
4. Set custom domain in Cloudflare Pages
5. Configure Wrangler for local preview

### Wrangler Configuration (`wrangler.toml`)
```toml
name = "appropriated-kitchen"
pages_build_output_dir = ".vercel/output/static"
compatibility_flags = ["nodejs_compat"]
compatibility_date = "2024-12-01"
```

### Build Pipeline
```bash
# Development
npm run dev              # Local dev server

# Build for Cloudflare
npm run pages:build      # Build with Open Next adapter

# Preview locally
npm run pages:preview    # Preview Cloudflare build

# Deploy
npm run pages:deploy     # Deploy to Cloudflare Pages
```

### GitHub Integration
```bash
git init
git add .
git commit -m "Initial scaffold"
gh repo create appropriated-kitchen --public --source=. --remote=origin --push
# Then connect to Cloudflare Pages via dashboard
```

---

## 14. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| `fs` calls at runtime on Cloudflare Workers | 🔴 Critical | High | Use `generateStaticParams()` for all content routes — `fs` only runs at build time |
| Nutrition API rate limits | 🟠 Medium | Medium | Use script-based approach (Phase A), cache results, upgrade tier if needed |
| Next.js 16 + Cloudflare compatibility | 🟠 Medium | Medium | Use `@opennextjs/cloudflare` (not deprecated `next-on-pages`); pin tested versions |
| MDX complexity for non-devs | 🟡 Low | Medium | Provide recipe/post templates; consider web UI later |
| Image optimization on Cloudflare | 🟡 Low | Low | Use Cloudflare Image Resizing or manual optimization |
| Build time grows with content | 🟡 Low | Low | `generateStaticParams` scales; consider incremental build strategies later |
| Printable CSS cross-browser issues | 🟡 Low | Low | Test print on Chrome, Firefox, Safari; use `@media print` with browser-specific tweaks |

---

## Appendix A: Edamam Nutrition API Setup

1. Go to [Edamam Nutrition Analysis API](https://developer.edamam.com/edamam-nutrition-api)
2. Sign up for a free developer account
3. Get `app_id` and `app_key`
4. Add to `.env.local`:
   ```
   EDAMAM_APP_ID=your_app_id
   EDAMAM_APP_KEY=your_app_key
   ```
5. Use the CLI script at `scripts/nutrition-fetch.ts` (to be built in Phase 1)

## Appendix B: Key Commands Reference

```bash
# Setup
npm install
npm run dev                 # http://localhost:3000

# Content scaffolding
npm run create-recipe       # CLI wizard (future)
npm run create-post         # CLI wizard (future)

# Nutrition
npm run nutrition "2 cups flour, 1 tbsp sugar"  # Fetch nutrition data

# Build & Deploy
npm run build               # Standard Next.js build
npm run pages:build         # Cloudflare build
npm run pages:preview       # Preview Cloudflare output
npm run pages:deploy        # Deploy to Cloudflare

# Lint/Type-check
npm run lint
npx tsc --noEmit
```