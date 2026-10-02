import { services } from "@/data/content";
import SectionHeading from "./SectionHeading";

// A quiet spec sheet: one row per service, hairline between rows.
export default function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-md pt-2xl pb-3xl sm:px-xl">
      <SectionHeading>What I design</SectionHeading>

      <dl className="mt-xl border-b border-rule">
        {services.map((service) => (
          <div
            key={service.name}
            className="grid grid-cols-1 gap-xs border-t border-rule py-lg md:grid-cols-12 md:gap-lg"
          >
            <dt className="font-display text-md md:col-span-3">{service.name}</dt>
            <dd className="max-w-[60ch] text-muted md:col-span-6">{service.text}</dd>
            {service.note && (
              <dd className="flex items-center gap-xs font-mono text-label text-accent-text md:col-span-3 md:justify-end">
                <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent" />
                {service.note}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
