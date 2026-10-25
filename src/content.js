// Edit this file to update everything on the site.
export const profile = {
  name: 'Samay Upadhya',
  intro: 'Computer science and economics student at UW–Madison and founder of Chapter Room.',
  email: 'samayupadhya@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/notsamay' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samay-upadhya-622b53305' },
  ],
}

// Bigger, ongoing efforts, listed first under "work".
// `archived: true` means the link opens an old copy hosted on this site (public/archive/).
export const initiatives = [
  {
    title: 'Chapter Room',
    year: '2026',
    description:
      "An operating system for Greek life that brings feeds and group chats, roles and permissions, geofenced attendance, dues, and shared albums into a single app. I'm building it end to end in Flutter and Supabase, with chapters at three schools (UW–Madison, South Carolina, and Clemson) launching on iOS and Android in spring 2027.",
    tags: ['Flutter', 'Supabase', 'iOS', 'Android'],
    href: 'https://joinchapterroom.com',
  },
  {
    title: 'Renew 222',
    year: '2026–present',
    description:
      "I founded Renew 222 in January 2026 to raise the capital to restore 222 Langdon Street, the home of Acacia's Lamedth chapter at UW–Madison, in time for the house's centennial. When I took office, the chapter had no active connection with its alumni. Since then, we have reconnected more than 200 alumni and raised $12,000 in seed funding.",
    details: [
      'A 2009 renovation converted the house into apartments. Now that it is a fraternity house again, and the chapter has grown from 17 to 137 brothers in under a decade, the campaign aims to restore its original character and make it a complete home for about 35 residents. The five priority projects are an Alumni Terrace on the front lawn, basement bathrooms with keypad access to separate event and living spaces, a TV room, a third-floor alumni lounge, and dedicated study rooms, each with a naming opportunity for donors.',
      "As senior undergraduate chairman, I co-built renew222.org, set up the campaign's donor and pledge tracking, and organized a team of 15 solicitors to reach roughly 500 alumni. Long term, I am building Renew 222 into a lasting organization, with regular alumni newsletters, construction weeks that bring alumni back to work on the house, and a career incubator that connects brothers across generations.",
    ],
    tags: ['Next.js', 'Supabase'],
    href: 'https://renew222.org',
  },
  {
    title: 'Himalayan Hacks',
    year: '2023',
    description:
      'A program bringing computer education and introductory programming to children in rural Nepal, run in partnership with the Ek Artha Foundation. We raised about $10,000, donated a computer lab, and ran a two-day computer camp in Manahari Rural Municipality.',
    tags: ['Python', 'Pygame', 'HTML', 'CSS', 'JavaScript'],
    href: 'archive/himalayan-hacks/',
    archived: true,
  },
]

export const projects = [
  {
    title: 'Dreamer',
    year: '2024',
    description:
      'A learning app for autistic children, which I built on my own in Flutter in consultation with a developmental psychologist. Each lesson adapts to the child through audio, animation, and haptics. It won the 2023 Congressional App Challenge for South Carolina\'s 5th District and was displayed in the U.S. Capitol.',
    tags: ['Flutter', 'Swift'],
    href: 'https://github.com/notsamay/DreamerCAC',
    linkLabel: 'view code',
  },
  {
    title: 'Do You Dare To Square',
    description:
      "A remake of my 2019 Brackeys Game Jam submission. After years away from game design, I rebuilt it to measure how far I've come as a developer.",
    tags: [],
  },
]

// Things that failed, and what they taught me.
export const scarTissue = [
  {
    title: 'Castaways',
    year: '2024',
    status: 'failed',
    description:
      "A Hack Club hackathon for high school students in Charleston that I organized from the ground up, from cold emailing sponsors and venues to recruiting a team and building the website. It did not succeed, and it remains the project I have learned the most from.",
    quote: 'Castaways is my greatest scar tissue. It taught me more than any project that went smoothly.',
    lessons: [
      {
        title: 'Cold emailing',
        body: 'Reaching out to sponsors, venues, and partners who had never heard of me, and learning what earns a reply.',
      },
      {
        title: 'Running an organization',
        body: 'Delegating, following up, and keeping people committed when nothing is guaranteed.',
      },
      {
        title: 'Starting small',
        body: 'Ambitious things need to start small and grow naturally. There is no skipping straight to the big version, and that lesson has shaped everything I have built since.',
      },
    ],
    tags: ['Next.js', 'Tailwind'],
    href: 'archive/castaways/',
    archived: true,
  },
]

// Life timeline, oldest first. Add a photo by dropping it in public/timeline/
// and setting `src`, e.g. src: '/timeline/2014.jpg'. Use `photo: null` for no image.
export const timeline = [
  {
    year: '2014',
    meta: 'age 7 · 2nd grade',
    title: 'First lines of code',
    body: "Eager to do more with Minecraft than play it, I enrolled in Youth Digital's Minecraft modding course. It was my introduction to programming and where I wrote my first lines of Java.",
    photo: { src: '/timeline/web/minecraft-mods.jpg', caption: 'Youth Digital Minecraft modding course' },
  },
  {
    year: '2015–18',
    meta: 'the unity years',
    title: 'Learning to build games',
    body: "Modding led to Unity. I spent these years writing C# and building my own games, learning from Brackeys and Blackthornprod and applying their lessons to my own ideas. Many of my more ambitious plans never shipped, but this is where my love for building began, and where I entered my first hackathon, the Brackeys Game Jam.",
    photo: null,
  },
  {
    year: '2019',
    meta: 'first lego league',
    title: 'Best programming',
    body: "While continuing to make games, I joined FIRST LEGO League, where teams design, build, and program LEGO robots to complete missions. Our team won the programming award at the South Carolina state championship.",
    photo: { src: '/timeline/web/fll.jpg', caption: 'FIRST LEGO League state championship' },
  },
  {
    year: '2020–22',
    meta: 'the covid years',
    title: 'Learning the web',
    body: "The pandemic years were quieter. I built less, but I learned React, Tailwind, and the fundamentals of web development, skills I still use today, including on this site.",
    photo: null,
  },
  {
    year: '2022–23',
    meta: 'hack club',
    title: 'Back to building',
    body: "In 2022, while recovering from a torn ACL, I returned to building and found Hack Club. Through Hack Club, I competed in hackathons across the US and Canada, from local events to Boston and Toronto. That experience made me want to organize something of my own.",
    photo: { src: '/timeline/web/hack-club.jpg', caption: 'Hack Club hackathon' },
  },
  {
    year: 'late 2023',
    meta: 'ek artha foundation',
    title: 'Himalayan Hacks',
    body: "I partnered with the Ek Artha Foundation, an NGO in Nepal, to launch Himalayan Hacks, which brings computer education and introductory programming to children in rural Nepal. We raised about $10,000, donated a computer lab, and ran a two-day computer camp in Manahari Rural Municipality.",
    photo: { src: '/timeline/web/himalayan-hacks.jpg', caption: 'Computer camp in Manahari' },
  },
  {
    year: '2024',
    meta: 'congressional app challenge',
    title: 'Dreamer',
    body: "My younger cousin is autistic, and traditional teaching does not fit the way my cousin learns. In 11th grade, I built Dreamer on my own in Flutter, working with a developmental psychologist to adapt each lesson to the child through audio, animation, and haptics. It won the 2023 Congressional App Challenge for South Carolina's 5th District and was displayed in the U.S. Capitol.",
    photo: { src: '/timeline/web/dreamer.jpg', caption: 'Congressional App Challenge award' },
  },
  {
    year: '2025',
    meta: 'uw–madison · acacia',
    title: 'A new home',
    body: "After high school, I moved to Madison to study computer science and economics at UW–Madison. I joined Acacia Fraternity and became the only freshman on its executive board, serving as secretary. I restarted alumni outreach, founded Renew 222, a capital campaign for our chapter house, started a career incubator, and now lead the chapter's external communications and public relations.",
    photo: { src: '/timeline/web/wisconsin.jpg', caption: 'New Member of the Year award' },
  },
  {
    year: '2026',
    meta: 'founder',
    title: 'Chapter Room',
    body: "I founded Chapter Room, an operating system for Greek life that brings feeds and group chats, roles and permissions, geofenced attendance, dues, and shared albums into a single app. I'm building it end to end in Flutter and Supabase, launching at UW–Madison, South Carolina, and Clemson in spring 2027.",
    photo: null,
  },
]
