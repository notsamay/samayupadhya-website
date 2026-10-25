import { initiatives, profile, projects, scarTissue } from './content'
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
      <h2 className="flex items-center gap-3 font-display text-4xl font-bold tracking-tight text-white">
        <span aria-hidden="true" className="h-2 w-2 bg-[#a51c30]" />
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  )
}

const textLink = 'text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-[#a51c30]'

// Archived entries open old copies hosted on this site; everything else opens in a new tab.
function EntryLink({ p }) {
  return (
    <a
      href={p.archived ? import.meta.env.BASE_URL + p.href : p.href}
      {...(p.archived ? {} : { target: '_blank', rel: 'noreferrer' })}
      className={textLink}
    >
      {p.linkLabel ?? 'view site'}
    </a>
  )
}

// An initiative, written out: title and year, what it is, tools, then a link.
function Entry({ p }) {
  return (
    <li className="border-t border-white/[0.08] py-7">
      <h4 className="text-lg font-semibold text-white">
        {p.title}
        {p.year && <span className="ml-2 font-normal text-neutral-500">{p.year}</span>}
      </h4>
      <p className="mt-2 leading-relaxed text-neutral-300">{p.description}</p>
      {p.tags.length > 0 && <p className="mt-4 text-sm text-neutral-500">built with {p.tags.join(', ')}</p>}
      {p.href && (
        <p className="mt-3 text-sm">
          <EntryLink p={p} />
          {p.archived && <span className="text-neutral-500"> (an archived copy, so it may be slightly broken)</span>}
        </p>
      )}
    </li>
  )
}

// A project, as one compact row: name and year, what it is and what it's built with, then a link.
function ProjectRow({ p }) {
  return (
    <li className="grid gap-2 border-t border-white/[0.08] py-6 md:grid-cols-[220px_1fr_100px] md:gap-8">
      <h4 className="text-lg font-semibold text-white">
        {p.title}
        {p.year && <span className="ml-2 font-normal text-neutral-500">{p.year}</span>}
      </h4>
      <div>
        <p className="leading-relaxed text-neutral-300">{p.description}</p>
        {p.tags.length > 0 && <p className="mt-2 text-sm text-neutral-500">built with {p.tags.join(', ')}</p>}
      </div>
      <p className="text-sm md:pt-1 md:text-right">{p.href && <EntryLink p={p} />}</p>
    </li>
  )
}

// A failure as a feature block: the takeaway as a pull quote, a short summary, then the lessons side by side.
function ScarEntry({ p }) {
  return (
    <li className="border-t border-white/[0.08] pt-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-display text-3xl font-bold tracking-tight text-white">{p.title}</h4>
        <span className="text-neutral-500">{p.year}</span>
        <span className="text-white">({p.status})</span>
      </div>
      <blockquote className="mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
        “{p.quote}”
      </blockquote>
      <p className="mt-6 max-w-3xl leading-relaxed text-neutral-300">{p.description}</p>
      <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
        {p.lessons.map((l, i) => (
          <li key={l.title} className="border-t border-white/20 pt-4">
            <p className="text-sm text-neutral-500">0{i + 1}</p>
            <h5 className="mt-1 text-lg font-semibold text-white">{l.title}</h5>
            <p className="mt-2 leading-relaxed text-neutral-300">{l.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-neutral-500">
        built with {p.tags.join(', ')} ·{' '}
        <EntryLink p={p} />
        <span> (an archived copy, so it may be slightly broken)</span>
      </p>
    </li>
  )
}

function Group({ title, intro, children }) {
  return (
    <div className="mt-20 first:mt-0">
      <h3 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-white">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#a51c30]" />
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-neutral-400">{intro}</p>
      <div className="mt-8">{children}</div>
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
          <Group
            title="initiatives"
            intro="Organizations I have founded or led that bring other people together: a company, a capital campaign, and a nonprofit program."
          >
            <ul className="grid gap-x-12 md:grid-cols-2">
              {initiatives.map((p) => (
                <Entry key={p.title} p={p} />
              ))}
            </ul>
          </Group>
          <Group title="projects" intro="Software I designed and built independently.">
            <ul>
              {projects.map((p) => (
                <ProjectRow key={p.title} p={p} />
              ))}
            </ul>
          </Group>
          <Group title="scar tissue" intro="Efforts that did not succeed, and what they taught me.">
            <ul>
              {scarTissue.map((p) => (
                <ScarEntry key={p.title} p={p} />
              ))}
            </ul>
          </Group>
        </Section>

        <Section id="connect" title="contact">
          <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
            For opportunities, collaborations, or questions, email me at{' '}
            <a href={`mailto:${profile.email}`} className={textLink}>
              {profile.email}
            </a>
            . I am also on{' '}
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
