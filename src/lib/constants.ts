export const categories = [
  "Venue",
  "Photography",
  "Catering",
  "Decoration",
  "Makeup",
  "Music",
] as const;

export type Category = (typeof categories)[number];
