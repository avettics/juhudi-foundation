# Production audit — 10 October 2026

## 1. Readiness assessment

The implemented pages have been hardened without redesigning their composition.
**The complete V1 is not launch-ready.** Missing routes, unfinished Our Work
content, editorial rollout/approval, and unresolved dependency advisories remain
release gates. No content was published, and no commit or push was made.

The starting worktree was clean. Installed Next 16.3.8, React 19.2.8, Sanity
5.31.2, next-sanity 13.3.4, Base UI 1.8.0, Motion 14.0.0 and Tailwind 4.3.3 APIs
were inspected. Sanity best-practices guidance and the installed Next guides
informed the changes; no major dependency upgrade was made.

## 2. Files changed

| File | Reason |
| --- | --- |
| `.nvmrc` | Pin the supported validation runtime. |
| `README.md` | Setup, supported runtime, content ownership and safe rollout instructions. |
| `app/about/page.tsx` | Use CMS header copy and SEO with a clean route title. |
| `app/globals.css` | Remove unused legacy classes and disabled-button cursor override. |
| `app/layout.tsx` | Use CMS-backed global metadata with the existing title template. |
| `app/our-work/page.tsx` | Use CMS header copy and remove duplicate SEO title suffix. |
| `app/page.tsx` | Use CMS-backed homepage metadata without duplicating its title suffix. |
| `components/about/about-intro.tsx` | Render CMS-owned section copy while retaining markup and design. Support CMS photograph/alt replacement. |
| `components/about/guiding-principles.tsx` | Render CMS-owned section copy while retaining markup and design. Use CMS principle array keys. |
| `components/about/mission-vision.tsx` | Render CMS-owned section copy while retaining markup and design. Reuse the global tagline. |
| `components/about/our-story.tsx` | Render CMS-owned section copy while retaining markup and design. Reuse the global tagline. |
| `components/about/our-team.tsx` | Render CMS-owned section copy while retaining markup and design. Narrow/parallelize profile data and respect reduced motion. |
| `components/common/container.tsx` | Allow shrinkage and wrapping for long editorial content. |
| `components/common/page-header.tsx` | Improve supporting-copy contrast over the watermark. |
| `components/home/contribution-cta.tsx` | Render CMS-owned section copy while retaining markup and design. |
| `components/home/featured-projects.tsx` | Render CMS-owned section copy while retaining markup and design. Fetch independent copy/data together. Disable photo scaling under reduced motion. |
| `components/home/get-involved.tsx` | Render CMS-owned section copy while retaining markup and design. |
| `components/home/home-hero.tsx` | Render CMS-owned section copy while retaining markup and design. Reuse tagline, support CMS photography, fix contrast and preload API. |
| `components/home/impact.tsx` | Render CMS-owned section copy while retaining markup and design. Fetch independent copy/data together. Bound metrics and use explicit English number formatting. |
| `components/home/our-work.tsx` | Render CMS-owned section copy while retaining markup and design. Fetch independent copy/data together. Fetch only programme card fields. |
| `components/home/who-we-are.tsx` | Render CMS-owned section copy while retaining markup and design. |
| `components/layout/site-footer.tsx` | Share settings fetch, add Contribute, constrain long-content grid widths. |
| `components/layout/site-header.tsx` | Replace deprecated priority with eager SVG loading. |
| `components/motion/reveal.tsx` | Make wrappers shrinkable and tall content reveal on first intersection. |
| `components/our-work/our-approach.tsx` | Remove empty, unreferenced placeholder file. |
| `components/our-work/programme-areas.tsx` | Remove empty, unreferenced placeholder file. |
| `components/our-work/work-cta.tsx` | Remove empty, unreferenced placeholder file. |
| `components/our-work/work-in-action.tsx` | Remove empty, unreferenced placeholder file. |
| `docs/production-audit.md` | Audit findings, every changed file, evidence and release gates. |
| `migrations/page-content/index.ts` | Add missing page objects without replacing existing content. |
| `package-lock.json` | Mirror Node and test-runner declarations; preserve resolved versions. |
| `package.json` | Declare Node support and the explicit test runner/command. |
| `sanity.types.ts` | Regenerated schema/query TypeScript contracts. |
| `sanity/content/defaults.ts` | Single frozen snapshot of existing approved-direction copy. |
| `sanity/lib/image.ts` | Reject nonpositive or unsafe intrinsic dimensions. |
| `sanity/lib/metadata.ts` | Inherit social images and enforce site-wide noIndex for page metadata. |
| `sanity/lib/page-content.ts` | Typed cached content reads with explicit migration fallbacks. |
| `sanity/queries/impact-metrics.ts` | Bounded homepage metric projection. |
| `sanity/queries/page-content.ts` | Three static, generated-type page projections. |
| `sanity/queries/programmes.ts` | Text-card-only programme projection. |
| `sanity/queries/team-members.ts` | Profile-card-only team projection. |
| `sanity/schemaTypes/documents/site-settings.ts` | Add fixed page groups and reuse the global tagline baseline. |
| `sanity/schemaTypes/objects/page-content.ts` | Required editorial fields, principles, images and page SEO. |
| `schema.json` | Regenerated extracted schema. |
| `tests/sanity-runtime.test.ts` | Offline URL, image and metadata regression tests. |

## 3. Important findings

- Only `/`, `/about`, and a header-only `/our-work` exist. Approved navigation
  destinations and programme/project cards link to missing pages.
- Institutional and landing-page copy was embedded in React; existing default
  SEO fields were not wired to route metadata. Our Work repeated the title suffix.
- The footer's implicit mobile grid and automatic desktop grid minimum widths
  could expand for long contact strings.
- Supporting text over the watermark measured below 4.5:1 at narrow widths.
- Homepage sections fetched unused collection fields; impact filtering/limiting
  happened after fetching the full collection.
- All three featured-project photographs currently carry instructional placeholder
  alt text in published CMS content. The component correctly respects that field;
  editors must replace it with meaningful image descriptions.
- npm reported 21 affected dependency entries: 14 high, 7 moderate, no critical.
  These include inherited dependency findings, not 21 independent vulnerabilities.

## 4. Exact fixes

Connected fixed page-content fields to the existing server components; connected
SEO to root/page metadata; retained the global title template without duplicate
suffixes. Added Contribute to footer involvement links. Made content wrappers and
footer tracks shrinkable, allowed long words to wrap, and lowered the Reveal
intersection threshold so very tall CMS content can become visible. Disabled
photographic hover scaling under reduced motion. Slightly darkened only the
Hero/PageHeader supporting copy over the watermark. Replaced deprecated image
priority props. Removed unused CSS and zero-byte placeholders.

## 5. Sanity/content changes

Extended the existing Site Settings singleton with three fixed editorial groups:
Homepage, About page and Our Work page. No page builder, extra singleton or
financial record model was introduced. Each group has the existing SEO object;
photograph overrides preserve asset/crop/hotspot/alt. Principles use stable `_key`
values. The existing global tagline now supplies all repeated motto displays.

Three static typed page queries select only the relevant group. Dedicated static
queries select programme cards, team cards and up to four featured impact metrics.
The existing bounded Featured Projects query remains unchanged. React `cache`
shares request-local page/settings reads; card and copy queries start together.

`defaults.ts` is one shared migration baseline, not a second editorial workflow.
Published CMS values take precedence. Missing fields retain the existing page
copy during rollout; empty strings/arrays are not silently replaced. The additive
migration uses `setIfMissing` on missing page objects only. It does not replace
Site Settings, create a missing singleton, upload assets or publish content.
Complete partially populated objects in Studio. See README for rollout commands.

## 6. Hard-coded content audit

| Content | Ownership after this audit |
| --- | --- |
| Homepage messages, section introductions and support/contribution descriptions | Site Settings → Homepage |
| About introduction, mission, vision, story, principles and team introduction | Site Settings → About page |
| About/Our Work page-header messages | Respective Site Settings page group |
| Page SEO | Respective page group; global social image/noIndex fallback retained |
| Repeated tagline | Existing Site Settings tagline |
| Hero/About photographs and alt text | Optional CMS photograph override; existing local photo/alt baseline retained during rollout |
| Programmes, projects, team identities/roles, impact values | Existing collection documents, unchanged ownership |
| Footer description, contacts, social links, copyright text | Existing settings/contact documents |
| Navigation, CTA labels, section eyebrows, accessible names, link destinations, developer credit | Remain code-owned structural/interface copy |
| Logos, brand SVGs, font files, layout, financial processing | Remain application assets/behavior; no financial records in Sanity |

No claims, metrics, team biographies or additional pages were invented. The
existing “six areas” and “established in 2026” wording is preserved for editorial
approval. New initial values do not backfill existing Sanity documents; applying
and reviewing the content migration remains a rollout task.

## 7. Type safety

Schema extraction and TypeGen regenerated the committed artifacts (37 schema
types, 27 queries). Fetch results are inferred from static `defineQuery` strings.
No `any`, unsafe query-result assertion or lint suppression was added. Existing
compile-time checks still accept all six detail-query Portable Text shapes.
Runtime image dimension validation now rejects zero/unsafe dimensions.

## 8. Accessibility

Preserved semantic headings, landmarks, skip link, descriptive image alt text and
native link/button behavior. Decorative brand marks remain hidden from assistive
technology. Keyboard and automated-check results are listed below; automated
checks are not a screen-reader certification. The watermark contrast correction
is limited to the two affected supporting-text treatments.

## 9. Responsive/layout

The approved grids, section rhythm, cards, photography and typography remain.
`OurWork` remains text-focused; Featured Projects remains photography-focused.
Both continue using the existing shadcn Card/CardContent where appropriate.
Footer tracks and shared content wrappers now shrink for long strings instead of
expanding the page. No important content is hidden to avoid overflow.

## 10. Security

Existing external scheme validation, own-property internal-route guard, restricted
Sanity image path and safe blank-target relations were retained and checked.
No raw HTML rendering or browser secret was introduced. Public published-content
fetching remains tokenless; payment/transaction storage remains outside Sanity.

`npm audit --omit=dev` returned **21 affected entries (14 high, 7 moderate)**.
Direct packages flagged through dependency chains are Sanity, next-sanity and
shadcn. Underlying findings include adm-zip 0.5.18, braces 3.0.3, nested js-yaml
3.13.1, sprintf-js 1.0.3 and nested uuid 10.0.0. Examples of returned advisories:
[ZIP extraction](https://github.com/advisories/GHSA-vwc7-r8mq-g2x9),
[brace parsing](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm),
[YAML merge handling](https://github.com/advisories/GHSA-mh29-5h37-fv8m),
[UUID buffer bounds](https://github.com/advisories/GHSA-w5hq-g745-h8pq).

Do not interpret the affected-entry count as demonstrated website exploits.
Several chains involve CLI/build/Studio tooling, but full exposure analysis and
remediation are still required. npm's proposed root-package fixes include major
changes/downgrades; no force-fix, speculative override or warning suppression was
applied. Dependencies were not moved to devDependencies to conceal these findings.

## 11. Performance

Kept editorial components on the server. No new client component or client fetch
was added. Narrowed listing projections and bounded the metric query. Shared
settings/page requests and parallelized independent content/card reads. Hero
preloading uses Next 16's `preload`; the small header SVG loads eagerly without
an extra preload. Fonts remain local, with monospace available but not preloaded.

## 12. Cleanup/dependencies

Removed four empty Our Work scaffolding files and unused custom heading/spacing
CSS, plus the unconditional pointer cursor on disabled buttons. Kept existing
collection/detail queries and UI primitives intended for upcoming routes; these
were not treated as abandoned code. No package was removed or upgraded. Added
an explicit dev dependency on the already-resolved tsx 4.23.15 for runtime tests,
and documented Node 22.20+ with `.nvmrc` and package engines.

## 13. Validation evidence

| Check | Exact result |
| --- | --- |
| Node runtime | 22.20.0; compatible with the installed Linux dependency graph. One Windows-only optional sharp package declares a different range and is not installed on this platform. |
| `npm run sanity:types` | Passed: schema extraction with required fields and TypeGen, 37 schema types / 27 queries. |
| `tsc --noEmit` | Passed, including all six existing RichText contracts and the new migration/tests. |
| `npm run lint` | Passed with no reported warnings/errors. |
| `npm test` | 4/4 offline runtime tests passed: URL schemes, own-property routes, cropped/invalid dimensions, inherited metadata/crop/noIndex. |
| Formatting/whitespace | Targeted Prettier checks and `git diff --check` passed. No repository-wide formatting rewrite. |
| Migration | Installed CLI dry run against a local one-document NDJSON fixture exited 0. No live-dataset migration was run. |
| Default production build | Failed twice (including escalated retry): Turbopack CSS-worker internal port binding denied. |
| `npm run build -- --webpack` | Passed on Node 22.20, including TypeScript and prerendering `/`, `/about`, `/our-work`, the default 404 and icon. Latest build reflects all application changes. |
| Normal responsive checks | All 27 combinations passed: three routes × 320, 375, 390, 768, 1024, 1280, 1440, 1920, 2560px. No horizontal document overflow. |
| Long editorial/contact strings | All 27 combinations passed after fixes. Replaced rendered editorial nodes/contact strings with 240-character unbroken text; CMS records were not changed. |
| Keyboard | Enter opens the menu; Tab and Shift+Tab remain inside; Escape closes it and restores trigger focus. Skip link focuses main content. |
| Automated accessibility | axe WCAG A/AA checks at 390px and 1440px reported zero violations on all three routes. Contrast over decorative imagery produced incomplete/manual-review results; this was not treated as a clean automatic contrast pass. |
| Manual contrast | Sampled the supporting-copy background beneath the watermark at 320, 390, 1440px on all three routes. Before: down to 3.91:1. After: minimum 4.93:1, with measured alpha compositing. |
| Reduced motion | About content remained visible with the preference enabled (zero hidden sampled headings/paragraphs); photographic scaling is guarded by `motion-safe`. |
| No JavaScript | Homepage SSR headings/body remained visible with script execution disabled (zero hidden sampled headings/paragraphs). |
| Fonts | Chrome platform-font inspection confirmed DM Sans 9pt, Manrope ExtraLight and Geist Mono as custom fonts. Initial page loading requested two local WOFF2 files; no Google Fonts requests. Monospace loaded when explicitly exercised. |
| Cards | At 1440px, programme cards were 259px high within both rows, all three project cards 616px, and principles 224px. Existing containment/design retained. |
| Browser errors | No runtime exceptions captured in the final route/viewport audit. Missing-route requests correctly returned 404. |
| Secret scan | 106 tracked/new text files scanned for common credential/private-key patterns; no matches. Local public-variable names contained no token/secret/password/private-key designation. This is pattern scanning, not a guarantee against all possible secret formats. |
| Dependency audit | Completed with findings: 21 affected production dependency entries, 14 high / 7 moderate. Not passed/clean. |
| Image loading | 10/10 meaningful homepage/About photographs loaded with nonzero intrinsic width through Next image optimization after scrolling, in the final run. Earlier upstream timeouts remain noted below. |

Mobile screenshots of all three routes and desktop screenshots were inspected.
Browser evidence was collected using isolated headless Chrome/CDP against a local
`next start` production server; checks did not write to the CMS.

## 14. Remaining launch blockers

1. Implement `/projects`, `/gallery`, `/contact`, `/get-involved`, its volunteer,
   partner and support routes, `/contribute`, and linked programme/project detail
   pages. Finish `/our-work` beyond its header. Approved links were not deleted
   or redirected to unrelated content to hide this gap.
2. Review/apply/publish the new content fields, confirm photographs/alt text and
   SEO, and ensure the required singleton documents exist. Replace the instructional
   placeholder alt text currently used on all three featured-project photographs.
3. Resolve or formally assess the dependency advisories for the deployed runtime,
   Studio and build pipeline. The audit is not a clean security bill of health.
4. Complete and validate financial contribution behavior separately before
   presenting Contribute as a working payment journey. No Pesapal flow exists.

## 15. Non-blocking recommendations

Run a screen-reader and additional-browser pass on the deployment environment;
verify CDN image delivery and normal Turbopack CI there. Set canonical URLs once
the deployment domain is confirmed. After verified CMS rollout, retire temporary
fallbacks deliberately. Review the old, unused Site Settings CTA configuration
fields: frontend route/action labels are currently authoritative. Do not add
preview, a page builder or new gallery/payment models solely for this audit.

## 16. Required factual approval

Juhudi must approve Tanzanian nonprofit status and establishment year (2026),
mission/vision/story, the six programme areas, all impact values and their as-of
dates, team identities/roles, official contacts, and photography/location/consent.
The featured-project alt fields currently begin “This should describe the actual
image rather than the project generally…”; they need actual descriptions.
These statements were preserved, not independently substantiated or invented.

## 17. Environment/tooling limitations

The host's default Node 20 does not cover the installed tooling graph; checks used
an official Node 22.20 runtime downloaded into `/tmp`. Turbopack's CSS worker
failed to bind its internal port even on an escalated retry. A restricted webpack
attempt also failed reading TypeScript child-process output; escalated webpack
builds passed. The default build script was not changed to conceal the limitation.

The initial browser run encountered Sanity image upstream timeouts. The code did
not bypass image optimization or weaken remote patterns. Final image observations
are stated with the validation results. Chrome's generic fallback-font load test
also failed; checking the actual generated font families subsequently confirmed
all three custom fonts. No claim of exhaustive network or assistive-device
compatibility is made.
