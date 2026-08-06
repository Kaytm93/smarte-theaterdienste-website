# Smarte Theaterdienste — Sanity Studio

Eigenständiges Studio für M19. Es ist bewusst keine Next.js-Route und besitzt
eigene Abhängigkeiten sowie einen eigenen Lockfile.

## Lokaler Start

1. `.env.example` als `.env.local` kopieren.
2. Ziel-Projekt-ID und Dataset eintragen. Die Projekt-ID ist kein Secret;
   Schreib-Tokens gehören trotzdem ausschließlich in lokale/CI-Umgebungen.
3. Im Repository-Root `pnpm cms:dev` ausführen.

Die Root-App bleibt ohne Sanity-Konfiguration baubar. Für reine Schema-Prüfungen
kann eine syntaktisch gültige Test-Projekt-ID per Prozess-Environment gesetzt
werden; `sanity schemas validate` greift nicht auf Inhaltsdaten zu.

## Qualitätsbefehle

- `pnpm cms:validate` — Studio-Schema validieren
- `pnpm cms:typegen` — Schema extrahieren und Frontend-Typen erzeugen
- `pnpm cms:migrate` — Phase-0-Quelleninventur als Dry Run prüfen
- `pnpm cms:verify` — Inventur, Sollzahlen und DE/EN-Parität strikt prüfen

Content-Schreibmigration, Readback und Deployment folgen in den späteren
M19-Phasen. Bis dahin werden keine Dokumente oder Assets im Content Lake verändert.
