import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// This site only serves prerendered content (recipes/posts are built from MDX
// at build time, with no ISR revalidation). Without an incremental cache,
// Cloudflare Workers can't read those prerendered pages at runtime and falls
// back to an on-demand render — which fails because the markdown is read from
// the filesystem, producing 404s on recipe/blog detail pages.
//
// The static-assets incremental cache serves the prerendered pages straight
// from the Workers ASSETS binding (already configured in wrangler.jsonc), so no
// R2/KV bucket is required.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
