"use client";

import { useState } from "react";
import type { BriefResult } from "@/app/api/brief/route";
import { brief as briefCopy, contact, projectTypes } from "@/data/content";

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

// The site is a portfolio demo: sending validates the enquiry and confirms on screen,
// but nothing leaves the page. A real form service would replace that step in
// handleSubmit. "Organise my brief" asks Claude (app/api/brief) to turn the message
// into a structured brief the visitor can check.
type BriefState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; brief: BriefResult }
  | { status: "error"; message: string };

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [aiBrief, setAiBrief] = useState<BriefState>({ status: "idle" });

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

    setSent(true);
  }

  async function organiseBrief() {
    setAiBrief({ status: "loading" });
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: values.message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.brief) {
        setAiBrief({ status: "error", message: data.error ?? briefCopy.errors.failed });
        return;
      }
      setAiBrief({ status: "done", brief: data.brief });
      // Fill an empty project type; otherwise offer the AI's pick as a one-click choice.
      if (!values.projectType) setValues((v) => ({ ...v, projectType: data.brief.projectType }));
    } catch {
      setAiBrief({ status: "error", message: briefCopy.errors.failed });
    }
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

      <div className="space-y-sm">
        <button
          type="button"
          onClick={organiseBrief}
          disabled={aiBrief.status === "loading" || values.message.trim().length < 20}
          className="inline-flex min-h-11 items-center gap-xs whitespace-nowrap rounded-pill border border-ink px-lg text-sm font-medium transition-colors duration-(--dur-short) hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
        >
          <span aria-hidden="true">✦</span>
          {aiBrief.status === "loading" ? briefCopy.working : briefCopy.button}
        </button>
        {aiBrief.status === "idle" && <p className="text-sm text-muted">{briefCopy.hint}</p>}
        <div aria-live="polite">
          {aiBrief.status === "error" && <p className="text-sm text-error">{aiBrief.message}</p>}
          {aiBrief.status === "done" && (
            <BriefCard
              brief={aiBrief.brief}
              current={values.projectType}
              onUseType={() => setValues({ ...values, projectType: aiBrief.brief.projectType })}
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center gap-xs whitespace-nowrap rounded-pill bg-accent px-lg text-sm font-medium text-accent-ink transition-colors duration-(--dur-short) hover:bg-accent-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
      >
        Send enquiry
        <span aria-hidden="true">→</span>
      </button>

      <p role="status" className="text-sm text-success">
        {sent && contact.sent(values.name.trim())}
      </p>
    </form>
  );
}

function BriefCard({ brief, current, onUseType }: { brief: BriefResult; current: string; onUseType: () => void }) {
  const { labels } = briefCopy;
  const list = (items: string[]) => (
    <ul className="list-disc space-y-2xs pl-md">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
  return (
    <section aria-label={briefCopy.title} className="rounded-card border border-rule bg-paper-2 p-lg text-sm">
      <h3 className="font-display text-md">{briefCopy.title}</h3>
      <p className="mt-2xs font-mono text-label text-muted">{briefCopy.disclaimer}</p>
      <dl className="mt-md space-y-sm">
        <div>
          <dt className="font-mono text-label text-muted">{labels.projectType}</dt>
          <dd className="flex flex-wrap items-center gap-sm">
            {brief.projectType}
            {current && current !== brief.projectType && (
              <button
                type="button"
                onClick={onUseType}
                className="whitespace-nowrap text-accent-text underline decoration-1 underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus active:translate-y-px"
              >
                {briefCopy.useType}
              </button>
            )}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-label text-muted">{labels.summary}</dt>
          <dd>{brief.summary}</dd>
        </div>
        <div>
          <dt className="font-mono text-label text-muted">{labels.site}</dt>
          <dd>{brief.site}</dd>
        </div>
        {brief.wishes.length > 0 && (
          <div>
            <dt className="font-mono text-label text-muted">{labels.wishes}</dt>
            <dd>{list(brief.wishes)}</dd>
          </div>
        )}
        {brief.constraints.length > 0 && (
          <div>
            <dt className="font-mono text-label text-muted">{labels.constraints}</dt>
            <dd>{list(brief.constraints)}</dd>
          </div>
        )}
        {brief.questions.length > 0 && (
          <div>
            <dt className="font-mono text-label text-muted">{labels.questions}</dt>
            <dd>{list(brief.questions)}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
