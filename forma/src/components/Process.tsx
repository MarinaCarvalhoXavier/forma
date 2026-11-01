import { process } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Words from "./Words";
import WriteOn from "./WriteOn";

// The four stages are genuinely ordered, so they are numbered.
export default function Process() {
  return (
    <section className="bg-paper-2">
      <WriteOn className="mx-auto w-full max-w-6xl px-md py-3xl sm:px-xl">
        <SectionHeading>
          <Words text="How a project unfolds" />
        </SectionHeading>

        <ol className="mt-xl max-w-[48rem]">
          {process.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-lg border-t border-rule py-lg"
            >
              <span className="pt-2xs font-mono text-label tabular-nums text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-md font-normal">
                  <Words text={step.title} />
                </h3>
                <p className="mt-xs max-w-[60ch] text-muted">
                  <Words text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </WriteOn>
    </section>
  );
}
