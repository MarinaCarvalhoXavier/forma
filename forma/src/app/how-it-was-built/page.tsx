import type { Metadata } from "next";
import Link from "next/link";
import { brandName, howItWasBuilt as page } from "@/data/content";

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

// Portfolio case study: how the site was made, written as plainly as the site itself.
export default function HowItWasBuilt() {
  return (
    <main lang="pt-BR" className="mx-auto w-full max-w-[44rem] px-md py-3xl sm:px-xl">
      <div className="flex items-center justify-between gap-md">
        <Link href="/" className="font-display text-xl leading-none">
          {brandName}
        </Link>
        <Link href="/" className="whitespace-nowrap text-sm underline decoration-1 underline-offset-4 hover:text-accent-text">
          {page.back}
        </Link>
      </div>

      <h1 className="mt-3xl text-display">{page.title}</h1>
      <p className="mt-lg text-md leading-relaxed">{page.intro}</p>

      {page.sections.map((section) => (
        <section key={section.title} className="mt-2xl border-t border-rule pt-xl">
          <h2 className="text-xl">{section.title}</h2>
          {"paragraphs" in section &&
            section.paragraphs?.map((p) => (
              <p key={p} className="mt-md leading-relaxed">
                {p}
              </p>
            ))}
          {"items" in section && (
            <ul className="mt-md list-disc space-y-xs pl-md leading-relaxed">
              {section.items?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {"table" in section && section.table && (
            // A table on wide screens; on phones each row stacks into a small block.
            <div className="mt-md text-sm" role="table">
              <div role="row" className="hidden grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)] gap-md border-b border-rule py-xs sm:grid">
                {section.table.head.map((h) => (
                  <span key={h} role="columnheader" className="font-mono text-label text-muted">
                    {h}
                  </span>
                ))}
              </div>
              {section.table.rows.map((row) => (
                <div
                  key={row[0]}
                  role="row"
                  className="grid grid-cols-1 gap-2xs border-b border-rule py-sm sm:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)] sm:gap-md"
                >
                  {row.map((cell, i) => (
                    <span key={i} role="cell" className={i === 0 ? "font-medium" : "text-muted"}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <p className="mt-2xl border-t border-rule pt-xl">
        <a href={page.repoHref} className="whitespace-nowrap underline decoration-1 underline-offset-4 hover:text-accent-text">
          {page.repoLabel}
        </a>
      </p>
    </main>
  );
}
