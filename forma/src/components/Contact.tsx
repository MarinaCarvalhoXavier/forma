import { contact } from "@/data/content";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-rule">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-2xl px-md py-4xl sm:px-xl md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-display">{contact.title}</h2>
          <p className="mt-lg max-w-[45ch] text-md leading-relaxed">{contact.text}</p>

          <dl className="mt-xl space-y-md text-sm">
            <div>
              <dt className="font-mono text-label text-muted">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="underline decoration-1 underline-offset-4 hover:text-accent-text">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label text-muted">Phone</dt>
              <dd>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-accent-text">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label text-muted">Studio</dt>
              {contact.address.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
