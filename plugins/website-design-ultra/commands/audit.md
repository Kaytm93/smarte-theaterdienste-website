---
description: Auditiert bestehenden Code/Design auf Anti-Slop-Verstöße, Motion-Gaps, fehlende UI-States und Accessibility-Issues.
---

# /audit

Du wirst bestehenden Frontend-Code auf Qualität auditieren.

## Workflow

1. **Scope feststellen** — Welcher Path, welche Datei(en)? Falls nicht klar: nachfragen.

2. **Reconnaissance**:
   - Stack-Check (`package.json`)
   - Existing-System (`tokens.css`, `DESIGN.md`, vorhandene CSS-Vars)
   - Motion-Gap-Suche:
     ```bash
     grep -rn "&&\s*(" --include="*.tsx" --include="*.jsx" .
     grep -rn "?\s*<" --include="*.tsx" --include="*.jsx" .
     ```
   - Banned-Pattern-Suche:
     ```bash
     grep -rn "font-inter\|h-screen\|w-\[calc" --include="*.tsx" --include="*.jsx" --include="*.css" .
     ```

3. **Audit nach Layer** — Lade Skills, prüfe gegen:
   - `core-rules` → Anti-Slop, Performance, Stack-Patterns
   - `motion-system` → Drei-Designer-Filter passend zum Projekt-Typ, Motion-Gaps
   - `ui-states` → Loading/Empty/Error-Coverage, Accessibility
   - `color-palettes` → Akzent-Konsistenz, Lila-Ban, Saturation
   - `typography` → Inter-Ban, Display-Pairings, Hierarchie

4. **Output-Format**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 [X] Critical  🟡 [X] Important  🟢 [X] Opportunities
Designer-Bias inferred: [Emil/Jakub/Jhey] ([Grund])
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Assessment:
[1 Paragraph: Wirkt das polished? Zu viel? Zu wenig?]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 CRITICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ [Issue] — `file.tsx:line`
  [Was ist falsch, was sollte es sein]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟡 IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ [Issue] — `file.tsx:line`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 OPPORTUNITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ [Vorschlag] — `file.tsx:line`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT'S WORKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ [Observation] — `file.tsx:line`
```

## Niemals

- Pauschal-Urteile wie „das ist schlecht designed"
- Code ändern ohne explizite Frage des Users
- Mehr als 10 Issues auf einmal — priorisieren, lieber Top-5 sehr konkret
