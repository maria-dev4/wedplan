"use client";

import { TriangleAlert } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-cream to-ivory px-5 pb-16 pt-32">
      <div className="max-w-lg text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-latte text-cocoa">
          <TriangleAlert className="size-10" />
        </span>
        <h1 className="mt-6 text-4xl text-espresso">Something went wrong</h1>
        <p className="mt-3 text-mocha">
          An unexpected error happened. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
