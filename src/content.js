// Edit this file to update everything on the site.
export const profile = {
  name: 'Samay Upadhya',
  role: 'Developer & founder',
  tagline:
    'I build products people actually want to use — from mobile apps to the tools behind them.',
  intro: 'Computer science and economics student at UW–Madison, building Chapter Room.',
  location: 'Madison, WI',
  email: 'supadhya@live.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/notsamay' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}

// Bigger, ongoing efforts, listed first under "work".
// `archived: true` means the link opens an old copy hosted on this site (public/archive/).
export const initiatives = [
  {
    title: 'Chapter Room',
    year: '2026',
    description:
      "The modern operating system for Greek life. Feeds and group chats, roles and permissions, geofenced attendance, dues, and shared albums all live in one app. I'm building it end to end in Flutter and Supabase, with chapters at 3 schools (UW–Madison, South Carolina, and Clemson) launching on iOS and Android in spring 2027.",
    tags: ['Flutter', 'Supabase', 'iOS', 'Android'],
    href: 'https://joinchapterroom.com',
  },
  {
    title: 'Renew 222',
    year: '2025',
    description:
      "The capital campaign to restore Acacia's chapter house at 222 Langdon Street, a Tudor Revival home built in 1926. The chapter has grown from 17 brothers to 137 in under a decade, the largest in its 120-year history, and needs a house to match. As senior undergraduate chairman, I lead the campaign alongside the alumni board and co-built its site, which reconnects alumni and takes donations online.",
    tags: ['Next.js', 'Supabase'],
    href: 'https://renew222.org',
  },
  {
    title: 'Himalayan Hacks',
    year: '2023',
    description:
      'Computer education and basic programming for kids in rural Nepal, run with the Ek Artha Foundation. We raised around $10,000, donated a computer lab, and ran a two-day computer camp in Manahari Rural Municipality.',
    tags: ['Python', 'Pygame', 'HTML', 'CSS', 'JavaScript'],
    href: 'archive/himalayan-hacks/',
    archived: true,
  },
  {
    title: 'Castaways',
    year: '2024',
    status: 'failed',
    description:
      "A Hack Club hackathon for teens in Charleston that I organized from scratch, from cold emailing sponsors and venues to building the team and making the site. It failed, and it's the project I learned the most from.",
    story: [
      'Castaways is my greatest scar tissue. It taught me more than anything that went smoothly.',
      "It's where I learned to cold email: reaching out to sponsors, venues, and partners who had never heard of me, and figuring out what actually earns a reply. It's also where I learned what running an organization takes, from delegating and following up to keeping people committed when nothing is guaranteed.",
      "Most of all, it taught me that things need to start small and grow naturally. You can't skip straight to the big version. Everything I've built since has been shaped by that lesson.",
    ],
    tags: ['Next.js', 'Tailwind'],
    href: 'archive/castaways/',
    archived: true,
  },
]

export const projects = [
  {
    title: 'Dreamer',
    year: '2024',
    description:
      'A learning app for autistic kids, built solo in Flutter with a developmental psychologist. Each lesson adapts to the child through audio, animation, and haptics. It won the 2023 Congressional App Challenge for South Carolina\'s 5th District and was displayed in the U.S. Capitol.',
    tags: ['Flutter', 'Swift'],
    href: 'https://github.com/notsamay/DreamerCAC',
    linkLabel: 'view code',
  },
  {
    title: 'Do You Dare To Square',
    description:
      "A remake of my original 2019 Brackeys Game Jam submission. I hadn't touched game design in years, and I wanted to see how far I've come as a developer.",
    tags: [],
  },
]

// Life timeline, oldest first. Add a photo by dropping it in public/timeline/
// and setting `src`, e.g. src: '/timeline/2014.jpg'. Use `photo: null` for no image.
export const timeline = [
  {
    year: '2014',
    meta: 'age 7 · 2nd grade',
    title: 'First lines of code',
    body: "Bored with regular Minecraft and eager to expand my horizons, I signed up for Youth Digital's Minecraft modding course. It was my first introduction to programming, and it's where I wrote my first lines of Java.",
    photo: { src: '/timeline/web/minecraft-mods.jpg', caption: 'youth digital minecraft mod' },
  },
  {
    year: '2015–18',
    meta: 'the unity years',
    title: 'Learning to build games',
    body: "Modding turned into Unity. I spent these years writing C# and building my own games, learning from Brackeys and Blackthornprod and applying their lessons to my own ideas. Most of my ambitious plans never shipped, but this is where my love for building took off, and where I entered my first hackathon, the Brackeys Game Jam.",
    photo: null,
  },
  {
    year: '2019',
    meta: 'first lego league',
    title: 'Best programming',
    body: "I kept making games on my own and joined FIRST LEGO League, where teams design, build, and program LEGO robots to complete missions. Our team won the programming award at the South Carolina state championship.",
    photo: { src: '/timeline/web/fll.jpg', caption: 'fll state championship' },
  },
  {
    year: '2020–22',
    meta: 'the covid years',
    title: 'Learning the web',
    body: "The COVID years were quiet. I didn't build much during the pandemic, but I did pick up React and Tailwind and learned the basics of web development, skills I still use today, including on this site.",
    photo: null,
  },
  {
    year: '2022–23',
    meta: 'hack club',
    title: 'Back to building',
    body: "In 2022, fresh off a torn ACL, I threw myself back into building and found Hack Club. Through Hack Club I competed in hackathons across the US and Canada, from local events to Boston and Toronto. That era made me want to organize something big of my own.",
    photo: { src: '/timeline/web/hack-club.jpg', caption: 'hackathon in boston or toronto' },
  },
  {
    year: 'late 2023',
    meta: 'ek artha foundation',
    title: 'Himalayan Hacks',
    body: "I partnered with the Ek Artha Foundation, an NGO in Nepal, to launch Himalayan Hacks, which brings computer education and basic programming to kids in rural Nepal. We raised around $10,000, donated a computer lab, and ran a two-day computer camp in Manahari Rural Municipality.",
    photo: { src: '/timeline/web/himalayan-hacks.jpg', caption: 'computer camp in manahari' },
  },
  {
    year: '2024',
    meta: 'congressional app challenge',
    title: 'Dreamer',
    body: "My little cousin is autistic, and traditional teaching doesn't fit how my cousin learns. In 11th grade I built Dreamer solo in Flutter, working with a developmental psychologist to adapt each lesson to the child through audio, animation, and haptics. It won the 2023 Congressional App Challenge for South Carolina's 5th District and was displayed in the U.S. Capitol.",
    photo: { src: '/timeline/web/dreamer.jpg', caption: 'dreamer at the u.s. capitol' },
  },
  {
    year: '2025',
    meta: 'uw–madison · acacia',
    title: 'A new home',
    body: "After graduating from high school, I moved to Madison to study computer science and economics at UW–Madison. I joined Acacia Fraternity and became the only freshman on the executive board, as secretary. I restarted alumni outreach, launched Renew 222, a capital campaign for our chapter house, started a career incubator, and now run the house's external communications and PR.",
    photo: { src: '/timeline/web/wisconsin.jpg', caption: 'new member of the year award' },
  },
  {
    year: '2026',
    meta: 'founder',
    title: 'Chapter Room',
    body: "I started Chapter Room, the modern operating system for Greek life. Feeds and group chats, roles and permissions, geofenced attendance, dues, and shared albums all live in one app. I'm building it end to end in Flutter and Supabase, launching at UW–Madison, South Carolina, and Clemson in spring 2027.",
    photo: null,
  },
]
