# Smarte Theaterdienste — Sanity Studio

Eigenständiges Studio für M19. Es ist bewusst keine Next.js-Route und besitzt
eigene Abhängigkeiten sowie einen eigenen Lockfile. Die lokale Phase 2 umfasst
das vollständige semantische Inhaltsmodell mit 12 geschützten Singletons,
wiederverwendbaren Ressourcen/Comics und aufgabenorientierter Navigation.

## Lokaler Start

1. `.env.example` als `.env.local` kopieren.
2. Ziel-Projekt-ID und Dataset eintragen. Die Projekt-ID ist kein Secret;
   Schreib-Tokens gehören trotzdem ausschließlich in lokale/CI-Umgebungen.
3. Im Repository-Root `pnpm cms:dev` ausführen.

Die Root-App bleibt ohne Sanity-Konfiguration baubar. Für reine Schema-Prüfungen
kann eine syntaktisch gültige Test-Projekt-ID per Prozess-Environment gesetzt
werden; `sanity schemas validate` greift nicht auf Inhaltsdaten zu.

## Qualitätsbefehle

- `pnpm cms:validate` — Studio-Schema inklusive Warnstufe validieren
- `pnpm cms:typegen` — Schema extrahieren und Frontend-Typen erzeugen
- `pnpm cms:migrate` — JSON-Schema-Vertrag prüfen und Erstimport-Sollmengen als schreibfreien Dry Run simulieren
- `pnpm cms:verify` — zusätzlich Quellschlüssel, Studio-Singletons, Sollzahlen und DE/EN-Parität strikt prüfen

Der verifizierte Erstimport-Sollstand umfasst 65 Dokumente: 12 Singletons,
4 Personen, 4 FAQ-Kategorien, 21 FAQ-Einträge, 6 Termine, 4 Partner,
3 Beiträge, 8 Ressourcen, 1 Comic und 2 Locale-Spiegel. TypeGen erzeugt aktuell
86 Schematypen; produktive GROQ-Querytypen kommen in Phase 3 hinzu.

Content-Schreibmigration, Readback und Deployment folgen in den späteren
M19-Phasen. Bis dahin werden keine Dokumente oder Assets im Content Lake verändert.

Singleton-Actions, admin-sichtbare Bereiche und `readOnly`-Felder schützen den
Studio-Workflow, nicht das Dataset gegen API-/CLI-Zugriffe. Vor dem Handoff müssen
deshalb Rollen und Grants im gewählten Sanity-Projekt separat konfiguriert und
mit eingeschränkten Credentials getestet werden.
