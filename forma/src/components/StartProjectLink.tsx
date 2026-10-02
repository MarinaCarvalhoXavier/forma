// The page's primary call to action. Always leads to the enquiry form.
export default function StartProjectLink() {
  return (
    <a
      href="#contact"
      className="inline-flex min-h-11 items-center gap-xs whitespace-nowrap rounded-pill bg-accent px-md text-sm font-medium text-accent-ink transition-colors duration-(--dur-short) ease-(--ease-out) hover:bg-accent-hover active:translate-y-px"
    >
      Start a project
      <span aria-hidden="true">→</span>
    </a>
  );
}
