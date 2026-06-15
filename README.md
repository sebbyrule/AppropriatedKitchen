# 🍳 Appropriated Kitchen

> **Your Food, My Way** — A modern cooking blog with bold flavors, approachable recipes, and nutritional insights.

**🌐 Live:** [https://appropriated-kitchen.sebbyrule.workers.dev](https://appropriated-kitchen.sebbyrule.workers.dev)

Built with [Next.js](https://nextjs.org) 16, [Tailwind CSS](https://tailwindcss.com) v4, [shadcn/ui](https://ui.shadcn.com), and deployed on [Cloudflare Workers](https://workers.cloudflare.com/) + Assets via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare).

---

## ✨ Features

### MVP (Live)
- **Landing page** — Hero section, featured recipes, about preview, newsletter teaser
- **Recipe section** — Browseable index + detail pages with ingredients, instructions, nutritional info, and printable recipe cards
- **Blog section** — Blog index + full posts with markdown rendering
- **About page** — Brand story and philosophy
- **Dark mode** — Toggle with flash prevention
- **Responsive design** — Mobile, tablet, desktop
- **SEO** — Meta tags, auto-generated sitemap, RSS feed
- **Custom 404 page** — Branded with navigation options

### Coming Soon
- [ ] Newsletter signup integration
- [ ] Merchandise / apparel store
- [ ] Physical product store
- [ ] Social media integration (YouTube, Instagram, TikTok)
- [ ] Recipe ratings & comments
- [ ] Search & filtering

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ (v22 recommended)
- **npm** (v10+)
- A [Cloudflare](https://dash.cloudflare.com) account (for deployment)

### Setup

```bash
# Clone the repo
git clone https://github.com/sebbyrule/AppropriatedKitchen.git
cd AppropriatedKitchen

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development with Cloudflare Bindings

The project uses `@opennextjs/cloudflare` for local development. The `next.config.ts` includes:

```typescript
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
```

A `.dev.vars` file is provided for local environment variables.

---

## 📁 Project Structure

```
appropriatedkitchen/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions — auto-deploy on push to main
├── content/
│   ├── recipes/            # .mdx recipe files with frontmatter
│   └── posts/              # .md blog post files with frontmatter
├── public/
│   ├── images/             # Static images (recipe photos, etc.)
│   └── _headers            # Static asset caching rules
├── scripts/
│   └── nutrition-calc.ts   # CLI tool for calculating nutritional info
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout (fonts, theme script, metadata)
│   │   ├── page.tsx        # Landing page
│   │   ├── globals.css     # Tailwind v4 theme + print CSS
│   │   ├── not-found.tsx   # Custom 404
│   │   ├── sitemap.ts      # Auto-generated sitemap
│   │   ├── feed.xml/       # RSS feed
│   │   ├── recipes/        # Recipe index + [slug] detail
│   │   ├── blog/           # Blog index + [slug] detail
│   │   └── about/          # About page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Header, Footer, MobileNav
│   │   ├── recipes/        # RecipeCard, NutritionPanel, PrintableRecipe, etc.
│   │   ├── blog/           # BlogCard, BlogContent
│   │   ├── landing/        # HeroSection, FeaturedRecipes, etc.
│   │   └── shared/         # ThemeToggle, SocialLinks
│   ├── lib/
│   │   ├── recipes.ts      # Recipe content fetching + parsing
│   │   ├── posts.ts        # Blog post content fetching + parsing
│   │   ├── nutrition-db.ts # Local ingredient nutrition database (150+ items)
│   │   ├── nutrition-calc.ts # Nutrition calculation engine
│   │   ├── nutrition.ts    # Public nutrition API
│   │   ├── constants.ts    # Site-wide constants
│   │   └── utils.ts        # cn(), readingTime(), formatDate()
│   └── types/
│       ├── recipe.ts       # Recipe TypeScript types
│       └── post.ts         # Blog post TypeScript types
├── docs/
│   └── SDD.md              # Software Development Document
├── open-next.config.ts     # Open Next Cloudflare configuration
├── wrangler.jsonc          # Cloudflare Workers + Assets configuration
├── .dev.vars               # Local development environment variables
├── AGENT.md                # Agent instructions & todo checklist
└── README.md               # ← You are here
```

---

## 🧑‍🍳 Adding Content

### Adding a Recipe

1. Create a new `.mdx` file in `content/recipes/`:

```yaml
---
title: "Your Recipe Title"
slug: "your-recipe-title"
date: "2026-06-13"
featured: true
image: "/images/recipes/your-recipe.jpg"
excerpt: "A short, compelling description."
prepTime: "15 min"
cookTime: "30 min"
totalTime: "45 min"
servings: 4
difficulty: "easy"         # easy | medium | hard
tags:
  - category-tag
ingredients:
  - amount: "2 cups"
    name: "ingredient name"
  - amount: "1 tbsp"
    name: "another ingredient"
nutrition:
  calories: 350
  protein: "15g"
  carbs: "45g"
  fat: "10g"
  fiber: "3g"
  sodium: "400mg"
---
```

2. Calculate nutritional info (optional but recommended):

```bash
npm run nutrition -- --servings 4 "2 cups flour, 1 tbsp sugar, 3 eggs"
```

Copy the output YAML into the `nutrition:` field.

3. Write the recipe body in **MDX** — supports bold, italic, images, and embedded components.

### Adding a Blog Post

1. Create a new `.md` file in `content/posts/`:

```yaml
---
title: "Post Title"
slug: "post-title"
date: "2026-06-13"
excerpt: "A short summary."
tags:
  - category-tag
image: "/images/posts/post-image.jpg"
---
```

2. Write the body in **Markdown**.

---

## 📊 Nutrition Calculator

We built a **free, local nutrition calculator** — no API keys needed.

### Database
150+ common ingredients with per-100g nutritional values (calories, protein, carbs, fat, fiber, sodium) sourced from USDA FoodData Central.

### Usage

```bash
# Calculate for a recipe (4 servings)
npm run nutrition -- --servings 4 "2 cups flour, 1 tbsp olive oil, 3 eggs"

# Direct calculation (defaults to 1 serving)
npx tsx scripts/nutrition-calc.ts "2 cups flour, 1 tbsp sugar"

# Output is YAML-ready — paste directly into recipe frontmatter
```

### Files
- `src/lib/nutrition-db.ts` — Ingredient database
- `src/lib/nutrition-calc.ts` — Calculation engine
- `src/lib/nutrition.ts` — Programmatic API
- `scripts/nutrition-calc.ts` — CLI tool

---

## 🎨 Design System

### Colors (Tailwind v4 oklch)
- **Background:** Warm off-white
- **Foreground:** Deep navy-charcoal
- **Primary:** Vibrant indigo
- **Accent:** Warm coral
- Dark mode: Inverted with brighter accents

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Print CSS
- Recipe pages include a print button
- `@media print` hides navigation, shows a clean recipe card layout
- Printable card includes: logo, title, ingredients, instructions, nutrition, URL

---

## ☁️ Deployment

### Auto-deploy via GitHub Actions

Every push to `main` automatically deploys to Cloudflare Workers:

```bash
git add -A
git commit -m "Your message"
git push origin main
```

The workflow (`.github/workflows/deploy.yml`) runs on **Ubuntu** (Linux), which avoids the path-separator issues that OpenNext has on Windows.

### Manual Deploy

```bash
# Full build + deploy (requires CLOUDFLARE_API_TOKEN or logged in via wrangler)
npm run deploy

# Preview locally using workerd
npm run preview
```

### First-Time Setup

1. Create a Cloudflare API token:
   - Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click **Create Token** → **Edit Cloudflare Workers** template
   - Set **Workers Scripts** → **Edit**
   - Click **Create Token** and copy the token

2. Add it as a GitHub secret:
   - Go to [github.com/sebbyrule/AppropriatedKitchen/settings/secrets/actions](https://github.com/sebbyrule/AppropriatedKitchen/settings/secrets/actions)
   - Click **New repository secret**
   - **Name:** `CLOUDFLARE_API_TOKEN`
   - **Secret:** paste the token

3. Push to `main` — the workflow triggers automatically.

### Custom Domain

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
2. Click on the **appropriated-kitchen** worker
3. Go to **Triggers** → **Custom Domains**
4. Click **Add Custom Domain** and enter `appropriatedkitchen.com`

### ⚠️ Windows Note

OpenNext is **not fully compatible with Windows**. The `npm run deploy` command may produce broken builds when run from Windows. Always deploy via:
- **GitHub Actions** (recommended — builds on Linux)
- **WSL** (Windows Subsystem for Linux)

---

## 🛠️ Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Standard Next.js build |
| `npm run lint` | Run ESLint |
| `npm run nutrition -- --servings 4 "ingredients"` | Calculate nutritional info |
| `npm run deploy` | Full Cloudflare build + deploy |
| `npm run preview` | Build + preview locally via workerd |
| `npm run upload` | Build + upload version without deploying |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| `docs/SDD.md` | Software Development Document — full architecture, roadmap, design system |
| `AGENT.md` | Agent instructions with actionable TODO checklist for coding agents |

---

## 🔮 Roadmap

| Phase | Timeline | Features |
|-------|----------|----------|
| **1 — MVP** | ✅ Complete | Landing, recipes with printable cards, blog, about, dark mode, Workers deploy |
| **2 — Content** | Next | Add 5-10 recipes, 3-5 blog posts, image optimization, SEO |
| **3 — Newsletter** | Month 2 | Choose provider (Buttondown, Mailchimp, Beehiiv, etc.), integrate signup form |
| **4 — Store** | Month 3+ | Merch/apparel, physical products via Shopify/Printful |
| **5 — Social** | Ongoing | YouTube embeds, Instagram/TikTok feeds, recipe ratings, search |

---

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui |
| **Content** | MDX / Markdown with gray-matter |
| **Icons** | Custom SVGs |
| **Fonts** | Inter (sans), Playfair Display (serif) |
| **Deployment** | Cloudflare Workers + Assets via @opennextjs/cloudflare |
| **CI/CD** | GitHub Actions (Ubuntu) |
| **Nutrition** | Local ingredient database (150+ items) |

---

## 📄 License

© 2026 Appropriated Kitchen. All rights reserved.