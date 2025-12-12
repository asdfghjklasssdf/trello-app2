import chroma from "chroma-js";

export function generatePalette() {
  const hue = Math.floor(Math.random() * 360);
  const bg = chroma.hsl(hue, 0.55, 0.85).hex();
  const border = chroma(bg).darken(1.2).hex();
  const text = chroma(bg).darken(3).hex();
  return { bg, border, text };
}
