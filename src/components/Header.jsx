import { useScrollHeader } from '../hooks'
import { profile } from '../content'

const nav = ['timeline', 'projects', 'connect']

export default function Header() {
  const { atTop, hidden } = useScrollHeader()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-300 ease-out ${
        atTop ? 'border-transparent bg-transparent' : 'border-white/10 bg-ink/80 backdrop-blur-xl'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-sm sm:px-8">
        <a href="#top" className="relative h-5">
          <span
            className={`absolute left-0 top-0 whitespace-nowrap font-mono text-xs leading-5 tracking-[0.2em] text-[#f5ead2]/80 transition-opacity duration-300 ${atTop ? 'opacity-100' : 'opacity-0'}`}
          >
            portfolio ©{new Date().getFullYear()}
          </span>
          <span
            className={`whitespace-nowrap font-display text-base font-bold normal-case leading-5 text-white transition-opacity duration-300 ${atTop ? 'opacity-0' : 'opacity-100'}`}
          >
            {profile.name}
          </span>
        </a>
        <nav className="flex items-center gap-6">
          {nav.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`hidden transition-colors sm:inline ${atTop ? 'text-[#f5ead2]/80 hover:text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              {id}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
