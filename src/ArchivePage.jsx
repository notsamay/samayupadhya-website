import { useEffect, useRef, useState } from 'react'
import { archive, profile } from './content'
import Header from './components/Header'

// The preview renders the site at desktop width, then scales it down to fit.
const frameWidth = 1280

function Preview({ src, title }) {
  const boxRef = useRef(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const box = boxRef.current
    const ro = new ResizeObserver(() => setScale(box.offsetWidth / frameWidth))
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={boxRef}
      className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/10"
    >
      <iframe
        src={src}
        title={`${title} preview`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
        style={{ width: frameWidth, height: frameWidth / 1.6, transform: `scale(${scale})` }}
      />
    </div>
  )
}

const link = 'group inline-flex items-center gap-1.5 transition-colors hover:text-white'

export default function ArchivePage() {
  const home = import.meta.env.BASE_URL
  return (
    <div className="min-h-screen bg-ink font-sans lowercase text-neutral-300 antialiased selection:bg-[#a51c30] selection:text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">archive</p>
        <h1 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
          old sites, still running.
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-neutral-400">
          sites that went offline over the years, rebuilt and hosted here so they can still be visited.
        </p>

        <ul className="mt-16 space-y-20">
          {archive.map((site) => {
            const src = `${home}archive/${site.slug}/`
            return (
              <li key={site.slug} className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:gap-10">
                <a href={src} className="group block self-start">
                  <Preview src={src} title={site.title} />
                </a>
                <div>
                  <div className="flex items-baseline gap-3">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-white">{site.title}</h2>
                    <span className="font-mono text-xs text-[#d23a4f]">{site.year}</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-neutral-400">{site.description}</p>
                  {site.story && (
                    <div className="mt-5 space-y-3 border-l-2 border-[#a51c30] pl-4 text-[15px] leading-relaxed text-neutral-300">
                      {site.story.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-6 font-mono text-xs text-neutral-500">
                    <a href={src} className={link}>
                      open site{' '}
                      <span className="text-[#d23a4f] transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                    <a href={site.repo} target="_blank" rel="noreferrer" className={link}>
                      source ↗
                    </a>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-5xl justify-between px-5 py-8 font-mono text-xs text-neutral-600">
          <span className="normal-case">{profile.name}</span>
          <a href={home} className="hover:text-white">
            ← back home
          </a>
        </div>
      </footer>
    </div>
  )
}
