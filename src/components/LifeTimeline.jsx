import { useEffect, useRef, useState } from 'react'
import { timeline } from '../content'

// Matches the page's max-w-5xl + px-5 content column, so the first panel
// lines up with the sections below.
const gutter = 'max(1.25rem, calc((100vw - 64rem) / 2 + 1.25rem))'

function Photo({ photo, className = '' }) {
  if (photo.src) {
    return (
      <img
        src={photo.src.startsWith('/') ? import.meta.env.BASE_URL + photo.src.slice(1) : photo.src}
        alt={photo.caption}
        loading="lazy"
        className={`w-full rounded-xl object-cover opacity-80 ring-1 ring-white/10 brightness-90 saturate-[.7] transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:saturate-100 ${className}`}
      />
    )
  }
  return (
    <div
      className={`relative flex w-full items-end rounded-xl border border-dashed border-white/15 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1.5px)] bg-[length:8px_8px] p-4 ${className}`}
    >
      <span className="font-mono text-[11px] tracking-wide text-neutral-500">photo · {photo.caption}</span>
    </div>
  )
}

function Meta({ item, size = 'text-4xl' }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`font-display font-extrabold tracking-[-0.03em] text-[#f5ead2] ${size}`}>{item.year}</span>
        <span className="font-mono text-xs tracking-wide text-[#d23a4f]">{item.meta}</span>
      </div>
      <h3 className="mt-3 font-title text-xl font-bold tracking-[-0.01em] text-white">{item.title}</h3>
    </>
  )
}

function Card({ item }) {
  // Entries without a photo get a compact, narrower card that sits centered
  // in the row instead of stretching to the full card height.
  if (!item.photo) {
    return (
      <article className="flex flex-col md:w-[min(85vw,440px)]">
        <span aria-hidden="true" className="mb-5 h-0.5 w-8 bg-[#a51c30]" />
        <Meta item={item} size="text-3xl" />
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-400 md:text-sm">{item.body}</p>
      </article>
    )
  }
  return (
    <article className="group flex flex-col gap-6 md:grid md:w-[min(85vw,540px)] md:grid-cols-[150px_1fr] md:items-center md:gap-6">
      <Photo photo={item.photo} className="aspect-video md:aspect-[4/5]" />
      <div>
        <Meta item={item} />
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-400 md:text-sm">{item.body}</p>
      </div>
    </article>
  )
}

export default function LifeTimeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const lineRef = useRef(null)
  const fillRef = useRef(null)
  const geometry = useRef({ enabled: false, distance: 0, offsets: [] })
  const [active, setActive] = useState(0)
  // How many entries have scrolled into view; they fade in as they arrive.
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const desktop = window.matchMedia('(min-width: 768px)')
    let frame = 0

    function measure() {
      const g = geometry.current
      g.enabled = desktop.matches
      if (!g.enabled) {
        section.style.height = ''
        track.style.transform = ''
        setShown(timeline.length)
        return
      }
      g.distance = Math.max(0, track.scrollWidth - window.innerWidth)
      // Each card's scroll distance at which it sits mid-screen.
      g.offsets = cardsRef.current.map((el) =>
        Math.min(g.distance, Math.max(0, el.offsetLeft + el.offsetWidth / 2 - window.innerWidth / 2)),
      )
      section.style.height = `${g.distance + window.innerHeight}px`
    }

    function update() {
      frame = 0
      const g = geometry.current
      if (!g.enabled) return
      const scrollable = section.offsetHeight - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable)) : 0
      const x = p * g.distance
      track.style.transform = `translate3d(${-x}px, 0, 0)`
      // The line fills up to the middle of the screen.
      const line = lineRef.current
      fillRef.current.style.width = `${Math.min(line.offsetWidth, Math.max(0, x + window.innerWidth / 2 - line.offsetLeft))}px`
      const n = cardsRef.current.filter((el) => el.offsetLeft - x < window.innerWidth * 0.85).length
      setShown((prev) => (prev === n ? prev : n))
      let i = 0
      while (i < g.offsets.length - 1 && x >= (g.offsets[i] + g.offsets[i + 1]) / 2) i++
      setActive((prev) => (prev === i ? prev : i))
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    function refresh() {
      measure()
      update()
    }

    // Sideways input (trackpad swipe, shift+wheel, mouse drag) moves the
    // timeline too. While pinned, 1px of page scroll = 1px of track travel.
    function pinned() {
      const r = section.getBoundingClientRect()
      return geometry.current.enabled && r.top <= 1 && r.bottom >= window.innerHeight - 1
    }

    function onWheel(e) {
      const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const dx = sideways ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx || !pinned()) return
      e.preventDefault()
      window.scrollBy({ top: dx, behavior: 'instant' })
    }

    // Drag only kicks in after a few px of movement, so plain clicks still work.
    let drag = null
    function onPointerDown(e) {
      if (e.pointerType !== 'mouse' || e.button !== 0 || !pinned()) return
      drag = { id: e.pointerId, x: e.clientX, active: false }
    }
    function onPointerMove(e) {
      if (!drag) return
      if (!drag.active) {
        if (Math.abs(e.clientX - drag.x) < 5) return
        drag.active = true
        track.setPointerCapture(drag.id)
        track.style.cursor = 'grabbing'
      }
      window.scrollBy({ top: drag.x - e.clientX, behavior: 'instant' })
      drag.x = e.clientX
    }
    function onPointerUp() {
      drag = null
      track.style.cursor = ''
    }

    refresh()
    track.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', onPointerUp)
    track.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', refresh)
    desktop.addEventListener('change', refresh)
    const ro = new ResizeObserver(refresh)
    ro.observe(track)

    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('wheel', onWheel)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', onPointerUp)
      track.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', refresh)
      desktop.removeEventListener('change', refresh)
      ro.disconnect()
    }
  }, [])

  // Clicking a year scrolls the page to the point where that card is centered.
  function jumpTo(i) {
    const g = geometry.current
    const section = sectionRef.current
    if (!g.enabled || !g.distance) return
    const scrollable = section.offsetHeight - window.innerHeight
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (g.offsets[i] / g.distance) * scrollable, behavior: 'smooth' })
  }

  return (
    <section id="timeline" ref={sectionRef} className="relative">
      <div className="py-20 md:sticky md:top-0 md:h-svh md:overflow-hidden md:pb-6 md:pt-20">
        <div
          ref={trackRef}
          className="relative flex flex-col gap-12 md:h-full md:w-max md:flex-row md:cursor-grab md:select-none md:items-center md:gap-0 md:will-change-transform"
          style={{ paddingLeft: gutter, paddingRight: gutter }}
        >
          {/* Center line (desktop only); runs from the intro to "what's next" */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute top-1/2 hidden h-0.5 -translate-y-1/2 bg-white/10 md:block"
            style={{ left: gutter, right: gutter }}
          >
            <div ref={fillRef} className="h-full w-0 bg-[#a51c30]" />
          </div>

          <div className="relative flex shrink-0 flex-col justify-center bg-ink pb-6 md:mr-16 md:w-[min(85vw,360px)] md:pb-0 md:pr-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">timeline</p>
            <h2 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
              a life in builds.
            </h2>
            <p className="mt-5 max-w-xs leading-relaxed text-neutral-400">
              twelve years of making things, from minecraft mods to chapter room.
            </p>
            <p className="mt-8 hidden font-mono text-xs tracking-wide text-neutral-500 md:block">scroll or drag →</p>
          </div>

          {/* Entries alternate above and below the line, overlapping their
              neighbours horizontally so the row stays compact. */}
          {timeline.map((item, i) => {
            const above = i % 2 === 0
            const visible = i < shown
            // Cards slide toward the line as they fade in.
            const reveal = `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              visible ? 'translate-y-0 opacity-100' : `opacity-0 ${above ? '-translate-y-6' : 'translate-y-6'}`
            }`
            return (
              <div
                key={item.year}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`relative shrink-0 md:flex md:h-full md:flex-col ${i > 0 ? 'md:-ml-32' : ''}`}
              >
                <div className={`md:flex md:h-1/2 md:flex-col ${above ? 'md:justify-end md:pb-7' : 'md:mt-auto md:justify-start md:pt-7'}`}>
                  <div className={reveal}>
                    <Card item={item} />
                  </div>
                </div>
                {/* Stem from the card to its mark on the line */}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 hidden h-7 w-px transition-[opacity,background-color] duration-700 md:block ${above ? 'bottom-1/2' : 'top-1/2'} ${
                    visible ? 'opacity-100' : 'opacity-0'
                  } ${i <= active ? 'bg-[#a51c30]' : 'bg-white/15'}`}
                />
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Jump to ${item.year}`}
                  className={`absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300 md:block ${
                    i <= active ? 'border-[#d23a4f] bg-[#a51c30]' : 'border-white/25 bg-ink hover:border-white/50'
                  } ${i === active ? 'ring-4 ring-[#a51c30]/25' : ''}`}
                />
                <span
                  className={`absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wide transition-colors md:block ${
                    above ? 'top-[calc(50%+16px)]' : 'bottom-[calc(50%+16px)]'
                  } ${i === active ? 'text-[#f5ead2]' : 'text-neutral-600'}`}
                >
                  {item.year}
                </span>
              </div>
            )
          })}

          <a
            href="#projects"
            className="group relative flex shrink-0 items-center gap-3 bg-ink pt-6 font-display text-3xl font-bold text-white md:ml-16 md:w-[min(85vw,320px)] md:justify-center md:pt-0"
          >
            what's next
            <span className="text-[#d23a4f] transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
