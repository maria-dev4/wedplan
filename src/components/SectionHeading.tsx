import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
          light ? "bg-white/10 text-sand" : "bg-latte text-cocoa"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-4xl md:text-5xl ${light ? "text-ivory" : "text-espresso"}`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-lg ${light ? "text-sand" : "text-mocha"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}
