import { initiatives, profile, projects } from './content'
import Header from './components/Header'
import LifeTimeline from './components/LifeTimeline'
import PixelBackground from './PixelBackground'
import SocialIcons from './components/SocialIcons'

function Hero() {
  return (
    <div id="top" className="relative isolate min-h-[125svh] overflow-hidden">
      <PixelBackground />
      {/* Fade the pattern into the page background */}
      <div aria-hidden="true" className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 h-[55svh]" />
      <div className="relative flex min-h-svh items-center justify-center px-5 py-28 sm:px-8">
        <div className="flex flex-col">
          <h1 className="whitespace-nowrap font-title text-[clamp(2.5rem,7.5vw,6.5rem)] font-bold normal-case leading-[0.9] tracking-[-0.03em] text-[#f5ead2]">
            {profile.name}
          </h1>
          {/* Pixel-dot divider, echoing the dithered pattern behind it */}
          <div
            aria-hidden="true"
            className="mt-7 h-[3px] bg-[linear-gradient(to_right,rgb(245_234_210/0.45)_0_3px,transparent_3px)] bg-[length:9px_3px] bg-repeat-x"
          />
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[42ch] text-balance font-sub text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-relaxed text-[#f5ead2]/80">
              {profile.intro}
            </p>
            <SocialIcons className="sm:pb-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-28">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  )
}

const card =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.05]'

const arrow =
  'text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white'

// A text-only entry: title and year on the left, details and a link on the right.
// Archived entries open old copies hosted on this site; everything else opens in a new tab.
function Entry({ p }) {
  return (
    <li className="grid gap-4 border-t border-white/[0.08] py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <div>
        <h4 className="font-display text-2xl font-bold tracking-tight text-white">{p.title}</h4>
        {p.year && <p className="mt-1 font-mono text-xs text-[#d23a4f]">{p.year}</p>}
      </div>
      <div className="max-w-2xl">
        <p className="leading-relaxed text-neutral-400">{p.description}</p>
        {p.story && (
          <div className="mt-5 space-y-3 border-l-2 border-[#a51c30] pl-4 text-[15px] leading-relaxed text-neutral-300">
            {p.story.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        )}
        <p className="mt-5 font-mono text-xs text-neutral-500">{p.tags.join('  ·  ')}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={p.archived ? import.meta.env.BASE_URL + p.href : p.href}
            {...(p.archived ? {} : { target: '_blank', rel: 'noreferrer' })}
            className="group inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/[0.05]"
          >
            {p.linkLabel ?? 'view site'}
            <span className={arrow}>↗</span>
          </a>
          {p.archived && (
            <span className="font-mono text-xs text-neutral-500">
              archived copy of the original site, so it may be slightly broken
            </span>
          )}
        </div>
      </div>
    </li>
  )
}

function Group({ label, children }) {
  return (
    <div className="mt-12 first:mt-0">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</h3>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans lowercase text-neutral-300 antialiased selection:bg-[#a51c30] selection:text-white">
      <Header />
      <Hero />
      <LifeTimeline />

      <main className="mx-auto max-w-5xl divide-y divide-white/[0.08] px-5">
        <Section id="projects" eyebrow="work" title="things i've built">
          <Group label="initiatives">
            <ul>
              {initiatives.map((p) => (
                <Entry key={p.title} p={p} />
              ))}
            </ul>
          </Group>
          <Group label="projects">
            <ul>
              {projects.map((p) => (
                <Entry key={p.title} p={p} />
              ))}
            </ul>
          </Group>
        </Section>

        <Section id="connect" eyebrow="connect" title="let's talk">
          <div className={`${card} flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between`}>
            <p className="max-w-md text-lg text-neutral-400">
              have a project in mind, or just want to say hi? my inbox is open.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              {profile.email}
            </a>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {profile.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`${card} group flex items-center justify-between p-5 text-white`}
              >
                {l.label}
                <span className={arrow}>↗</span>
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-5xl justify-between px-5 py-8 font-mono text-xs text-neutral-600">
          <span>
            © {new Date().getFullYear()} <span className="normal-case">{profile.name}</span>
          </span>
          <a href="#top" className="hover:text-white">
            back to top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}
