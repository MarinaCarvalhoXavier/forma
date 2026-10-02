// All content for the Forma landing page.
// Edit the text, links and images here — the components read from this file.
//
// PLACEHOLDERS: the architect's name, portrait, project names and every photo
// are stand-ins. Replace them with real ones before publishing. Don't add
// numbers, client quotes or awards unless they are real.

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

// Placeholder — the architect behind Forma.
export const brandName = "forma";

export const architect = {
  name: "Helena Duarte",
  firstName: "Helena",
  portrait: unsplash("1494790108377-be9c29b29330", 900),
};

export const letter = {
  greeting: `Hello, I’m ${architect.firstName}.`,
  title: "I design calm houses, one at a time.",
  paragraphs: [
    `Forma is my architecture practice. When you work with Forma, you work with me — from the first walk around your site and the first sketch, through construction, to the day you get the keys.`,
    "Most of what I design are homes: new houses, extensions, and old houses given a second life. I also take on small workspaces, interiors, and the landscape around a building.",
  ],
  signoff: `— ${architect.firstName}`,
  photo: unsplash("1600585154340-be6161a56a0c", 2000),
  photoAlt: "A modern house with large windows in warm evening light",
  photoCaption: "Casa Duna, Florianópolis · 2024",
};

export const about = {
  title: "About the practice",
  intro: `Forma is deliberately small. I take on a few projects at a time so I can stay close to each one — you’ll always know who is drawing your house, and you can always reach them.`,
  principles: [
    {
      lead: "One architect throughout.",
      text: "The person who understands your brief develops the design and stays involved on site. No hand-offs, no new faces halfway through.",
    },
    {
      lead: "The site comes first.",
      text: "Sunlight, views, neighbours, the ground itself, and how you actually live — these shape the design before any style does.",
    },
    {
      lead: "Fewer, better materials.",
      text: "Timber, lime render, stone and steel, in a restrained palette chosen to age well and ask for little upkeep.",
    },
    {
      lead: "Attention to each project.",
      text: "Fewer commissions means more time for yours: more site visits, more drawings, more care in the details.",
    },
  ],
};

export type ProjectCategory = "Home" | "Interior" | "Workspace" | "Landscape";

export type Project = {
  name: string;
  location: string;
  year: number;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  // Reserved for a future project detail popup.
  description?: string;
  images?: string[];
};

// Placeholder projects — names and places are stand-ins; images are AI-generated
// concept images (photos/ folder), not photographs of built work.
export const projects: Project[] = [
  {
    name: "Casa Ripa",
    location: "Curitiba",
    year: 2024,
    category: "Home",
    image: "/images/projects/casa-ripa.jpg",
    imageAlt: "Two-storey house with a timber-clad upper floor, white render below and a planted front garden",
  },
  {
    name: "Apartamento Terra",
    location: "São Paulo",
    year: 2023,
    category: "Interior",
    image: "/images/projects/apartamento-terra.jpg",
    imageAlt: "Apartment living room with terracotta walls, built-in timber shelves and a city view at sunset",
  },
  {
    name: "Jardim Musgo",
    location: "Petrópolis",
    year: 2023,
    category: "Landscape",
    image: "/images/projects/jardim-musgo.jpg",
    imageAlt: "Stone stepping path through moss and ferns beside a dry-stone wall in a misty mountain garden",
  },
  {
    name: "Estúdio Lima",
    location: "Lisbon",
    year: 2022,
    category: "Workspace",
    image: "/images/projects/estudio-lima.jpg",
    imageAlt: "Daylit studio with a long timber worktable, open shelving and a tall window",
  },
  {
    name: "Casa Horizonte",
    location: "Trancoso",
    year: 2022,
    category: "Home",
    image: "/images/projects/casa-horizonte.jpg",
    imageAlt: "Beach house with a timber pergola, a long pool and palm trees at sunset",
  },
];

export const services = [
  {
    name: "Homes",
    text: "New houses, extensions and renovations, from the first site visit to handover.",
    note: "Main focus",
  },
  {
    name: "Small workspaces",
    text: "Studios, small offices and shops designed around the work that happens in them.",
  },
  {
    name: "Interiors",
    text: "Layouts, materials, joinery and light, considered together as one piece.",
  },
  {
    name: "Landscapes",
    text: "Gardens, terraces and the ground around a building, planned with the architecture.",
  },
];

export const process = [
  {
    title: "Site and brief",
    text: "We walk the site together. I study the light, the views, the neighbours and the ground, and listen to how you live and what you want to build.",
  },
  {
    title: "First sketches",
    text: "I come back with sketches and simple models — a few clear directions to react to, not a finished answer.",
  },
  {
    title: "Design and permits",
    text: "One direction becomes a full design: drawings, materials and details, and the applications needed to build it.",
  },
  {
    title: "Construction and handover",
    text: "I stay involved on site with your builder until the last detail is right and the house is yours.",
  },
];

export const projectTypes = [
  "New home",
  "Extension or renovation",
  "Small workspace",
  "Interior",
  "Landscape",
  "Not sure yet",
];

export const contact = {
  title: "Start a project",
  text: "Tell me a little about your site or your idea. I read every message myself.",
  email: "hello@forma.studio",
  phone: "+55 11 0000-0000",
  address: ["Rua das Pedras, 120", "São Paulo — SP, Brazil"],
};

// Scroll-world opening: scroll drives a camera through Forma's story.
// AI footage (Seedance 2.0 via Monid, 480p preview) rendered by world/render-world.sh.
// The free push-in fallback lives in public/world/vid/ (world/build-placeholder.sh):
// point the clip paths back there and set connectors to [] to use it.
export const world = {
  hint: "scroll to walk through",
  diveScroll: 1.3,
  connScroll: 0.9,
  sections: [
    {
      id: "home",
      label: "Forma",
      still: "/world/home.jpg",
      clip: "/world/ai/home.mp4",
      scroll: 1.5,
      linger: 0.35,
      eyebrow: letter.greeting,
      title: letter.title,
      body: "Forma is my practice: one architect, from the first walk around your site to the day you get the keys.",
      tags: ["One architect", "Homes first"],
    },
    {
      id: "site",
      label: "The site",
      still: "/world/site.jpg",
      clip: "/world/ai/site.mp4",
      eyebrow: "Site and brief",
      title: "The site comes first.",
      body: "Sunlight, views, neighbours, the ground itself and how you live shape the design before any style does.",
      tags: [],
    },
    {
      id: "sketch",
      label: "First sketches",
      still: "/world/sketch.jpg",
      clip: "/world/ai/sketch.mp4",
      eyebrow: "First sketches",
      title: "A few clear directions.",
      body: "Sketches and simple models to react to — not a finished answer.",
      tags: [],
    },
    {
      id: "material",
      label: "Materials",
      still: "/world/material.jpg",
      clip: "/world/ai/material.mp4",
      eyebrow: "Fewer, better materials",
      title: "Timber, lime, stone, steel.",
      body: "A restrained palette chosen to age well and ask for little upkeep.",
      tags: [],
    },
    {
      id: "inside",
      label: "Handover",
      still: "/world/inside.jpg",
      clip: "/world/ai/inside.mp4",
      scroll: 1.5,
      linger: 0.35,
      eyebrow: "Construction and handover",
      title: "Until the keys are yours.",
      body: "I stay on site with your builder until the last detail is right.",
      tags: [],
      cta: {
        primary: { label: "Start a project", href: "#contact" },
        secondary: { label: "See the work", href: "#work" },
      },
    },
  ],
  // Aerial flights between the islands (architecture B). Each starts on the previous
  // dive's real last frame and ends on the next dive's real first frame.
  connectors: ["/world/ai/conn1.mp4", "/world/ai/conn2.mp4", "/world/ai/conn3.mp4", "/world/ai/conn4.mp4"],
};
