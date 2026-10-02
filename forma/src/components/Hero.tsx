import Image from "next/image";
import { letter } from "@/data/content";

const textLink =
  "whitespace-nowrap underline decoration-1 underline-offset-4 transition-colors duration-(--dur-short) hover:text-accent";

// The page opens as a letter from the architect — no buttons in the fold.
export default function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-6xl px-md pt-2xl pb-3xl sm:px-xl md:pt-3xl md:pb-4xl">
      <div className="max-w-[42rem]">
        <p className="font-display text-md text-muted">{letter.greeting}</p>
        <h1 className="mt-sm text-display">{letter.title}</h1>

        <div className="mt-xl max-w-[52ch] space-y-lg text-md leading-relaxed">
          {letter.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <p className="mt-lg font-display text-md">{letter.signoff}</p>

        <p className="mt-xl flex flex-wrap gap-x-xl gap-y-sm text-sm">
          <a href="#contact" className={textLink}>
            Start a project →
          </a>
          <a href="#about" className={textLink}>
            About the practice ↓
          </a>
        </p>
      </div>

      <figure className="mt-3xl grid grid-cols-1 md:grid-cols-12">
        <div className="relative aspect-[3/2] overflow-hidden rounded-card md:col-span-10 md:col-start-3">
          <Image
            src={letter.photo}
            alt={letter.photoAlt}
            fill
            sizes="(min-width: 1152px) 920px, (min-width: 768px) 83vw, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-sm font-mono text-label text-muted md:col-span-10 md:col-start-3">
          {letter.photoCaption}
        </figcaption>
      </figure>
    </section>
  );
}
