"use client";

// Custom loader for next/image: the site serves its own image files and never calls
// Vercel's image optimizer (the account's quota for it runs out, and then every photo
// that is not already cached shows as broken).
//
// Every catalogue photo exists in two sizes:
//   /<folder>/…/photo.webp          full size (up to 1600 px wide)
//   /thumbs/<folder>/…/photo.webp   640 px wide, made by `npm run thumbs`
// Cards and thumbnail strips get the small one, the photo viewer the full one.

const HAS_THUMB = /^\/(sofas-optimized|tables-optimized|zorof-optimized)\//;
const THUMB_MAX_WIDTH = 750;

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (HAS_THUMB.test(src) && width <= THUMB_MAX_WIDTH) return `/thumbs${src}?w=640`;
  return `${src}?w=1600`;
}
