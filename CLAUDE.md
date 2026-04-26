@AGENTS.md

# 📚 Projektkontext-Vault

Bevor du irgendwas am Code anfasst, **lies den Obsidian-Vault**:

1. `SMARTE-THEATERDIENSTE/START_HIER.md` — Navigation
2. `SMARTE-THEATERDIENSTE/KONTEXT.md` — vollständiger technischer Stand
3. `SMARTE-THEATERDIENSTE/DASHBOARD.md` — was läuft, was als nächstes
4. `SMARTE-THEATERDIENSTE/PROBLEME.md` — bekannte Bugs & TODOs
5. `SMARTE-THEATERDIENSTE/MUSTER.md` — Code-Patterns (Next.js 16!)

Bei inhaltlicher Arbeit zusätzlich `INHALTE.md`. Bei DB/API zusätzlich `API.md`.

---

# 🔁 Pflicht-Routine am Ende JEDER Session

**Diese Reihenfolge ist verbindlich, ohne Ausnahme:**

### 1. Vault-Dateien aktualisieren (im Projekt-Vault)
Im Projekt unter `SMARTE-THEATERDIENSTE/`:
- `DASHBOARD.md` — Status, „Was gerade läuft", „Nächste Schritte"
- `KONTEXT.md` — Dateipfade-Tree wenn Strukturänderungen
- `PROBLEME.md` — gelöste Bugs ✅, neue Bugs eintragen
- `CHANGELOG.md` — neuer Eintrag mit Datum + Commit-SHA
- `ENTSCHEIDUNGEN.md` — neue ADRs falls Architektur-Entscheidung
- Bei ≥3 geänderten Dateien oder grundlegendem Problem gelöst:
  `SMARTE-THEATERDIENSTE/verlauf/SESSION_YYYY-MM-DD.md` anlegen

### 2. Git: Commit & Push
- `git add` nur projektrelevante Dateien (kein `.claude/`, `.env.local`, Binaries)
- `git commit -m "<Milestone-Tag>: <Titel>"` mit aussagekräftigem Body
- `git push origin main`
- Keine `Co-Authored-By: Claude`-Zeilen — Repo-Owner ist Kaytm93
- Ohne Push ist die Session **nicht abgeschlossen**

### 3. Obsidian-Sync nach `~/Documents/SMARTE-THEATERDIENSTE/`
**Pflicht, sonst sieht der User die Updates nicht in Obsidian.**

Der User öffnet seinen Obsidian-Vault aus `~/Documents/SMARTE-THEATERDIENSTE/`,
nicht aus dem Projektordner. Nach jedem Vault-Update zwingend rsync hinterher:

```bash
rsync -av --exclude '.obsidian' --exclude '.DS_Store' \
  "/Users/kaygewinner/Desktop/Claude code/smarte-theaterdienste-website/SMARTE-THEATERDIENSTE/" \
  ~/Documents/SMARTE-THEATERDIENSTE/
```

Verifikation:
```bash
diff -r --brief --exclude '.obsidian' --exclude '.DS_Store' \
  "/Users/kaygewinner/Desktop/Claude code/smarte-theaterdienste-website/SMARTE-THEATERDIENSTE/" \
  ~/Documents/SMARTE-THEATERDIENSTE/
```
Output muss leer sein (oder „VAULTS IN SYNC" via `&&`-Echo).

**Niemals** `.obsidian/` mitsynchronisieren — das ist Obsidian-User-Config (Workspace, Plugins) und gehört nicht ins Repo.

### Reihenfolge zwingend: 1 → 2 → 3
Erst Vault schreiben, dann committen+pushen, dann syncen. So enthält der Documents-Vault denselben Stand wie der Commit auf `origin/main`.
