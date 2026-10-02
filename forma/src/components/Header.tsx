import StartProjectLink from "./StartProjectLink";

// Edge-aligned: wordmark left, one action right, nothing in between.
export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-md px-md py-lg sm:px-xl">
      <a href="#top" className="font-display text-xl leading-none">
        forma
      </a>
      <StartProjectLink />
    </header>
  );
}
