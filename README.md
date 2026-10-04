# Greg Marshall Racing — Cloudflare v2.1

## v2.1 changes
- Added a dedicated **Photos** section to Admin.
- Existing photo albums and images are loaded into Admin automatically.
- Create, rename and remove albums.
- Replace an existing photo by URL or direct file upload to R2.
- Add photos to an album by URL or direct file upload.
- Remove individual photos from albums.
- The public Photos page now reads its album structure from editable D1 site content, with the original imported gallery as the fallback.
- No new D1 migration is required.

# Greg Marshall Racing — Cloudflare baseline v1.2

This build keeps the migrated public site stable and restores a Cloudflare-native social-feed layer plus a usable admin portal.

## Existing Cloudflare resources
- Worker: `greg-marshall-racing`
- D1: `greg-marshall-racing`
- R2: `greg-marshall-racing-media`
- D1 binding: `DB`
- R2 binding: `MEDIA`

The supplied `wrangler.jsonc` already contains the D1 database ID used during the baseline deployment and has only one D1 and one R2 binding.

## Upgrade an existing v1.1 deployment
From the project folder:

1. Apply the new social-feed migration:
   `npx wrangler d1 migrations apply greg-marshall-racing --remote`
2. Connect Instagram using a **fresh** access token (do not reuse credentials found in the old WordPress backup):
   `npx wrangler secret put INSTAGRAM_ACCESS_TOKEN`
3. Deploy:
   `npx wrangler deploy`
4. Open `/admin`, sign in, and press **Refresh feed now**. The public `/news` page will then show cached Instagram posts that link to their original Instagram permalinks.

`ADMIN_PASSWORD` remains the admin-login secret from v1.1.

## Instagram feed design
- Configured site account: `@gregmarshall95_` (matching the active Flow-Flow source in the WordPress backup).
- Uses Instagram's API endpoint and requests up to 30 recent media items.
- Posts are cached in D1 and remain visible if a later API refresh fails.
- A Cloudflare Cron trigger refreshes the feed every 30 minutes.
- Videos use their thumbnail where available.
- Every social card links directly to the original Instagram `permalink`.
- The admin dashboard reports connection state, cached post count, last successful refresh and last error, and provides a manual refresh button.

## Admin portal
Open `/admin`. It now provides:
- Dashboard: Instagram and Cloudflare storage status.
- News: add/edit/remove race reports and website news.
- 2026 Calendar: add/edit/remove events.
- About: edit biography and career-stat lines.
- Media: upload images to R2 and receive the resulting site URL.
- Advanced: full JSON editor as a fallback/power-user view.

## Security
The old WordPress backup contained legacy social/API credentials. None are included in this build. Use a fresh Instagram access token and rotate/revoke old credentials at the provider.

## Optional API base override
By default the Worker uses `https://graph.instagram.com`. If Meta changes the endpoint for the token type you configure, set an `INSTAGRAM_API_BASE` Worker variable and redeploy; no page-code changes are required.

## v1.7 visual/admin update
- New site-wide black / white / neon pink / cyan motorsport visual system.
- Consistent modern typography and responsive navigation across all pages.
- Temporary ADMIN link added to the public navigation during development.
- Admin can replace the global header logo.
- Admin can edit homepage hero artwork and hero/intro text.
- Admin can upload and assign page banner artwork for News, Photos, About, 2026 and Sponsors.
- News items support optional image URLs for homepage artwork.
- Existing D1 content is preserved; new branding/home/artwork fields are merged with safe defaults.
- Existing R2 media, D1, Instagram feed, admin password and Cloudflare bindings remain unchanged.


## v1.7
- Admin-configurable sponsor grids for Home and Sponsors pages (wide × high).
- Per-tile logo upload/URL, click-through link, short text and background colour.
- Animated pink-to-cyan sponsor tile outlines.
- Hero images fade into black at the bottom.
- Removed the Home hero pink/cyan separator line.
- Pink/cyan glow added to hero/title text across the site.


## v1.7 visual refinement
- Extends the subtle animated pink/cyan gradient edge to news/event cards, career/stat highlights, social cards and photo gallery images.
- Reworks non-home page heroes so more photography remains visible and content rises into the lower fade, creating a photo-to-black overlap rather than a hard visual cut.
- Home hero proportions remain unchanged.
- Respects reduced-motion accessibility preferences.


## v1.7
Fixed the animated pink/cyan edge effect so it visibly flows on sponsor, news/event, career/stat, social and gallery tiles using a browser-safe background-position animation.


## v1.7
- Reduced Home-page-only vertical gap between the hero/headline and Latest from the paddock section.
- Other page hero/content spacing remains unchanged.


## v1.8
- Main navigation is now fixed to the top of the viewport on all pages.
- Added page offset so content is not hidden behind the fixed 84px navigation bar.
- Existing v1.7 visual styling and admin functionality retained.

## v1.9
- Restores the visibly moving pink/cyan tile-edge effect using the original v1.4 motion method.
- Applies the motion consistently to sponsor, news/event, career/stat, social and photo tiles.
- Sponsor Admin editors now show the current logo preview and current stored image/link/text values; empty fields explicitly show “No content being used”.


## v2.0
- News headlines now open the full article narrative in a modal popup.
- News cards show a short teaser instead of the full long narrative.
- News article image fields in Admin now support direct file upload to R2 as well as image URLs.
- Uploaded article images are previewed in Admin and used on the News card/modal.
