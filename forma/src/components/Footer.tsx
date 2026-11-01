import { architect, concept, contact } from "@/data/content";

// Closes the page the way the letter opened it.
export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-md pt-2xl pb-xl sm:px-xl">
        <p className="font-display text-md leading-relaxed">
          Thank you for reading.
          <br />
          {architect.name}, Forma
        </p>
        <p className="mt-md max-w-[60ch] text-sm text-muted">
          P.S. You don’t need a finished plan to get in touch — a plot, a house or an idea is enough.
        </p>
        <p className="mt-2xl max-w-[60ch] text-sm text-muted">
          {concept.note}{" "}
          <a href={concept.howHref} className="whitespace-nowrap text-ink underline decoration-1 underline-offset-4 hover:text-accent-text">
            {concept.howLabel} →
          </a>
        </p>
        <p className="mt-md font-mono text-label text-muted">
          © {new Date().getFullYear()} Forma · {contact.city}
        </p>
      </div>
    </footer>
  );
}
