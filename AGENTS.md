<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Projektregeln für Agenten

## Projektkontext-Vault zuerst lesen

Bevor Code geändert wird, muss der Projektkontext im Obsidian-Vault gelesen werden:

1. `SMARTE-THEATERDIENSTE/START_HIER.md` — Navigation
2. `SMARTE-THEATERDIENSTE/KONTEXT.md` — vollständiger technischer Stand
3. `SMARTE-THEATERDIENSTE/DASHBOARD.md` — was läuft, was als nächstes
4. `SMARTE-THEATERDIENSTE/PROBLEME.md` — bekannte Bugs & TODOs
5. `SMARTE-THEATERDIENSTE/MUSTER.md` — Code-Patterns, insbesondere Next.js 16

Bei inhaltlicher Arbeit zusätzlich `SMARTE-THEATERDIENSTE/INHALTE.md` lesen.
Bei DB- oder API-Arbeit zusätzlich `SMARTE-THEATERDIENSTE/API.md` lesen.

## Pflicht-Routine am Ende jeder Session

Die Session gilt erst als abgeschlossen, wenn diese Reihenfolge vollständig erledigt ist:

### 1. Vault-Dateien im Projekt aktualisieren

Im Projekt-Vault unter `SMARTE-THEATERDIENSTE/` aktualisieren:

- `DASHBOARD.md` — Status, "Was gerade läuft", "Nächste Schritte"
- `KONTEXT.md` — Dateipfade-Tree bei Strukturänderungen
- `PROBLEME.md` — gelöste Bugs markieren, neue Bugs/TODOs eintragen
- `CHANGELOG.md` — neuer Eintrag mit Datum und Commit-SHA
- `ENTSCHEIDUNGEN.md` — neue ADRs bei Architektur-Entscheidungen

Wenn mindestens drei Dateien geändert wurden oder ein grundlegendes Problem gelöst wurde, zusätzlich eine Session-Datei anlegen:

`SMARTE-THEATERDIENSTE/verlauf/SESSION_YYYY-MM-DD.md`

### 2. Git: Commit und Push

- Nur projektrelevante Dateien stagen.
- Nicht stagen: `.claude/`, `.env.local`, lokale Secrets, Binaries oder Obsidian-User-Config.
- Commit-Format: `git commit -m "<Milestone-Tag>: <Titel>"` mit aussagekräftigem Body.
- Push auf `origin main`: `git push origin main`.
- Keine `Co-Authored-By: Claude`-Zeilen verwenden. Repo-Owner ist Kaytm93.
- Ohne Push ist die Session nicht abgeschlossen.

### Der Push IST der Obsidian-Sync

Kay liest den Obsidian-Vault direkt im Projekt unter `SMARTE-THEATERDIENSTE/`.
Einen Spiegel unter `~/Documents/` gibt es nicht mehr — nichts dorthin
kopieren oder rsyncen. Der gepushte Stand auf `origin/main` ist genau der,
den Obsidian zeigt.

Die Reihenfolge ist verbindlich: erst Vault schreiben, dann committen und pushen.
