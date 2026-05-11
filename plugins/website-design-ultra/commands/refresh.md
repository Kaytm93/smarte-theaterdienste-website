---
description: Refresht bestehendes Design in eine neue ästhetische Direktion. Behält Funktionalität, ändert Look & Feel komplett.
---

# /refresh

Du wirst bestehendes Frontend in eine neue Direktion „refreshen". Funktionalität bleibt, Aesthetik wird neu.

## Workflow

1. **Scope** — Welche Datei(en)? Welche neue Direktion will der User?
   - Wenn User Direktion nennt (z.B. „mach es brutalist"): direkt anwenden
   - Wenn User keine Direktion nennt: 3 Vorschläge aus `style-directions` machen, User wählen lassen

2. **Lade alle relevanten Skills**:
   - `style-directions` — Direktion-Details
   - `color-palettes` — neue Palette
   - `typography` — neue Font-Pairings
   - `motion-system` — neuer Designer-Bias passend zur Direktion
   - `component-patterns` — neue Patterns wo passend
   - `ui-states` — Skeleton/Error in neuem Look

3. **Refresh-Strategie**:
   - **CSS-Variablen umbiegen** statt Komponenten neu schreiben (wenn vorhanden)
   - **Hero komplett tauschen** (alte Direktion bleibt sonst sichtbar)
   - **Motion-Profil austauschen** (Emil-Style → Jhey-Style fühlt sich anders an, auch ohne Layout-Änderung)
   - **Banned Patterns rauswerfen** (Inter raus, Lila raus, h-screen raus)

4. **Vorher/Nachher-Diff**:
   - Was bleibt? (Funktionalität, Datenstruktur, States)
   - Was ändert sich? (Palette, Typo, Motion-Profil, Hero-Variante, Card-Style)
   - Was muss installed werden? (`npm install …`)

5. **Output**:
   - 1 Satz: alte Direktion → neue Direktion + Grund
   - Geänderte Dateien (komplett, nicht nur Diffs — sonst Copy-Paste-Bruch)
   - Anpass-Hooks falls User noch feinjustieren will

## Wann KEIN /refresh, sondern /design?

- Wenn der existierende Code so fragmentiert ist, dass Patch teurer wäre als Neuschreiben
- Wenn der User „komplett neue Seite" sagt — dann /design

## Niemals

- Direktion mid-Refresh wechseln
- Mehrere Direktionen vermischen im Output
- Funktionalität ändern ohne Erwähnung
