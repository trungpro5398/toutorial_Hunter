import { SPEED } from "../config/constants.js";

export function computeTickMs(score: number): number {
  const steps = Math.floor(score / SPEED.STEP_POINTS);
  let speed = SPEED.START_MS - steps * SPEED.STEP_DECREASE_MS;

  if (speed < SPEED.MIN_MS) {
    speed = SPEED.MIN_MS;
  }

  return speed;
}