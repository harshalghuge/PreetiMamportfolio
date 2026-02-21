# Blog Page Render Optimization

This document summarizes the performance improvements applied to `frontend/src/pages/Blog.jsx` to reduce perceived load time on the main blog page.

## What Was Changed

1. Removed duplicate "latest post" API call
- Before: `useLatestPost()` made an additional request (`/posts?per_page=1`) even though the main posts query already fetched page 1.
- After: Featured post is derived from `posts[0]` when:
  - category is `all`
  - `page === 1`
  - no search query
- Benefit: one less network request on initial page load.

2. Added in-memory categories cache (5-minute TTL)
- Added top-level cache:
  - `categoriesCache = { data, expiresAt }`
  - `CACHE_TTL_MS = 5 * 60 * 1000`
- Categories are reused during TTL and only re-fetched after expiry.
- Benefit: avoids repeated category lookup fetches across mounts.

3. Added in-memory posts cache per query (5-minute TTL)
- Added `postsCache` map keyed by request params (`URLSearchParams.toString()`).
- Cached payload includes:
  - `data`
  - `totalPages`
  - `expiresAt`
- If a valid cache entry exists, UI is populated immediately without waiting for network.
- Benefit: fast back/forward navigation, repeated filters, and repeated page visits.

4. Added next-page prefetch
- After loading current page successfully, code prefetches `page + 1` (if available) into cache.
- Benefit: when user clicks `Next`, content is often already cached, so transition feels instant.

5. Added fetch abort handling
- `AbortController` is used in posts fetch effect.
- Prevents stale requests from setting state after query changes.
- Benefit: lower UI jitter and cleaner request lifecycle.

6. Category-map readiness guard
- For non-`all` categories, posts fetch waits until category map is loaded.
- Benefit: avoids incorrect "all posts" fetch while category IDs are still unknown.

7. Reduced list payload size with `_fields`
- Posts list requests now include:
  - `_fields=id,date,title,excerpt,link,_embedded`
- This avoids downloading full `content.rendered` for every card in the grid.
- Benefit: significantly lower payload per page, especially when posts are long.

8. Fetch full article only when user opens a post
- Card/list data stays lightweight.
- On click, app requests full post details:
  - `GET /wp-json/wp/v2/posts/{id}?_embed=1`
- Modal shows a small `Loading article...` state until full content arrives.
- Benefit: faster initial list render and faster category/page transitions.

9. Added lazy image hints for blog cards
- Added `loading=\"lazy\"` and `decoding=\"async\"` on list/featured images.
- Benefit: reduces work during initial paint and improves perceived speed.

## Files Updated

- `frontend/src/pages/Blog.jsx`
- `frontend/docs/blog-render-optimization.md` (this file)

## Tunable Settings

- Cache TTL:
  - `CACHE_TTL_MS` in `Blog.jsx`
  - Default: 5 minutes
- Prefetch behavior:
  - Current: prefetches only next page
  - Can be disabled or expanded if needed

## Notes

- This is client-side optimization only.
- For larger gains, combine with:
  - WordPress/server caching
  - image CDN + smaller image sizes
  - a data-fetching library like TanStack Query (optional future step)
