// All content for the Forma landing page.
// Edit the text, links and images here — the components read from this file.
//
// This is a concept project for a portfolio: Forma, Helena and the projects are
// fictional, and every image and video was generated with AI (see `concept` below,
// shown on the page). Don't add numbers, client quotes or awards.

export const brandName = "forma";

export const architect = {
  name: "Helena Duarte",
  firstName: "Helena",
  // A clay-model scene from the same AI world as the walkthrough, not a real person.
  portrait: "/images/studio.jpg",
  portraitAlt: "A clay-model scene of the studio: an architect drawing at a timber desk while a client looks at a small white model of a house",
  portraitCaption: "The studio, as a clay model",
};

// Shown on the page so nobody mistakes the concept for a real practice.
export const concept = {
  short: "Concept projects · images generated with AI",
  note: "Forma is a concept project made for a portfolio. The practice, Helena and the projects are fictional; every image and video was generated with AI, and the enquiry form is a demo that sends nothing.",
  howLabel: "How this site was built",
  howHref: "/how-it-was-built",
};

export const letter = {
  greeting: `Hello, I’m ${architect.firstName}.`,
  title: "I design calm houses, one at a time.",
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
  city: "São Paulo, Brazil",
  demoNote: "This form is a demo: nothing is sent and nothing is stored.",
  sent: (name: string) =>
    `Thank you, ${name}. This is a portfolio demo, so your enquiry was not sent anywhere — on a live site, this is where it would reach Helena.`,
};

// "Organise my brief": an AI step in the contact form (app/api/brief/route.ts).
export const brief = {
  button: "Organise my brief with AI",
  working: "Reading your project…",
  hint: "Write a few sentences above, then let AI turn them into a short brief you can check before sending.",
  title: "Your brief, as Helena would read it",
  disclaimer: "Drafted by AI (Claude) from your words. Check it before you send.",
  labels: {
    projectType: "Project type",
    summary: "In short",
    site: "Site",
    wishes: "What you hope for",
    constraints: "Things to keep in mind",
    questions: "What Helena would ask next",
  },
  useType: "Use this project type",
  errors: {
    off: "The AI brief is switched off on this copy of the site.",
    limit: "That’s a few briefs in a row — try again in a few minutes.",
    short: "Write a little more about your project first (a couple of sentences).",
    long: "That’s a long message — keep it under 1,500 characters for the brief.",
    busy: "The AI is busy right now — try again in a moment.",
    failed: "The brief couldn’t be drafted this time. Your message is still here; try again or just send it.",
  },
};

// Scroll-world opening: scroll drives a camera through Forma's story.
// AI footage (Seedance 2.0 via Monid, 480p preview) rendered by world/render-world.sh;
// phones get the lighter copies in public/world/ai/m/ (world/encode-mobile.sh).
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
      clipMobile: "/world/ai/m/home.mp4",
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
      clipMobile: "/world/ai/m/site.mp4",
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
      clipMobile: "/world/ai/m/sketch.mp4",
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
      clipMobile: "/world/ai/m/material.mp4",
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
      clipMobile: "/world/ai/m/inside.mp4",
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
  // Lighter encodes of the same clips for phones (world/encode-mobile.sh), so each one
  // finishes downloading before the visitor scrolls past it.
  connectorsMobile: ["/world/ai/m/conn1.mp4", "/world/ai/m/conn2.mp4", "/world/ai/m/conn3.mp4", "/world/ai/m/conn4.mp4"],
};

// The case study at /how-it-was-built, in Portuguese for the portfolio's readers.
// Every figure here was checked against the repository (git history, render logs, file sizes).
export const howItWasBuilt = {
  metaTitle: "Como este site foi construído — Forma",
  metaDescription: "Estudo de caso: uma landing page de arquitetura construída com IA — código com Claude Code, imagens no ChatGPT, vídeos com Seedance 2.0 e um resumo de projeto gerado pelo Claude.",
  back: "← Voltar ao site",
  title: "Como este site foi construído",
  intro: "Forma é um projeto conceitual: o site de uma arquiteta que trabalha sozinha e projeta casas calmas, com poucos materiais. A arquiteta, os projetos e as imagens são fictícios. O objetivo era testar até onde dá para levar um site com ferramentas de IA generativa, cuidando de cada decisão de produto e de design.",
  sections: [
    {
      title: "O problema",
      paragraphs: [
        "Um escritório de uma pessoa só precisa transmitir duas coisas: calma e atenção pessoal. E precisa transformar visitas em pedidos de projeto. Por isso o site inteiro conduz para um único botão, “Start a project”, que leva ao formulário.",
      ],
    },
    {
      title: "O que foi construído",
      items: [
        "Uma abertura em que a rolagem conduz uma câmera por cinco ilhas de argila, uma para cada fase do trabalho: a casa pronta, o terreno, os primeiros esboços, a obra e a entrega das chaves.",
        "Uma página escrita como uma carta da arquiteta, com textos que se escrevem conforme a leitura e fotos que surgem ao entrar na tela.",
        "Um formulário em que a IA transforma a descrição livre do visitante num resumo organizado do projeto, que ele confere antes de enviar.",
      ],
    },
    {
      title: "Como a IA foi usada",
      table: {
        head: ["Ferramenta", "Para quê", "Resultado"],
        rows: [
          ["Claude Code", "Escrever e revisar todo o código, com as skills Hallmark (design) e scroll-world (motor da rolagem)", "Next.js 16, React 19, TypeScript e Tailwind CSS v4"],
          ["ChatGPT", "Gerar as imagens a partir de prompts escritos e versionados no repositório", "15 imagens: 10 fotorrealistas e 5 ilhas de argila"],
          ["Seedance 2.0 (via Monid)", "Animar as ilhas e criar os voos de câmera entre elas", "9 clipes de 4 s em 480p, por US$ 2,84 no total, sem nenhuma refação"],
          ["Claude API (Opus 5.5)", "Organizar o pedido do visitante com saída estruturada", "Tipo de projeto, terreno, desejos, restrições e perguntas da arquiteta"],
        ],
      },
    },
    {
      title: "Decisões que tomei",
      items: [
        "Trocar fotos de banco de imagens por um mundo próprio de ilhas de argila, para o site ter uma identidade que não parece template.",
        "Mudar o visual para o modo claro, mais próximo da luz de uma casa e do estilo calmo da marca.",
        "Pedir interações que reforçam a ideia de carta — texto que se escreve, fotos que surgem — e ajustar o ritmo delas até parecerem naturais.",
        "Manter o botão principal sempre à vista e deixar claro, no próprio site, que tudo é conceitual e gerado por IA.",
        "Usar a IA dentro do produto para ajudar o visitante a começar, e não só nos bastidores.",
      ],
    },
    {
      title: "Problemas resolvidos no caminho",
      items: [
        "Emendas invisíveis entre os vídeos: cada voo começa exatamente no último quadro real do vídeo anterior.",
        "Bordas aparecendo em volta das ilhas: o fundo cinza das imagens foi removido e trocado pela mesma cor da página.",
        "Cenas paradas no celular: versões mais leves dos vídeos só para telas pequenas reduziram o download de 16 MB para 7 MB.",
        "Tela em branco no fim do passeio: a última cena agora fica na tela enquanto o resto da página sobe por cima.",
        "Animações que disparavam antes da hora ao recarregar a página: os efeitos passaram a esperar o passeio montar.",
      ],
    },
    {
      title: "Em números",
      items: [
        "5 cenas, 9 clipes de vídeo, 15 imagens geradas",
        "US$ 2,84 em geração de vídeo",
        "Construído em 1 e 2 de outubro de 2026, com refinamentos em 31 de outubro",
      ],
    },
  ],
  repoLabel: "Ver o código no GitHub →",
  repoHref: "https://github.com/MarinaCarvalhoXavier/forma",
};
