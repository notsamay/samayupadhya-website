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
          <h1 className="whitespace-nowrap font-title text-[clamp(2.5rem,7.5vw,6.5rem)] font-bold normal-case leading-[0.9] tracking-[-0.03em] text-white">
            {profile.name}
          </h1>
          {/* Pixel-dot divider, echoing the dithered pattern behind it */}
          <div
            aria-hidden="true"
            className="mt-7 h-[3px] bg-[linear-gradient(to_right,rgb(245_234_210/0.45)_0_3px,transparent_3px)] bg-[length:9px_3px] bg-repeat-x"
          />
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[42ch] text-balance font-sub text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-relaxed text-white/80">
              {profile.intro}
            </p>
            <SocialIcons className="sm:pb-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-24">
      <h2 className="font-display text-4xl font-bold tracking-tight text-white">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  )
}

const textLink = 'text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white'

// A plain entry: title and year, what it was, what it was built with, then a link.
// Archived entries open old copies hosted on this site; everything else opens in a new tab.
function Entry({ p }) {
  return (
    <li className="border-t border-white/[0.08] py-7">
      <h4 className="text-lg font-semibold text-white">
        {p.title}
        {p.year && <span className="ml-2 font-normal text-neutral-500">{p.year}</span>}
        {p.status && <span className="ml-2 font-normal text-white">({p.status})</span>}
      </h4>
      <p className="mt-2 leading-relaxed text-neutral-300">{p.description}</p>
      {p.story && (
        <div className="mt-4 space-y-3 leading-relaxed text-white">
          {p.story.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      )}
      {p.tags.length > 0 && <p className="mt-4 text-sm text-neutral-500">built with {p.tags.join(', ')}</p>}
      {p.href && (
        <p className="mt-3 text-sm">
          <a
            href={p.archived ? import.meta.env.BASE_URL + p.href : p.href}
            {...(p.archived ? {} : { target: '_blank', rel: 'noreferrer' })}
            className={textLink}
          >
            {p.linkLabel ?? 'view site'}
          </a>
          {p.archived && <span className="text-neutral-500"> (an archived copy, so it may be slightly broken)</span>}
        </p>
      )}
    </li>
  )
}

function Group({ label, children }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-neutral-500">{label}</h3>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans lowercase text-neutral-300 antialiased selection:bg-white selection:text-black">
      <Header />
      <Hero />
      <LifeTimeline />

      <main className="mx-auto max-w-5xl divide-y divide-white/[0.08] px-5">
        <Section id="projects" title="work">
          {/* Initiatives on the left, projects on the right */}
          <div className="grid gap-12 md:grid-cols-2">
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
          </div>
        </Section>

        <Section id="connect" title="contact">
          <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
            the best way to reach me is email, at{' '}
            <a href={`mailto:${profile.email}`} className={textLink}>
              {profile.email}
            </a>
            . you can also find me on{' '}
            {profile.links.map((l, i) => (
              <span key={l.label}>
                {i > 0 && ' and '}
                <a href={l.href} target="_blank" rel="noreferrer" className={textLink}>
                  {l.label}
                </a>
              </span>
            ))}
            .
          </p>
        </Section>
      </main>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-5xl justify-between px-5 py-8 text-sm text-neutral-500">
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
