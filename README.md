# Capacity Finance — website V1

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. No other runtime dependencies.
Brand: Concept 2 (CF monogram), refined — see the Brand Guide.

```bash
npm install
npm run dev                    # http://localhost:3000
npm run build && npm start     # production build
```

Every page is statically generated. Deploys as-is to Vercel, Netlify or any Node host.

## Where to edit things

| What | File |
| --- | --- |
| Logo files | `public/brand/` (component: `src/components/ui/Logo.tsx`) |
| Colours, type scale, shape & motion tokens | `src/app/globals.css` |
| Fonts | `src/fonts/` (Manrope text, Newsreader display), loaded in `src/app/layout.tsx` |
| Homepage copy, scenarios, adviser intro, image briefs | `src/content/home.ts` |
| Service copy, URLs, **regulatory status** | `src/content/services.ts` |
| Navigation (header + footer) | `src/content/navigation.ts` |
| Contact details, legal entity, regulatory placeholders | `src/content/site.ts` |
| Regulatory footer layout | `src/components/layout/Footer.tsx` |
| Enquiry form / delivery | `src/components/forms/EnquiryForm.tsx`, `src/app/api/enquiry/route.ts` |
| Line drawings (interim art) | `src/components/illustrations/` |
| Service page template | `src/components/templates/ServicePage.tsx` |
| Schema markup | `src/lib/schema.ts` |
| Analytics / conversion tracking | `src/lib/analytics/*`, `src/components/analytics/*`, `.env.example` |
| Cookie banner slot | `src/components/consent/CookieBanner.tsx` + `src/lib/analytics/consent.ts` |

## Design system (summary)

- **Type:** Newsreader (display serif, regular weight) for headings; Manrope for body and UI.
  One display moment per page (`type-display` / `type-h1`); section headings are `type-h2`/`type-h3`.
- **Shape:** from the monogram — `crop-stem` (the F's quarter-round) on images and the button
  corner; `bowl-tl` (the C's bowl) on navy section boundaries; the sage bar as accent rule/marker.
- **Colour:** off-white canvas, navy for authority and the two full-navy bands, sage only for
  rules, markers and active states (sage-dark when used as text).
- **Motion:** 180ms ease-out underlines, arrow nudges and the menu fade; disabled under
  `prefers-reduced-motion`.

## Photography

Image slots show architectural line drawings until real photography is supplied. Put licensed
images in `public/images/` and set `src` on the slot in `src/content/home.ts` — each slot has an
art-direction `brief`. Avoid handshakes, skylines and generic office stock.

## Enquiries

The form posts to `/api/enquiry`. Set `ENQUIRY_WEBHOOK_URL` (CRM, Zapier/Make, email service) to
deliver enquiries; without it they're only written to the server log. Needs a Node host (Vercel,
Netlify, etc.) — not a static export.

## Routes

`/` · `/about` · `/privacy-policy` · `/cookie-policy` · `/complaints`

Services are grouped the same way everywhere (homepage index, footer, page eyebrows) —
edit `serviceGroups` in `src/content/services.ts`:

| Your home & family | Property investment & development | Your business |
| --- | --- | --- |
| `/mortgages` | `/bridging-finance` | `/business-premises-mortgages` |
| `/company-director-mortgages` | `/development-finance` | `/asset-finance` |
| `/bridging-for-your-home` | `/commercial-investment-mortgages` | `/business-finance` |
| `/protection` | | |

`/commercial-mortgages` is an overview page that helps visitors choose between the two
commercial routes. `/regulated-bridging` permanently redirects to `/bridging-for-your-home`.

Each service route is a three-line file (`src/app/<slug>/page.tsx`) rendering the shared
`ServicePage` template. A service can carry an `explainer` — a plain-English block that explains a
distinction (e.g. why bridging on your home is regulated differently) so link labels stay jargon-free.

## Compliance structure

- Each service has `regulation: "to-confirm" | "regulated" | "unregulated" | "mixed"`.
  All are **"to-confirm"** and show a clearly marked placeholder. Change a status only once the
  principal firm confirms it and supplies approved wording.
- Footer carries separate placeholders for AR/principal wording, general regulatory wording and a
  regulated/unregulated product statement, plus the legal-entity trading-style line.
- No FCA numbers, AR wording, statistics, awards, "best rate" or approval claims anywhere.
- `src/app/robots.ts` blocks indexing until launch; legal pages are `noindex`.
- Before launch, strip any `[PLACEHOLDER]` values from schema output (`src/lib/schema.ts`).

## Analytics & conversion tracking (off by default)

- Event names: `src/lib/analytics/events.ts` (`cta_click`, `phone_click`, `email_click`,
  `booking_click`, `form_start`, `form_submit`, `service_card_click`).
- Links are tagged declaratively with `data-track` / `data-track-label`; one listener
  (`TrackingListener`) forwards clicks to `window.dataLayer` (GA4 / GTM / Google Ads).
- Phone links carry `data-call-tracking` so a call-tracking (DNI) script can swap numbers.
- Forms: call `trackFormStart(id)` / `trackFormSubmit(id)` from `src/lib/analytics/track.ts`.
- IDs come only from env vars (copy `.env.example` → `.env.local`). Nothing loads until IDs are set
  **and** `hasConsent()` returns true — i.e. after the cookie banner is built.

## Brand files

`public/brand/` was rebuilt from the Concept 2 artwork by `scripts/build-brand.py`
(monogram geometry + Manrope 800/400 wordmark as outlines). If you have the original final
brand files, copy them over `public/brand/` with the same filenames — no code changes needed
(update the ratios at the top of `Logo.tsx` if proportions differ).

```bash
pip install fonttools brotli uharfbuzz cairosvg
python3 scripts/build-brand.py
```
