// Zet een backup van project A (pipeline_state en council_runs) terug.
// 1. Download op GitHub: Actions → Supabase Keepalive → een run → artifact project-a-backup-….
// 2. Pak het uit, bijvoorbeeld in ./backup
// 3. node herstel-pipeline.mjs ./backup            (laat zien wat er zou gebeuren)
//    node herstel-pipeline.mjs ./backup --echt     (schrijft echt; bestaande rijen met dezelfde sleutel worden overschreven)
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const map = process.argv[2];
const echt = process.argv.includes('--echt');
if (!map || !existsSync(map)) { console.error('Gebruik: node herstel-pipeline.mjs <map-met-json> [--echt]'); process.exit(1); }

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const m = html.match(/^\s*A: \{ url: '([^']+)', key: '([^']+)'/m);
if (!m) { console.error('Kon url/key van project A niet vinden in index.html'); process.exit(1); }
const [, url, key] = m;

const tabellen = { pipeline_state: 'key', council_runs: 'id' };
for (const [tabel, sleutel] of Object.entries(tabellen)) {
  const bestand = join(map, `${tabel}.json`);
  if (!existsSync(bestand)) { console.log(`${tabel}: geen bestand, overgeslagen`); continue; }
  const rijen = JSON.parse(readFileSync(bestand, 'utf8'));
  console.log(`${tabel}: ${rijen.length} rijen in de backup`);
  if (!echt || !rijen.length) continue;
  for (let i = 0; i < rijen.length; i += 200) {
    const r = await fetch(`${url}/rest/v1/${tabel}?on_conflict=${sleutel}`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(rijen.slice(i, i + 200))
    });
    if (!r.ok) { console.error(`${tabel}: HTTP ${r.status} ${await r.text()}`); process.exit(1); }
  }
  console.log(`${tabel}: teruggezet`);
}
if (!echt) console.log('\nDit was een proefrun. Voeg --echt toe om te schrijven.');
