# Juhudi Foundation

Next.js App Router frontend and a standalone Sanity Studio configuration. Use
Node **22.20 or later** (`.nvmrc` pins the validation runtime), then `npm ci`.
The installed tooling graph includes packages requiring Node 22; Node 20 is
not supported for this repository's full validation workflow.

## Development and validation

Provide `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` for the
frontend, and matching `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`
for Studio/CLI. API version overrides are optional. These identifiers are
public; never put credentials in `NEXT_PUBLIC_*` or `SANITY_STUDIO_*` variables.
Local `.env` files are ignored. Public pages use published content without
browser or server API tokens.

```sh
npm run dev
npm run sanity:types
npx tsc --noEmit
npm run lint
npm test
npm run build
```

`npm run build -- --webpack` is the supported alternative when an execution
environment cannot run Turbopack's workers. It does not replace verification
of the normal build in deployment CI. `npm start` serves the production build.
Studio runs separately with `npx sanity dev`; it is not embedded in the website.

Fonts are self-hosted with `next/font/local`. See [font provenance and licenses](app/fonts/README.md).

## Editorial ownership and rollout

Site Settings contains fixed **Homepage**, **About page**, and **Our Work page**
groups, plus the existing global tagline, footer, social and default SEO fields.
The frontend owns section composition, routes, action labels and interaction
behavior. Existing programme, project, team and metric documents remain their
respective sources of truth. Financial/payment records do not belong in Sanity.

`sanity/content/defaults.ts` is a frozen snapshot of the previously implemented
copy, shared by Studio initial values and frontend migration fallbacks. Edit
published content in Studio, not this snapshot. Missing fields fall back to the
snapshot so rollout does not blank existing pages. Explicitly empty strings or
arrays are not replaced; Studio validates required fields before publication.
Local photographs remain until editors supply a replacement image with alt
text and crop/hotspot. Logos and decorative brand assets remain application assets.

Existing documents do not automatically receive new initial values. After
reviewing the copy and exporting a dataset backup, preview the additive migration:

```sh
npx sanity migration run page-content
```

The CLI defaults to a dry run. Review its output before deliberately applying it
with `--no-dry-run`. It initializes only missing page objects on the Site Settings
singleton and never replaces existing page objects. It does **not** create a
missing singleton or upload photographs. For partially populated page objects,
complete the missing fields in Studio. Do not import the defaults as a replacement
for the whole Site Settings document. This audit does not publish content.

Approve the institutional claims (including the establishment year), programme
count, team roles, image consent and impact figures before publishing. Review
page SEO and the global noIndex setting. Page titles omit the organisation suffix;
the root template adds it. Site-wide noIndex remains effective on every route.
No canonical domain is invented; configure one when the deployment domain is known.

## Launch scope

Only `/`, `/about`, and the header of `/our-work` are implemented. Navigation and
cards intentionally retain the approved destinations. Projects, Gallery, Contact,
Get Involved and its three journeys, Contribute, and programme/project detail pages
must be implemented before those journeys can be considered launch-ready. No
payment processing is implemented. See the final audit report in `docs/` for
validation evidence and remaining blockers.
