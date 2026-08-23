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

### Der Push IST der Obsidian-Sync
Kay liest den Obsidian-Vault direkt im Projekt unter `SMARTE-THEATERDIENSTE/`.
Einen Spiegel unter `~/Documents/` gibt es nicht mehr — nichts dorthin
kopieren oder rsyncen. Der gepushte Stand auf `origin/main` ist genau der,
den Obsidian zeigt.

### Reihenfolge zwingend: 1 → 2
Erst Vault schreiben, dann committen+pushen.
