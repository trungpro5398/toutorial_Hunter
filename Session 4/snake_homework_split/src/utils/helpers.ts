import type { Direction, Position } from "../types/game.js";

export function samePos(a: Position | null | undefined, b: Position | null | undefined): boolean {
  return !!a && !!b && a.x === b.x && a.y === b.y;
}

export function isOpposite(a: Direction, b: Direction): boolean {
  return a.dx === -b.dx && a.dy === -b.dy;
}

export function dirLabel(dir: Direction): string {
  if (dir.dx === 1 && dir.dy === 0) return "R";
  if (dir.dx === -1 && dir.dy === 0) return "L";
  if (dir.dx === 0 && dir.dy === -1) return "U";
  if (dir.dx === 0 && dir.dy === 1) return "D";
  return "?";
}
