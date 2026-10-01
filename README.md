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
