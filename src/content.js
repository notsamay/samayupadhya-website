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
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}

export const projects = [
  {
    title: 'Chapter Room',
    description:
      'A mobile app that helps Greek chapters run their house: announcements, events, and member management in one place.',
    tags: ['Flutter', 'Supabase', 'iOS', 'Android'],
    href: '#',
  },
  {
    title: 'Conduct',
    description: 'Short description of this project and what problem it solves.',
    tags: ['React', 'Tailwind'],
    href: '#',
  },
  {
    title: 'Project three',
    description: 'Short description of this project and what problem it solves.',
    tags: ['Java'],
    href: '#',
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
    photo: { src: null, caption: 'youth digital minecraft mod' },
  },
  {
    year: '2015–18',
    meta: 'the unity years',
    title: 'Learning to build games',
    body: "Modding turned into Unity. I spent these years writing C# and building my own games, learning from Brackeys and Blackthornprod and applying their lessons to my own ideas. Most of my ambitious plans never shipped, but this is where my love for building took off, and where I entered my first hackathon, the Brackeys Game Jam.",
    photo: { src: null, caption: 'brackeys game jam entry' },
  },
  {
    year: '2019',
    meta: 'first lego league',
    title: 'Best programming',
    body: "I kept making games on my own and joined FIRST LEGO League, where teams design, build, and program LEGO robots to complete missions. Our team won the programming award at the South Carolina state championship.",
    photo: { src: null, caption: 'fll state championship' },
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
    photo: { src: null, caption: 'hackathon in boston or toronto' },
  },
  {
    year: 'late 2023',
    meta: 'ek artha foundation',
    title: 'Himalayan Hacks',
    body: "I partnered with the Ek Artha Foundation, an NGO in Nepal, to launch Himalayan Hacks, which brings computer education and basic programming to kids in rural Nepal. We raised around $10,000, donated a computer lab, and ran a two-day computer camp in Manahari Rural Municipality.",
    photo: { src: null, caption: 'computer camp in manahari' },
  },
  {
    year: '2024',
    meta: 'congressional app challenge',
    title: 'Dreamer',
    body: "My little cousin is autistic, and traditional teaching doesn't fit how my cousin learns. In 11th grade I built Dreamer solo in Flutter, working with a developmental psychologist to adapt each lesson to the child through audio, animation, and haptics. It won the 2023 Congressional App Challenge for South Carolina's 5th District and was displayed in the U.S. Capitol.",
    photo: { src: null, caption: 'dreamer at the u.s. capitol' },
  },
  {
    year: '2025',
    meta: 'uw–madison · acacia',
    title: 'A new home',
    body: "After graduating from high school, I moved to Madison to study computer science and economics at UW–Madison. I joined Acacia Fraternity and became the only freshman on the executive board, as secretary. I restarted alumni outreach, launched Renew 222, a capital campaign for our chapter house, started a career incubator, and now run the house's external communications and PR.",
    photo: { src: null, caption: '222 langdon street' },
  },
  {
    year: '2026',
    meta: 'founder',
    title: 'Chapter Room',
    body: "I started Chapter Room, the modern operating system for Greek life. Feeds and group chats, roles and permissions, geofenced attendance, dues, and shared albums all live in one app. I'm building it end to end in Flutter and Supabase, launching at UW–Madison, South Carolina, and Clemson in spring 2027.",
    photo: { src: null, caption: 'chapter room app' },
  },
]
