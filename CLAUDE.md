# Remy's AI Hub — Project Overzicht
*Laatst bijgewerkt: 20 augustus 2026*

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

| Stap | AI | Functie | Krijgt als input |
|------|----|---------|---|
| 1 | Gemini + Grok | Blogideeën (multi-AI) | — |
| 2 | Perplexity | Selectie & factcheck | stap 1 (Gemini + Grok) |
| 3 | Gemini | Content gap & SEO | stap 2 |
| 4 | StekkerPen (Claude) | Outline schrijven | stap 3 |
| 5 | Grok | Outline review | stap 4 |
| 6 | Perplexity | Feitencheck | stap 4 (outline) + stap 5 (Grok-review) |
| 7 | Gemini | SEO finaal | stap 4 + stap 5 + stap 6 |
| 8 | StekkerPen (Claude) | Blog schrijven | stap 4 + stap 5 + stap 6 + stap 7 |
| 9 | Alle AI's | Review ronde | stap 8 (blog) |
| 10 | StekkerPen (Claude) | Commentaar verwerken | stap 8 + stap 9 |
| 11 | Alle AI's | Finaal oordeel | stap 10 |
| 12 | StekkerPen (Claude) | Finale HTML | stap 10 + stap 11 |
| 13 | Stekkerslim Bouwen (Claude) | Publicatiecheck | stap 12 |

**Let op:** stap 6, 7 en 8 hebben *cumulatief* alle voorgaande artefacten nodig (niet
alleen de direct voorafgaande stap) — zie changelog 18 augustus 2026 voor de reden.

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
| Nova R&D | — | Theorie & onderzoek — het waarom achter een proces |
| Atlas | — | Techniek in de praktijk — PWN-installaties, pompen, storingen |
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

## Toolkits — FMHY + OSINT4All (16 augustus 2026)

Twee kleine knoppen in de **header** (`🧰 Gratis Tools` en `🕵️ Uitzoeken`) openen dezelfde overlay (`toolkit-overlay`) via `openToolkit('fmhy')` / `openToolkit('osint')`. Stonden tot 17 augustus 2026 als kaart in Tools & Platforms.

**Waarom zo:** beide bronsites zijn onbruikbaar groot. De hub bevat een *handgeschreven, ingedikte* kopie in de constante `TOOLKITS` — geen scrape, geen sync. Categorieën staan standaard dichtgeklapt (`<details>`), zodat je nooit een muur tekst ziet.

| | Categorieën | Tools |
|---|---|---|
| `fmhy` | 22 (groepen Wiki + Tools) | 282 |
| `osint` | 11 (groepen Checken/Zoeken/Controleren) | 104 |

FMHY dekt alle wiki- en tool-secties van fmhy.net, inclusief de download-/torrent-kant. Non-English is overgeslagen (geen Nederlandse sectie). OSINT4All is teruggebracht tot wat praktisch is: de Amerikaanse people-search en fake-ID-generators zijn eruit, er zijn NL-bronnen (KVK, CBS, PDOK, Kadaster, Rechtspraak) en een categorie "🔧 Je eigen site doorlichten" bij gezet voor StekkerSlim.

### Functies
| Functie | Wat |
|---------|-----|
| `openToolkit(key)` / `closeToolkit()` | Overlay openen op `fmhy` of `osint` |
| `toolkitRenderCats()` | Tekent groepskoppen + dichtgeklapte categorieën |
| `toolkitAsk()` | "Wat heb je nodig?" → Haiku via OpenRouter, max 3 tools terug |
| `toolkitSurprise()` | 3 willekeurige tools, geen API-call — puur om op ideeën te komen |

**`toolkitAsk()` detail:** de hele lijst past in één prompt, dus er is géén zoekindex of embedding nodig — `TOOLKIT_ASK_MODEL` (`anthropic/claude-haiku-4.5`) krijgt gewoon alles mee. Hergebruikt `callOpenRouter()` en dezelfde OpenRouter-key als de AI Council. Antwoord komt terug als `NAAM | URL | waarom`-regels; URL's die niet met `http(s)://` beginnen worden vervangen door de bron-URL, zodat een hallucinerende link nergens heen wijst.

## 📍 Plaats-knop + herinneringen (20 augustus 2026)

De knop **📍 Plaats** in de smart bar (`smartAutoPlaats()`) doet vijf dingen achter elkaar:
kijken wát het is, een datum kiezen, opslaan, een herinnering klaarzetten, en daarna in
een paneel laten zien wat er precies gebeurd is.

### 1. Wat is het
Haiku geeft JSON terug met `type` (`taak` / `boodschap` / `afspraak` / `sport` /
`brain_dump`), `datum`, `tijd`, `duur_min`, `agenda`, `herinner_min`, `tekst` en
`waarom` — die laatste is één zin die in het paneel komt te staan, zodat je ziet
waaróm het daar terechtkwam.

### 2. Datumregel — dit is de kern
**Alleen op vandaag als de notitie dat ook echt zegt.** Getest tegen `SMART_VANDAAG_RE`
(vandaag, vanavond, vanmiddag, straks, nu, meteen…). Staat er niks van dat alles in:

| Notitie | Wordt |
|---------|-------|
| "vanavond 20:00 sporten" | vandaag |
| "melk halen" | **morgen** |
| "donderdag tandarts" (het ís donderdag) | donderdag **volgende week** |
| datum in het verleden | zelfde weekdag vooruit |

Deze controle staat **in de code**, niet alleen in de prompt (`smartAutoPlaats`, blok
"Datum vaststellen"). Reden: dit is de regel die Remy expliciet wilde, die mag niet
afhangen van hoe het model die dag luimt. Voorheen was de promptregel *"anders vandaag"*,
waardoor elke losse gedachte op vandaag belandde.

Datums worden nu als volledige datum opgeslagen, niet meer geklemd binnen de huidige week.

### 3. Agenda
`agenda: true` bij een echte afspraak met een tijdstip. Het paneel toont dan
**📅 Google Agenda** (template-link, zelfde patroon als `agendaModalToevoegen`) en
**📥 .ics voor iPhone** (`smartDownloadIcs()`, met `VALARM`).

### 4. Herinneringen (`REM_KEY` = `hub_herinneringen_v1`)
Bij een tijdstip wordt automatisch een herinnering klaargezet. `remTick()` draait elke
30s plus bij `visibilitychange` (timers lopen in een slapende tab niet door) en vuurt op
`herinner_min` vóór het moment én op het moment zelf: een `Notification` als dat mag, plus
altijd de banner `#rem-banner` met Gezien / 10 min snoozen / Planner. Belletje `#rem-btn`
in de smart bar toont het aantal; `remOpenLijst()` laat ze zien en laat ze weghalen.

**⚠ Eerlijk over de grens hiervan:** er is geen server, dus geen echte web push. Deze
meldingen komen alleen zolang de hub ergens openstaat (tab of als PWA). Moet het
gegarandeerd afgaan met alles dicht, dan is de Google Agenda- of .ics-knop de route —
die laten de agenda-app van de telefoon het werk doen. Dat staat ook zo in `remOpenLijst()`
op het scherm.

Toestemming voor meldingen wordt **nooit bij het laden** gevraagd, alleen na een klik op
🔔 Herinner me of "Meldingen aanzetten" — buiten een echte klik blokkeren browsers dat
verzoek alsnog.

### 5. Resultaatpaneel (`smartToonResultaat()`)
Onder de smart bar: wat het geworden is, de opgeschoonde tekst, het waarom, een gele regel
als de datum is bijgestuurd, en knoppen — 🔔 Herinner me · 📅 Google Agenda · 📥 .ics ·
📆 Andere dag (`smartVerschuif()`) · 🗓️ Weekplanner (springt naar de juiste week) ·
↩️ Ongedaan maken (`smartOngedaan()`, verwijdert de zojuist aangemaakte rij en zet de
tekst terug in het invoerveld).

Daarvoor wordt bij de POST `Prefer: return=representation` meegestuurd, zodat het `id`
van de nieuwe rij bekend is. Let op: weekplanner-id's zijn **getallen**, maar via een
`onclick`-attribuut komen ze als tekst terug — vergelijk ze altijd via `remZelfdeId()`.

---

## Command Palette — ⌘K / Ctrl+K (20 augustus 2026)

Eén zoekveld over de hele hub. Openen met `⌘K` / `Ctrl+K` (werkt ook terwijl je in een
tekstvak typt) of via de knop **🔍 Zoek alles** vooraan in de header. Overlay
`#cmdk-overlay`, box `#cmdk-box`.

**Waarom:** de header telt inmiddels ~19 knoppen en de twee toolkits samen 386 tools.
Bladeren werkt op die schaal niet meer; typen wel. De palette indexeert ~475 dingen.

### Wat er in de index zit (`cmdkBuildIndex()`)
| Bron | Aantal | Hoe |
|------|--------|-----|
| Vaste acties (`CMDK_ACTIES`) | 20 | handmatige lijst |
| Kaarten (`.card`) | 25 | uit de DOM, tag = sectienaam |
| Header-knoppen (`.hbtn`) | 12 | uit de DOM |
| Losse AI-checkers (`.ss-pill`) | 6 | uit de DOM |
| Pipelinestappen | 22 | uit `SSP_PIPELINES` |
| Toolkit-tools | 387 | uit `TOOLKITS` |
| Brain dumps | max 40 | uit `dumpGet()` |

De DOM-bronnen worden bij élke `cmdkOpen()` opnieuw gescand, dus een nieuwe header-knop
of kaart staat automatisch in de palette — niks registreren. Een element uitsluiten kan
met `data-cmdk-skip="1"`. Uitvoeren gebeurt via `el.click()`, dus bestaande `onclick`- en
`target="_blank"`-gedrag blijft precies hetzelfde.

### Functies
| Functie | Wat |
|---------|-----|
| `cmdkOpen(voorvulling)` / `cmdkClose()` | Overlay openen/sluiten, index wordt bij openen herbouwd |
| `cmdkBuildIndex()` | Verzamelt alle doorzoekbare items |
| `cmdkMatch(q, tekst)` | Scoort een zoekterm tegen één tekst |
| `cmdkZoek(q)` | Sorteert alle treffers; leeg veld → "Vaak gebruikt" + "Snel naar" |
| `cmdkKies(i)` | Voert het gekozen item uit en telt het mee in de frecency |

**Zoeken:** eerst exacte deeltreffer, anders subsequence — losse letters die in volgorde
voorkomen, zoals `vslst` → Vaste Lasten. Twee remmen op de subsequence, want zonder die
remmen matchte `outl` ook op "Return YouTube Dislike": de eerste letter moet op een
woordgrens staan, en de gevonden letters mogen niet te ver uit elkaar liggen. Losse
subsequence geldt pas vanaf 3 tekens.

**Frecency:** `localStorage` sleutel `cmdk_freq_v1`, max 60 items. Wat je vaak en
recent kiest komt hoger te staan en verschijnt bij een leeg veld onder "Vaak gebruikt".

---

## Pipeline-voortgang op de hub-kaart (20 augustus 2026)

De 🚀 AI Pipeline-kaart toont drie balkjes (blog / site / seo) met hoeveel stappen er al
een opgeslagen antwoord hebben — `sspRenderHubProgress()` leest dat rechtstreeks uit
localStorage. Klik op een balkje → `sspSpringNaar(p)` opent de wizard op de **eerste nog
lege stap** van die pipeline.

Gelijk houden gebeurt door `sspRender()` te wrappen: die draait na elke opslag en
verwijdering, dus dat is het goedkoopste haakje. Nieuwe pipeline toevoegen? Zet 'm ook in
`SSPP_KLEUR` en `SSPP_KORT`, anders valt hij terug op de standaardkleur.

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

### 20 augustus 2026
- **📍 Plaats-knop volledig herzien** — zie de sectie "Plaats-knop + herinneringen"
  hierboven. Belangrijkste: de oude promptregel was *"dag: alleen invullen als een dag
  expliciet genoemd wordt, anders vandaag"*, waardoor élke losse gedachte op de dag van
  vandaag belandde en de planning vollliep. Nu geldt het omgekeerde en staat het in code
  afgedwongen: alleen vandaag als de notitie dat ook echt zegt ("vandaag", "vanavond",
  "straks"), anders morgen of de genoemde dag in de toekomst. Verder: 5 categorieën in
  plaats van 3, echte datums (niet meer geklemd binnen deze week), automatische
  herinnering bij een tijdstip, agenda- en .ics-knop, en een resultaatpaneel met
  ongedaan maken.
- **Herinneringen + meldingen** (`hub_herinneringen_v1`, `remTick()`, `#rem-banner`,
  belletje in de smart bar). Werkt zolang de hub openstaat; voor gegarandeerd afgaan met
  alles dicht wijst de UI door naar Google Agenda of het .ics-bestand.
- **Command Palette (⌘K / Ctrl+K)** toegevoegd — één zoekveld over ~475 dingen: acties,
  kaarten, header-knoppen, losse AI-checkers, alle 22 pipelinestappen, alle 387
  toolkit-tools en je brain dumps. Zie de sectie "Command Palette" hierboven. Ook een
  knop **🔍 Zoek alles** vooraan in de header, want een sneltoets die je niet ziet
  bestaat niet.
- **Pipeline-voortgang op de hub-kaart**: drie balkjes op de 🚀 AI Pipeline-kaart laten
  zien hoever blog/site/seo staan, klikbaar naar de eerste nog lege stap. Voorheen moest
  je de wizard openen en door de dots scrollen om te zien waar je gebleven was.
- **Kapotte init gerepareerd**: de `window.addEventListener('load', …)`-handler begon met
  `updatePomoDisplay()`, een restant van een verwijderde pomodoro-timer. Die gooide een
  ReferenceError op de eerste regel, waardoor **de rest van de init nooit draaide** — dus
  `syncApiKeyFromCloud()`, `syncOpenRouterKeyFromCloud()` en `fetchVoorJou()` liepen op
  geen enkel apparaat. Op een nieuw apparaat betekende dat: geen keys uit de cloud, terwijl
  de hele reden om ze in `app_settings` te zetten juist cross-device beschikbaarheid was.
  Regel weg, en elke init-stap staat nu in een eigen `try/catch` zodat één kapotte aanroep
  de rest niet meer meesleurt.

### 18 augustus 2026
- **Pipeline "Opschonen"-knop**: bij elk antwoord-invoerveld (los en multi-AI) staat nu
  een 🧹 Opschonen-knop die het geplakte antwoord door `anthropic/claude-haiku-4.5`
  (via OpenRouter, `callOpenRouter()`) haalt en alleen bronstatus-blokken,
  connector-bevestigingen en voortgangsmeldingen verwijdert — de inhoud zelf blijft
  ongewijzigd. Reden: Remy plakte AI-antwoorden inclusief alle meta-rapportage
  (bronstatus, "connector werkte: ja") klakkeloos door naar de volgende stap, waardoor
  die stap een berg ruis kreeg in plaats van alleen het bruikbare antwoord. Schoont
  niet automatisch op — resultaat verschijnt in hetzelfde veld, pas na controle zelf
  op Opslaan klikken.
- **Downloadknop bij "prompt te lang"-hint** (`fileNote`-stappen, nu alleen stap 2):
  in plaats van dat Remy de samengestelde prompt zelf via Kladblok/Notities moest
  knippen-plakken (bron van kapotte tekens als â†’/â‚¬ en per ongeluk verkeerde stukken
  meenemen), staat er nu een directe downloadknop die exact `sspGetPrompt()`'s output
  als UTF-8 .txt-bestand wegschrijft — dat bestand is meteen correct, niks om mis te
  laten gaan.
- **Blog Pipeline bedrading gerepareerd**: stap 6, 7 en 8 kregen alleen de output van
  de direct voorafgaande stap mee, niet het artefact zelf. Daardoor beoordeelden
  Perplexity (6) en Gemini (7) een outline die ze nooit zagen, en schreef Claude in
  stap 8 de blog op basis van uitsluitend een SEO-scorelijst. `prevSources` van deze
  drie stappen bevat nu alle inputs die de prompt zelf opsomt, volgens hetzelfde
  patroon als stap 10 en 12.
- **INPUTCONTROLE-blok** toegevoegd aan stap 6, 7 en 8: bij een ontbrekend of nog
  ongevuld INPUT-blok stopt de AI en vraagt erom, in plaats van te reconstrueren.
- **Stap 3**: "PER IDEE" naar enkelvoud (werkt sinds de KEUZE VAN REMY-toevoeging maar
  aan één onderwerp, wat leidde tot "ID: N/A"). WINNAAR-blok uitgebreid met doelgroep,
  primaire zoekintentie, FAQ-vragen en factchecklijst zodat stap 4 die niet meer hoeft
  te verzinnen.
- **Linkverificatie** (stap 4, 8, 10, 12, 13): live site nu boven de raw-URL in de
  verificatievolgorde (Claude kan de raw-URL vanuit de chatinterface vaak niet
  betrouwbaar ophalen), plus expliciet verbod op google.com/search-links als
  "geverifieerde" interne link — die kwamen eerder als BESTAAT langs terwijl het
  zoeklinks waren.
- **Pipeline cross-device sync gerepareerd**: `sspSyncToCloud`/`sspLoadFromCloud`/
  archief-functies/`backupAlles` wezen voor de `pipeline_state`-tabel per ongeluk naar
  Project B (`SB_URL`), terwijl die tabel in Project A staat. Elke sync kreeg een 404,
  waarna `_sspCloudAvailable` voor de rest van de sessie stil op false ging — dus alles
  bleef alleen lokaal op het apparaat staan waar het ingevuld werd. Nu op `SS_SBURL` /
  nieuwe `SS_GET_HDR`/`SS_POST_HDR` gezet en end-to-end getest (POST/GET/DELETE).
- **Kluis: dual-code ontgrendeling**: in plaats van één hoofdwachtwoord wordt nu een
  willekeurige data-key tweemaal apart ingepakt (AES-256-GCM, PBKDF2 250.000 iteraties)
  — één keer met de dagelijkse code, één keer met een zelfgekozen herstelcode. Eén
  invoerveld accepteert beide; na 5 mislukte pogingen verandert alleen de hint-tekst
  ("gebruik je herstelcode"), de herstelcode werkt vanaf het begin al (bewuste keuze:
  een noodgreep die je niet eerst kunt "op slot zetten" heeft geen echt nut). Oude
  single-code meta (`salt`/`check_iv`/`check_ct`) wordt bij setup opgeruimd.
- **Kluis: CSV-import** toegevoegd (📥-knop naast + Nieuw): eigen RFC4180-parser
  (nodig omdat wachtwoorden zelf komma's en quotes kunnen bevatten), URL/bron/TOTP
  gaan in de notitie, upload in batches van 50.
- **AI Pipeline content**: nieuw "bestand-plakken"-hulpje (`ssp-filenote-block`) voor
  te lange prompts, DeepSeek toegevoegd aan de losse AI-checkers, Kimi K2.6 toegevoegd
  als 4e AI Council-model.

### 17 augustus 2026
- **Toolkit-kaarten naar de header**: 🧰 Gratis Tools en 🕵️ Uitzoeken zijn nu `.hbtn`-knoppen in `.header-btns` (tussen 🔐 Kluis en 🎮 Twitch), met een `title`-tooltip die uitlegt wat de toolkit is. Reden: als kaart stonden ze onderaan de pagina in Tools & Platforms en werden ze simpelweg nooit gezien.
- **Secties Tools & Platforms (`#sec-tools`) en Mijn Projecten (`#sec-projects`) verwijderd**: alle kaarten daaruit (GitHub, Drive, Photos, Gmail, Supabase, Kluis, Twitch, Home Assistant) bestonden al als kleine knop in de header — puur dubbelop. Geen JS verwees naar deze section-id's. Nieuwe tools voortaan als `.hbtn` in de header toevoegen, niet als kaart.
- **Toolkit-uitleg**: de `sub` van beide toolkits begint nu met "Wat dit is:" en legt in gewone taal uit wat *gratis tools* en *uitzoeken* betekenen — de losse kaart-ondertitel ("FMHY, uitgedund") viel weg met de sectie.
- **AI-kaarten in Algemeen tweeregelig**: elke `p.voorbeeld` heeft nu `→ algemeen: …<br>→ bij mij: …`. Eerst waar die AI in het algemeen goed voor is, dan het eigen voorbeeld. Voorheen stond er alleen een StekkerSlim-voorbeeld, wat de indruk gaf dat bijv. Claude alleen voor blogs was.
- **Hint onderaan aangepast** naar alleen "Esc om te sluiten" — er waren maar 3 kaarten met `data-key`, dus "Toets 1–8" klopte niet.
- Let op bij het schrijven van `TOOLKITS`-teksten: het zijn single-quoted JS-strings, dus geen apostrof in woorden als `programma's`.

### 16 augustus 2026
- **Algemeen-sectie**: DeepSeek en Kimi toegevoegd. Elke AI-kaart heeft nu twee regels: waar díé AI het beste in is (i.p.v. "OpenAI chats" / "Google AI"), en daaronder een concreet voorbeeld uit Remy's eigen werk via de nieuwe CSS-klasse `.card p.voorbeeld` (cursief, gestippelde scheidingslijn). Kimi ook in de toolkit-lijst gezet.
- **Mijn Agents**: Nova R&D en Atlas stonden allebei op "Research & Development" — nu uit elkaar getrokken. Nova = theorie/onderzoek, Atlas = techniek in de praktijk (PWN-installaties, pompen, storingen). Beide met voorbeeldregel.
- **Toolkits toegevoegd**: twee kaarten (FMHY + OSINT4All) → overlay met 33 dichtgeklapte categorieën en 386 tools, plus een Haiku-zoeker en een 🎲-knop. Zie sectie "Toolkits" hierboven.
- **Weer-locatie vraagt niet meer elke sessie** (`heroGetPosition`): de 12-uurs localStorage-cache loste het niet op, want iOS Safari verleent geolocatie standaard maar voor één sessie — dan wordt er niks gecachet en volgt bij de volgende load weer een prompt. Nu omgekeerd: vaste thuislocatie `HERO_FALLBACK_LOC` (Velserbroek) is de default, en `navigator.permissions.query` bepaalt of de echte positie überhaupt opgevraagd mag worden. Alleen bij state `granted` volgt een `getCurrentPosition()` — er wordt dus nooit meer spontaan een popup uitgelokt.
- **Vandaag Geleerd is actueel i.p.v. historisch** (`lu4LoadWiki`): prompt zoekt nu iets wat nu speelt, eraan komt, of uit de afgelopen 2 jaar komt (jaargrenzen worden dynamisch uit de systeemdatum berekend). De oude "vandaag in de geschiedenis"-opzet is expliciet verboden in de prompt.

### 6 augustus 2026 (commit ebeed67)
- **ING CSV import verbeterd** (`importCSV`, Vaste Lasten tab):
  - Scheidingsteken (`;` of `,`) wordt nu automatisch gedetecteerd op de headerregel — voorheen faalde de import stil (0 matches, geen foutmelding) bij een komma-gescheiden CSV
  - Niet-gematchte transacties (naam wijkt af van de post in de hub, bijv. "belastingdienst" of een abonnementsnaam) kunnen nu **handmatig gekoppeld** worden via een dropdown in het preview-scherm
  - Handmatige koppelingen worden onthouden in `localStorage` (`vlCsvAliassen`, sleutel = csv-naam lowercase → `vaste_last_id`) zodat dezelfde naam bij een volgende import automatisch matcht — geen code-aanpassing meer nodig per naamvariant
  - Let op: dit geheugen is per browser/apparaat, niet cloud-sync

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
