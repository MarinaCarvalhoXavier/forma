import Image from "next/image";
import { about, architect } from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Words from "./Words";
import WriteOn from "./WriteOn";

export default function About() {
  return (
    <section id="about" className="border-t border-rule">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-2xl px-md py-4xl sm:px-xl md:grid-cols-12">
        <Reveal className="max-w-[24rem] md:col-span-4">
          <figure>
            <div className="reveal-media relative aspect-[4/5] overflow-hidden rounded-card bg-paper-2">
              <Image
                src={architect.portrait}
                alt={architect.portraitAlt}
                fill
                sizes="(min-width: 768px) 30vw, 24rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-sm font-mono text-label text-muted">{architect.portraitCaption}</figcaption>
          </figure>
        </Reveal>

        <WriteOn className="md:col-span-7 md:col-start-6">
          <SectionHeading>
            <Words text={about.title} />
          </SectionHeading>
          <p className="mt-lg max-w-[52ch] text-md leading-relaxed">
            <Words text={about.intro} />
          </p>

          <div className="mt-xl max-w-[60ch] space-y-lg">
            {about.principles.map((principle) => (
              <p key={principle.lead}>
                <strong className="font-semibold">
                  <Words text={principle.lead} />
                </strong>{" "}
                <span className="text-muted">
                  <Words text={principle.text} />
                </span>
              </p>
            ))}
          </div>
        </WriteOn>
      </div>
    </section>
  );
}
