export function getColorFromIdx(idx: number): number {
  if (idx === 0) return 0x00ff00;
  if (idx === 1) return 0xff0000;
  if (idx === 2) return 0x0000ff;

  return 0xff0000;
}
