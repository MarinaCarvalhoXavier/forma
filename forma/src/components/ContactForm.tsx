"use client";

import { useState } from "react";
import { contact, projectTypes } from "@/data/content";

type Field = "name" | "email" | "projectType" | "message";
type Values = Record<Field, string>;

const empty: Values = { name: "", email: "", projectType: "", message: "" };

function validate(field: Field, value: string): string {
  const v = value.trim();
  switch (field) {
    case "name":
      return v ? "" : "Add your name so I know who to reply to.";
    case "email":
      if (!v) return "Add your email address so I can reply.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? ""
        : "That email address looks incomplete — check it has an @ and a domain, like name@example.com.";
    case "projectType":
      return v ? "" : "Choose a project type — “Not sure yet” is fine.";
    case "message":
      return v ? "" : "Tell me a little about what you want to build.";
  }
}

const fieldClass =
  "mt-xs block min-h-11 w-full rounded-control border border-rule bg-paper-2 px-sm py-xs text-base transition-colors duration-(--dur-short) outline-2 outline-offset-1 outline-transparent outline-solid hover:border-muted focus-visible:outline-focus aria-invalid:border-error";

// Until a form service is connected, sending opens the visitor's email app
// with the enquiry already written, addressed to contact.email.
export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);

  const errorFor = (field: Field) => (touched[field] ? validate(field, values[field]) : "");

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [field]: e.target.value });
    setSent(false);
  };
  const blur = (field: Field) => () => setTouched({ ...touched, [field]: true });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = Object.keys(empty) as Field[];
    setTouched({ name: true, email: true, projectType: true, message: true });

    const firstInvalid = fields.find((f) => validate(f, values[f]));
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const subject = `New project enquiry — ${values.projectType}`;
    const body = `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\n\n${values.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const describe = (field: Field) => (errorFor(field) ? `contact-${field}-error` : undefined);

  // The message slot is always reserved, so an error never pushes the form down.
  const errorText = (field: Field) => (
    <p id={`contact-${field}-error`} className="mt-xs min-h-[1lh] text-sm text-error">
      {errorFor(field)}
    </p>
  );

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-md">
      <p className="font-mono text-label text-muted">All fields are required.</p>

      <div>
        <label htmlFor="contact-name" className="font-mono text-label">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!errorFor("name")}
          aria-describedby={describe("name")}
          value={values.name}
          onChange={update("name")}
          onBlur={blur("name")}
          className={fieldClass}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor="contact-email" className="font-mono text-label">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@example.com"
          required
          aria-invalid={!!errorFor("email")}
          aria-describedby={describe("email")}
          value={values.email}
          onChange={update("email")}
          onBlur={blur("email")}
          className={fieldClass}
        />
        {errorText("email")}
      </div>

      <div>
        <label htmlFor="contact-projectType" className="font-mono text-label">
          Project type
        </label>
        <select
          id="contact-projectType"
          name="projectType"
          required
          aria-invalid={!!errorFor("projectType")}
          aria-describedby={describe("projectType")}
          value={values.projectType}
          onChange={update("projectType")}
          onBlur={blur("projectType")}
          className={fieldClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errorText("projectType")}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-mono text-label">
          What would you like to build?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={!!errorFor("message")}
          aria-describedby={describe("message") ?? "contact-message-help"}
          value={values.message}
          onChange={update("message")}
          onBlur={blur("message")}
          className={`${fieldClass} min-h-24 resize-y`}
        />
        {errorFor("message") ? (
          errorText("message")
        ) : (
          <p id="contact-message-help" className="mt-xs min-h-[1lh] text-sm text-muted">
            Where is the site, what is there now, and what do you imagine?
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center gap-xs whitespace-nowrap rounded-pill bg-accent px-lg text-sm font-medium text-accent-ink transition-colors duration-(--dur-short) hover:bg-accent-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
      >
        Send enquiry
        <span aria-hidden="true">→</span>
      </button>

      <p role="status" className="text-sm text-success">
        {sent &&
          `Your email app should now open with the enquiry ready to send. If nothing opened, write to ${contact.email}.`}
      </p>
    </form>
  );
}
