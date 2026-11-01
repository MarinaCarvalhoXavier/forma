import Image from "next/image";
import { concept, projects } from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Each slot in the uneven grid: column span/offset, image ratio, image sizes, and a
// reveal delay so the right-hand image of a side-by-side pair appears just after the left.
// Projects beyond the fifth reuse the pattern from the start.
const slots = [
  { place: "md:col-span-12", ratio: "aspect-[16/9]", sizes: "(min-width: 1152px) 1104px, 100vw" },
  { place: "md:col-span-7", ratio: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { place: "md:col-span-4 md:col-start-9 md:mt-3xl", ratio: "aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 100vw", delay: 150 },
  { place: "md:col-span-5", ratio: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { place: "md:col-span-6 md:col-start-7 md:mt-2xl", ratio: "aspect-[4/3]", sizes: "(min-width: 768px) 50vw, 100vw", delay: 150 },
];

export default function Projects() {
  return (
    <section id="work" className="mx-auto w-full max-w-6xl px-md pt-3xl pb-2xl sm:px-xl">
      <SectionHeading>Selected work</SectionHeading>
      <p className="mt-sm font-mono text-label text-muted">{concept.short}</p>

      <ul className="mt-xl grid grid-cols-1 gap-x-lg gap-y-2xl md:grid-cols-12">
        {projects.map((project, i) => {
          const slot = slots[i % slots.length];
          return (
            <li key={project.name} className={slot.place}>
              <Reveal delay={slot.delay}>
                <figure>
                  <div className={`reveal-media relative ${slot.ratio} overflow-hidden rounded-card bg-paper-2`}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes={slot.sizes}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-sm font-mono text-label tabular-nums">
                    {project.name}
                    <span className="text-muted">
                      {" "}
                      — {project.category} · {project.location}, {project.year}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
