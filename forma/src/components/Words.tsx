// Splits a line of copy into one span per word, so WriteOn can write it out word by
// word. The text itself is unchanged for screen readers, search and copy-paste.
export default function Words({ text }: { text: string }) {
  return text.split(/(\s+)/).map((part, i) =>
    /^\s+$/.test(part) || part === "" ? (
      part
    ) : (
      <span key={i} className="w">
        {part}
      </span>
    ),
  );
}
