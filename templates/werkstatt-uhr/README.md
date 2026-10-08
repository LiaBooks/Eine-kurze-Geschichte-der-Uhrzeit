<!--
author:   Teaching-Agent für „Eine kurze Geschichte der Uhrzeit“
email:    LiaScript@web.de
version:  0.1.0
language: de
narrator: Deutsch Female
comment:  Werkstatt-Uhr — interaktive Uhren, Tag/Nacht-Regler, Zeitstrahl, Timer,
          Übungsuhr und historische Zeitmesser (Sonnenuhr, Sanduhr, Wasseruhr)
          als LiaScript-Template. Ohne externe Bibliotheken, touch-tauglich.
license:  CC BY 4.0

script:   ./werkstatt-uhr.js

@Uhr.zeige: <lia-keep><wu-clock mode="static" time="@0"></wu-clock></lia-keep>

@Uhr.zeige.digital: <lia-keep><wu-clock mode="static" time="@0" digital="12"></wu-clock></lia-keep>

@Uhr.einzeiger: <lia-keep><wu-clock mode="static" single time="@0"></wu-clock></lia-keep>

@Uhr.einzeiger.spiel: <lia-keep><wu-clock mode="single" time="@0"></wu-clock></lia-keep>

@Uhr.einzeiger.zonen: <lia-keep><wu-clock mode="static" single zones time="@0"></wu-clock></lia-keep>

@Uhr.einzeiger.zonen.spiel: <lia-keep><wu-clock mode="single" zones time="@0"></wu-clock></lia-keep>

@Uhr.spiel: <lia-keep><wu-clock mode="play" time="@0" digital="12"></wu-clock></lia-keep>

@Uhr.minutenkranz: <lia-keep><wu-clock mode="static" minutes time="@0"></wu-clock></lia-keep>

@Uhr.minutenkranz.spiel: <lia-keep><wu-clock mode="play" minutes time="@0" digital="12"></wu-clock></lia-keep>

@Uhr.spiel.ohne: <lia-keep><wu-clock mode="play" time="@0"></wu-clock></lia-keep>

@Uhr.spanne: <lia-keep><wu-clock mode="span" time="@0" count></wu-clock></lia-keep>

@Kurslink: <script run-once modify="false">(function () { let abs = "@1"; try { const base = decodeURIComponent(location.search.slice(1)); abs = new URL("@1", /^https?:/.test(base) ? base : location.href).href } catch (e) {} return "HTML: <a href=\"" + location.origin + location.pathname + "?" + abs + "\">@0</a>" })()</script>

@Uhr.sprich: <script>window.WU.speakForms(window.WU.parseTime("@0")).join(" · ")</script>

@Uhr.tageszeit: <script>window.WU.dayPart(window.WU.parseTime("@0"))</script>

@Uhr.uebersetzer: <lia-keep><wu-translator time="@0"></wu-translator></lia-keep>

@TagNacht: <lia-keep><wu-daynight time="@0"></wu-daynight></lia-keep>

@Zeitstrahl: <lia-keep><wu-timeline start="@0" end="@1"></wu-timeline></lia-keep>

@Timer.schaetzen: <lia-keep><wu-timer mode="estimate" seconds="@0"></wu-timer></lia-keep>

@Timer.zaehlen: <lia-keep><wu-timer mode="count" seconds="@0"></wu-timer></lia-keep>

@Pruefstein.einstieg: <lia-keep><wu-check mode="entry" lz="1 2"></wu-check></lia-keep>

@Pruefstein.fuehrerschein: <lia-keep><wu-check mode="final" lz="1 2 3 4 5"></wu-check></lia-keep>

@Uebungsuhr: <lia-keep><wu-practice></wu-practice></lia-keep>

@Uebungsuhr.lz: <lia-keep><wu-practice lz="@0"></wu-practice></lia-keep>

@Sonnenuhr: <lia-keep><wu-sundial time="@0"></wu-sundial></lia-keep>

@Sanduhr: <lia-keep><wu-hourglass seconds="@0"></wu-hourglass></lia-keep>

@Pendel: <lia-keep><wu-pendulum></wu-pendulum></lia-keep>

@Wasseruhr: <lia-keep><wu-waterclock marks="@0" seconds-per-mark="@1"></wu-waterclock></lia-keep>


@Uhr.stellen: @Uhr.stellen_(@uid,@0)

@Uhr.stellen_
<lia-keep><wu-clock id="wu-@0" mode="play" time="12:00" solution="@1"></wu-clock></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Dreh zuerst den langen Zeiger auf die Minuten, der kurze wandert von selbst mit. Steht der kurze dann bei der richtigen Stunde?" -->
[[!]]
<script>window.WU.check("wu-@0", "@1", "@input")</script>
@end


@Uhr.einzeiger.stellen: @Uhr.einzeiger.stellen_(@uid,@0,@1)

@Uhr.einzeiger.stellen_
<lia-keep><wu-clock id="wu-@0" mode="single" time="12:00" solution="@1" solution-to="@2"></wu-clock></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Weißt du noch? Kurz nach = gerade vorbei, in der Mitte = halb dort, fast = kurz davor." -->
[[!]]
<script>window.WU.check("wu-@0", "@1", "@input", "@2")</script>
@end


@Uhr.ablesen
<lia-keep><wu-clock mode="static" time="@0"></wu-clock></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Erst der Kurze: Welche Zahl hat er zuletzt überholt? Das ist die Stunde. Dann der Lange: Zähl in 5er-Schritten." -->
[[ @0 ]]
<script>window.WU.sameTime(`@input`, "@0", 720)</script>
@end


@Uhr.schreibe
<!-- data-text-failed="Noch nicht ganz. 💡 Vorne die Stunde, hinten die Minuten: :00 bei „… Uhr“, :30 bei „halb“. Bei „halb“ ist die Stunde noch die Zahl davor!" -->
[[ @0 ]]
<script>window.WU.sameTime(`@input`, "@0", 720)</script>
@end


@Uhr.ablesen24
<lia-keep><wu-clock mode="static" time="@0"></wu-clock></lia-keep>

Es ist **<script>window.WU.dayPart(window.WU.parseTime("@0"))</script>**.

<!-- data-text-failed="Noch nicht ganz. 💡 Nach 12 Uhr mittags zählt man weiter: 13, 14, 15 … Ist es morgens oder abends?" -->
[[ @0 ]]
<script>window.WU.sameTime(`@input`, "@0", 1440)</script>
@end


@Uhr.reparieren: @Uhr.reparieren_(@uid,@0,@1)

@Uhr.reparieren_
<lia-keep><wu-clock id="wu-@0" mode="repair" wrong="@1" time="@2"></wu-clock></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Schau auf den langen Zeiger: Wie weit ist die Stunde schon? Der kurze Zeiger muss genauso weit zwischen zwei Zahlen stehen." -->
[[!]]
<script>window.WU.check("wu-@0", "@2", "@input")</script>
@end


@Uhr.spanne.stellen: @Uhr.spanne.stellen_(@uid,@0,@1)

@Uhr.spanne.stellen_
<lia-keep><wu-clock id="wu-@0" mode="span" time="@1" solution="@2"></wu-clock></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Zähl die bemalten Stücke in 5er-Schritten: 5, 10, 15 …" -->
[[!]]
<script>window.WU.check("wu-@0", "@2", "@input")</script>
@end


@TagNacht.stellen: @TagNacht.stellen_(@uid,@0)

@TagNacht.stellen_
<lia-keep><wu-daynight id="wu-@0" mode="task" time="12:00" solution="@1"></wu-daynight></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Morgens oder abends? Schau auf den Himmel. Und denk dran: Der Stundenzeiger läuft zweimal am Tag herum." -->
[[!]]
<script>window.WU.check("wu-@0", "@1", "@input")</script>
@end


@Zeitstrahl.aufgabe
<lia-keep><wu-timeline mode="task" start="@0" end="@1"></wu-timeline></lia-keep>

<!-- data-text-failed="Noch nicht ganz. 💡 Spring zuerst bis zur vollen Stunde, dann weiter. Drück auf „Nächster Sprung“ und zähl die Sprünge zusammen." -->
[[ @2 ]]
<script>window.WU.checkDuration(`@input`, "@0", "@1")</script>
@end
-->

# Werkstatt-Uhr

                                 --{{0}}--
Dieses Template bringt alle interaktiven Uhren für den Kurs „Eine kurze
Geschichte der Uhrzeit“ mit. Alles ist selbst gebaut, ohne fremde Bibliotheken,
und funktioniert mit Maus, Finger und Tastatur.

**Import** (im Kopf einer Kursdatei):

```
import: ../../templates/werkstatt-uhr/README.md
```

Nach der Veröffentlichung auf GitHub die feste Version verwenden, z. B.
`import: https://raw.githubusercontent.com/{owner}/{repo}/{tag}/templates/werkstatt-uhr/README.md`.

**Feste Regeln, die das Template erzwingt**

1. Die Zeiger sind immer gekoppelt: Wer den Minutenzeiger dreht, bewegt den Stundenzeiger mit.
2. Der Stundenzeiger ist kurz und dick, der Minutenzeiger lang und dünn.
3. Die Farben sind auf jeder Seite gleich. Sie lassen sich nur zentral über CSS-Variablen ändern:
   `--wu-hour`, `--wu-minute`, `--wu-face`, `--wu-ink`, `--wu-span`, `--wu-span2`, `--wu-accent`.

## `@Uhr.zeige` und `@Uhr.einzeiger`

Eine Uhr, die nur anzeigt:

`@Uhr.zeige(7:45)`

@Uhr.zeige(7:45)

Mit Digitalanzeige: `@Uhr.zeige.digital(3:20)`

@Uhr.zeige.digital(3:20)

Die Uhr mit nur einem Zeiger (wie alte Turmuhren): `@Uhr.einzeiger(3:10)`

@Uhr.einzeiger(3:10)

---

Mit farbigen Zonen zwischen den Zahlen (zweiter Übungsweg): `@Uhr.einzeiger.zonen(7:30)` —
zum Ziehen: `@Uhr.einzeiger.zonen.spiel(3:00)`

@Uhr.einzeiger.zonen(7:30)

## `@Uhr.minutenkranz` — jede Zahl ist ein 5er-Schritt

Uhr mit äußerem Minutenkranz (in der Farbe des Minutenzeigers) — Hilfe und zweiter Übungsweg ab Unit 3:
`@Uhr.minutenkranz(3:30)` · zum Ziehen: `@Uhr.minutenkranz.spiel(3:00)`

@Uhr.minutenkranz(3:30)

## `@Uhr.spiel` — Zeiger ziehen

Zieh am langen oder am kurzen Zeiger. Der andere Zeiger wandert mit.
Mit der Tastatur: Pfeiltasten = 1 Minute, Umschalt + Pfeil = 5 Minuten, Bild ↑/↓ = 1 Stunde.

`@Uhr.spiel(8:00)`

@Uhr.spiel(8:00)

Ohne Digitalanzeige: `@Uhr.spiel.ohne(8:00)` — Nur der Stundenzeiger, in 5er-Schritten:
`@Uhr.einzeiger.spiel(3:00)`

@Uhr.einzeiger.spiel(3:00)

## `@Uhr.stellen` — Aufgabe: Uhr stellen

Das Kind stellt die Uhr; LiaScript prüft. „Lösung zeigen“ dreht die Zeiger auf die richtige Zeit.

`@Uhr.stellen(7:45)`

Stell die Uhr auf **7:45**.

@Uhr.stellen(7:45)

---

Mit nur einem Zeiger: „Stell den Zeiger auf **kurz nach drei**.“ — erlaubt ist ein Bereich:
`@Uhr.einzeiger.stellen(3:05,3:20)`

@Uhr.einzeiger.stellen(3:05,3:20)

## `@Uhr.ablesen` — Aufgabe: Uhrzeit eintippen

Akzeptiert `7:45`, `07:45`, `7.45`, `7 Uhr 45` — und am analogen Zifferblatt auch `19:45`.

`@Uhr.ablesen(7:45)`

Wie spät ist es?

@Uhr.ablesen(7:45)

---

Nur aufschreiben, ohne Uhr — z. B. „Schreib **halb vier** mit Ziffern“: `@Uhr.schreibe(3:30)`

@Uhr.schreibe(3:30)

---

Mit Tageszeit, Antwort im 24-Stunden-Format: `@Uhr.ablesen24(19:30)`

@Uhr.ablesen24(19:30)

## `@Uhr.reparieren` — das kaputte Zahnrad

Der Minutenzeiger stimmt, aber der Stundenzeiger ist verrutscht. Das Kind zieht ihn an die richtige Stelle.
Erster Wert: falsche Anzeige, zweiter Wert: richtige Zeit.

`@Uhr.reparieren(8:45,7:45)`

Diese Uhr soll **Viertel vor acht** zeigen. Ein Zahnrad ist kaputt — repariere den kurzen Zeiger!

@Uhr.reparieren(8:45,7:45)

## `@Uhr.spanne` — Der Minutenzeiger malt

Zieh den langen Zeiger vorwärts: Die Fläche zeigt, wie viel Zeit vergangen ist.

`@Uhr.spanne(7:45)`

@Uhr.spanne(7:45)

---

Als Aufgabe: „Der Lack trocknet 25 Minuten. Mal die Zeit!“ — `@Uhr.spanne.stellen(7:45,25)`

@Uhr.spanne.stellen(7:45,25)

## `@Uhr.sprich` und `@Uhr.uebersetzer`

`@Uhr.sprich(7:45)` → @Uhr.sprich(7:45)

`@Uhr.sprich(8:20)` → @Uhr.sprich(8:20)

`@Uhr.tageszeit(19:30)` → @Uhr.tageszeit(19:30)

Die Übersetzungsmaschine: `@Uhr.uebersetzer(8:15)`

@Uhr.uebersetzer(8:15)

## `@TagNacht` — zwei Runden am Tag

`@TagNacht(7:00)`

@TagNacht(7:00)

---

Als Aufgabe (ohne Digitalanzeige): „Stell **19:30** ein.“ — `@TagNacht.stellen(19:30)`

@TagNacht.stellen(19:30)

## `@Zeitstrahl` — die volle Stunde ist ein Bahnhof

`@Zeitstrahl(8:40,10:15)`

@Zeitstrahl(8:40,10:15)

---

Über Mitternacht: `@Zeitstrahl(21:30,6:45)`

@Zeitstrahl(21:30,6:45)

---

Als Aufgabe (dritter Wert = angezeigte Musterlösung; geprüft wird immer die echte Dauer):
`@Zeitstrahl.aufgabe(7:45,8:20,35 min)`

Wie lange dauert es von 7:45 bis 8:20?

@Zeitstrahl.aufgabe(7:45,8:20,35 min)

## `@Timer` — Zeitgefühl

Schätzen: `@Timer.schaetzen(60)`

@Timer.schaetzen(60)

---

Eine Minute sichtbar ablaufen lassen (z. B. Atemzüge zählen): `@Timer.zaehlen(60)`

@Timer.zaehlen(60)

## `@Uebungsuhr`

Zufällige Aufgaben zu allen fünf Lernzielen — so oft man will, ohne Punkte.

`@Uebungsuhr` oder nur ein Lernziel: `@Uebungsuhr.lz(4)`

@Uebungsuhr

## `@Pruefstein` — Einstiegs-Check & Uhren-Führerschein

Eine Aufgabe nach der anderen, immer neue Uhrzeiten, **keine Punkte**. „🤷 Weiß ich noch nicht“
ist eine gültige Antwort. Am Ende schreibt Tilda, was schon klappt und wobei sie hilft.

* `@Pruefstein.einstieg` — je 5 Aufgaben zu LZ 1 (Zeiger & Ablesen) und LZ 2 (Uhrzeit sagen),
  danach Tildas Empfehlung, mit welcher Unit man anfängt.
* `@Pruefstein.fuehrerschein` — je 5 Aufgaben zu allen fünf Lernzielen; geschafft ist ein
  Lernziel mit 4 von 5. Wer alles schafft, bekommt den Uhren-Führerschein.

Das Element meldet sein Ergebnis als Ereignis `wu-result` (`detail.scores`, `detail.startUnit`, `detail.passed`).

@Pruefstein.einstieg

---

@Pruefstein.fuehrerschein

## Historische Zeitmesser

`@Sonnenuhr(9:00)` — mit Wolken-Knopf

@Sonnenuhr(9:00)

---

`@Sanduhr(30)` — Sekunden, bis der Sand durch ist

@Sanduhr(30)

---

`@Wasseruhr(6,5)` — 6 Striche, im Zeitraffer 5 Sekunden pro Strich

@Wasseruhr(6,5)

---

`@Pendel` — weit oder wenig schwingen lassen und 10 Sekunden zählen: gleich viele Schwünge

@Pendel

## `@Kurslink` — zu einer anderen Kursdatei

Ein normaler Markdown-Link auf eine andere `README.md` öffnet nur den Rohtext.
`@Kurslink` bleibt im LiaScript-Viewer (DevServer und veröffentlicht):

`@[Kurslink(Zur Demo-Startseite)](./README.md)`

@[Kurslink(Zur Demo-Startseite)](./README.md)

## Hilfsfunktionen für eigene Skripte

`window.WU` stellt bereit:

| Funktion | Zweck |
|---|---|
| `WU.parseTime("7:45")` | Uhrzeit → Minuten seit 0:00 (`null` bei Unsinn) |
| `WU.fmt(465)` / `WU.fmt(1185, {h12:true})` | Minuten → `7:45` / `7:45` |
| `WU.parseDuration("1 h 35 min")` | Dauer → Minuten (`95`); akzeptiert auch `95`, `1:35`, `95 min` |
| `WU.between("21:30","6:45")` | Dauer zwischen zwei Uhrzeiten, auch über Mitternacht |
| `WU.speak(465,"nach")` / `WU.speak(465,"viertel")` | „Viertel vor acht“ / „dreiviertel acht“ |
| `WU.speakForms(T)` | alle üblichen Sprechweisen als Liste |
| `WU.dayPart(T)` | „morgens“, „abends“ … |
| `WU.sameTime(a,b,720)` | gleiche Uhrzeit am Zifferblatt? (`1440` = 24-h-genau) |
| `WU.say(text)` | Vorlesen mit deutscher Stimme |
