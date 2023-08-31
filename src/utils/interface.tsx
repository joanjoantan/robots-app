import { Orientation } from "./helper";

export interface Robot {
  x: number;
  y: number;
  orientation: Orientation;
  isLost: boolean;
}
