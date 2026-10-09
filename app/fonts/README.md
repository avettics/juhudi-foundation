# Self-hosted application fonts

Retrieved 2026-10-09 from the official Google Fonts distribution. These are
unmodified normal-style, Latin variable WOFF2 files, matching the Latin fonts
preloaded by the previous `next/font/google` configuration. They retain the
full weight ranges: DM Sans 100–1000, Manrope 200–800, Geist Mono 100–900.
DM Sans uses the Google-served weight-only font, preserving its default optical
size rather than enabling an additional optical-size axis.

`app/layout.tsx` loads these files through `next/font/local`. Next.js emits
hashed local assets; the source URLs below are provenance only, never imports
or build-time downloads. No font package or download script is required.

All three fonts use the SIL Open Font License 1.1. Keep the accompanying
family-specific OFL files (including copyright notices) with redistributed
copies. No visible attribution is required on the website.

These assets cover the current Latin-script UI. If the site adds other scripts,
add the corresponding official font coverage deliberately.

## DM Sans

- File: `dm-sans-latin-variable.woff2`
- Official binary: https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2
- License source: https://github.com/google/fonts/blob/5b35b7208dd4100571326fdf37f030b32a524232/ofl/dmsans/OFL.txt
- SHA-256: `9fea608a947e67020c33cad9a6fe3d60c54119dfb8cff87768a8117a15ed7543`

## Manrope

- File: `manrope-latin-variable.woff2`
- Official binary: https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2
- License source: https://github.com/google/fonts/blob/b31870aff700ab7a1d74fa0c6887d95beb9e0037/ofl/manrope/OFL.txt
- SHA-256: `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972`

## Geist Mono

- File: `geist-mono-latin-variable.woff2`
- Official binary: https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2
- License source: https://github.com/google/fonts/blob/9e25e2ba265e5298f70f6182dd4e8a3ebf1b9123/ofl/geistmono/OFL.txt
- SHA-256: `684ad5b531f81d43c1e8c7038262d5db7cdc1f68006e04d6c7769efa8d33c8cc`
