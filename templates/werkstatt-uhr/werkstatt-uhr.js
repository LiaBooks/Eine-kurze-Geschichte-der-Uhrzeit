/*
 * Werkstatt-Uhr — LiaScript-Template-Bibliothek für „Eine kurze Geschichte der Uhrzeit“
 * Web Components ohne externe Abhängigkeiten. Lizenz: CC BY 4.0
 *
 * Elemente:  <wu-clock> <wu-daynight> <wu-timeline> <wu-timer> <wu-translator>
 *            <wu-practice> <wu-sundial> <wu-hourglass> <wu-waterclock>
 * Helfer:    window.WU (Zeit parsen/formatieren, Sprechweisen, Quiz-Prüfung)
 *
 * Feste Regeln: Zeiger immer gekoppelt · Stundenzeiger kurz/dick (--wu-hour),
 * Minutenzeiger lang/dünn (--wu-minute) · Farben über CSS-Variablen anpassbar.
 */
(function () {
  'use strict'
  if (window.WU && window.WU.version) return

  const NS = 'http://www.w3.org/2000/svg'
  const WU = (window.WU = { version: '0.1.0' })

  // ------------------------------------------------------------------ Zeit
  const mod = (n, m) => ((n % m) + m) % m

  WU.parseTime = function (str) {
    if (str === null || str === undefined) return null
    if (typeof str === 'number') return mod(Math.round(str), 1440)
    let s = String(str).trim().toLowerCase()
    s = s.replace(/uhr/g, ' ').replace(/(\d)\s*h\s*(\d)/g, '$1:$2').replace(/\s+/g, ' ').trim()
    let m = s.match(/^(\d{1,2})\s*[:.\s]\s*(\d{1,2})$/)
    if (m) {
      const h = +m[1], mi = +m[2]
      if (h > 24 || mi > 59) return null
      return mod(h * 60 + mi, 1440)
    }
    m = s.match(/^(\d{1,2})$/)
    if (m && +m[1] <= 24) return mod(+m[1] * 60, 1440)
    return null
  }

  WU.fmt = function (T, opts) {
    opts = opts || {}
    T = mod(Math.round(T), 1440)
    let h = Math.floor(T / 60)
    const m = T % 60
    if (opts.h12) h = h % 12 || 12
    const hs = opts.pad ? String(h).padStart(2, '0') : String(h)
    return hs + ':' + String(m).padStart(2, '0')
  }

  WU.parseDuration = function (str) {
    if (str === null || str === undefined) return null
    let s = String(str).trim().toLowerCase().replace(',', '.')
    if (!s) return null
    let m = s.match(/^(\d{1,2}):(\d{1,2})$/)
    if (m) return +m[1] * 60 + +m[2]
    m = s.match(/^(\d+)\s*(?:h|std\.?|stunden?)\s*(?:und\s*)?(\d+)\s*(?:m|min\.?|minuten?)?$/)
    if (m) return +m[1] * 60 + +m[2]
    m = s.match(/^(\d+(?:\.\d+)?)\s*(?:h|std\.?|stunden?)$/)
    if (m) return Math.round(+m[1] * 60)
    m = s.match(/^(\d+)\s*(?:m|min\.?|minuten?)?$/)
    if (m) return +m[1]
    return null
  }

  WU.fmtDuration = function (min) {
    min = Math.round(min)
    const h = Math.floor(min / 60), m = min % 60
    if (!h) return m + ' min'
    if (!m) return h + ' h'
    return h + ' h ' + m + ' min'
  }

  WU.dayPart = function (T) {
    const h = mod(T, 1440) / 60
    if (h < 5) return 'nachts'
    if (h < 9) return 'morgens'
    if (h < 12) return 'vormittags'
    if (h < 14) return 'mittags'
    if (h < 18) return 'nachmittags'
    if (h < 22) return 'abends'
    return 'nachts'
  }

  // ------------------------------------------------------- Sprechweisen
  const ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn',
    'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn']
  const TENS = { 20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig' }
  WU.num = function (n) {
    if (n < 20) return ONES[n]
    const t = Math.floor(n / 10) * 10, o = n % 10
    if (!o) return TENS[t]
    return (o === 1 ? 'ein' : ONES[o]) + 'und' + TENS[t]
  }
  const hw = (h) => WU.num(h) // eins … zwölf
  const huhr = (h) => (h === 1 ? 'ein' : WU.num(h)) + ' Uhr'

  // variant: 'nach' („Viertel nach acht“) oder 'viertel' („viertel neun“)
  WU.speak = function (T, variant) {
    variant = variant === 'viertel' ? 'viertel' : 'nach'
    T = mod(T, 1440)
    const h = Math.floor(T / 60) % 12 || 12
    const n = (h % 12) + 1
    const m = T % 60
    const V = variant === 'viertel'
    switch (m) {
      case 0: return huhr(h)
      case 5: return 'fünf nach ' + hw(h)
      case 10: return 'zehn nach ' + hw(h)
      case 15: return V ? 'viertel ' + hw(n) : 'Viertel nach ' + hw(h)
      case 20: return V ? 'zehn vor halb ' + hw(n) : 'zwanzig nach ' + hw(h)
      case 25: return 'fünf vor halb ' + hw(n)
      case 30: return 'halb ' + hw(n)
      case 35: return 'fünf nach halb ' + hw(n)
      case 40: return V ? 'zehn nach halb ' + hw(n) : 'zwanzig vor ' + hw(n)
      case 45: return V ? 'dreiviertel ' + hw(n) : 'Viertel vor ' + hw(n)
      case 50: return 'zehn vor ' + hw(n)
      case 55: return 'fünf vor ' + hw(n)
    }
    if (m < 30) return WU.num(m) + (m === 1 ? ' Minute' : ' Minuten') + ' nach ' + hw(h)
    const r = 60 - m
    return WU.num(r) + (r === 1 ? ' Minute' : ' Minuten') + ' vor ' + hw(n)
  }

  WU.speakForms = function (T) {
    const a = WU.speak(T, 'nach'), b = WU.speak(T, 'viertel')
    const m = mod(T, 60)
    const list = [a, b]
    if (m === 20 || m === 40) {
      const h = Math.floor(mod(T, 1440) / 60) % 12 || 12, n = (h % 12) + 1
      list.push(m === 20 ? 'zwanzig nach ' + hw(h) : 'zwanzig vor ' + hw(n))
      list.push(m === 20 ? 'zehn vor halb ' + hw(n) : 'zehn nach halb ' + hw(n))
    }
    return [...new Set(list)]
  }

  WU.speak24 = function (T) {
    T = mod(T, 1440)
    const h = Math.floor(T / 60), m = T % 60
    return huhr(h === 0 ? 0 : h).replace('null Uhr', 'null Uhr') + (m ? ' ' + WU.num(m) : '')
  }

  WU.say = function (text) {
    try {
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'de-DE'
      const v = window.speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith('de'))
      if (v) u.voice = v
      u.rate = 0.9
      window.speechSynthesis.speak(u)
    } catch (e) { /* Sprachausgabe nicht verfügbar */ }
  }

  // Link auf eine andere Kursdatei, der im LiaScript-Viewer bleibt
  // (DevServer: /liascript/chat.html?…, veröffentlicht: liascript.github.io/course/?…)
  WU.courseLink = function (text, url) {
    let abs = url
    try {
      const base = decodeURIComponent(location.search.slice(1))
      abs = new URL(url, /^https?:/.test(base) ? base : location.href).href
    } catch (e) { /* url bleibt wie angegeben */ }
    const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
    return 'HTML: <a href="' + esc(location.origin + location.pathname + '?' + abs) + '">' + esc(text) + '</a>'
  }

  WU.sameTime = function (input, target, modulo) {
    const a = WU.parseTime(input), b = WU.parseTime(target)
    if (a === null || b === null) return false
    const M = modulo || 720
    return mod(a, M) === mod(b, M)
  }

  WU.between = function (start, end) {
    const a = WU.parseTime(start)
    let b = WU.parseTime(end)
    if (a === null || b === null) return null
    if (b <= a) b += 1440
    return b - a
  }

  WU.checkDuration = function (input, start, end) {
    const v = WU.parseDuration(input)
    return v !== null && v === WU.between(start, end)
  }

  WU.sameDuration = function (input, target) {
    const a = WU.parseDuration(input), b = WU.parseDuration(target)
    return a !== null && b !== null && a === b
  }

  // „Lösung zeigen“: LiaScript ruft das Quiz-Skript dabei nicht auf. Deshalb beobachtet
  // jedes Aufgaben-Element das nächstfolgende Quiz und zeigt die Lösung selbst.
  WU.watchQuiz = function (host, onResolved) {
    let tries = 0
    const find = () => {
      const quiz = [...document.querySelectorAll('.lia-quiz')].find((q) =>
        host.compareDocumentPosition(q) & Node.DOCUMENT_POSITION_FOLLOWING)
      if (!quiz) { if (tries++ < 20) setTimeout(find, 250); return }
      let done = false
      const test = () => {
        if (done) return
        if (/\b(solved|resolved)\b/.test(quiz.className)) { done = true; onResolved() }
      }
      new MutationObserver(test).observe(quiz, { attributes: true, attributeFilter: ['class'] })
    }
    setTimeout(find, 100)
  }

  // ------------------------------------------------------- SVG-Helfer
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag)
    for (const k in attrs || {}) e.setAttribute(k, attrs[k])
    if (parent) parent.appendChild(e)
    return e
  }
  const polar = (r, deg) => {
    const a = (deg * Math.PI) / 180
    return [r * Math.sin(a), -r * Math.cos(a)]
  }
  function sectorPath(r, a0, sweep) {
    if (sweep >= 359.999) return `M0,${-r} A${r},${r} 0 1 1 0,${r} A${r},${r} 0 1 1 0,${-r} Z`
    const [x0, y0] = polar(r, a0)
    const [x1, y1] = polar(r, a0 + sweep)
    return `M0,0 L${x0},${y0} A${r},${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x1},${y1} Z`
  }
  function ringPath(r0, r1, a0, a1) {
    const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1)
    const [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0)
    const large = a1 - a0 > 180 ? 1 : 0
    return `M${x0},${y0} A${r1},${r1} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 ${large} 0 ${x3},${y3} Z`
  }
  function pointerAngle(svg, e) {
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM().inverse())
    return { a: mod((Math.atan2(p.x, -p.y) * 180) / Math.PI, 360), d: Math.hypot(p.x, p.y), x: p.x, y: p.y }
  }

  const BASE_CSS = `
    :host{display:block;margin:.6em auto;font-size:var(--wu-font,18px);line-height:1.35;font-family:inherit;color:#222;
      --_hour:var(--wu-hour,#1c3f94);--_minute:var(--wu-minute,#e8590c);--_face:var(--wu-face,#fffdf7);
      --_ink:var(--wu-ink,#222);--_span:var(--wu-span,rgba(47,158,68,.32));--_span2:var(--wu-span2,rgba(47,158,68,.62));
      --_accent:var(--wu-accent,#2f9e44)}
    button{font:inherit;font-size:1em;padding:.45em .9em;margin:.2em;border-radius:999px;border:2px solid var(--_hour);
      background:#fff;color:var(--_hour);cursor:pointer;min-height:44px}
    button:hover,button:focus-visible{background:var(--_hour);color:#fff;outline:none}
    .row{display:flex;flex-wrap:wrap;gap:.3em;justify-content:center;align-items:center}
    .digital{font:700 1.5em/1.2 ui-monospace,"DejaVu Sans Mono",monospace;text-align:center;color:var(--_ink);
      background:#fff;border:2px solid #ccc;border-radius:8px;padding:.1em .5em;display:inline-block}
    .note{text-align:center;font-size:1em;color:#333;margin:.3em 0}
    .ok{color:#2b8a3e;font-weight:700}.no{color:#c92a2a;font-weight:700}
    .card{background:#fff;border:1px solid #ddd;border-radius:12px;padding:.6em}
  `

  // ============================================================ <wu-clock>
  class WUClock extends HTMLElement {
    static get observedAttributes() { return ['time'] }
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.T = 0
    }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.mode = this.getAttribute('mode') || 'static' // static|play|single|repair|span
      this.single = this.mode === 'single' || this.hasAttribute('single')
      this.interactive = this.mode !== 'static' && !this.hasAttribute('locked')
      this.snap = +(this.getAttribute('snap') || (this.single ? 5 : 1))
      this.day = this.hasAttribute('day')
      this.T = WU.parseTime(this.getAttribute('time') || '12:00') || 0
      if (!this.day) this.T = mod(this.T, 720)
      this.start = this.T
      this.digital = this.getAttribute('digital') // '12'|'24'|null
      if (this.mode === 'repair') {
        const wrong = WU.parseTime(this.getAttribute('wrong') || this.getAttribute('time')) || 0
        this.correctT = WU.parseTime(this.getAttribute('time')) || 0
        this.T = this.correctT
        this.freeHour = mod(wrong, 720) / 2 // falscher Winkel
        this.fixed = false
      }
      this.build()
      this.update()
      if (this.hasAttribute('solution') || this.mode === 'repair') {
        WU.watchQuiz(this, () => {
          if (this.id && WU.check(this.id, this.getAttribute('solution'), '', this.getAttribute('solution-to'))) return
          this.showSolution(this.getAttribute('solution'))
        })
      }
    }
    attributeChangedCallback(name, oldV, newV) {
      if (!this._init || oldV === newV) return
      if (name === 'time') {
        const t = WU.parseTime(newV)
        if (t !== null) { this.T = this.day ? t : mod(t, 720); this.update() }
      }
    }
    get minutes() { return mod(this.T, this.day ? 1440 : 720) }
    get elapsed() { return this.T - this.start }
    setTime(t) {
      const v = typeof t === 'number' ? t : WU.parseTime(t)
      if (v === null) return
      this.T = this.day ? mod(v, 1440) : mod(v, 720)
      this.update()
    }
    setElapsed(min) { this.T = this.start + min; this.update() }
    build() {
      const size = this.getAttribute('size') || '260px'
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:${size}} svg{width:100%;height:auto;display:block;touch-action:none;user-select:none;-webkit-user-select:none}
        :host([mode="play"]) svg,:host([mode="single"]) svg,:host([mode="repair"]) svg,:host([mode="span"]) svg{cursor:grab}
        .face{fill:var(--_face);stroke:#333;stroke-width:3}
        .num{font:600 15px system-ui,sans-serif;fill:var(--_ink);text-anchor:middle;dominant-baseline:central}
        .tick{stroke:#555;stroke-width:1}.tick5{stroke:#222;stroke-width:2.6}
        .hour{stroke:var(--_hour);stroke-width:8;stroke-linecap:round}
        .minute{stroke:var(--_minute);stroke-width:4;stroke-linecap:round}
        .cap{fill:#333}.span1{fill:var(--_span)}.span2{fill:var(--_span2)}
        .startmark{stroke:var(--_accent);stroke-width:3;stroke-dasharray:4 3}
        .gear{font-size:20px}
        .center{text-align:center}
      </style><div class="center"></div>`
      const wrap = this.shadowRoot.querySelector('.center')
      const ring = this.hasAttribute('minutes')
      const vb = ring ? '-122 -122 244 244' : '-100 -100 200 200'
      const svg = (this.svg = el('svg', { viewBox: vb, role: this.interactive ? 'slider' : 'img',
        'aria-label': this.interactive ? 'Uhr zum Stellen' : 'Uhr' }, wrap))
      el('circle', { class: 'face', r: 95 }, svg)
      if (this.hasAttribute('zones')) {
        // zwischen zwei Zahlen: 0–20 min „kurz nach“, 20–40 „in der Mitte“, 40–60 „fast“
        // farbsicher (Okabe-Ito-Töne) + Muster: kurz nach = glatt, Mitte = Punkte, fast = Streifen
        const Z = ['var(--wu-zone1,#cfe8fb)', 'var(--wu-zone2,#fff1a8)', 'var(--wu-zone3,#efc3e0)']
        const defs = el('defs', {}, svg)
        const dots = el('pattern', { id: 'wu-dots', width: 6, height: 6, patternUnits: 'userSpaceOnUse' }, defs)
        el('circle', { cx: 3, cy: 3, r: 1.3, fill: '#7a6a00' }, dots)
        const stripes = el('pattern', { id: 'wu-stripes', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs)
        el('rect', { x: 0, y: 0, width: 2, height: 6, fill: '#8e3a73' }, stripes)
        const P = [null, 'url(#wu-dots)', 'url(#wu-stripes)']
        for (let h = 0; h < 12; h++) for (let z = 0; z < 3; z++) {
          const d = ringPath(56, 94, h * 30 + z * 10, h * 30 + z * 10 + 10)
          el('path', { d, fill: Z[z], stroke: 'none' }, svg)
          if (P[z]) el('path', { d, fill: P[z], stroke: 'none', opacity: 0.55 }, svg)
        }
      }
      this.spanG = el('g', {}, svg)
      for (let i = 0; i < 60; i++) {
        if (this.single && i % 5) continue
        const big = i % 5 === 0
        const [x0, y0] = polar(big ? 84 : 88, i * 6)
        const [x1, y1] = polar(93, i * 6)
        el('line', { class: big ? 'tick5' : 'tick', x1: x0, y1: y0, x2: x1, y2: y1 }, svg)
      }
      if (this.single) {
        // Zwischenmarken für Viertelstunden, damit „kurz nach“/„fast“ sichtbar wird
        for (let i = 0; i < 48; i++) {
          if (i % 4 === 0) continue
          const [x0, y0] = polar(89, i * 7.5)
          const [x1, y1] = polar(93, i * 7.5)
          el('line', { class: 'tick', x1: x0, y1: y0, x2: x1, y2: y1 }, svg)
        }
      }
      for (let h = 1; h <= 12; h++) {
        const [x, y] = polar(71, h * 30)
        const t = el('text', { class: 'num', x, y }, svg)
        t.textContent = h
      }
      if (ring) {
        // Minutenkranz: jede Zahl = 5 Minuten, in der Farbe des Minutenzeigers
        for (let k = 0; k < 12; k++) {
          const [x, y] = polar(110, k * 30)
          const t = el('text', { x, y, 'text-anchor': 'middle', 'dominant-baseline': 'central',
            style: 'font:700 13px system-ui,sans-serif;fill:var(--_minute)' }, svg)
          t.textContent = k === 0 ? '0' : String(k * 5)
        }
      }
      this.startMark = el('line', { class: 'startmark', x1: 0, y1: 0, x2: 0, y2: -82, visibility: 'hidden' }, svg)
      this.hourHand = el('line', { class: 'hour', x1: 0, y1: 8, x2: 0, y2: -46 }, svg)
      this.minuteHand = el('line', { class: 'minute', x1: 0, y1: 12, x2: 0, y2: -80, visibility: this.single ? 'hidden' : 'visible' }, svg)
      el('circle', { class: 'cap', r: 5 }, svg)
      if (this.mode === 'repair') {
        this.gear = el('text', { class: 'gear', x: 0, y: 40, 'text-anchor': 'middle' }, svg)
      }
      if (this.hasAttribute('zones')) {
        const lg = document.createElement('div')
        lg.className = 'note'
        const sw = (fill, pat) => `<svg width="22" height="16" style="width:22px;height:16px;display:inline-block;vertical-align:middle"><defs>
          <pattern id="d" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.3" fill="#7a6a00"/></pattern>
          <pattern id="s" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="6" fill="#8e3a73"/></pattern></defs>
          <rect width="22" height="16" rx="3" fill="${fill}" stroke="#888"/>${pat ? `<rect width="22" height="16" rx="3" fill="url(#${pat})" opacity=".55"/>` : ''}</svg>`
        const it = (h, t) => `<span style="white-space:nowrap;margin:0 .3em">${h} ${t}</span>`
        lg.innerHTML = it(sw('var(--wu-zone1,#cfe8fb)'), 'kurz nach') + it(sw('var(--wu-zone2,#fff1a8)', 'd'), 'in der Mitte') + it(sw('var(--wu-zone3,#efc3e0)', 's'), 'fast')
        wrap.appendChild(lg)
      }
      if (this.digital || this.mode === 'span') {
        this.readout = document.createElement('div')
        this.readout.className = 'note'
        wrap.appendChild(this.readout)
      }
      if (this.interactive) this.bindDrag()
    }
    bindDrag() {
      const svg = this.svg
      this.tabIndex = 0
      svg.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        const p = pointerAngle(svg, e)
        if (p.d > 98) return
        this.dragHand = this.pickHand(p)
        try { svg.setPointerCapture(e.pointerId) } catch (_) {}
        this.dragTo(p)
      })
      svg.addEventListener('pointermove', (e) => {
        if (!this.dragHand) return
        this.dragTo(pointerAngle(svg, e))
      })
      const end = () => { if (this.dragHand) { this.dragHand = null; this.emit() } }
      svg.addEventListener('pointerup', end)
      svg.addEventListener('pointercancel', end)
      this.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 5 : this.snap
        let d = 0
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') d = step
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') d = -step
        else if (e.key === 'PageUp') d = 60
        else if (e.key === 'PageDown') d = -60
        if (!d) return
        e.preventDefault()
        if (this.mode === 'repair') this.freeHour = mod(this.freeHour + d / 2, 360)
        else this.applyDelta(d)
        this.update()
        this.emit()
      })
    }
    pickHand(p) {
      if (this.single || this.mode === 'repair') return 'hour'
      if (p.d > 54) return 'minute'
      const ma = (mod(this.T, 60)) * 6, ha = mod(this.T, 720) / 2
      const dist = (a, b) => Math.min(mod(a - b, 360), mod(b - a, 360))
      return dist(p.a, ha) <= dist(p.a, ma) ? 'hour' : 'minute'
    }
    dragTo(p) {
      if (this.mode === 'repair') {
        this.freeHour = p.a
        this.update()
        return
      }
      if (this.dragHand === 'minute') {
        const target = mod(Math.round(p.a / 6 / this.snap) * this.snap, 60)
        let delta = target - mod(this.T, 60)
        if (delta > 30) delta -= 60
        if (delta < -30) delta += 60
        this.applyDelta(delta)
      } else {
        const target = mod(Math.round((p.a * 2) / this.snap) * this.snap, 720)
        let delta = target - mod(this.T, 720)
        if (delta > 360) delta -= 720
        if (delta < -360) delta += 720
        this.applyDelta(delta)
      }
      this.update()
    }
    applyDelta(delta) {
      if (!delta) return
      this.T += delta
      if (this.mode === 'span') this.T = Math.max(this.start, Math.min(this.start + 720, this.T))
      else this.T = mod(this.T, this.day ? 1440 : 720)
      this.emit(true)
    }
    emit(live) {
      this.dispatchEvent(new CustomEvent(live ? 'wu-input' : 'wu-change', {
        detail: { minutes: this.minutes, elapsed: this.elapsed }, bubbles: true, composed: true }))
    }
    update() {
      if (!this.svg) return
      const ma = mod(this.T, 60) * 6
      const ha = this.mode === 'repair' ? this.freeHour : mod(this.T, 720) / 2
      this.minuteHand.setAttribute('transform', `rotate(${ma})`)
      this.hourHand.setAttribute('transform', `rotate(${ha})`)
      if (this.mode === 'repair' && this.gear) {
        this.gear.textContent = this.fixed ? '⚙️ ✔ repariert' : '⚙️ ✖ kaputt'
        this.gear.setAttribute('fill', this.fixed ? '#2b8a3e' : '#c92a2a')
      }
      if (this.mode === 'span') {
        this.startMark.setAttribute('visibility', 'visible')
        this.startMark.setAttribute('transform', `rotate(${mod(this.start, 60) * 6})`)
        this.spanG.innerHTML = ''
        const e = this.elapsed
        const laps = Math.floor(e / 60), rest = e % 60
        if (laps >= 1) el('path', { class: 'span1', d: sectorPath(82, 0, 360) }, this.spanG)
        if (rest > 0) el('path', { class: laps >= 1 ? 'span2' : 'span1', d: sectorPath(82, mod(this.start, 60) * 6, rest * 6) }, this.spanG)
      }
      if (this.readout) {
        if (this.mode === 'span') {
          this.readout.innerHTML = this.hasAttribute('count')
            ? `Gemalt: <b>${WU.fmtDuration(this.elapsed)}</b>` : ''
        } else {
          this.readout.innerHTML = `<span class="digital">${this.digital === '24'
            ? WU.fmt(this.minutes) : WU.fmt(this.minutes, { h12: true })}</span>`
        }
      }
      if (this.interactive && this.mode !== 'repair') {
        this.svg.setAttribute('aria-valuetext', WU.fmt(this.minutes, { h12: !this.day }))
      }
    }
    // Lösung zeigen
    showSolution(target) {
      if (this.mode === 'repair') { this.freeHour = mod(this.correctT, 720) / 2; this.fixed = true }
      else if (this.single && this.getAttribute('solution-to')) {
        const lo = WU.parseTime(target), hi = WU.parseTime(this.getAttribute('solution-to'))
        this.setTime(Math.round((lo + (hi >= lo ? hi : hi + 720)) / 2 / 5) * 5)
      }
      else if (this.mode === 'span') this.setElapsed(+target)
      else this.setTime(target)
      this.update()
    }
  }
  customElements.define('wu-clock', WUClock)

  // ------------------------------------------------- Quiz-Prüfung (Makros)
  // kind: set | single | repair | span | daynight
  WU.check = function (id, target, input, extra) {
    const e = document.getElementById(id)
    if (!e) return false
    if (String(input) === 'true') { // „Lösung zeigen“
      if (e.showSolution) e.showSolution(target)
      return true
    }
    if (e.tagName === 'WU-DAYNIGHT') {
      const t = WU.parseTime(target)
      return e.minutes === t
    }
    if (e.mode === 'repair') {
      const ok = Math.min(mod(e.freeHour - mod(e.correctT, 720) / 2, 360), mod(mod(e.correctT, 720) / 2 - e.freeHour, 360)) <= 7.5
      if (ok) { e.fixed = true; e.freeHour = mod(e.correctT, 720) / 2; e.update() }
      return ok
    }
    if (e.mode === 'span') return e.elapsed === +target
    if (e.single) {
      const lo = WU.parseTime(target), hi = WU.parseTime(extra || target)
      const v = e.minutes
      if (lo === null || hi === null) return false
      const a = mod(lo, 720), b = mod(hi, 720)
      return a <= b ? v >= a && v <= b : v >= a || v <= b
    }
    const t = WU.parseTime(target)
    const tol = +(extra || 0)
    const diff = Math.min(mod(e.minutes - t, 720), mod(t - e.minutes, 720))
    return diff <= tol
  }

  // ========================================================= <wu-daynight>
  class WUDayNight extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    get minutes() { return this.T }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.task = this.getAttribute('mode') === 'task'
      this.T = WU.parseTime(this.getAttribute('time') || '7:00') || 0
      this.rise = WU.parseTime(this.getAttribute('sunrise') || '6:30')
      this.set = WU.parseTime(this.getAttribute('sunset') || '18:30')
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:560px}
        .scene{width:100%;height:auto;display:block;border-radius:12px}
        .grid{display:grid;grid-template-columns:minmax(120px,190px) 1fr;gap:.6em;align-items:center}
        @media (max-width:480px){.grid{grid-template-columns:1fr}}
        input[type=range]{width:100%;min-height:44px;accent-color:var(--_hour)}
        .part{font-size:1.15em;font-weight:700;text-align:center}
        .round{font-size:.95em;text-align:center;color:#555}
      </style>
      <div class="card">
        <svg class="scene" viewBox="0 0 300 130" aria-hidden="true"></svg>
        <div class="grid">
          <wu-clock mode="static" size="190px"></wu-clock>
          <div>
            <div class="row"><span class="digital" id="dig"></span></div>
            <div class="part" id="part"></div>
            <div class="round" id="round"></div>
          </div>
        </div>
        <input type="range" min="0" max="1435" step="5" aria-label="Uhrzeit am Tag verschieben">
        <div class="row"><button id="m">− 5 min</button><button id="p">+ 5 min</button></div>
      </div>`
      const s = (this.scene = this.shadowRoot.querySelector('.scene'))
      this.sky = el('rect', { x: 0, y: 0, width: 300, height: 130 }, s)
      this.stars = el('g', { fill: '#fff' }, s)
      ;[[30, 20], [80, 35], [130, 15], [190, 28], [240, 18], [270, 45], [55, 55], [210, 60]].forEach(([x, y]) =>
        el('circle', { cx: x, cy: y, r: 1.4 }, this.stars))
      this.sun = el('circle', { r: 11, fill: '#ffd43b', stroke: '#f59f00', 'stroke-width': 2 }, s)
      this.moon = el('g', {}, s)
      el('circle', { r: 9, fill: '#f1f3f5' }, this.moon)
      el('circle', { r: 9, cx: 5, cy: -3, fill: '#0b1d3a', class: 'moonshade' }, this.moon)
      el('rect', { x: 0, y: 110, width: 300, height: 20, fill: '#5c940d' }, s)
      el('path', { d: 'M20 110 l12 -18 l12 18 Z M250 110 l10 -14 l10 14 Z', fill: '#2b8a3e' }, s)
      el('path', { d: 'M140 110 v-16 h20 v16 Z M136 94 l14 -10 l14 10 Z', fill: '#e8590c' }, s)
      this.clock = this.shadowRoot.querySelector('wu-clock')
      this.slider = this.shadowRoot.querySelector('input')
      this.slider.value = this.T
      this.slider.addEventListener('input', () => { this.T = +this.slider.value; this.update(); this.emit() })
      this.shadowRoot.getElementById('m').addEventListener('click', () => this.step(-5))
      this.shadowRoot.getElementById('p').addEventListener('click', () => this.step(5))
      requestAnimationFrame(() => this.update())
      if (this.hasAttribute('solution')) {
        WU.watchQuiz(this, () => { if (this.T !== WU.parseTime(this.getAttribute('solution'))) this.showSolution(this.getAttribute('solution')) })
      }
    }
    step(d) { this.T = mod(this.T + d, 1440); this.slider.value = this.T; this.update(); this.emit() }
    setTime(t) { const v = WU.parseTime(t); if (v === null) return; this.T = v; this.slider.value = v; this.update() }
    showSolution(t) { this.setTime(t) }
    emit() { this.dispatchEvent(new CustomEvent('wu-change', { detail: { minutes: this.T }, bubbles: true, composed: true })) }
    update() {
      const T = this.T
      if (this.clock.setTime) this.clock.setTime(T)
      else this.clock.setAttribute('time', WU.fmt(T))
      const dig = this.shadowRoot.getElementById('dig')
      dig.textContent = this.task ? '?? : ??' : WU.fmt(T)
      this.shadowRoot.getElementById('part').textContent = WU.dayPart(T)
      this.shadowRoot.getElementById('round').textContent = this.task ? ''
        : T < 720 ? '1. Runde des Stundenzeigers (0–12 Uhr)' : '2. Runde des Stundenzeigers (12–24 Uhr)'
      // Himmel
      const rise = this.rise, set = this.set
      const dayLen = set - rise
      let light // 0 Nacht … 1 Tag
      if (T <= rise - 45 || T >= set + 45) light = 0
      else if (T < rise + 45) light = (T - (rise - 45)) / 90
      else if (T > set - 45) light = ((set + 45) - T) / 90
      else light = 1
      const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
      const night = [11, 29, 58], dawn = [245, 159, 90], day = [126, 200, 242]
      const c = light < 0.5 ? mix(night, dawn, light * 2) : mix(dawn, day, (light - 0.5) * 2)
      this.sky.setAttribute('fill', `rgb(${c.join(',')})`)
      this.stars.setAttribute('opacity', String(Math.max(0, 1 - light * 2)))
      this.shadowRoot.querySelector('.moonshade').setAttribute('fill', `rgb(${c.join(',')})`)
      // Sonnenbahn
      if (T >= rise - 20 && T <= set + 20) {
        const f = (T - rise) / dayLen
        const x = 20 + 260 * f
        const y = 108 - Math.sin(Math.PI * Math.min(1, Math.max(0, f))) * 88
        this.sun.setAttribute('cx', x)
        this.sun.setAttribute('cy', y)
        this.sun.setAttribute('visibility', 'visible')
      } else this.sun.setAttribute('visibility', 'hidden')
      // Mond (nachts)
      const nightLen = 1440 - dayLen
      const tn = mod(T - set, 1440)
      if (tn <= nightLen) {
        const f = tn / nightLen
        this.moon.setAttribute('transform', `translate(${20 + 260 * f},${100 - Math.sin(Math.PI * f) * 75})`)
        this.moon.setAttribute('visibility', light < 0.6 ? 'visible' : 'hidden')
      } else this.moon.setAttribute('visibility', 'hidden')
    }
  }
  customElements.define('wu-daynight', WUDayNight)

  // ========================================================= <wu-timeline>
  WU.jumps = function (start, end) {
    let s = WU.parseTime(start), e = WU.parseTime(end)
    if (s === null || e === null) return []
    if (e <= s) e += 1440
    const out = []
    let t = s
    if (t % 60 && Math.ceil(t / 60) * 60 <= e) {
      const nx = Math.ceil(t / 60) * 60
      out.push({ from: t, to: nx, min: nx - t })
      t = nx
    }
    const hours = Math.floor((e - t) / 60)
    if (hours > 3) { out.push({ from: t, to: t + hours * 60, min: hours * 60 }); t += hours * 60 }
    else while (t + 60 <= e) { out.push({ from: t, to: t + 60, min: 60 }); t += 60 }
    if (t < e) out.push({ from: t, to: e, min: e - t })
    return out
  }

  class WUTimeline extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.task = this.getAttribute('mode') === 'task'
      this.hideLabels = this.getAttribute('labels') === 'off'
      this.startT = WU.parseTime(this.getAttribute('start'))
      this.endT = WU.parseTime(this.getAttribute('end'))
      this.jumps = WU.jumps(this.startT, this.endT)
      this.shown = 0
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:680px} svg{width:100%;height:auto;display:block}
        .axis{stroke:#333;stroke-width:3}.tickl{font:600 12px system-ui;text-anchor:middle;fill:#222}
        .station{font-size:15px;text-anchor:middle}
        .jump{fill:none;stroke:var(--_accent);stroke-width:3}.jlabel{font:700 13px system-ui;text-anchor:middle;fill:var(--_accent)}
        .end{fill:var(--_minute)}.start{fill:var(--_hour)}
        .sum{font-size:1.15em;text-align:center;margin:.3em}
      </style>
      <div class="card"><svg viewBox="0 20 600 135" role="img" aria-label="Zeitstrahl"></svg>
      <div class="sum" id="sum"></div>
      <div class="row"><button id="next">▶ Nächster Sprung</button><button id="reset">↺ Von vorn</button></div></div>`
      this.svg = this.shadowRoot.querySelector('svg')
      this.shadowRoot.getElementById('next').addEventListener('click', () => { if (this.shown < this.jumps.length) { this.shown++; this.draw() } })
      this.shadowRoot.getElementById('reset').addEventListener('click', () => { this.shown = 0; this.draw() })
      this.draw()
      if (this.task) WU.watchQuiz(this, () => this.showSolution())
    }
    showSolution() { this.shown = this.jumps.length; this.draw(true) }
    draw(solution) {
      const svg = this.svg
      svg.innerHTML = ''
      if (this.startT === null || this.endT === null) return
      let s = this.startT, e = this.endT
      if (e <= s) e += 1440
      const t0 = Math.floor(s / 60) * 60, t1 = Math.ceil(e / 60) * 60
      const X = (t) => 30 + ((t - t0) / Math.max(60, t1 - t0)) * 540
      el('line', { class: 'axis', x1: 20, y1: 110, x2: 580, y2: 110 }, svg)
      for (let t = t0; t <= t1; t += 60) {
        const x = X(t)
        el('line', { x1: x, y1: 102, x2: x, y2: 118, stroke: '#333', 'stroke-width': 2 }, svg)
        const h = mod(t, 1440) / 60
        const lab = el('text', { class: 'tickl', x, y: 134 }, svg)
        lab.textContent = h + ':00'
        if (h === 0) { const mn = el('text', { class: 'tickl', x, y: 84 }, svg); mn.textContent = 'Mitternacht' }
        const st = el('text', { class: 'station', x, y: 98 }, svg)
        st.textContent = '🚉'
      }
      const sx = X(s), ex = X(e)
      el('circle', { class: 'start', cx: sx, cy: 110, r: 7 }, svg)
      el('circle', { class: 'end', cx: ex, cy: 110, r: 7 }, svg)
      const ls = el('text', { class: 'tickl', x: sx, y: 148, fill: 'var(--_hour)' }, svg)
      ls.textContent = 'Start ' + WU.fmt(s)
      const le = el('text', { class: 'tickl', x: ex, y: 148 }, svg)
      le.textContent = 'Ziel ' + WU.fmt(e)
      let sum = 0
      this.jumps.slice(0, this.shown).forEach((j) => {
        const x0 = X(j.from), x1 = X(j.to), mx = (x0 + x1) / 2
        const h = Math.min(38, 18 + (x1 - x0) / 8)
        el('path', { class: 'jump', d: `M${x0},104 Q${mx},${104 - h * 2} ${x1},104` }, svg)
        if (!this.hideLabels || solution) {
          const t = el('text', { class: 'jlabel', x: mx, y: 104 - h - 4 }, svg)
          t.textContent = '+ ' + WU.fmtDuration(j.min)
        }
        sum += j.min
      })
      const done = this.shown === this.jumps.length
      this.shadowRoot.getElementById('sum').innerHTML =
        done && (!this.task || solution) ? `Zusammen: <b>${WU.fmtDuration(sum)}</b>`
          : done ? 'Alle Sprünge gemacht. Wie lange ist das zusammen?' : `Sprung ${this.shown} von ${this.jumps.length}`
    }
  }
  customElements.define('wu-timeline', WUTimeline)

  // ============================================================ <wu-timer>
  class WUTimer extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.sec = +(this.getAttribute('seconds') || 60)
      this.mode = this.getAttribute('mode') || 'estimate' // estimate|count
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:520px}.bar{height:26px;border-radius:13px;background:#e9ecef;margin:.3em 0;position:relative;overflow:hidden}
        .fill{height:100%;border-radius:13px}.lab{font-size:1em;margin-top:.4em}
        svg{width:160px;height:160px;display:block;margin:auto}
      </style><div class="card"><div id="body"></div><div class="row" id="btns"></div></div>`
      this.reset()
    }
    label(sec) {
      if (sec % 60 === 0) { const m = sec / 60; return m === 1 ? 'eine Minute' : WU.num(m) + ' Minuten' }
      return sec === 1 ? 'eine Sekunde' : sec + ' Sekunden'
    }
    reset() {
      clearInterval(this._iv)
      const body = this.shadowRoot.getElementById('body'), btns = this.shadowRoot.getElementById('btns')
      if (this.mode === 'count') {
        body.innerHTML = `<p class="note">Drück auf Start. Der Kreis füllt sich in <b>${this.label(this.sec)}</b>.</p>
          <svg viewBox="-60 -60 120 120"><circle r="50" fill="#fff" stroke="#dee2e6" stroke-width="10"/>
          <path id="arc" fill="none" stroke="var(--_accent)" stroke-width="10" stroke-linecap="round"/></svg>`
        btns.innerHTML = '<button id="go">▶ Start</button>'
        btns.querySelector('#go').onclick = () => this.runCount()
      } else {
        body.innerHTML = `<p class="note">Drück auf <b>Start</b>. Drück auf <b>Stopp</b>, wenn du glaubst, dass <b>${this.label(this.sec)}</b> vorbei ist. Nicht zählen auf der Uhr — schätzen!</p>`
        btns.innerHTML = '<button id="go">▶ Start</button>'
        btns.querySelector('#go').onclick = () => this.runEstimate()
      }
    }
    runCount() {
      const btns = this.shadowRoot.getElementById('btns')
      btns.innerHTML = '<button id="stop">■ Abbrechen</button>'
      btns.querySelector('#stop').onclick = () => this.reset()
      const t0 = performance.now(), arc = this.shadowRoot.getElementById('arc')
      this._iv = setInterval(() => {
        const f = Math.min(1, (performance.now() - t0) / (this.sec * 1000))
        const a = f * 359.99, r = 50
        const [x, y] = polar(r, a)
        arc.setAttribute('d', `M0,-50 A${r},${r} 0 ${a > 180 ? 1 : 0} 1 ${x},${y}`)
        if (f >= 1) {
          clearInterval(this._iv)
          this.beep()
          this.shadowRoot.getElementById('body').insertAdjacentHTML('beforeend', `<p class="note ok">Fertig! Das waren ${this.label(this.sec)}.</p>`)
          btns.innerHTML = '<button id="again">↺ Nochmal</button>'
          btns.querySelector('#again').onclick = () => this.reset()
        }
      }, 100)
    }
    runEstimate() {
      const btns = this.shadowRoot.getElementById('btns')
      const t0 = performance.now()
      this.shadowRoot.getElementById('body').innerHTML = '<p class="note">⏳ Die Zeit läuft … schätze!</p>'
      btns.innerHTML = '<button id="stop">■ Stopp</button>'
      btns.querySelector('#stop').onclick = () => {
        const est = Math.round((performance.now() - t0) / 1000)
        const max = Math.max(est, this.sec) * 1.1
        const diff = est - this.sec
        const msg = Math.abs(diff) <= Math.max(3, this.sec * 0.1) ? 'Ganz nah dran!'
          : diff < 0 ? 'Du warst etwas zu schnell — die Zeit war noch nicht um.' : 'Du hast etwas länger gewartet.'
        this.shadowRoot.getElementById('body').innerHTML = `
          <div class="lab">Wirklich: <b>${this.label(this.sec)}</b></div>
          <div class="bar"><div class="fill" style="width:${(this.sec / max) * 100}%;background:var(--_hour)"></div></div>
          <div class="lab">Du hast gestoppt nach: <b>${est === 1 ? 'einer Sekunde' : est + ' Sekunden'}</b></div>
          <div class="bar"><div class="fill" style="width:${(est / max) * 100}%;background:var(--_minute)"></div></div>
          <p class="note">${msg}</p>`
        btns.innerHTML = '<button id="again">↺ Nochmal schätzen</button>'
        btns.querySelector('#again').onclick = () => this.reset()
      }
    }
    beep() {
      try {
        const C = window.AudioContext || window.webkitAudioContext
        const ctx = new C(), o = ctx.createOscillator(), g = ctx.createGain()
        o.frequency.value = 880; g.gain.value = 0.08
        o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.25)
      } catch (e) { /* ohne Ton */ }
    }
  }
  customElements.define('wu-timer', WUTimer)

  // ======================================================= <wu-translator>
  class WUTranslator extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      const t = this.getAttribute('time') || '8:15'
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:600px}.grid{display:grid;grid-template-columns:minmax(150px,230px) 1fr;gap:.8em;align-items:center}
        @media (max-width:480px){.grid{grid-template-columns:1fr}}
        .lbl{font-size:.9em;color:#555;margin-top:.4em}.say{font-size:1.25em;font-weight:700}
      </style><div class="card"><div class="grid">
        <wu-clock mode="play" time="${t}" size="230px"></wu-clock>
        <div><div class="lbl">Digital (morgens / abends)</div><div id="dig" class="say"></div>
        <div class="lbl">So sagt man</div><div id="a" class="say"></div>
        <div class="lbl" id="blbl">oder auch</div><div id="b" class="say"></div>
        <div class="row" style="justify-content:flex-start"><button id="sp">🔊 Vorlesen</button></div></div>
      </div></div>`
      this.clock = this.shadowRoot.querySelector('wu-clock')
      const upd = () => this.update()
      this.clock.addEventListener('wu-input', upd)
      this.clock.addEventListener('wu-change', upd)
      this.shadowRoot.getElementById('sp').onclick = () => WU.say(WU.speakForms(this.clock.minutes).join('. Oder: '))
      requestAnimationFrame(upd)
    }
    update() {
      const T = this.clock.minutes
      this.shadowRoot.getElementById('dig').textContent = `${WU.fmt(T)}  /  ${WU.fmt(T + 720)}`
      const forms = WU.speakForms(T)
      this.shadowRoot.getElementById('a').textContent = forms[0]
      const rest = forms.slice(1)
      this.shadowRoot.getElementById('b').textContent = rest.join(' · ')
      this.shadowRoot.getElementById('blbl').style.visibility = rest.length ? 'visible' : 'hidden'
    }
  }
  customElements.define('wu-translator', WUTranslator)

  // ========================================================= <wu-practice>
  const rnd = (n) => Math.floor(Math.random() * n)
  const pick = (a) => a[rnd(a.length)]
  const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1])
  const ACTIVITIES = [
    ['Hände waschen', '30 Sekunden'], ['Zähne putzen', '3 Minuten'], ['ein Ei weich kochen', '5 Minuten'],
    ['eine große Pause', '15 Minuten'], ['eine Schulstunde', '45 Minuten'], ['ein Kinofilm', '2 Stunden'],
    ['ein Lied hören', '3 Minuten'], ['eine Nacht schlafen', '10 Stunden'], ['einmal tief einatmen', '3 Sekunden'],
    ['eine Folge Zeichentrick', '20 Minuten'], ['ein Fußballspiel', '90 Minuten'], ['Schuhe binden', '30 Sekunden']]
  const DURATIONS = ['3 Sekunden', '30 Sekunden', '3 Minuten', '5 Minuten', '15 Minuten', '20 Minuten', '45 Minuten', '90 Minuten', '2 Stunden', '10 Stunden']

  class WUPractice extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.level = this.getAttribute('lz') || ''
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:640px}.task{font-size:1.2em;text-align:center;margin:.5em 0;font-weight:600}
        input[type=text]{font:inherit;font-size:1.3em;padding:.3em .5em;border:2px solid #aaa;border-radius:8px;width:9em;text-align:center}
        .choice button{min-width:10em}.sel button[aria-pressed=true]{background:var(--_hour);color:#fff}
        #fb{min-height:1.6em;text-align:center;font-size:1.1em;margin:.4em}
      </style><div class="card">
        <div class="row sel" id="sel"></div>
        <div id="stage"></div><div id="fb" aria-live="polite"></div>
        <div class="row"><button id="chk">✔ Prüfen</button><button id="show">👀 Zeig’s mir</button><button id="new">🎲 Neue Aufgabe</button></div>
      </div>`
      const sel = this.shadowRoot.getElementById('sel')
      ;[['1', 'Ablesen & Stellen'], ['2', 'Uhrzeit sagen'], ['3', '24 Stunden'], ['4', 'Wie lange?'], ['5', 'Zeitgefühl'], ['', 'Alles gemischt']]
        .forEach(([v, l]) => {
          const b = document.createElement('button')
          b.textContent = l
          b.setAttribute('aria-pressed', String(v === this.level))
          b.onclick = () => { this.level = v; sel.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); this.next() }
          sel.appendChild(b)
        })
      this.shadowRoot.getElementById('chk').onclick = () => this.check()
      this.shadowRoot.getElementById('show').onclick = () => this.solve()
      this.shadowRoot.getElementById('new').onclick = () => this.next()
      this.next()
    }
    fb(html) { this.shadowRoot.getElementById('fb').innerHTML = html }
    next() {
      this.fb('')
      const lz = this.level || pick(['1', '2', '3', '4', '5'])
      const st = this.shadowRoot.getElementById('stage')
      const T = rnd(144) * 5 // 0:00 … 11:55
      this.t = null
      if (lz === '1') {
        if (Math.random() < 0.5) {
          this.t = { kind: 'read', T }
          st.innerHTML = `<p class="task">Wie spät ist es? Schreib die Uhrzeit digital (z. B. 7:45).</p>
            <wu-clock mode="static" time="${WU.fmt(T)}"></wu-clock><div class="row"><input type="text" aria-label="Uhrzeit"></div>`
        } else {
          this.t = { kind: 'set', T }
          st.innerHTML = `<p class="task">Stell die Uhr auf <b>${WU.fmt(T, { h12: true })}</b>.</p><wu-clock mode="play" time="12:00"></wu-clock>`
        }
      } else if (lz === '2') {
        const v = pick(['nach', 'viertel'])
        const Tq = rnd(48) * 15 // Viertelstunden für die Sprechweise
        const T5 = Math.random() < 0.5 ? Tq : rnd(144) * 5
        const right = WU.speak(T5, v)
        const opts = new Set([right])
        while (opts.size < 3) opts.add(WU.speak(mod(T5 + pick([-60, 60, -15, 15, 30, -30, 5, -5, 360]), 720), v))
        this.t = { kind: 'choice', right }
        st.innerHTML = `<p class="task">Wie sagt man zu dieser Uhrzeit?</p><wu-clock mode="static" time="${WU.fmt(T5)}"></wu-clock>
          <div class="row choice" id="ch"></div>`
        const ch = st.querySelector('#ch')
        shuffle([...opts]).forEach((o) => {
          const b = document.createElement('button'); b.textContent = o
          b.onclick = () => { ch.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); this.choice = o }
          ch.appendChild(b)
        })
        this.choice = null
      } else if (lz === '3') {
        const T24 = rnd(288) * 5
        this.t = { kind: 'h24', T: T24 }
        st.innerHTML = `<p class="task">Es ist <b>${WU.dayPart(T24)}</b>. Schreib die Uhrzeit im 24-Stunden-Format (z. B. 19:30).</p>
          <wu-clock mode="static" time="${WU.fmt(T24)}"></wu-clock><div class="row"><input type="text" aria-label="Uhrzeit 24 Stunden"></div>`
      } else if (lz === '4') {
        const s = rnd(288) * 5
        const d = pick([10, 15, 20, 25, 35, 40, 45, 50, 55, 65, 75, 80, 95, 100, 110, 125, 150])
        const midnight = Math.random() < 0.2
        const start = midnight ? 1260 + rnd(30) * 5 : s
        const dur = midnight ? 300 + rnd(48) * 15 : d
        const end = mod(start + dur, 1440)
        this.t = { kind: 'dur', D: dur, start, end }
        st.innerHTML = `<p class="task">Von <b>${WU.fmt(start)}</b> bis <b>${WU.fmt(end)}</b> — wie lange dauert das?<br><small>(z. B. „1 h 35 min“ oder „35 min“)</small></p>
          <div class="row"><input type="text" aria-label="Dauer"></div><div class="row"><button id="tl">🚉 Zeitstrahl zeigen</button></div><div id="tlbox"></div>`
        st.querySelector('#tl').onclick = () => { st.querySelector('#tlbox').innerHTML = `<wu-timeline start="${WU.fmt(start)}" end="${WU.fmt(end)}" mode="task"></wu-timeline>` }
      } else {
        const [act, right] = pick(ACTIVITIES)
        const opts = new Set([right])
        while (opts.size < 3) opts.add(pick(DURATIONS))
        this.t = { kind: 'choice', right }
        st.innerHTML = `<p class="task">Wie lange dauert ungefähr: <b>${act}</b>?</p><div class="row choice" id="ch"></div>`
        const ch = st.querySelector('#ch')
        shuffle([...opts]).forEach((o) => {
          const b = document.createElement('button'); b.textContent = o
          b.onclick = () => { ch.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); this.choice = o }
          ch.appendChild(b)
        })
        this.choice = null
      }
    }
    input() { const i = this.shadowRoot.querySelector('#stage input'); return i ? i.value : '' }
    check() {
      const t = this.t
      if (!t) return
      let ok = false, hint = ''
      if (t.kind === 'read') { ok = WU.sameTime(this.input(), WU.fmt(t.T), 720); hint = 'Schau zuerst auf den kurzen Zeiger: Welche Zahl hat er schon überholt?' }
      else if (t.kind === 'set') { const c = this.shadowRoot.querySelector('#stage wu-clock'); ok = mod(c.minutes - t.T, 720) === 0; hint = 'Dreh am langen Zeiger für die Minuten. Der kurze Zeiger wandert mit.' }
      else if (t.kind === 'choice') { if (!this.choice) { this.fb('Wähl zuerst eine Antwort aus.'); return } ok = this.choice === t.right; hint = 'Schau, ob der lange Zeiger vor oder nach der halben Stunde steht.' }
      else if (t.kind === 'h24') { ok = WU.sameTime(this.input(), WU.fmt(t.T), 1440); hint = t.T >= 720 ? 'Nach 12 Uhr mittags zählt man weiter: 13, 14, 15 …' : 'Vor 12 Uhr mittags bleibt die Zahl gleich.' }
      else if (t.kind === 'dur') { ok = WU.parseDuration(this.input()) === t.D; hint = 'Spring zuerst bis zur nächsten vollen Stunde — dann weiter. Der Zeitstrahl hilft.' }
      this.fb(ok ? '<span class="ok">✔ Richtig. Sitzt.</span>' : `<span class="no">Noch nicht.</span> ${hint}`)
    }
    solve() {
      const t = this.t
      if (!t) return
      let s = ''
      if (t.kind === 'read') s = `Es ist ${WU.fmt(t.T, { h12: true })} — ${WU.speak(t.T)}.`
      else if (t.kind === 'set') { this.shadowRoot.querySelector('#stage wu-clock').setTime(t.T); s = 'So steht die Uhr richtig.' }
      else if (t.kind === 'choice') s = `Richtig ist: <b>${t.right}</b>`
      else if (t.kind === 'h24') s = `Richtig ist: <b>${WU.fmt(t.T)}</b>`
      else if (t.kind === 'dur') { s = `Das dauert <b>${WU.fmtDuration(t.D)}</b>.`; this.shadowRoot.querySelector('#tlbox').innerHTML = `<wu-timeline start="${WU.fmt(t.start)}" end="${WU.fmt(t.end)}"></wu-timeline>`; const tl = this.shadowRoot.querySelector('#tlbox wu-timeline'); requestAnimationFrame(() => tl.showSolution && tl.showSolution()) }
      this.fb(s)
    }
  }
  customElements.define('wu-practice', WUPractice)

  // =========================================================== <wu-check>
  // Prüfstein: Einstiegs-Check (mode="entry", LZ 1+2) oder Uhren-Führerschein
  // (mode="final", LZ 1–5). Eine Aufgabe nach der anderen, immer neue Uhrzeiten,
  // keine Punkte, „Weiß ich noch nicht“ ist eine gültige Antwort.
  const LZ_NAME = { 1: 'Zeiger & Ablesen', 2: 'Uhrzeit sagen', 3: '24 Stunden', 4: 'Wie lange?', 5: 'Zeitgefühl' }
  const LZ_UNITS = { 1: 'Units 1 bis 4', 2: 'Units 5 bis 7', 3: 'Unit 8', 4: 'Units 9 bis 11', 5: 'Unit 12' }

  function threeChoices(right, more) {
    const s = new Set([right])
    more.forEach((m) => { if (s.size < 3 && m) s.add(m) })
    let guard = 0
    while (s.size < 3 && guard++ < 20) s.add(pick(DURATIONS))
    return shuffle([...s])
  }

  WU.makeCheckTasks = function (lz, mode) {
    const H = () => 1 + rnd(12)
    const used = new Set()
    const fresh = (gen) => { let t, g = 0; do { t = gen() } while (used.has(t) && g++ < 30); used.add(t); return t }
    const list = []
    const add = (o) => list.push(Object.assign({ lz }, o))
    if (lz === 1) {
      if (mode === 'entry') {
        const h = H(), n = (h % 12) + 1
        // bewusst ohne „halb“: LZ 1 prüft die Zeigerlage, nicht die Uhr-Sprache (LZ 2)
        const mid = 'in der Mitte zwischen ' + hw(h) + ' und ' + hw(n)
        const zone = pick([['kurz nach ' + hw(h), pick([5, 10])], [mid, 30], ['fast ' + hw(n), pick([50, 55])]])
        add({ kind: 'choice', label: 'Stunde zwischen zwei Zahlen', T: h * 60 + zone[1], single: true,
          q: 'Diese Uhr hat nur einen Zeiger. Wie spät ist es ungefähr?', right: zone[0],
          options: shuffle(['kurz nach ' + hw(h), mid, 'fast ' + hw(n)]) })
        add({ kind: 'read', label: 'volle Stunde ablesen', T: fresh(() => H() * 60) })
        add({ kind: 'read', label: 'halbe Stunde ablesen', T: fresh(() => H() * 60 + 30) })
        add({ kind: 'read', label: 'Minuten in 5er-Schritten', T: fresh(() => H() * 60 + pick([5, 10, 20, 25, 35, 40, 50, 55])) })
        add({ kind: 'set', label: 'minutengenau stellen', T: fresh(() => H() * 60 + pick([3, 8, 12, 17, 23, 28, 33, 37, 42, 48, 52, 57])) })
      } else {
        add({ kind: 'read', label: 'Minuten in 5er-Schritten ablesen', T: fresh(() => H() * 60 + pick([5, 10, 20, 25, 35, 40, 50, 55])) })
        add({ kind: 'read', label: 'Minuten in 5er-Schritten ablesen', T: fresh(() => H() * 60 + pick([5, 10, 20, 25, 35, 40, 50, 55])) })
        add({ kind: 'read', label: 'minutengenau ablesen', T: fresh(() => H() * 60 + pick([3, 8, 12, 17, 23, 28, 33, 37, 42, 48, 52, 57])) })
        add({ kind: 'set', label: 'Uhr stellen', T: fresh(() => H() * 60 + pick([5, 15, 25, 35, 45, 55])) })
        add({ kind: 'set', label: 'minutengenau stellen', T: fresh(() => H() * 60 + pick([4, 11, 19, 26, 34, 41, 49, 56])) })
      }
    } else if (lz === 2) {
      const ms = shuffle([15, 30, 45, 20, 40])
      ms.forEach((m, i) => {
        const T = fresh(() => H() * 60 + m)
        const v = m === 20 ? 'viertel' : m === 40 ? 'nach' : pick(['nach', 'viertel'])
        const right = WU.speak(T, v)
        const h = Math.floor(T / 60) % 12 || 12
        const label = { 15: '„Viertel nach“', 30: '„halb“', 45: '„Viertel vor“', 20: '„zehn vor halb“', 40: '„zwanzig vor“' }[m]
        if (mode === 'final' && i >= 3) {
          add({ kind: 'set', label: label + ' einstellen', T, q: `Stell die Uhr auf <b>${right}</b>.` })
        } else {
          add({ kind: 'choice', label, T, q: 'Wie sagt man zu dieser Uhrzeit?', right,
            options: threeChoices(right, [WU.speak(mod(T - 60, 720), v), WU.speak(h * 60 + mod(60 - m, 60), v), WU.speak(mod(T + 60, 720), v)]) })
        }
      })
    } else if (lz === 3) {
      ;[[6, 9], [13, 17], [18, 22], [21, 24], [9, 12]].forEach(([a, b]) => {
        const T = fresh(() => (a + rnd(b - a)) * 60 + rnd(12) * 5)
        add({ kind: 'h24', label: 'im 24-Stunden-Format', T })
      })
    } else if (lz === 4) {
      const mk = (s, d) => ({ kind: 'dur', label: 'Zeitspanne', start: s, end: mod(s + d, 1440), D: d })
      const s1 = fresh(() => (7 + rnd(10)) * 60 + pick([5, 10, 15, 20]))
      add(mk(s1, pick([15, 20, 25, 30, 35])))
      const s2 = fresh(() => (7 + rnd(10)) * 60 + pick([35, 40, 45, 50]))
      add(mk(s2, pick([25, 30, 35, 40, 45])))
      const s3 = fresh(() => (8 + rnd(8)) * 60 + pick([40, 45, 50]))
      add(mk(s3, pick([65, 75, 80, 95])))
      const s4 = fresh(() => (8 + rnd(6)) * 60 + pick([10, 20, 30, 40]))
      add(mk(s4, pick([125, 140, 155, 170])))
      const s5 = fresh(() => (20 + rnd(3)) * 60 + pick([0, 15, 30, 45]))
      add(Object.assign(mk(s5, 480 + rnd(12) * 15), { label: 'Zeitspanne über Mitternacht' }))
    } else if (lz === 5) {
      shuffle(ACTIVITIES).slice(0, 5).forEach(([act, right]) => {
        add({ kind: 'choice', label: 'Dauer schätzen', q: `Wie lange dauert ungefähr: <b>${act}</b>?`, right,
          options: threeChoices(right, shuffle(DURATIONS.filter((d) => d !== right)).slice(0, 2)) })
      })
    }
    return list
  }

  class WUCheck extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.mode = this.getAttribute('mode') === 'final' ? 'final' : 'entry'
      this.lzs = (this.getAttribute('lz') || (this.mode === 'final' ? '1 2 3 4 5' : '1 2')).split(/[\s,]+/).map(Number).filter(Boolean)
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}
        :host{max-width:660px}.task{font-size:1.15em;text-align:center;margin:.5em 0;font-weight:600}
        .prog{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:.3em 0}
        .dot{width:14px;height:14px;border-radius:50%;background:#dee2e6}.dot.done{background:var(--_accent)}.dot.now{background:var(--_hour)}
        input[type=text]{font:inherit;font-size:1.25em;padding:.3em .5em;border:2px solid #aaa;border-radius:8px;width:9em;text-align:center}
        .choice button[aria-pressed=true]{background:var(--_hour);color:#fff}
        .tilda{background:#fff9db;border-left:6px solid #f59f00;border-radius:8px;padding:.6em .8em;margin:.5em 0}
        ul{margin:.3em 0 .3em 1.2em;padding:0}li{margin:.15em 0}
        .badge{display:inline-block;padding:.1em .6em;border-radius:999px;font-weight:700}
        .yes{background:#d3f9d8;color:#2b8a3e}.notyet{background:#fff3bf;color:#7a4d00}
        .license{border:4px double var(--_hour);border-radius:14px;padding:1em;text-align:center;background:#fff}
        .license h3{margin:.2em 0}
      </style><div class="card"><div id="body"></div></div>`
      this.intro()
    }
    $(id) { return this.shadowRoot.getElementById(id) }
    intro() {
      const n = this.lzs.length * 5
      this.$('body').innerHTML = this.mode === 'entry'
        ? `<div class="tilda">Zeig, was du schon kannst: <b>${n} Aufgaben</b>. Wenn du etwas nicht weißt, drück auf <b>„🤷 Weiß ich noch nicht“</b>. Das ist eine nützliche Auskunft, kein Fehler.</div>
           <div class="row"><button id="go">▶ Los geht’s</button></div>`
        : `<div class="tilda">Dein <b>Uhren-Führerschein</b>: ${n} Aufgaben mit Uhrzeiten, die du noch nie gesehen hast. Kein Zeitdruck. „🤷 Weiß ich noch nicht“ ist erlaubt.</div>
           <div class="row"><button id="go">▶ Los geht’s</button></div>`
      this.$('go').onclick = () => this.start()
    }
    start() {
      this.tasks = []
      this.lzs.forEach((lz) => { this.tasks.push(...WU.makeCheckTasks(lz, this.mode)) })
      this.i = 0
      this.results = []
      this.show()
    }
    show() {
      const t = this.tasks[this.i]
      const prev = this.tasks[this.i - 1]
      let html = `<div class="prog">${this.tasks.map((_, k) => `<span class="dot ${k < this.i ? 'done' : k === this.i ? 'now' : ''}"></span>`).join('')}</div>
        <div class="note">Aufgabe ${this.i + 1} von ${this.tasks.length} · ${LZ_NAME[t.lz]}</div>`
      if (prev && prev.lz !== t.lz) html = `<div class="tilda">Teil „${LZ_NAME[prev.lz]}“ erledigt. Weiter mit: <b>${LZ_NAME[t.lz]}</b>.</div>` + html
      if (t.kind === 'read') html += `<p class="task">Wie spät ist es? Schreib die Uhrzeit (z. B. 7:45).</p><wu-clock mode="static" time="${WU.fmt(t.T)}"></wu-clock><div class="row"><input type="text" aria-label="Uhrzeit"></div>`
      else if (t.kind === 'set') html += `<p class="task">${t.q || `Stell die Uhr auf <b>${WU.fmt(t.T, { h12: true })}</b>.`}</p><wu-clock mode="play" time="12:00"></wu-clock>`
      else if (t.kind === 'choice') html += `<p class="task">${t.q}</p>${t.T !== undefined ? `<wu-clock mode="static" ${t.single ? 'single' : ''} time="${WU.fmt(t.T)}"></wu-clock>` : ''}<div class="row choice" id="ch"></div>`
      else if (t.kind === 'h24') html += `<p class="task">Es ist <b>${WU.dayPart(t.T)}</b>. Schreib die Uhrzeit im 24-Stunden-Format (z. B. 19:30).</p><wu-clock mode="static" time="${WU.fmt(t.T)}"></wu-clock><div class="row"><input type="text" aria-label="Uhrzeit"></div>`
      else if (t.kind === 'dur') html += `<p class="task">Von <b>${WU.fmt(t.start)}</b> bis <b>${WU.fmt(t.end)}</b> — wie lange dauert das?<br><small>(z. B. „1 h 35 min“ oder „35 min“)</small></p><div class="row"><input type="text" aria-label="Dauer"></div>`
      html += `<div class="row"><button id="ok">Weiter ➜</button><button id="skip">🤷 Weiß ich noch nicht</button></div>`
      this.$('body').innerHTML = html
      this.choice = null
      if (t.kind === 'choice') {
        const ch = this.$('ch')
        t.options.forEach((o) => {
          const b = document.createElement('button'); b.textContent = o
          b.onclick = () => { ch.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); this.choice = o }
          ch.appendChild(b)
        })
      }
      const inp = this.shadowRoot.querySelector('input')
      if (inp) { inp.focus(); inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.answer(false) }) }
      this.$('ok').onclick = () => this.answer(false)
      this.$('skip').onclick = () => this.answer(true)
    }
    answer(skipped) {
      const t = this.tasks[this.i]
      let ok = false
      if (!skipped) {
        const inp = this.shadowRoot.querySelector('input')
        if (t.kind === 'choice' && !this.choice) { this.flash('Wähl eine Antwort aus — oder drück auf „Weiß ich noch nicht“.'); return }
        if ((t.kind === 'read' || t.kind === 'h24' || t.kind === 'dur') && !inp.value.trim()) { this.flash('Schreib etwas hinein — oder drück auf „Weiß ich noch nicht“.'); return }
        if (t.kind === 'read') ok = WU.sameTime(inp.value, WU.fmt(t.T), 720)
        else if (t.kind === 'h24') ok = WU.sameTime(inp.value, WU.fmt(t.T), 1440)
        else if (t.kind === 'dur') ok = WU.parseDuration(inp.value) === t.D
        else if (t.kind === 'set') ok = mod(this.shadowRoot.querySelector('wu-clock').minutes - t.T, 720) === 0
        else if (t.kind === 'choice') ok = this.choice === t.right
      }
      this.results.push({ lz: t.lz, label: t.label, ok, skipped })
      this.i++
      if (this.i < this.tasks.length) this.show()
      else this.finish()
    }
    flash(msg) {
      let f = this.shadowRoot.querySelector('.flash')
      if (!f) { f = document.createElement('p'); f.className = 'note flash'; this.$('body').appendChild(f) }
      f.textContent = msg
    }
    score(lz) { return this.results.filter((r) => r.lz === lz && r.ok).length }
    finish() {
      const can = [...new Set(this.results.filter((r) => r.ok).map((r) => r.label))]
      const help = [...new Set(this.results.filter((r) => !r.ok).map((r) => r.label))]
      const lists = `${can.length ? `<p><b>Das kannst du schon:</b></p><ul>${can.map((x) => `<li>✔ ${x}</li>`).join('')}</ul>` : ''}
        ${help.length ? `<p><b>Dabei helfe ich dir:</b></p><ul>${help.map((x) => `<li>🔧 ${x}</li>`).join('')}</ul>` : ''}`
      const result = { mode: this.mode, scores: {} }
      this.lzs.forEach((lz) => { result.scores[lz] = this.score(lz) })
      let html
      if (this.mode === 'entry') {
        const s1 = result.scores[1] ?? 0, s2 = result.scores[2] ?? 0
        const t1 = s1 === 5 ? 'Zeiger: sitzt. <b>Units 1 bis 4</b> kannst du überspringen.'
          : s1 === 4 ? 'Zeiger: fast alles sitzt. <b>Units 1 und 2</b> kannst du überspringen.'
            : 'Wir fangen vorn an, bei Unit 1: die Uhr mit nur einem Zeiger.'
        const t2 = s2 === 5 ? 'Uhr-Sprache: sitzt. <b>Units 5 bis 7</b> kannst du auch überspringen.'
          : s2 === 4 ? '<b>Unit 5</b> kannst du überspringen.' : 'Die Uhr-Sprache („Viertel vor“, „zehn vor halb“ …) kommt in Units 5 bis 7.'
        const startUnit = s1 < 4 ? 1 : s1 === 4 ? 3 : s2 === 5 ? 8 : s2 === 4 ? 6 : 5
        result.startUnit = startUnit
        html = `<div class="tilda"><p>Danke. Jetzt weiß ich, wo wir anfangen.</p><p>${t1}</p><p>${t2}</p>
          <p><b>Mein Vorschlag: Start bei Unit ${startUnit}.</b> Wer lieber vorn anfängt, kann das natürlich.</p></div>${lists}`
      } else {
        const all = this.lzs.every((lz) => result.scores[lz] >= 4)
        result.passed = all
        const rows = this.lzs.map((lz) => `<li>${LZ_NAME[lz]}: ${result.scores[lz] >= 4
          ? '<span class="badge yes">✔ geschafft</span>'
          : `<span class="badge notyet">noch üben</span> — schau nochmal in ${LZ_UNITS[lz]} oder an die Übungsuhr`}</li>`).join('')
        html = all
          ? `<div class="license"><div style="font-size:2em">🕰️</div><h3>Uhren-Führerschein</h3>
              <p>Hiermit bestätige ich, Tilda Tick, Uhrmacherin:</p>
              <p><input type="text" aria-label="Dein Name" placeholder="Dein Name" style="width:12em"></p>
              <p>kann die Uhr lesen, Uhrzeiten sagen, den Tag in 24 Stunden zählen, Zeitspannen bestimmen und Zeit schätzen.</p>
              <p>${new Date().toLocaleDateString('de-DE')}</p></div><ul>${rows}</ul>`
          : `<div class="tilda"><p>Vieles sitzt schon. Den Rest übst du noch einmal, dann machst du den Führerschein neu. Die Uhrzeiten sind jedes Mal andere.</p></div><ul>${rows}</ul>`
        html += lists
      }
      html += `<div class="row"><button id="again">↺ Nochmal mit neuen Aufgaben</button></div>`
      this.$('body').innerHTML = html
      this.$('again').onclick = () => this.start()
      this.result = result
      this.dispatchEvent(new CustomEvent('wu-result', { detail: result, bubbles: true, composed: true }))
    }
  }
  customElements.define('wu-check', WUCheck)

  // ========================================================= <wu-sundial>
  class WUSundial extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.T = WU.parseTime(this.getAttribute('time') || '9:00')
      this.cloud = false
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}:host{max-width:460px} svg{width:100%;height:auto;display:block}
        input[type=range]{width:100%;min-height:44px;accent-color:var(--_hour)}</style>
        <div class="card"><svg viewBox="-110 -110 220 150" aria-label="Sonnenuhr von oben"></svg>
        <p class="note" id="txt"></p>
        <input type="range" min="300" max="1260" step="15" aria-label="Sonnenzeit verschieben">
        <div class="row"><button id="cl">☁️ Wolke</button></div>
        <p class="note"><small>Vereinfacht: Die Stundenlinien sind hier gleich weit auseinander.</small></p></div>`
      const svg = (this.svg = this.shadowRoot.querySelector('svg'))
      el('path', { d: 'M-100,0 A100,100 0 0 1 100,0 Z', fill: '#f8f0e3', stroke: '#8d6e63', 'stroke-width': 3 }, svg)
      for (let h = 6; h <= 18; h++) {
        const a = (h - 12) * 15
        const [x, y] = polar(96, a)
        el('line', { x1: 0, y1: 0, x2: x, y2: y, stroke: '#bcaaa4', 'stroke-width': 1 }, svg)
        const [tx, ty] = polar(104, a)
        const t = el('text', { x: tx, y: ty + 4, 'text-anchor': 'middle', 'font-size': 10, fill: '#5d4037' }, svg)
        t.textContent = h
      }
      this.shadow = el('line', { x1: 0, y1: 0, x2: 0, y2: -90, stroke: '#343a40', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.75 }, svg)
      el('path', { d: 'M-6,0 L0,-30 L6,0 Z', fill: '#495057' }, svg)
      this.sun = el('text', { 'font-size': 22, 'text-anchor': 'middle' }, svg)
      this.sun.textContent = '☀️'
      this.slider = this.shadowRoot.querySelector('input')
      this.slider.value = this.T
      this.slider.oninput = () => { this.T = +this.slider.value; this.update() }
      this.shadowRoot.getElementById('cl').onclick = () => { this.cloud = !this.cloud; this.update() }
      this.update()
    }
    update() {
      const h = this.T / 60
      const day = h >= 6 && h <= 18
      const a = (h - 12) * 15
      this.shadow.setAttribute('transform', `rotate(${a})`)
      this.shadow.setAttribute('visibility', day && !this.cloud ? 'visible' : 'hidden')
      const [sx, sy] = polar(30, a + 180)
      this.sun.setAttribute('x', sx)
      this.sun.setAttribute('y', Math.min(28, sy + 8))
      this.sun.setAttribute('visibility', day ? 'visible' : 'hidden')
      this.sun.textContent = this.cloud ? '☁️' : '☀️'
      this.shadowRoot.getElementById('txt').textContent = !day ? 'Nacht: ohne Sonne kein Schatten. Die Sonnenuhr hat Pause.'
        : this.cloud ? 'Eine Wolke! Kein Schatten — die Sonnenuhr kann nichts anzeigen.'
          : `Der Schatten zeigt ungefähr ${Math.floor(h)} Uhr${this.T % 60 ? ' und ein bisschen' : ''}. Er wandert im Uhrzeigersinn.`
    }
  }
  customElements.define('wu-sundial', WUSundial)

  // ========================================================= <wu-pendulum>
  // Ein Pendel braucht für jeden Schwung gleich lang — egal ob es weit oder
  // wenig ausschlägt. Zählt Schwünge in 10 Sekunden für „weit“ und „wenig“.
  class WUPendulum extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.T = +(this.getAttribute('period') || 2) // Sekunden für hin und zurück
      this.amp = 30
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}:host{max-width:420px} svg{width:220px;height:auto;display:block;margin:auto}
        table{margin:.4em auto;border-collapse:collapse}td,th{border:1px solid #ccc;padding:.2em .6em;text-align:center}</style>
        <div class="card"><svg viewBox="-110 -10 220 215" aria-label="Pendel"></svg>
        <p class="note" id="txt">Wähle, wie weit das Pendel schwingt, und zähl 10 Sekunden lang mit.</p>
        <div class="row"><button id="wide">↔ weit schwingen</button><button id="small">↔ wenig schwingen</button></div>
        <div class="row"><button id="count">⏱ 10 Sekunden zählen</button></div>
        <table><tr><th>Ausschlag</th><th>Schwünge in 10 Sekunden</th></tr>
        <tr><td>weit</td><td id="rw">–</td></tr><tr><td>wenig</td><td id="rs">–</td></tr></table></div>`
      const svg = this.shadowRoot.querySelector('svg')
      el('rect', { x: -60, y: -6, width: 120, height: 8, rx: 3, fill: '#8d6e63' }, svg)
      this.arm = el('g', {}, svg)
      el('line', { x1: 0, y1: 0, x2: 0, y2: 150, stroke: '#495057', 'stroke-width': 3 }, this.arm)
      el('circle', { cx: 0, cy: 158, r: 16, fill: 'var(--_hour)' }, this.arm)
      el('circle', { r: 4, fill: '#333' }, svg)
      this.tick = el('text', { x: 0, y: 192, 'text-anchor': 'middle', 'font-size': 14, fill: '#555' }, svg)
      this.t0 = performance.now()
      this.counting = null
      this.swings = 0
      this.lastSign = 1
      const loop = () => {
        const t = (performance.now() - this.t0) / 1000
        const a = this.amp * Math.cos((2 * Math.PI * t) / this.T)
        this.arm.setAttribute('transform', `rotate(${a})`)
        const sign = Math.sign(Math.sin((2 * Math.PI * t) / this.T)) || 1
        if (sign !== this.lastSign) { // ein Schwung (halbe Periode) ist vorbei
          this.lastSign = sign
          this.tick.textContent = sign > 0 ? 'tick' : 'tack'
          if (this.counting) this.swings++
        }
        this._raf = requestAnimationFrame(loop)
      }
      loop()
      this.shadowRoot.getElementById('wide').onclick = () => { this.amp = 30; this.say() }
      this.shadowRoot.getElementById('small').onclick = () => { this.amp = 8; this.say() }
      this.shadowRoot.getElementById('count').onclick = () => this.count()
      this.say()
    }
    disconnectedCallback() { cancelAnimationFrame(this._raf) }
    say(msg) {
      this.shadowRoot.getElementById('txt').textContent = msg ||
        (this.amp > 15 ? 'Das Pendel schwingt jetzt weit.' : 'Das Pendel schwingt jetzt nur wenig.')
    }
    count() {
      if (this.counting) return
      const which = this.amp > 15 ? 'rw' : 'rs'
      this.swings = 0
      this.counting = which
      this.say('Ich zähle 10 Sekunden lang die Schwünge …')
      setTimeout(() => {
        this.shadowRoot.getElementById(which).textContent = this.swings
        this.counting = null
        const w = this.shadowRoot.getElementById('rw').textContent, s = this.shadowRoot.getElementById('rs').textContent
        this.say(w !== '–' && s !== '–' ? 'Weit oder wenig: gleich viele Schwünge. Genau deshalb ist das Pendel so zuverlässig.'
          : 'Jetzt probier es mit der anderen Schwingweite.')
      }, 10000)
    }
  }
  customElements.define('wu-pendulum', WUPendulum)

  // ======================================================== <wu-hourglass>
  class WUHourglass extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.sec = +(this.getAttribute('seconds') || 60)
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}:host{max-width:260px} svg{width:150px;height:auto;display:block;margin:auto;transition:transform .6s}</style>
        <div class="card"><svg viewBox="-50 -90 100 180" aria-label="Sanduhr"></svg><p class="note" id="txt">Dreh die Sanduhr um!</p>
        <div class="row"><button id="go">🔄 Umdrehen</button></div></div>`
      const svg = (this.svg = this.shadowRoot.querySelector('svg'))
      const defs = el('defs', {}, svg)
      const cp1 = el('clipPath', { id: 'top' }, defs); el('path', { d: 'M-34,-76 L34,-76 L4,-4 L-4,-4 Z' }, cp1)
      const cp2 = el('clipPath', { id: 'bot' }, defs); el('path', { d: 'M-4,4 L4,4 L34,76 L-34,76 Z' }, cp2)
      el('path', { d: 'M-36,-80 L36,-80 L4,-2 L4,2 L36,80 L-36,80 L-4,2 L-4,-2 Z', fill: '#e7f5ff', stroke: '#495057', 'stroke-width': 2.5 }, svg)
      this.topSand = el('rect', { x: -40, width: 80, fill: '#e0a96d', 'clip-path': 'url(#top)' }, svg)
      this.botSand = el('rect', { x: -40, width: 80, fill: '#e0a96d', 'clip-path': 'url(#bot)' }, svg)
      this.stream = el('line', { x1: 0, y1: -2, x2: 0, y2: 76, stroke: '#e0a96d', 'stroke-width': 2, visibility: 'hidden' }, svg)
      el('rect', { x: -44, y: -88, width: 88, height: 8, fill: '#8d6e63', rx: 2 }, svg)
      el('rect', { x: -44, y: 80, width: 88, height: 8, fill: '#8d6e63', rx: 2 }, svg)
      this.f = 1
      this.draw(1)
      this.shadowRoot.getElementById('go').onclick = () => this.run()
    }
    draw(f) { // f: Anteil Sand oben (1 … 0)
      const topH = 72 * Math.sqrt(f), botH = 72 * Math.sqrt(1 - f)
      this.topSand.setAttribute('y', -4 - topH); this.topSand.setAttribute('height', topH)
      this.botSand.setAttribute('y', 76 - botH); this.botSand.setAttribute('height', botH)
    }
    run() {
      cancelAnimationFrame(this._raf)
      const t0 = performance.now()
      this.stream.setAttribute('visibility', 'visible')
      this.shadowRoot.getElementById('txt').textContent = 'Der Sand rieselt …'
      const tick = () => {
        const f = Math.max(0, 1 - (performance.now() - t0) / (this.sec * 1000))
        this.draw(f)
        if (f > 0) this._raf = requestAnimationFrame(tick)
        else {
          this.stream.setAttribute('visibility', 'hidden')
          this.shadowRoot.getElementById('txt').textContent = 'Durch. Die Sanduhr weiß nicht, wie spät es ist — nur, dass die Zeit um ist.'
        }
      }
      tick()
    }
  }
  customElements.define('wu-hourglass', WUHourglass)

  // ======================================================= <wu-waterclock>
  class WUWaterclock extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }) }
    connectedCallback() {
      if (this._init) return
      this._init = true
      this.marks = +(this.getAttribute('marks') || 6)
      this.secPerMark = +(this.getAttribute('seconds-per-mark') || 5)
      this.shadowRoot.innerHTML = `<style>${BASE_CSS}:host{max-width:300px} svg{width:190px;height:auto;display:block;margin:auto}</style>
        <div class="card"><svg viewBox="-60 -10 120 190" aria-label="Wasseruhr"></svg><p class="note" id="txt">
        Jeder Strich ist ein Stück Zeit. (Im Zeitraffer: ${this.secPerMark} Sekunden pro Strich.)</p>
        <div class="row"><button id="go">💧 Wasser einfüllen & starten</button></div></div>`
      const svg = this.shadowRoot.querySelector('svg')
      const defs = el('defs', {}, svg)
      const cp = el('clipPath', { id: 'v' }, defs); el('path', { d: 'M-45,0 L45,0 L30,140 L-30,140 Z' }, cp)
      this.water = el('rect', { x: -50, width: 100, fill: '#4dabf7', 'clip-path': 'url(#v)' }, svg)
      el('path', { d: 'M-45,0 L45,0 L30,140 L-30,140 Z', fill: 'none', stroke: '#6d4c41', 'stroke-width': 3 }, svg)
      for (let i = 0; i <= this.marks; i++) {
        const y = 10 + (125 * i) / this.marks
        el('line', { x1: -40 + i * 2, y1: y, x2: -28 + i * 2, y2: y, stroke: '#3e2723', 'stroke-width': 2 }, svg)
      }
      this.drop = el('line', { x1: 0, y1: 141, x2: 0, y2: 175, stroke: '#4dabf7', 'stroke-width': 3, 'stroke-dasharray': '4 5', visibility: 'hidden' }, svg)
      this.level(0)
      this.shadowRoot.getElementById('go').onclick = () => this.run()
    }
    level(f) { const y = 10 + 125 * (1 - f); this.water.setAttribute('y', y); this.water.setAttribute('height', 140 - y) }
    run() {
      cancelAnimationFrame(this._raf)
      const total = this.marks * this.secPerMark * 1000, t0 = performance.now()
      this.drop.setAttribute('visibility', 'visible')
      const tick = () => {
        const f = Math.max(0, 1 - (performance.now() - t0) / total)
        this.level(f)
        const passed = Math.floor((1 - f) * this.marks + 1e-6)
        this.shadowRoot.getElementById('txt').textContent = f > 0 ? `Das Wasser ist schon an ${passed} ${passed === 1 ? 'Strich' : 'Strichen'} vorbei.` : 'Leer! Die ganze Zeit ist abgelaufen.'
        if (f > 0) this._raf = requestAnimationFrame(tick)
        else this.drop.setAttribute('visibility', 'hidden')
      }
      tick()
    }
  }
  customElements.define('wu-waterclock', WUWaterclock)
})()
