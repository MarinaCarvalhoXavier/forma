import Image from "next/image";
import { about, architect } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="border-t border-rule">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-2xl px-md py-4xl sm:px-xl md:grid-cols-12">
        <figure className="max-w-[24rem] md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-paper-2">
            <Image
              src={architect.portrait}
              alt={`Portrait of ${architect.name}`}
              fill
              sizes="(min-width: 768px) 30vw, 24rem"
              className="object-cover grayscale"
            />
          </div>
          <figcaption className="mt-sm font-mono text-label text-muted">{architect.name}, architect</figcaption>
        </figure>

        <div className="md:col-span-7 md:col-start-6">
          <SectionHeading>{about.title}</SectionHeading>
          <p className="mt-lg max-w-[52ch] text-md leading-relaxed">{about.intro}</p>

          <div className="mt-xl max-w-[60ch] space-y-lg">
            {about.principles.map((principle) => (
              <p key={principle.lead}>
                <strong className="font-semibold">{principle.lead}</strong>{" "}
                <span className="text-muted">{principle.text}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
