<!--
author:   Tilda Tick (Kurs: Eine kurze Geschichte der Uhrzeit)
email:    LiaScript@web.de
version:  0.1.0
language: de
narrator: Deutsch Female
mode:     Textbook
comment:  Ein Selbstlernkurs für Kinder der 3. und 4. Klasse: die Uhr lesen,
          stellen und verstehen — mit der Uhrmacherin Tilda Tick und einem
          Blick darauf, wie Menschen früher die Zeit gemessen haben.
          DEMO / in Arbeit.
attribute: Lizenz: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de);
           Fotos von Wikimedia Commons mit eigener Lizenz (wird am Bild angezeigt)

import:   ./templates/werkstatt-uhr/README.md
          https://raw.githubusercontent.com/LiaTemplates/Wikimedia/0.0.2/README.md
-->

# Eine kurze Geschichte der Uhrzeit

> 🚧 **Demo — noch in Arbeit.** Fertig sind der Einstieg, **Unit 1 bis 6** und
> drei Staunseiten. Weitere Units folgen.

Ein Selbstlernkurs für Kinder der 3. und 4. Klasse: die Uhr lesen, stellen und
verstehen — mit der Uhrmacherin **Tilda Tick**. Dazwischen liegen freiwillige
**Staunseiten** darüber, wie Menschen früher die Zeit gemessen haben.

Lizenz: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de) ·
Template: [Werkstatt-Uhr](./templates/werkstatt-uhr/README.md)

## Willkommen in der Werkstatt

                                 --{{0}}--
Tilda Tick, Uhrmacherin. Willkommen in meiner Werkstatt. Ich baue Uhren, die
jeder lesen kann. Dafür brauche ich jemanden, der sie testet. Das bist ab
heute du.

**Heute, drei Dinge:**

1. Meine Uhr ausprobieren.
2. Die schwierigste Uhrzeit einstellen, die dir einfällt.
3. Zeigen, was du schon kannst. Dann weiß ich, wo wir anfangen.

ungefähr 15–20 Minuten · keine Punkte

### Meine Werkstatt-Uhr

                                 --{{0}}--
Meine Werkstatt-Uhr. Kurzer, dicker Zeiger, langer, dünner Zeiger. Dreh am
langen Zeiger einmal ganz herum. Dann am kurzen.

@Uhr.spiel(12:00)

                                 --{{1}}--
Kurze Frage: Was macht der kurze Zeiger, während du am langen drehst?

[(steht)]   Er bleibt stehen.
[(wandert)] Er wandert ein Stück mit.
[(springt)] Er springt von Zahl zu Zahl.

<details>
<summary>Auflösung</summary>

Er **wandert mit**. Eine Runde vom langen Zeiger, und der kurze ist genau eine Zahl weiter.
Die beiden hängen an Zahnrädern zusammen. Der eine bewegt sich nie ohne den anderen.

</details>

### Meine schwierigste Uhrzeit

                                 --{{0}}--
Stell die schwierigste Uhrzeit ein, die dir einfällt. Ob du sie lesen kannst,
ist egal.

@Uhr.spiel.ohne(12:00)

                                 --{{1}}--
Wie sicher bist du bei dieser Uhrzeit?

[(1)] unsicher
[(2)] geht so
[(3)] meistens sicher
[(4)] sicher

                                 --{{2}}--
Merk dir die Uhrzeit oder schreib sie auf. Beim Uhren-Führerschein am Ende
frage ich danach.

### Zeig, was du schon kannst

                                 --{{0}}--
Zehn Aufgaben: fünf zu den Zeigern, fünf zur Uhr-Sprache. Wenn du etwas nicht
weißt, drück auf „Weiß ich noch nicht“. Das ist kein Fehler, sondern eine
nützliche Auskunft für mich.

@Pruefstein.einstieg

### So geht es weiter

                                 --{{0}}--
Danke. Mein Vorschlag, mit welcher Unit du anfängst, steht eine Seite vorher.
Ab jetzt läuft deine Kursuhr: zwanzig Minuten pro Unit, vier Stunden nach
zwölf Units.

                                 --{{1}}--
Ein Tipp vom Profi: höchstens eine Unit pro Tag. Gemerkt wird in den Pausen.

**Hier geht es weiter:**

| Unit | Was wir bauen |
|---|---|
| [Unit 1 · Die Uhr mit nur einem Zeiger](#7) | Die allererste Uhr |
| [Unit 2 · Der kurze Zeiger wandert](#19) | Volle und halbe Stunde |
| [Unit 3 · Der Minutenzeiger kommt dazu](#25) | Minuten in 5er-Schritten |
| [Unit 5 · Viertel nach, halb](#47) | Die Uhr-Sprache |
| [Unit 6 · Nach halb](#56) | „Viertel vor“, „zwanzig vor“ |
| **Unit 8 · Zwei Runden am Tag** *(kommt bald)* | 13 bis 24 Uhr |

— Tilda

## Unit 1 · Die Uhr mit nur einem Zeiger

                                 --{{0}}--
Heute auf der Werkbank: meine allererste Uhr. Alt, robust, und sie hat nur
einen Zeiger. Taugt die was? Das testen wir.

**Auftrag:** Uhr mit nur **einem** Zeiger testen — dem kurzen.

ungefähr 20 Minuten · keine Punkte

### Aufwärmen

                                 --{{0}}--
Zum Warmwerden. Steht der Zeiger genau auf einer Zahl, ist es so viel Uhr, wie
die Zahl sagt.

@Uhr.einzeiger(5:00)

Wie spät ist es?

- [( )] vier Uhr
- [(X)] fünf Uhr
- [( )] sechs Uhr

---

@Uhr.einzeiger(9:00)

Wie spät ist es?

- [( )] acht Uhr
- [( )] zehn Uhr
- [(X)] neun Uhr

### Ein Zeiger auf Wanderschaft

                                 --{{0}}--
Kurzer Zeiger, lange Reise: Er braucht eine ganze Stunde von einer Zahl zur
nächsten. Meistens steht er also irgendwo dazwischen. Zieh ihn langsam von der
Drei zur Vier.

@Uhr.einzeiger.spiel(3:00)

                                 --{{1}}--
Drei Stellen reichen für den Anfang. Gerade an der Drei vorbei: kurz nach
drei. Genau dazwischen: in der Mitte zwischen drei und vier. Kurz vor der Vier:
fast vier.

| kurz nach drei | in der Mitte zwischen drei und vier | fast vier |
|:---:|:---:|:---:|
| @Uhr.einzeiger(3:10) | @Uhr.einzeiger(3:30) | @Uhr.einzeiger(3:50) |
| gerade an der 3 vorbei | genau zwischen 3 und 4 | kurz vor der 4 |

                                 --{{2}}--
Die wichtigste Regel in der Werkstatt: Lies die Zahl, die der Zeiger schon
hinter sich hat. Bei fast vier ist die Vier noch nicht erreicht. Also noch
nicht vier Uhr.

> **Merksatz:** Die Stunde ist die Zahl, die der Zeiger **schon hinter sich** hat.

### Üben

                                 --{{0}}--
Jetzt der Praxistest. Lies ab. Wenn es hakt: Fragezeichen drücken, dann kommt
die Farb-Uhr als Hilfe.

@Uhr.einzeiger(7:30)

Wie spät ist es ungefähr?

- [( )] kurz nach sieben
- [(X)] in der Mitte zwischen sieben und acht
- [( )] fast acht
- [[?]] Farben: Gelb mit Punkten heißt in der Mitte. @Uhr.einzeiger.zonen(7:30)

---

@Uhr.einzeiger(10:10)

Wie spät ist es ungefähr?

- [(X)] kurz nach zehn
- [( )] in der Mitte zwischen zehn und elf
- [( )] fast elf
- [[?]] Farben: Blau heißt kurz nach. @Uhr.einzeiger.zonen(10:10)

---

@Uhr.einzeiger(1:50)

Wie spät ist es ungefähr?

- [( )] kurz nach eins
- [( )] kurz nach zwei
- [(X)] fast zwei
- [[?]] Welche Zahl hat der Zeiger zuletzt überholt? Und welche kommt gleich? @Uhr.einzeiger.zonen(1:50)

---

@Uhr.einzeiger(6:15)

Wie spät ist es ungefähr?

- [( )] fast sechs
- [(X)] kurz nach sechs
- [( )] in der Mitte zwischen sechs und sieben
- [[?]] Farben: Blau heißt kurz nach. @Uhr.einzeiger.zonen(6:15)

---

Stell den Zeiger auf **kurz nach zwei**.

@Uhr.einzeiger.stellen(2:05,2:20)

<details>
<summary>Hilfe: Farb-Uhr</summary>

Zum Üben mit Farben. Blau heißt **kurz nach**, Gelb mit Punkten **in der Mitte**, Lila mit Streifen **fast**.

@Uhr.einzeiger.zonen.spiel(12:00)

</details>

---

Stell den Zeiger auf **fast elf**.

@Uhr.einzeiger.stellen(10:40,10:55)

<details>
<summary>Hilfe: Farb-Uhr</summary>

Fast elf heißt: Der Zeiger ist **kurz vor** der Elf — im lila Feld mit Streifen.

@Uhr.einzeiger.zonen.spiel(12:00)

</details>

### Zeig, was du kannst

                                 --{{0}}--
Fünf neue Uhren. Vier richtig heißt: Das sitzt. Kein Zeitdruck.

**Ziel:** 4 von 5.

@Uhr.einzeiger(4:50)

**Aufgabe 1:** Wie spät ist es ungefähr?

- [( )] kurz nach vier
- [( )] in der Mitte zwischen vier und fünf
- [(X)] fast fünf

---

@Uhr.einzeiger(11:30)

**Aufgabe 2:** Wie spät ist es ungefähr?

- [(X)] in der Mitte zwischen elf und zwölf
- [( )] fast elf
- [( )] kurz nach zwölf

---

@Uhr.einzeiger(8:05)

**Aufgabe 3:** Wie spät ist es ungefähr?

- [( )] fast acht
- [(X)] kurz nach acht
- [( )] kurz nach neun

---

**Aufgabe 4:** Stell den Zeiger auf **in der Mitte zwischen fünf und sechs**.

@Uhr.einzeiger.stellen(5:20,5:40)

---

**Aufgabe 5:** Stell den Zeiger auf **fast eins**.

@Uhr.einzeiger.stellen(12:40,12:55)

### Fertig

                                 --{{0}}--
Test bestanden: Die alte Uhr taugt, und du kannst sie lesen. Deine Kursuhr
steht jetzt bei zwanzig Minuten.

**Kursuhr:** 20 Minuten.

@Uhr.zeige(12:20)

Setz dein Häkchen, wenn es stimmt:

- [ ] Das kann ich jetzt: die Stunde ablesen, auch wenn der Zeiger **zwischen** zwei Zahlen steht.

                                 --{{1}}--
Wenn du Zeit hast: Meine älteste Uhr hat gar keinen Zeiger, nur einen Schatten.
Danach geht es mit Unit zwei weiter.

📜 **Extra:** [Schatten, Sonnenuhr & warum Uhren rechtsherum laufen](#13)

**Weiter:** [Unit 2 · Der kurze Zeiger wandert](#19)

— Tilda

## Staunseite · Schatten, Sonnenuhr & warum Uhren rechtsherum laufen

                                 --{{0}}--
Staunseite: Hier wird nichts geprüft. Heute zeige ich dir das älteste Stück
in meiner Sammlung. Eine Uhr ohne einen einzigen Zeiger.

> 📜 **Staunseite — freiwillig.** Nichts zu prüfen.

### Meine älteste Uhr

                                 --{{0}}--
Ein Stab in der Sonne, ein Schatten, fertig ist die Uhr. Schieb den Regler von
morgens bis abends und beobachte den Schatten.

@Sonnenuhr(9:00)

                                 --{{1}}--
Wohin ist der Schatten gewandert?

In welche Richtung wandert der Schatten?

[(rechts)] ↻ rechtsherum — wie die Zeiger meiner Uhren
[(links)]  ↺ linksherum
[(nicht)]  Er bleibt stehen.

<details>
<summary>Auflösung</summary>

**Rechtsherum.** Morgens zeigt der Schatten nach links, mittags nach oben,
abends nach rechts. Wie die Zeiger einer Uhr.

</details>

### Warum laufen Uhren rechtsherum?

                                 --{{0}}--
Forscher glauben: Unsere Uhrzeiger laufen rechtsherum, weil der Schatten auf
einer liegenden Sonnenuhr bei uns auch rechtsherum wandert. Vielleicht haben
die ersten Uhrmacher das einfach übernommen.

| Meine Sonnenuhr | Meine erste Uhr |
|:---:|:---:|
| ↻ Der Schatten wandert rechtsherum. | ↻ Der Zeiger wandert rechtsherum. |
| @Sonnenuhr(10:00) | @Uhr.einzeiger.spiel(10:00) |

> **Forscher glauben** das. Sicher weiß es niemand, aber es passt.

<details>
<summary>Für Profis</summary>

Das stimmt nur für Sonnenuhren, die **flach auf dem Boden** liegen, und nur auf unserer Hälfte der Erde.
An einer **Hauswand** wandert der Schatten andersherum. Und es gab sogar Uhren,
deren Zeiger linksherum laufen. Aber die meisten Uhren machen es wie die liegende Sonnenuhr.

</details>

### Wenn die Sonne fehlt

                                 --{{0}}--
Die Sonnenuhr hat einen Konstruktionsfehler. Drück auf den Wolken-Knopf. Dann
schieb den Regler in die Nacht.

@Sonnenuhr(15:00)

                                 --{{1}}--
Ohne Sonne kein Schatten, ohne Schatten keine Uhrzeit. Bei Wolken und nachts
ist die Sonnenuhr nutzlos.

Was meinst du: Wie haben die Menschen nachts die Zeit gemessen?

[[___]]

                                 --{{2}}--
Die Antwort kommt später. Kleiner Hinweis: Sie hat mit Wasser zu tun.

Die Antwort: **Staunseite · Wasseruhr & Sanduhr** *(kommt bald)*

### Eine echte Sonnenuhr

                                 --{{0}}--
So sieht eine echte Sonnenuhr aus. Sie liegt flach auf dem Boden, in Polen. Der schräge
Stab in der Mitte wirft den Schatten.

@Wikimedia.embed(`File:Horizontal sundial in Krasiejów, Poland, June 2021.jpg`)

*Eine liegende Sonnenuhr in Krasiejów in Polen. Der schräge Stab wirft den Schatten auf die Zahlen.*

                                 --{{1}}--
Selbst bauen geht auch, aber nur bei Sonne. Sonst reicht die Sonnenuhr oben.

**Experiment — freiwillig, nur bei Sonne:**

1. Steck einen Stock senkrecht in die Erde oder in einen Blumentopf.
2. Leg einen Stein an die Spitze des Schattens.
3. Warte eine Weile. Leg dann noch einen Stein an die neue Schattenspitze.
4. Wohin ist der Schatten gewandert?

### Zurück in die Werkstatt

                                 --{{0}}--
Das war das älteste Stück meiner Sammlung. Zurück an die Werkbank.

**Weiter:** [Unit 2 · Der kurze Zeiger wandert](#19)

— Tilda

---

<details>
<summary>📚 Quellen (für Erwachsene)</summary>

1. Sonnenuhr — Grundprinzip (Schatten des Polstabs, wahre Sonnenzeit): [de.wikipedia.org/wiki/Sonnenuhr](https://de.wikipedia.org/wiki/Sonnenuhr), abgerufen 2026-10-03.
2. Drehrichtung / Uhrzeigersinn — „Vermuteter Grund“ für rechtsdrehende Zeiger ist der Schattenlauf horizontaler Sonnenuhren auf der Nordhalbkugel; bei vertikalen Sonnenuhren umgekehrt: [de.wikipedia.org/wiki/Drehrichtung](https://de.wikipedia.org/wiki/Drehrichtung), abgerufen 2026-10-03. Ebenso: [en.wikipedia.org/wiki/Clockwise](https://en.wikipedia.org/wiki/Clockwise).
3. Foto: *Horizontal sundial in Krasiejów, Poland, June 2021*, Wikimedia Commons, Lizenz CC BY-SA 4.0 (Urheber wird am Bild angezeigt).
4. Die Sonnenuhr-Simulation ist vereinfacht: gleich weite Stundenlinien, Sonnenzeit statt Uhrzeit.

</details>

## Unit 2 · Der kurze Zeiger wandert

                                 --{{0}}--
Heute bekommt eine Stelle auf der Uhr ihren richtigen Namen. Und du lernst,
Uhrzeiten so aufzuschreiben wie auf meinem Werkstatt-Zettel.

**Auftrag:** volle und halbe Stunde — lesen, stellen, aufschreiben.

ungefähr 20 Minuten · keine Punkte

### Aufwärmen

                                 --{{0}}--
Zum Warmwerden die Uhr mit einem Zeiger von letztem Mal.

@Uhr.einzeiger(9:50)

Wie spät ist es ungefähr?

- [( )] kurz nach neun
- [( )] in der Mitte zwischen neun und zehn
- [(X)] fast zehn
- [[?]] Regel: Die Stunde ist die Zahl, die der Zeiger schon hinter sich hat. @Uhr.einzeiger.zonen(9:50)

---

Stell den Zeiger auf **fast neun**.

@Uhr.einzeiger.stellen(8:40,8:55)

### Halb auf dem Weg

                                 --{{0}}--
Ein Kunde fragt, wann seine Uhr fertig ist. Ich sage: um halb vier. Wo steht
dann der Zeiger? Zieh ihn von der Drei zur Vier.

*Kunde: „Wann ist meine Uhr fertig?“ — Tilda: „Um **halb vier**.“*

@Uhr.einzeiger.spiel(3:00)

                                 --{{1}}--
Die Stelle genau zwischen Drei und Vier hat einen Namen: halb vier. Gemeint
ist: halb auf dem Weg zur Vier. Noch nicht da. Erst halb.

| drei Uhr | halb vier | vier Uhr |
|:---:|:---:|:---:|
| @Uhr.einzeiger(3:00) | @Uhr.einzeiger(3:30) | @Uhr.einzeiger(4:00) |
| genau auf der 3 | **halb** auf dem Weg zur 4 | genau auf der 4 |
| 3:00 | 3:30 | 4:00 |

> **Merksatz:** **Halb vier** heißt: **halb auf dem Weg zur Vier.**

                                 --{{2}}--
Ein Trick aus der Werkstatt: Schau auf die Zahl nach dem Wort halb. Bei halb
vier ist das die Vier. Der Zeiger ist erst halb dort.

**Trick:** Schau auf die Zahl nach „halb“. Der Zeiger ist erst **halb** dort.

                                 --{{3}}--
So steht es auf meinem Zettel. Genau auf der Drei: drei, Doppelpunkt, null
null. Halb vier: drei, Doppelpunkt, dreißig. Warum dreißig, erklärt der zweite
Zeiger. Der kommt in Unit drei.

**Werkstatt-Zettel:** drei Uhr = **3:00** · halb vier = **3:30**

### Üben

                                 --{{0}}--
Lesen, stellen, aufschreiben. Wenn es hakt: Fragezeichen oder Hilfe öffnen.

@Uhr.einzeiger(5:30)

Wie spät ist es?

- [( )] halb fünf
- [(X)] halb sechs
- [( )] fünf Uhr
- [[?]] Trick: Der Zeiger ist halb auf dem Weg zu welcher Zahl? @Uhr.einzeiger.zonen(5:30)

---

@Uhr.einzeiger(8:00)

Wie spät ist es?

- [(X)] acht Uhr
- [( )] halb acht
- [( )] halb neun
- [[?]] Steht der Zeiger genau auf einer Zahl? Dann ist es „… Uhr“.

---

@Uhr.einzeiger(11:30)

Wie spät ist es?

- [( )] halb elf
- [( )] elf Uhr
- [(X)] halb zwölf
- [[?]] Der Zeiger hat die Elf schon überholt. Halb auf dem Weg zu …? @Uhr.einzeiger.zonen(11:30)

---

Stell den Zeiger auf **halb sieben**.

@Uhr.einzeiger.stellen(6:25,6:35)

<details>
<summary>Hilfe</summary>

Schau auf die **Sieben**. Halb sieben heißt: halb auf dem Weg dorthin —
also genau in der Mitte zwischen der **Sechs** und der Sieben.

</details>

---

Stell den Zeiger auf **zwei Uhr**.

@Uhr.einzeiger.stellen(1:55,2:05)

<details>
<summary>Hilfe</summary>

„Zwei Uhr“ heißt: Der Zeiger steht **genau auf der Zwei** — nicht davor, nicht dahinter.

</details>

---

Schreib **halb acht** mit Ziffern auf, wie auf dem Werkstatt-Zettel.

@Uhr.schreibe(7:30)

<details>
<summary>Hilfe</summary>

Halb acht ist halb auf dem Weg zur Acht. Die Stunde ist also noch die **Sieben**.
Für „halb“ schreibe ich **:30** dahinter.

</details>

---

Schreib **neun Uhr** mit Ziffern auf.

@Uhr.schreibe(9:00)

<details>
<summary>Hilfe</summary>

Bei „… Uhr“ steht der Zeiger genau auf der Zahl. Vorne schreibst du die Zahl,
hinten **:00** — wie drei Uhr = 3:00 auf dem Zettel.

</details>

### Zeig, was du kannst

                                 --{{0}}--
Fünf neue Aufgaben. Vier richtig heißt: Das sitzt. Kein Zeitdruck.

**Ziel:** 4 von 5.

@Uhr.einzeiger(2:30)

**Aufgabe 1:** Wie spät ist es?

- [(X)] halb drei
- [( )] halb zwei
- [( )] zwei Uhr

---

@Uhr.einzeiger(10:00)

**Aufgabe 2:** Wie spät ist es?

- [( )] halb zehn
- [(X)] zehn Uhr
- [( )] halb elf

---

**Aufgabe 3:** Stell den Zeiger auf **halb neun**.

@Uhr.einzeiger.stellen(8:25,8:35)

---

**Aufgabe 4:** Stell den Zeiger auf **zwölf Uhr**.

@Uhr.einzeiger.stellen(11:55,12:05)

---

**Aufgabe 5:** Schreib **halb zwei** mit Ziffern auf.

@Uhr.schreibe(1:30)

### Fertig

                                 --{{0}}--
Volle und halbe Stunde: sitzt, auch auf dem Papier. Kursuhr: vierzig Minuten.

**Kursuhr:** 40 Minuten.

@Uhr.zeige(12:40)

Setz dein Häkchen, wenn es stimmt:

- [ ] Das kann ich jetzt: volle und halbe Stunde lesen, stellen und aufschreiben.

                                 --{{1}}--
Nächstes Mal kommt der zweite Zeiger dazu, der lange, dünne. Dann klärt sich
auch die Dreißig.

**Weiter:** [Unit 3 · Der Minutenzeiger kommt dazu](#25)

— Tilda

## Unit 3 · Der Minutenzeiger kommt dazu

                                 --{{0}}--
Neuer Auftrag. Ein Kunde muss morgen genau seinen Bus erwischen. Mit einem
Zeiger kann ich ihm nur sagen: ungefähr. Reicht nicht. Wir bauen einen zweiten
Zeiger ein.

**Auftrag:** „Ungefähr“ reicht nicht mehr. Der **zweite Zeiger** kommt dazu.

ungefähr 20 Minuten · keine Punkte · Pause erlaubt

### Aufwärmen

                                 --{{0}}--
Zum Warmwerden zwei Aufgaben von letztem Mal.

@Uhr.einzeiger(7:30)

Wie spät ist es?

<!-- data-text-failed="Noch nicht ganz. Halb heißt: halb auf dem Weg zur nächsten Zahl. Zu welcher Zahl ist der Zeiger unterwegs?" -->
- [( )] halb sieben
- [(X)] halb acht
- [( )] sieben Uhr

---

Schreib **halb fünf** mit Ziffern auf.

@Uhr.schreibe(4:30)

### Der zweite Zeiger

                                 --{{0}}--
Die neue Uhr: der kurze, dicke Zeiger, den du kennst, und ein langer, dünner.
Das ist der Minutenzeiger. Dreh ihn einmal ganz herum und behalte den kurzen
im Auge.

@Uhr.spiel(3:00)

                                 --{{1}}--
Eine Runde vom langen Zeiger, und der kurze ist eine Zahl weiter. Eine Runde
ist also genau eine Stunde.

> **Der lange Zeiger** schafft eine ganze Runde in **einer Stunde**. Der kurze nur eine Zahl weiter.

### Jede Zahl ist ein 5er-Schritt

                                 --{{0}}--
Für den langen Zeiger gelten die Zahlen anders: Er zählt in Fünfer-Schritten.
Eins heißt fünf Minuten, Zwei heißt zehn. Die Minuten stehen außen in Orange,
in seiner Farbe.

@Uhr.minutenkranz(3:30)

                                 --{{1}}--
Bei halb vier steht der lange Zeiger auf der Sechs. Und die Sechs heißt für
ihn dreißig. Daher drei, Doppelpunkt, dreißig. Versprechen eingelöst.

**Halb vier = 3:30**, weil die **6** für den langen Zeiger **30** heißt.

                                 --{{2}}--
Abgelesen wird immer gleich. Erst der Kurze: Welche Zahl hat er schon hinter
sich? Das ist die Stunde. Dann der Lange: Wie viele Minuten?

> **Merksatz:** Erst der **Kurze**: welche Stunde? Dann der **Lange**: wie viele Minuten?

### Üben

                                 --{{0}}--
Fünf Aufgaben. Bei einem Fehler kommt sofort ein Tipp. Unten liegt die Uhr mit
Minutenkranz als Hilfe.

Wie spät ist es? Schreib die Uhrzeit mit Ziffern (z. B. 4:20).

@Uhr.ablesen(8:15)

---

Wie spät ist es?

@Uhr.ablesen(2:40)

---

Stell die Uhr auf **5:25**.

@Uhr.stellen(5:25)

---

Stell die Uhr auf **10:50**.

@Uhr.stellen(10:50)

---

Der lange Zeiger zeigt auf die **9**. Wie viele Minuten sind das?

<!-- data-text-failed="Noch nicht ganz. Jede Zahl ist ein 5er-Schritt: 5, 10, 15 … Zähl bis zur 9." -->
- [( )] 9 Minuten
- [(X)] 45 Minuten
- [( )] 90 Minuten

<details>
<summary>Hilfe: Uhr mit Minutenkranz</summary>

Die Minuten stehen außen. Dreh den langen Zeiger und lies die orange Zahl ab.

@Uhr.minutenkranz.spiel(12:00)

</details>

### Pause?

                                 --{{0}}--
Gute Arbeit. Als Nächstes der Nachweis mit fünf neuen Uhren. Jetzt oder morgen,
du entscheidest. Morgen zeigt sich besser, ob es wirklich sitzt.

**Weiter zum Nachweis** — oder **Pause** bis morgen.

### Zeig, was du kannst

                                 --{{0}}--
Fünf neue Uhren. Vier richtig heißt: Das sitzt. Erst der Kurze, dann der Lange.

**Ziel:** 4 von 5.

**Aufgabe 1:** Wie spät ist es?

@Uhr.ablesen(6:35)

---

**Aufgabe 2:** Wie spät ist es?

@Uhr.ablesen(11:05)

---

**Aufgabe 3:** Wie spät ist es? Genau hinsehen beim kurzen Zeiger.

@Uhr.ablesen(4:55)

---

**Aufgabe 4:** Stell die Uhr auf **1:20**.

@Uhr.stellen(1:20)

---

**Aufgabe 5:** Stell die Uhr auf **9:45**.

@Uhr.stellen(9:45)

### Fertig

                                 --{{0}}--
Zwei Zeiger, beide gelesen. Deine Kursuhr zeigt jetzt eine ganze Stunde: Der
lange Zeiger ist einmal herum.

**Kursuhr:** eine Stunde. Der lange Zeiger ist einmal herum.

@Uhr.zeige(1:00)

Setz dein Häkchen, wenn es stimmt:

- [ ] Das kann ich jetzt: Uhrzeiten in 5er-Schritten ablesen und stellen.

                                 --{{1}}--
Warum es Jahrhunderte gedauert hat, bis Uhren einen zweiten Zeiger bekamen,
steht auf der nächsten Staunseite.

📜 **Extra:** [Staunseite · Die Turmuhr mit einem Zeiger & die Pendeluhr](#33)

**Weiter:** [Unit 4 · Auf die Minute genau](#39)

— Tilda

## <span style="background:#c92a2a;color:#fff;padding:.05em .35em;border-radius:6px">Staunseite · Die Turmuhr mit einem Zeiger & die Pendeluhr</span>

                                 --{{0}}--
Staunseite, nichts zu prüfen. Heute die Frage: Warum hatte meine allererste Uhr
nur einen Zeiger? Das war nicht meine Idee. Das war jahrhundertelang Standard.

> 📜 **Staunseite — freiwillig.** Nichts zu prüfen.

### Uhren mit nur einem Zeiger

                                 --{{0}}--
Vor vielen hundert Jahren bekamen die ersten Kirchtürme Uhren mit Zahnrädern.
Ein Zeiger, der Stundenzeiger. Sonst nichts. Wie bei meiner allerersten Uhr.

@Wikimedia.embed(File:One hand clock - geograph.org.uk - 622329.jpg)

*Eine Kirchturmuhr mit nur einem Zeiger, an einer Kirche in Coningsby in England.*

| Die Kirchturmuhr | Meine allererste Uhr |
|:---:|:---:|
| ein Zeiger | ein Zeiger |
| @Uhr.einzeiger(10:20) | @Uhr.einzeiger(10:20) |

                                 --{{1}}--
Warum nur einer? Die Uhren waren ungenau. Jeden Tag gingen sie um viele
Minuten falsch und mussten nach der Sonnenuhr gestellt werden. Hätte ein
Minutenzeiger geholfen?

Hätte ein Minutenzeiger auf so einer ungenauen Uhr geholfen?

[(ja)]   Ja, dann weiß man es genauer.
[(nein)] Nein, er hätte ja auch falsch gezeigt.
[(egal)] Weiß ich nicht.

<details>
<summary>Auflösung</summary>

Ein Minutenzeiger hätte nur so **getan**, als wüsste er es genau — die Uhr selbst ging ja falsch.
Darum hat man ihn lieber weggelassen. „Ungefähr“ war damals das Beste, was eine Uhr konnte.

</details>

### Immer feiner

                                 --{{0}}--
Die Uhrmacher wurden besser. Je genauer eine Uhr ging, desto feiner das
Zifferblatt: erst Stunden, dann halbe Stunden, dann Viertelstunden.

| zuerst | dann | dann |
|:---:|:---:|:---:|
| nur Stunden | halbe Stunden | Viertelstunden |

Die Viertelstunden lernst du in Unit 5 genauer kennen.

### Das Pendel

                                 --{{0}}--
Dann kam die Erfindung, die alles verändert hat: das Pendel. Für jeden Schwung
braucht es gleich lang, egal ob weit oder wenig. Teste es: weit schwingen,
zehn Sekunden zählen. Dann wenig schwingen, nochmal zählen.

@Pendel

                                 --{{1}}--
Mit Pendel ging eine Uhr nur noch ein paar Sekunden am Tag falsch. Ab da hat
sich der Minutenzeiger gelohnt.

Die erste Pendeluhr. Ausgedacht hat sie sich vor über 350 Jahren der Forscher
Christiaan Huygens, gebaut hat sie ein Uhrmacher. Ein Kollege also.

@Wikimedia.embed(File:Huygens first pendulum clock - front view.png)

*Zeichnung der ersten Pendeluhr. Unten hängt das Pendel.*

### Experiment

                                 --{{0}}--
Ein Pendel baust du in einer Minute: Schlüsselbund, Schnur, fertig. Ohne
beides reicht das Pendel von vorhin.

**Freiwillig:**

1. Binde einen Schlüsselbund an eine Schnur und halte das Ende fest.
2. Lass ihn **weit** pendeln. Starte den Timer und zähl die Schwünge.
3. Dann lass ihn nur **wenig** pendeln und zähl nochmal.
4. Was fällt dir auf?

@Timer.zaehlen(30)

### Zurück in die Werkstatt

                                 --{{0}}--
Jetzt weißt du, warum der Minutenzeiger so spät kam. Meine Uhr geht genau,
also zählen wir in der nächsten Unit jede einzelne Minute.

**Weiter:** [Unit 4 · Auf die Minute genau](#39)

— Tilda

---

<details>
<summary>📚 Quellen (für Erwachsene)</summary>

1. Ein-Zeiger-Uhr: erste Räder- und Turmuhren aus technischen Gründen nur mit Stundenzeiger; tägliches Nachstellen nach der Sonnenuhr; Zifferblatt zuerst in Stunden, später halbe und Viertelstunden: [de.wikipedia.org/wiki/Ein-Zeiger-Uhr](https://de.wikipedia.org/wiki/Ein-Zeiger-Uhr), abgerufen 2026-10-03.
2. Pendeluhr: erste Pendeluhr nach Christiaan Huygens, gebaut 1657 von Salomon Coster, Abweichung ca. ±10 Sekunden pro Tag: [de.wikipedia.org/wiki/Pendeluhr](https://de.wikipedia.org/wiki/Pendeluhr), abgerufen 2026-10-03.
3. Turmuhr: vor der Pendeluhr (Ende 17. Jh.) wegen Ungenauigkeit nur Stundenzeiger: [de.wikipedia.org/wiki/Turmuhr](https://de.wikipedia.org/wiki/Turmuhr), abgerufen 2026-10-03.
3a. Genauigkeit vor und nach dem Pendel: vor der Pendeluhr etwa 15 Minuten pro Tag, danach etwa 15 Sekunden: [en.wikipedia.org/wiki/Pendulum_clock](https://en.wikipedia.org/wiki/Pendulum_clock), abgerufen 2026-10-03.
4. Fotos: *One hand clock* (Coningsby), Margaret Morgan, CC BY-SA 2.0 (geograph.org.uk); Zeichnung der ersten Pendeluhr von Huygens, gemeinfrei — beide über Wikimedia Commons.
5. Vereinfachung: „Ein Pendel braucht für jeden Schwung gleich lang“ gilt für kleine bis mittlere Ausschläge (Isochronie); für Kinder ausreichend genau.

</details>

## Unit 4 · Auf die Minute genau

                                 --{{0}}--
Neuer Auftrag. Ein Kunde will den Zug um acht Uhr siebzehn erwischen. Mit
Fünfer-Schritten komme ich nur auf acht Uhr fünfzehn oder acht Uhr zwanzig.
Am Bahnsteig reicht das nicht. Heute zählen wir jeden einzelnen Strich.

**Auftrag:** Uhrzeiten **auf die Minute genau** lesen und stellen.

ungefähr 20 Minuten · keine Punkte · Pause erlaubt

### Aufwärmen

                                 --{{0}}--
Zum Warmwerden zwei Aufgaben von letztem Mal: in Fünfer-Schritten.

Wie spät ist es?

@Uhr.ablesen(3:25)

---

Stell die Uhr auf **7:40**.

@Uhr.stellen(7:40)

### Jeder Strich zählt

                                 --{{0}}--
So sieht eine Bahnhofsuhr aus. Schau dir den Rand an: Zwischen den dicken
Strichen sitzen kleine Striche. Auf die kommt es heute an.

@Wikimedia.embed(File:Bahnhofsuhr Aumühle.jpg)

*Eine Bahnhofsuhr in Aumühle in Norddeutschland. Züge fahren auf die Minute genau — darum hat diese Uhr für jede Minute einen Strich.*

                                 --{{1}}--
Zwischen zwei Zahlen liegen fünf Minuten. Dafür gibt es vier kleine Striche,
und der fünfte Schritt ist der Strich an der nächsten Zahl. Jeder Strich ist
also genau eine Minute.

<!-- data-type="none" -->
| von der 3 … | 1. Strich | 2. Strich | 3. Strich | 4. Strich | … bis zur 4 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 15 | 16 | 17 | 18 | 19 | 20 |

> **Ein kleiner Strich = eine Minute.** Zwischen zwei Zahlen: 4 Striche, dann kommt die nächste Zahl.

### Zählen Schritt für Schritt

                                 --{{0}}--
So gehst du vor, immer gleich. Erstens: Der kurze Zeiger sagt die Stunde.
Zweitens: Beim langen Zeiger zählst du in Fünfern bis zur letzten Zahl, die er
schon hinter sich hat. Drittens: Dann zählst du die kleinen Striche einzeln
weiter, bis du beim langen Zeiger bist.

> **Merksatz:** **Fünfer bis zur Zahl, dann Striche zählen.**

**Beispiel 1 — Schritt für Schritt**

@Uhr.minutenkranz(8:17)

<!-- data-type="none" -->
| Schritt | Was du machst | Ergebnis |
|---|---|---|
| 1 | Kurzer Zeiger: Welche Zahl hat er schon hinter sich? | **8** |
| 2 | Langer Zeiger: In Fünfern bis zur letzten Zahl — 5, 10, 15 | **15** (die 3) |
| 3 | Jetzt Striche einzeln: 16, 17 | **17** |
| 4 | Zusammen | **8:17** |

                                 --{{1}}--
Und jetzt ein Beispiel mit Falle. Der kurze Zeiger steht fast auf der Zehn.
Fast heißt: noch nicht. Die Stunde ist also noch neun.

**Beispiel 2 — mit Falle**

@Uhr.minutenkranz(9:58)

<!-- data-type="none" -->
| Schritt | Was du machst | Ergebnis |
|---|---|---|
| 1 | Kurzer Zeiger: **fast** auf der 10 — aber noch nicht drüber! | **9** |
| 2 | Langer Zeiger: In Fünfern bis zur 11 — 5, 10 … 55 | **55** |
| 3 | Striche einzeln: 56, 57, 58 | **58** |
| 4 | Zusammen | **9:58** |

                                 --{{2}}--
Jetzt du. Dreh den langen Zeiger Strich für Strich und schau, wie sich die
Minuten verändern. Die orangen Zahlen außen helfen beim Zählen.

**Selbst probieren:** Dreh den langen Zeiger Strich für Strich.

@Uhr.minutenkranz.spiel(8:15)

### Üben

                                 --{{0}}--
Fünf Aufgaben. Bei einem Fehler kommt sofort ein Tipp. Unten liegt die Uhr mit
Minutenkranz als Hilfe.

Wie spät ist es? Schreib die Uhrzeit mit Ziffern (z. B. 9:05).

@Uhr.ablesen(4:12)

---

Wie spät ist es?

@Uhr.ablesen(10:38)

---

Stell die Uhr auf **6:23**.

@Uhr.stellen(6:23)

---

Stell die Uhr auf **1:49**.

@Uhr.stellen(1:49)

---

Der lange Zeiger steht **3 Striche nach der 4**. Wie viele Minuten sind das?

<!-- data-text-failed="Noch nicht ganz. Erst Fünfer bis zur 4: 5, 10, 15, 20. Dann drei Striche weiter: 21, 22, 23." -->
- [( )] 7 Minuten
- [(X)] 23 Minuten
- [( )] 43 Minuten

<details>
<summary>Hilfe: Uhr mit Minutenkranz</summary>

Die orangen Zahlen außen zeigen die Fünfer. Dreh den langen Zeiger und zähl die Striche weiter.

@Uhr.minutenkranz.spiel(12:00)

</details>

### Pause?

                                 --{{0}}--
Gute Arbeit. Als Nächstes der Nachweis mit fünf neuen Uhren. Jetzt oder morgen,
du entscheidest. Morgen zeigt sich besser, ob es wirklich sitzt.

**Weiter zum Nachweis** — oder **Pause** bis morgen.

### Zeig, was du kannst

                                 --{{0}}--
Fünf neue Uhren. Vier richtig heißt: Das sitzt. Fünfer bis zur Zahl, dann
Striche zählen.

**Ziel:** 4 von 5.

**Aufgabe 1:** Wie spät ist es?

@Uhr.ablesen(7:08)

---

**Aufgabe 2:** Wie spät ist es?

@Uhr.ablesen(2:51)

---

**Aufgabe 3:** Wie spät ist es? Genau hinsehen beim kurzen Zeiger.

@Uhr.ablesen(5:57)

---

**Aufgabe 4:** Stell die Uhr auf **3:14**.

@Uhr.stellen(3:14)

---

**Aufgabe 5:** Stell die Uhr auf **12:46**.

@Uhr.stellen(12:46)

### Fertig

                                 --{{0}}--
Auf die Minute genau, wie am Bahnsteig. Deine Kursuhr steht jetzt bei einer
Stunde und zwanzig Minuten.

**Kursuhr:** 1 Stunde 20 Minuten.

@Uhr.zeige(1:20)

Setz dein Häkchen, wenn es stimmt:

- [ ] Das kann ich jetzt: Uhrzeiten auf die Minute genau ablesen und stellen.

                                 --{{1}}--
Nächstes Mal geht es um die Sprache der Uhr: Viertel nach, halb, und wie man
das sagt.

**Weiter:** [Unit 5 · Viertel nach, halb](#47)

— Tilda

---

<details>
<summary>📚 Quelle (für Erwachsene)</summary>

Foto: *Bahnhofsuhr Aumühle*, Pauli-Pirat, CC BY-SA 4.0, über Wikimedia Commons.

</details>

## Unit 5 · Viertel nach, halb

                                 --{{0}}--
Neuer Auftrag. Zwei Kunden holen heute ihre Uhren ab. Auf dem einen Zettel
steht: Viertel nach acht. Auf dem anderen: viertel neun. Kommen die beiden zur
selben Zeit? Finden wir es heraus.

**Auftrag:** Zwei Zettel, zwei Sprechweisen. Meinen sie **dieselbe Uhrzeit**?

| Zettel 1 | Zettel 2 |
|---|---|
| Abholung: **Viertel nach acht** | Abholung: **viertel neun** |

ungefähr 20 Minuten · keine Punkte · Pause erlaubt

### Aufwärmen

                                 --{{0}}--
Zum Warmwerden zwei Aufgaben von letztem Mal: auf die Minute genau.

Wie spät ist es?

@Uhr.ablesen(2:36)

---

Stell die Uhr auf **9:07**.

@Uhr.stellen(9:07)

### Halb kennst du schon

                                 --{{0}}--
Erst etwas Bekanntes. Der lange Zeiger steht unten auf der Sechs. Er hat eine
halbe Runde geschafft, dreißig Minuten. Der kurze Zeiger ist halb auf dem Weg
zur nächsten Zahl. Darum heißt das: halb.

@Uhr.minutenkranz(8:30)

<!-- data-type="none" -->
| Langer Zeiger | Minuten | Kurzer Zeiger | So sagt man |
|---|---|---|---|
| auf der 6 | 30 | halb auf dem Weg zur 9 | **halb neun** = 8:30 |

> **Halb neun** heißt: **halb auf dem Weg zur Neun.** Im Satz steht die nächste Stunde.

### Vier Viertel

                                 --{{0}}--
Jetzt teilen wir die Runde in vier gleiche Stücke. Ein Stück heißt Viertel.
Wie viele Minuten sind ein Viertel? Zieh den langen Zeiger von der Zwölf bis
zur Drei. Die Uhr malt mit.

**Selbst probieren:** Zieh den langen Zeiger von der 12 bis zur 3.

@Uhr.spanne(8:00)

                                 --{{1}}--
Von der Zwölf bis zur Drei sind es fünfzehn Minuten. Das ist ein Viertel der
Runde. Zwei Viertel sind die halbe Runde, dreißig Minuten. Vier Viertel sind
die ganze Runde, eine Stunde.

<!-- data-type="none" -->
| Langer Zeiger von der 12 bis zur … | Stück der Runde | Minuten |
|:---:|:---:|:---:|
| 3 | ein Viertel | 15 |
| 6 | zwei Viertel = **halb** | 30 |
| 9 | drei Viertel | 45 |
| 12 | vier Viertel = ganze Runde | 60 |

> **Ein Viertel = 15 Minuten.** Vier Viertel sind eine Stunde.

### Zwei Sprechweisen

                                 --{{0}}--
Jetzt die Zettel, Schritt für Schritt. Der lange Zeiger steht auf der Drei:
ein Viertel ist geschafft. Der kurze Zeiger ist gerade an der Acht vorbei.

@Uhr.minutenkranz(8:15)

<!-- data-type="none" -->
| Schritt | Was du machst | Ergebnis |
|---|---|---|
| 1 | Langer Zeiger: auf der 3 | **ein Viertel**, 15 Minuten |
| 2 | Kurzer Zeiger: Welche Zahl hat er schon hinter sich? | **8** |
| 3 | Digital aufschreiben | **8:15** |
| 4 | Sprechweise 1 schaut zurück: ein Viertel **nach** der 8 | **Viertel nach acht** |
| 5 | Sprechweise 2 schaut nach vorn, wie bei halb: ein Viertel auf dem Weg **zur** 9 | **viertel neun** |

                                 --{{1}}--
Die erste Sprechweise schaut zurück: ein Viertel nach acht. Die zweite schaut
nach vorn, genau wie halb: ein Viertel auf dem Weg zur Neun. Manche Menschen
sagen es so, andere so. Beide meinen dieselbe Uhrzeit. Die zwei Kunden kommen
also gleichzeitig.

<!-- data-type="none" -->
| Digital | schaut zurück | schaut nach vorn |
|:---:|:---:|:---:|
| 8:15 | Viertel nach acht | viertel neun |
| 8:30 | — | halb neun |

> **Merksatz:** **Viertel nach acht = viertel neun = 8:15.** Bei „viertel“ und „halb“ steht die **nächste** Stunde im Satz.

                                 --{{2}}--
Vorsicht, Falle. Viertel neun ist nicht neun Uhr fünfzehn. Der kurze Zeiger
ist erst ein Viertel auf dem Weg zur Neun. Die Stunde ist also noch acht.

**Falle:** viertel neun ist **nicht** 9:15. Der kurze Zeiger ist erst ein Viertel auf dem Weg zur 9.

                                 --{{3}}--
Weißt du noch, die Uhr mit nur einem Zeiger? Da hieß diese Stelle: kurz nach
sechs. Mit zwei Zeigern geht es genauer. Viertel nach sechs. Oder: viertel
sieben.

**Weißt du noch?** In Unit 1 hieß diese Stelle „kurz nach sechs“. Jetzt geht es genauer: **Viertel nach sechs** — oder **viertel sieben**.

@Uhr.zeige(6:15)

### Üben

                                 --{{0}}--
Fünf Aufgaben. Bei einem Fehler kommt sofort ein Tipp. Unten liegt eine Uhr
mit Minutenkranz als Hilfe.

@Uhr.zeige(10:15)

Wie sagt man zu dieser Uhrzeit?

<!-- data-text-failed="Noch nicht ganz. Der lange Zeiger steht auf der 3: ein Viertel. Welche Zahl hat der kurze Zeiger gerade hinter sich?" -->
- [(X)] Viertel nach zehn
- [( )] Viertel nach elf
- [( )] halb elf

---

@Uhr.zeige(3:15)

Und in der anderen Sprechweise?

<!-- data-text-failed="Noch nicht ganz. Bei „viertel“ steht wie bei „halb“ die nächste Stunde im Satz. Zu welcher Zahl ist der kurze Zeiger unterwegs?" -->
- [( )] viertel drei
- [(X)] viertel vier
- [( )] halb vier

---

Stell die Uhr auf **Viertel nach sieben**.

@Uhr.stellen(7:15)

---

Stell die Uhr auf **viertel zwölf**.

@Uhr.stellen(11:15)

---

Schreib **halb zehn** mit Ziffern auf.

@Uhr.schreibe(9:30)

<details>
<summary>Hilfe: Viertel und halb an der Uhr</summary>

<!-- data-type="none" -->
| Langer Zeiger auf … | Minuten | So sagt man |
|---|---|---|
| der 3 | 15 | **Viertel nach** (Stunde davor) · **viertel** (nächste Stunde) |
| der 6 | 30 | **halb** (nächste Stunde) |

Dreh den langen Zeiger und schau, welche Stunde der kurze schon hinter sich hat.

@Uhr.minutenkranz.spiel(12:00)

</details>

### Pause?

                                 --{{0}}--
Gute Arbeit. Als Nächstes der Nachweis mit fünf neuen Aufgaben. Jetzt oder
morgen, du entscheidest. Morgen zeigt sich besser, ob es wirklich sitzt.

**Weiter zum Nachweis** — oder **Pause** bis morgen.

### Zeig, was du kannst

                                 --{{0}}--
Fünf neue Aufgaben. Vier richtig heißt: Das sitzt. Lies jede Frage genau.
Manchmal fragt sie nach dem Satz, manchmal nach der Uhrzeit.

**Ziel:** 4 von 5.

**Aufgabe 1:** Wie sagt man zu dieser Uhrzeit?

@Uhr.zeige(4:15)

<!-- data-text-failed="Noch nicht ganz. Ein Viertel ist geschafft. Welche Zahl hat der kurze Zeiger gerade hinter sich?" -->
- [( )] Viertel nach drei
- [(X)] Viertel nach vier
- [( )] halb fünf

---

**Aufgabe 2:** Wie sagt man zu dieser Uhrzeit?

@Uhr.zeige(11:30)

<!-- data-text-failed="Noch nicht ganz. Halb heißt: halb auf dem Weg zur nächsten Zahl. Zu welcher Zahl ist der kurze Zeiger unterwegs?" -->
- [( )] halb elf
- [(X)] halb zwölf
- [( )] Viertel nach elf

---

**Aufgabe 3:** Auf dem Zettel steht **7:15**. Wie sagt man das mit „viertel“?

<!-- data-text-failed="Noch nicht ganz. Bei „viertel“ steht die nächste Stunde im Satz. Welche Stunde kommt nach der 7?" -->
- [( )] viertel sieben
- [(X)] viertel acht
- [( )] halb acht

---

**Aufgabe 4:** Ein Kunde sagt: **viertel drei**. Welche Uhrzeit meint er?

<!-- data-text-failed="Noch nicht ganz. Viertel drei heißt: ein Viertel auf dem Weg zur Drei. Die Stunde ist also noch die Zahl davor." -->
- [( )] 3:15
- [(X)] 2:15
- [( )] 2:45

---

**Aufgabe 5:** Stell die Uhr auf **Viertel nach eins**.

@Uhr.stellen(1:15)

### Fertig

                                 --{{0}}--
Zwei Zettel, eine Uhrzeit. Du sprichst jetzt beide Sprechweisen. Deine
Kursuhr steht bei einer Stunde und vierzig Minuten.

**Kursuhr:** 1 Stunde 40 Minuten.

@Uhr.zeige(1:40)

Setz dein Häkchen, wenn es stimmt:

- [ ] Das kann ich jetzt: „Viertel nach“, „viertel“ und „halb“ an der Uhr finden und sagen.

                                 --{{1}}--
Nächstes Mal geht es nach halb weiter. Dann schaut die Uhr nach vorn zur
nächsten Stunde. Und in der Werkstatt wartet eine kaputte Uhr.

**Weiter:** [Unit 6 · Nach halb: Viertel vor, zwanzig vor](#56)

— Tilda

## Unit 6 · Nach halb: Viertel vor, zwanzig vor

                                 --{{0}}--
Neuer Auftrag. Ein Kunde bringt eine alte Standuhr. Sie soll Viertel vor acht
zeigen, aber der kurze Zeiger steht falsch. Irgendwo ist ein Zahnrad kaputt.
Bevor wir reparieren, musst du wissen, wie die Uhr nach halb spricht.

@Wikimedia.embed(`File:Grandfather clock being repaired (17991390104).jpg`)

*Ein Zahnrad aus einer alten Standuhr. Drei Zähne sind abgebrochen, zwei davon siehst du hier. Mit so einem Rad läuft eine Uhr nicht mehr richtig.*

**Auftrag:** Uhrzeiten **nach halb** lesen und sagen — und die erste kaputte Uhr reparieren.

ungefähr 20 Minuten · keine Punkte · Pause erlaubt

### Aufwärmen

                                 --{{0}}--
Zum Warmwerden zwei Aufgaben von letztem Mal: Viertel und halb.

@Uhr.zeige(6:15)

Wie sagt man zu dieser Uhrzeit?

<!-- data-text-failed="Noch nicht ganz. Der lange Zeiger steht auf der 3: ein Viertel. Welche Zahl hat der kurze Zeiger gerade hinter sich?" -->
- [(X)] Viertel nach sechs
- [( )] Viertel nach sieben
- [( )] halb sieben

---

Stell die Uhr auf **viertel zehn**.

@Uhr.stellen(9:15)

### Nach halb schaut die Uhr nach vorn

                                 --{{0}}--
Bis halb sagt die Uhr, wie viel schon vorbei ist: Viertel nach. Nach halb
dreht sie es um. Sie sagt, wie viel noch fehlt bis zur nächsten vollen Stunde.
Dafür gibt es das Wort: vor.

<!-- data-type="none" -->
| Langer Zeiger auf … | Minuten | bis zur 12 fehlen | So sagt man (zwischen 7 und 8) |
|:---:|:---:|:---:|---|
| der 8 | 40 | 20 | **zwanzig vor** acht |
| der 9 | 45 | 15 = ein Viertel | **Viertel vor** acht |
| der 10 | 50 | 10 | **zehn vor** acht |
| der 11 | 55 | 5 | **fünf vor** acht |

> **Merksatz:** **Nach halb: Wie viel fehlt bis zur nächsten Stunde?**

                                 --{{1}}--
Probier es aus. Der lange Zeiger steht auf der Neun. Zieh ihn weiter bis zur
Zwölf. Die bemalte Fläche ist das Stück, das noch fehlt.

**Selbst probieren:** Zieh den langen Zeiger bis zur 12. Wie viele Minuten fehlen?

@Uhr.spanne(7:45)

### Viertel vor — Schritt für Schritt

                                 --{{0}}--
Jetzt die Uhr des Kunden, so wie sie richtig aussehen muss. Schritt für
Schritt.

**Beispiel 1 — Schritt für Schritt**

@Uhr.minutenkranz(7:45)

<!-- data-type="none" -->
| Schritt | Was du machst | Ergebnis |
|---|---|---|
| 1 | Kurzer Zeiger: Welche Zahl hat er schon hinter sich? Er ist **fast** an der 8, aber noch nicht drüber. | **7** |
| 2 | Langer Zeiger: auf der 9 | **45** Minuten → digital **7:45** |
| 3 | Wie viel fehlt bis zur 12? 60 − 45 | **15** = ein Viertel |
| 4 | Welche Stunde kommt als Nächstes? | **8** |
| 5 | Zusammen | **Viertel vor acht** |

                                 --{{1}}--
Wie bei viertel und halb gibt es eine zweite Sprechweise. Sie schaut nur nach
vorn: drei Viertel auf dem Weg zur Acht. Also: dreiviertel acht. Beide
Sprechweisen sind richtig.

<!-- data-type="none" -->
| Digital | Sprechweise 1 | Sprechweise 2 |
|:---:|:---:|:---:|
| 7:15 | Viertel nach sieben | viertel acht |
| 7:30 | halb acht | halb acht |
| 7:45 | **Viertel vor acht** | **dreiviertel acht** |

> **Viertel vor acht = dreiviertel acht = 7:45.**

                                 --{{2}}--
Vorsicht, Falle. Gesagt wird die nächste Stunde: acht. Geschrieben wird noch
die alte: sieben. Der kurze Zeiger ist ja noch nicht an der Acht.

**Falle:** Im Satz steht die **nächste** Stunde, in der Digitalzeit noch die **alte**. Viertel vor acht ist **7**:45, nicht 8:45.

                                 --{{3}}--
Noch ein Beispiel. Diesmal steht der lange Zeiger auf der Acht.

**Beispiel 2**

@Uhr.minutenkranz(3:40)

<!-- data-type="none" -->
| Schritt | Was du machst | Ergebnis |
|---|---|---|
| 1 | Kurzer Zeiger: Welche Zahl hat er schon hinter sich? | **3** |
| 2 | Langer Zeiger: auf der 8 | **40** Minuten → digital **3:40** |
| 3 | Wie viel fehlt bis zur 12? 60 − 40 | **20** |
| 4 | Welche Stunde kommt als Nächstes? | **4** |
| 5 | Zusammen | **zwanzig vor vier** |

Für diese Uhrzeit gibt es noch eine dritte Sprechweise. Die ist ein eigenes Rätsel und kommt in Unit 7.

### Das kaputte Zahnrad

                                 --{{0}}--
Jetzt die Uhr des Kunden. Der lange Zeiger stimmt. Der kurze ist verrutscht,
weil ein Zahnrad kaputt ist. Kaputt sind nur Uhren, nie Antworten. Schau, wie
weit der lange Zeiger herum ist. Genau so weit muss der kurze zwischen zwei
Zahlen stehen.

<!-- data-type="none" -->
| Langer Zeiger auf … | geschafft | Kurzer Zeiger steht … |
|---|---|---|
| der 3 | ein Viertel | ein Viertel hinter der Zahl |
| der 6 | halb | genau in der Mitte |
| der 9 | drei Viertel | **kurz vor** der nächsten Zahl |

**Repariere:** Diese Uhr soll **Viertel vor acht** zeigen. Zieh den kurzen Zeiger an die richtige Stelle.

@Uhr.reparieren(8:45,7:45)

### Üben

                                 --{{0}}--
Fünf Aufgaben. Bei einem Fehler kommt sofort ein Tipp. Unten liegt eine Uhr
mit Minutenkranz als Hilfe.

@Uhr.zeige(5:45)

Wie sagt man zu dieser Uhrzeit?

<!-- data-text-failed="Noch nicht ganz. Nach halb steht die nächste Stunde im Satz. Zu welcher Zahl ist der kurze Zeiger unterwegs?" -->
- [( )] Viertel vor fünf
- [(X)] Viertel vor sechs
- [( )] Viertel nach sechs

---

@Uhr.zeige(10:45)

Und in der anderen Sprechweise?

<!-- data-text-failed="Noch nicht ganz. Der lange Zeiger ist drei Viertel herum: dreiviertel. Welche Stunde kommt als Nächstes?" -->
- [( )] dreiviertel zehn
- [(X)] dreiviertel elf
- [( )] viertel elf

---

@Uhr.zeige(2:40)

Wie sagt man zu dieser Uhrzeit?

<!-- data-text-failed="Noch nicht ganz. Der lange Zeiger steht auf der 8: Bis zur 12 fehlen 20 Minuten. Welche Stunde kommt als Nächstes?" -->
- [( )] zwanzig vor zwei
- [(X)] zwanzig vor drei
- [( )] zwanzig nach drei

---

Stell die Uhr auf **Viertel vor neun**.

@Uhr.stellen(8:45)

---

Noch ein kaputtes Zahnrad. Diese Uhr soll **zehn vor sechs** zeigen. Repariere den kurzen Zeiger.

@Uhr.reparieren(6:50,5:50)

<details>
<summary>Hilfe: Was fehlt bis zur vollen Stunde?</summary>

<!-- data-type="none" -->
| Langer Zeiger auf … | 8 | 9 | 10 | 11 |
|---|:---:|:---:|:---:|:---:|
| Minuten | 40 | 45 | 50 | 55 |
| fehlen bis zur 12 | 20 | 15 | 10 | 5 |
| So sagt man | zwanzig vor | Viertel vor | zehn vor | fünf vor |

Dreh den langen Zeiger von der 6 bis zur 12 und zähl, was noch fehlt.

@Uhr.minutenkranz.spiel(7:30)

</details>

### Pause?

                                 --{{0}}--
Gute Arbeit. Als Nächstes der Nachweis mit fünf neuen Aufgaben. Jetzt oder
morgen, du entscheidest. Morgen zeigt sich besser, ob es wirklich sitzt.

**Weiter zum Nachweis** — oder **Pause** bis morgen.

### Zeig, was du kannst

                                 --{{0}}--
Fünf neue Aufgaben. Vier richtig heißt: Das sitzt. Nach halb: Wie viel fehlt
bis zur nächsten Stunde?

**Ziel:** 4 von 5.

**Aufgabe 1:** Wie sagt man zu dieser Uhrzeit?

@Uhr.zeige(3:45)

<!-- data-text-failed="Noch nicht ganz. Nach halb steht die nächste Stunde im Satz. Zu welcher Zahl ist der kurze Zeiger unterwegs?" -->
- [( )] Viertel vor drei
- [(X)] Viertel vor vier
- [( )] Viertel nach vier

---

**Aufgabe 2:** Wie sagt man zu dieser Uhrzeit?

@Uhr.zeige(11:50)

<!-- data-text-failed="Noch nicht ganz. Der lange Zeiger steht auf der 10: Bis zur 12 fehlen 10 Minuten. Welche Stunde kommt als Nächstes?" -->
- [( )] zehn vor elf
- [(X)] zehn vor zwölf
- [( )] zehn nach zwölf

---

**Aufgabe 3:** Auf dem Zettel steht **6:45**. Wie sagt man das mit „dreiviertel“?

<!-- data-text-failed="Noch nicht ganz. Bei „dreiviertel“ steht die nächste Stunde im Satz. Welche Stunde kommt nach der 6?" -->
- [( )] dreiviertel sechs
- [(X)] dreiviertel sieben
- [( )] viertel sieben

---

**Aufgabe 4:** Ein Kunde sagt: **zwanzig vor neun**. Welche Uhrzeit meint er?

<!-- data-text-failed="Noch nicht ganz. Im Satz steht die nächste Stunde. Die Digitalzeit beginnt noch mit der Stunde davor. Und 20 Minuten vor der vollen Stunde sind 40 Minuten." -->
- [( )] 9:40
- [(X)] 8:40
- [( )] 8:20

---

**Aufgabe 5:** Stell die Uhr auf **dreiviertel zwei**.

@Uhr.stellen(1:45)

### Fertig

                                 --{{0}}--
Heute hast du zum ersten Mal Uhren nach halb gelesen. Und eine kaputte Uhr
repariert. Deine Kursuhr steht jetzt bei zwei Stunden.

**Kursuhr:** 2 Stunden.

@Uhr.zeige(2:00)

Setz dein Häkchen, wenn es stimmt:

- [ ] Das kann ich jetzt: Uhrzeiten nach halb lesen und sagen — „Viertel vor“, „dreiviertel“, „zwanzig vor“, „zehn vor“.

                                 --{{1}}--
Nächstes Mal wird es knifflig: zehn vor halb. Ein echtes Sprachrätsel. Meine
Übersetzungsmaschine hilft uns.

**Weiter:** **Unit 7 · „Zehn vor halb“ & die Übersetzungsmaschine** *(kommt bald)*

— Tilda

---

<details>
<summary>📚 Quelle (für Erwachsene)</summary>

Foto: *Grandfather clock being repaired*, David Elliott, CC BY 2.0, über Wikimedia Commons (ursprünglich Flickr).

</details>
