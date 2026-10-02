import { architect, contact } from "@/data/content";

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
          Write to{" "}
          <a href={`mailto:${contact.email}`} className="whitespace-nowrap underline decoration-1 underline-offset-4 hover:text-accent-text">
            {contact.email}
          </a>
          .
        </p>
        <p className="mt-2xl font-mono text-label text-muted">
          © {new Date().getFullYear()} Forma · {contact.address.join(", ")}
        </p>
      </div>
    </footer>
  );
}
