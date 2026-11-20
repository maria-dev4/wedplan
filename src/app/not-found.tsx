import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-cream to-ivory px-5 pb-16 pt-32">
      <div className="max-w-lg text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-latte text-cocoa">
          <Compass className="size-10" />
        </span>
        <p className="mt-6 font-(family-name:--font-playfair) text-8xl italic text-mocha">
          404
        </p>
        <h1 className="mt-2 text-4xl text-espresso">
          This page could not be found
        </h1>
        <p className="mt-3 text-mocha">
          The link may be broken or the page may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-sand px-7 py-3 font-medium not-italic text-cocoa transition hover:bg-latte"
          >
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
