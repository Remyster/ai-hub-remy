# Remy's AI Hub — Project Overzicht
*Laatst bijgewerkt: 3 augustus 2026*

## Wat is dit?
Persoonlijk AI dashboard als single-page application (SPA) in één `index.html` bestand (~390KB). Draait via GitHub Pages op `remyster.github.io/ai-hub-remy/`. Geen framework, geen build-stap.

Eigenaar: Remy Egberts | GitHub: Remyster/ai-hub-remy

**Let op: repo is en blijft publiek** — GitHub Pages op gratis account vereist publieke repo.

---

## Bestandsstructuur
```
index.html           — Volledige applicatie (HTML + CSS + JS)
manifest.json        — PWA manifest
icon-192.png/jpeg
icon-512.png/jpeg
CLAUDE.md
update_pipelines.py  — Hulpscript voor pipeline-updates (niet gecommit)
```

---

## Supabase projecten

### Project A — StekkerSlim AI Control
- **Project ID:** `dezyzzkuqkpljhprcbrg`
- **URL:** `https://dezyzzkuqkpljhprcbrg.supabase.co`
- **Variabelen in code:** `SS_SBURL`, `SS_SBKEY`
- **Key type:** `anon`
- **Tabellen:** `pipeline_state`, `ss_assets`, `ss_pipeline_steps`, `ss_project_assets`, `ss_projects`, `ss_site_pages`, `werk_links`, `km_registratie`, `km_defaults`

### Project B — Vaste Lasten / Weekplanner
- **Project ID:** `mdslvdrsggpksqrbtwci`
- **URL:** `https://mdslvdrsggpksqrbtwci.supabase.co`
- **Variabelen in code:** `SB_URL`, `SB_KEY`
- **Key type:** `anon`
- **Tabellen:** `vaste_lasten`, `betalingen`, `spaarrekeningen`, `app_settings`, `weekplanner_items`, `brain_dumps`, `context_blocks`

---

## Tabs in de app

| Tab | Functie | Supabase project |
|-----|---------|-----------------|
| 🚀 AI Pipeline | StekkerSlim workflow (3 pipelines) | A |
| 📝 Prompts | Prompt builder | — |
| 💭 Brain Dump | Losse gedachtes sync | B |
| 📅 Week Planner | Taken + foto import (GoodNotes) | B |
| 💰 Vaste Lasten | Financieel dashboard | B |
| 🔌 Werk | Werk links + KM registratie | A |

---

## AI Pipeline

Drie pipelines voor StekkerSlim. Elke stap opent een AI-tool, prompt wordt geplakt, antwoord wordt opgeslagen in localStorage + cloud sync.

### Pipeline overzicht

| Pipeline | Sleutel | Stappen | Doel |
|----------|---------|---------|------|
| Blog Pipeline | `blog` | 13 | Blog van idee tot gepubliceerde HTML |
| Site Guardian Pipeline | `site` | 5 | Technische audit + prijscheck + actielijst |
| SEO & Growth Pipeline | `seo` | 4 | Groeikansen + content gaps + actieplan |

---

### Blog Pipeline — 13 stappen

| Stap | AI | Functie |
|------|----|---------|
| 1 | Gemini + Grok | Blogideeën (multi-AI) |
| 2 | Perplexity | Selectie & factcheck |
| 3 | Gemini | Content gap & SEO |
| 4 | StekkerPen (Claude) | Outline schrijven |
| 5 | Grok | Outline review |
| 6 | Perplexity | Feitencheck |
| 7 | Gemini | SEO finaal |
| 8 | StekkerPen (Claude) | Blog schrijven |
| 9 | Alle AI's | Review ronde |
| 10 | StekkerPen (Claude) | Commentaar verwerken |
| 11 | Alle AI's | Finaal oordeel |
| 12 | StekkerPen (Claude) | Finale HTML |
| 13 | Stekkerslim Bouwen (Claude) | Publicatiecheck |

---

### Site Guardian Pipeline — 5 stappen

Controleert technische kwaliteit, feiten, UX én affiliate-prijzen. Eindigt met direct uitvoerbare actielijst.

| Stap | AI | URL/Project | Functie |
|------|----|-------------|---------|
| 1 | Gemini | `gemini.google.com/u/0/gem/53bd2e7c05e5` | Technische & SEO audit — **GitHub als primaire bron** |
| 2 | Perplexity | `perplexity.ai/spaces/stekkerslim-IQjlJvLZSK6wtieIkk186A` | Feiten, prijzen, regelgeving, affiliate-controle |
| 3 | Grok | `grok.com/project/d222c79a-aa16-4fb2-a97d-0f966afd9cb4` | UX, contentkwaliteit, conversie-kansen |
| 4 | Claude + Nimble | Stekkerslim Bouwen (`019d39d8`) | **Affiliate prijscheck** via `nimble_extract` — compact tabel |
| 5 | Claude | Stekkerslim Bouwen (`019d39d8`) | Definitieve actielijst + HTML-snippets + changelog |

**Stap 4 Nimble — wat het doet:**
- Leest 9 HTML-pagina's via GitHub-connector
- Extraheert affiliate-productlinks met prijzen
- Volgt trackers (lt45.net / glp8.net / awin1.com) door naar echte productpagina
- Scrapet actuele prijs met `nimble_extract`
- Output: alleen tabel (product / pagina / verkoper / mijn prijs / actuele prijs / aanwezig / match)
- Marstek Venus E 3.0: niet via Amazon zoeken — Bol.com (€1.389) + marstek.nl (€1.299)

**Stap 5 Claude — wat het levert:**
- Gesorteerde actielijst (kritiek / middel / laag, max 5 per categorie)
- Per kritieke fix: bestandsnaam + regelnummer + HTML-snippet klaar om te plakken
- Prijscorrecties uit Nimble: bestandsnaam + oude tekst + nieuwe tekst
- Changelog / commit message klaar voor git

---

### SEO & Growth Pipeline — 4 stappen

Vindt groeikansen, valideert ze, vergelijkt met Kennisbank, maakt uitvoerbaar plan.

| Stap | AI | URL/Project | Functie |
|------|----|-------------|---------|
| 1 | Grok | `grok.com/project/9247065e-9506-47ce-a63c-0aeb349d2447` | 10 groeikansen — **GitHub als primaire bron** |
| 2 | Perplexity | `perplexity.ai/spaces/stekkerslimm-seo-growth-7bvx1_2jSSSd5vlLQnOuwg` | Valideert top-5 met zoekdata |
| 3 | Gemini | `gemini.google.com/u/0/gem/c2b213f954f9` | Content gaps vs Kennisbank (GitHub + Google Drive) |
| 4 | Claude | StekkerPen (`019d81ab-821e-759d-ab21-47cb923f03cf`) | Definitief actieplan + 7-dagenplan + quick win |

**Stap 4 Claude — wat het levert:**
- TOP 3 best course of action
- 7-dagenplan (dag 1–7: taak + verwacht resultaat)
- Quick win (vandaag uitvoerbaar, met bestandsnaam + HTML-snippet)
- Langetermijnkans (effect over 2–3 maanden)
- Changelog / commit message klaar voor git

---

## GitHub werkwijze in Claude-stappen

Alle Claude-stappen (site stap 5, seo stap 4) bevatten expliciete instructies:

**OPHALEN:** Haal altijd eerst de actuele staat op via de GitHub-connector (Remyster/stekkerslim). Vertrouw niet alleen op de pipeline-input.

**PUSHEN:** Push na een fix naar `main` via de GitHub-connector. Na elke push triggert de GitHub Action `sync-drive.yml` automatisch en synct `/Kennisbank/*.md` naar Google Drive — Gemini en andere Gems zien updates dan direct.

### GitHub Action — sync-drive.yml (stekkerslim repo)
- Trigger: push naar `main` op pad `Kennisbank/**`
- Script: `Scripts/sync-drive.js`
- Doel: overschrijft bestaande bestanden in Drive (behoudt file-ID, Gem-koppelingen blijven intact)
- Drive folder ID: `1n0648OBFmfUegMY1zZi-4nD_Ge3O6pRK`
- Secret: `GDRIVE_SA_KEY` (service account JSON)

---

## Pipeline UI — technische details

### LocalStorage sleutels
- Normale stap: `ssp_<pipeline>_<stapIdx>` (bijv. `ssp_site_0`)
- Multi-AI stap: `ssp_<pipeline>_<stapIdx>_<aiKey>` (bijv. `ssp_blog_0_gemini`)
- Project naam: `ssp_projectname_<pipeline>`

### Functies
| Functie | Wat |
|---------|-----|
| `sspRender()` | Herrendert de actieve stap (label, prompt, output, knoppen) |
| `sspSetPipeline(p)` | Wisselt pipeline, reset naar stap 0 |
| `sspNextStep()` / `sspPrevStep()` | Navigeer stappen |
| `sspSave()` | Sla antwoord op in localStorage |
| `sspDelete()` | Verwijder antwoord van huidige stap |
| `sspClearAll()` | **Wist alle antwoorden van de hele pipeline** (met bevestigingsdialog) |
| `sspShare()` | Deel/kopieer antwoord |
| `sspRenderDots()` | Tekent voortgangsdots (groen = gedaan, paars = actief) |

### "Wis alles" knop
- Verschijnt **alleen op stap 1 en de laatste stap** van elke pipeline
- Oranje styling (`rgba(251,146,60,...)`) — onderscheidt zich van rode Verwijder-knop
- Vraagt bevestiging via `confirm()` met pipelinenaam + aantal stappen
- Wist alle `ssp_<pipeline>_*` sleutels uit localStorage

---

## Claude AI Projects (agents in de hub)

| Agent | Project ID | Doel |
|-------|-----------|------|
| Dr. NeuroCut | — | Medische vragen |
| Nova R&D | — | PWN werk, onderzoek |
| Atlas | — | Algemeen onderzoek |
| Voltex Coder | — | Code, Home Assistant, programmeren |
| AI Hubby | — | AI Hub features |
| Stekkerslim Bouwen | `019d39d8-8ed9-77a5-984e-f584661c27d1` | Site development, prijscheck, actielijst |
| StekkerPen | `019d81ab-821e-759d-ab21-47cb923f03cf` | Content writing, SEO actieplan |
| StekkerBoost | `019d81ab-2911-729d-93f0-64301e8be8e9` | Marketing |
| DoopieVault | — | Crypto/trading |

---

## Claude API key

Opgeslagen in `app_settings` tabel (Project B, `setting_key: 'claude_api_key'`). Bewuste keuze zodat de key cross-device beschikbaar is zonder opnieuw in te voeren.

**Trade-off:** Key is technisch uitleesbaar via de publieke anon key. Praktisch risico is laag (obscure URL, geen SEO). RLS staat aan met permissive policy — opzettelijk.

**Aanbeveling:** Rouleer de Claude API key periodiek (bijv. maandelijks) via console.anthropic.com.

---

## AI Council (toegevoegd 3 augustus 2026)

Eén vraag parallel naar 3 AI's via OpenRouter — geen kruisgesprek, geen rondes. Kaart bij **Mijn Agents** (`openCouncil()`), aparte overlay in `index.html`.

### Flow
1. Vraag intypen + optioneel context-blokken aanvinken (zie hieronder)
2. `councilAsk()` roept 3 modellen **parallel** aan via OpenRouter (`Promise.allSettled`, elk met eigen 60s timeout via `AbortController`)
3. Antwoorden verschijnen los naast elkaar in 3 kaarten — geen samenvoegen
4. Optionele synthese-knop: `councilSynthesize()` stuurt vraag + alle 3 antwoorden naar 2 onafhankelijke "voorzitters" die overeenkomsten/verschillen/advies geven

### Modellen (constanten `COUNCIL_MODELS` / `COUNCIL_SYNTH_MODELS`, bovenaan bij de AI Council JS)
| Rol | Model-ID | Bijzonderheid |
|-----|----------|----------------|
| Council #1 | `google/gemini-3.5-flash:online` | |
| Council #2 | `x-ai/grok-4.5:online` | |
| Council #3 | `anthropic/claude-sonnet-5:online` | |
| Voorzitter #1 | `anthropic/claude-sonnet-5` | geen `:online` — redeneert over reeds gegronde antwoorden |
| Voorzitter #2 | `openai/gpt-5.6-terra` | |

**⚠️ Belangrijke les:** een hoog versienummer in een model-ID (bv. "Sonnet 5", "Gemini 3.5") betekent NIET dat de kennis actueel is. Alle geteste modellen rapporteerden zelf een trainings-cutoff rond begin 2025, los van hun naam. Daarom staat `:online` achter elk Council-model — dat zet OpenRouter's web-search grounding aan. Dit kost ~10-15x meer tokens per call (~€0,03-0,05 per model i.p.v. een paar cent), vandaar de expliciete instructie in de systeemprompt om antwoorden onder de ~200 woorden te houden. Check bij twijfel over actualiteit altijd eerst of `:online` nog aanstaat, niet alleen of het model-ID "nieuw" klinkt.

Gemini 2.5 Pro (eerste keuze) bleek een "thinking"-model dat 20-90+ sec kon hangen door lange interne reasoning, vandaar de overstap naar flash-varianten + de timeout.

### Context-bibliotheek
Tabel `context_blocks` (Project B): `id, naam, tekst, volgorde, created_at, updated_at`. CRUD via `ctxLoad()` / `ctxSaveNew()` / `ctxSaveEdit()` / `ctxDelete()`. Checkboxen renderen op 2 plekken (`ctxRenderInto('pb-ctx-list')` in Prompt Builder, `ctxRenderInto('council-ctx-list')` in de Council) maar delen dezelfde selectie via localStorage (`remy_ctx_selected_v1`) — vink je een blok aan in de ene, staat het ook aan in de andere.

### Prompt Builder — Council-modus
Extra pill "🏛️ Council" naast Claude/Gemini/Perplexity/ChatGPT/Copilot/Grok/Multi. Schrijft een model-neutrale vraag (geen platform-specifieke trucjes) i.p.v. een platform-geoptimaliseerde prompt. Na genereren verschijnt knop "🏛️ Stuur naar Council" (`pbSendToCouncil()`) die de prompt in het Council-vraagveld zet en de overlay opent — verstuurt niet automatisch, zodat je 'm eerst kan nalezen.

### OpenRouter key
Zelfde patroon als Claude key: opgeslagen in `app_settings` (`setting_key: 'openrouter_api_key'`), los invoerveld in het bestaande API Key-modal (`saveOpenRouterKey()` / `syncOpenRouterKeyFromCloud()`).

---

## Beveiliging — gedaan (29 juli 2026)

RLS ingeschakeld op alle UNRESTRICTED tabellen:

**Project A (dezyzzkuqkpljhprcbrg):**
```sql
ALTER TABLE pipeline_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON pipeline_state FOR ALL TO anon USING (true) WITH CHECK (true);
```

**Project B (mdslvdrsggpksqrbtwci):**
```sql
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON app_settings FOR ALL TO anon USING (true) WITH CHECK (true);

ALTER TABLE brain_dumps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON brain_dumps FOR ALL TO anon USING (true) WITH CHECK (true);

ALTER TABLE weekplanner_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON weekplanner_items FOR ALL TO anon USING (true) WITH CHECK (true);

-- 3 augustus 2026, bij aanmaken context_blocks meteen RLS aangezet
ALTER TABLE context_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON context_blocks FOR ALL TO anon USING (true) WITH CHECK (true);
```

Permissive policies zijn bewust — app gebruikt anon keys zonder user auth.

---

## Technische regels

- Alles in één `index.html` — geen aparte JS/CSS bestanden
- Supabase via REST API (`fetch` calls), geen officiële SDK
- `anon` keys in frontend — bewuste keuze voor persoonlijk gebruik
- Pipeline state: `localStorage` als primaire opslag, Supabase als cloud backup
- Repo publiek houden — GitHub Pages vereiste
- Pipelines aanpassen via `update_pipelines.py` (Python script) — niet direct in de minified JS prutsen
- Em-dash in JS-strings: gebruik letterlijk `—` (6 tekens), niet de echte — zodat de browser het correct rendert

---

## Changelog

### 3 augustus 2026 (commit 5cbe70b)
- **AI Council toegevoegd**: kaart bij Mijn Agents, parallel Gemini 3.5 / Grok 4.5 / Claude Sonnet 5 (web-search grounding via `:online`) + synthese-stap met Sonnet 5 + GPT-5.6-terra — zie sectie "AI Council" hierboven voor volledige details
- **Context-bibliotheek**: nieuwe Supabase-tabel `context_blocks`, CRUD UI gedeeld tussen Prompt Builder en AI Council
- **Prompt Builder**: nieuwe "Council"-modus + "Stuur naar Council"-knop
- **OpenRouter key**: opslag in `app_settings`, los veld in API Key-modal
- **Header**: snelkoppelingen (kleine key-buttons) naar Tools & Platforms + Mijn Projecten toegevoegd
- **Tools & Platforms**: GitHub naar boven verplaatst
- **StekkerSlim sectie**: volgorde AI Pipeline → Bouwen → Pen/Boost/Desk (eigen roze kleur), ook toegevoegd aan Losse AI-checkers pills

### 31 juli 2026 (commit aa32f1d + cc73771)
- **Site Guardian**: uitgebreid van 3 naar 5 stappen
  - Stap 1 Gemini: GitHub-connector toegevoegd als primaire bron
  - Stap 4 Nimble: nieuw — affiliate prijscheck via `nimble_extract`
  - Stap 5 Claude: nieuw — actielijst + HTML-snippets + prijscorrecties + GitHub push
- **SEO Growth**: uitgebreid van 3 naar 4 stappen
  - Stap 3 Gemini: GitHub-connector toegevoegd als primaire bron
  - Stap 4 Claude: nieuw — groeiplan + 7-dagenplan + quick win + GitHub push
- **Alle Claude-stappen**: expliciete GitHub ophalen/pushen instructies + sync-drive.yml uitleg
- **Delete-all knop**: `sspClearAll()` toegevoegd, verschijnt op stap 1 + laatste stap

### 29 juli 2026 (commit 21ce9f9)
- Site Guardian en SEO Growth pipelines uitgewerkt naar 3 stappen elk
- CLAUDE.md aangemaakt

### Eerder
- Supabase RLS gefixed op 4 tabellen (beide projecten)
- Repo gekloond, PWA manifest, iconen
