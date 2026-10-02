type Props = {
  children: React.ReactNode;
  id?: string;
};

// Shared section title. Plain and stacked above its content — no eyebrow labels.
export default function SectionHeading({ children, id }: Props) {
  return (
    <h2 id={id} className="text-xl">
      {children}
    </h2>
  );
}
