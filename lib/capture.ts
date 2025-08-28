// lib/capture.ts
// Turn a DOM node into a PNG Blob we can share or download.
export async function elementToPngBlob(el: HTMLElement): Promise<Blob> {
  const { toBlob } = await import("html-to-image");
  // Higher quality for stories; tweak pixelRatio if needed (1.5–2)
  const blob = await toBlob(el, {
    pixelRatio: 2,
    backgroundColor: "#000000" // ensure solid dark background
  });
  if (!blob) throw new Error("Could not create image blob");
  return blob;
}
