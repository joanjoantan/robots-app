import { Robot } from "./interface";
import { Orientation } from "./helper";

export const turnLeft = (robot: Robot): Robot => {
  const newRobot = { ...robot };
  switch (robot.orientation) {
    case Orientation.N:
      newRobot.orientation = Orientation.W;
      break;
    case Orientation.E:
      newRobot.orientation = Orientation.N;
      break;
    case Orientation.S:
      newRobot.orientation = Orientation.E;
      break;
    case Orientation.W:
      newRobot.orientation = Orientation.S;
      break;
  }
  return newRobot;
};

export const turnRight = (robot: Robot): Robot => {
  const newRobot = { ...robot };
  switch (robot.orientation) {
    case Orientation.N:
      newRobot.orientation = Orientation.E;
      break;
    case Orientation.E:
      newRobot.orientation = Orientation.S;
      break;
    case Orientation.S:
      newRobot.orientation = Orientation.W;
      break;
    case Orientation.W:
      newRobot.orientation = Orientation.N;
      break;
  }
  return newRobot;
};

export const moveForward = (
  robot: Robot,
  gridWidth: number,
  gridHeight: number
): Robot => {
  const newRobot = { ...robot };
  switch (robot.orientation) {
    case Orientation.N:
      newRobot.y++;
      break;
    case Orientation.E:
      newRobot.x++;
      break;
    case Orientation.S:
      newRobot.y--;
      break;
    case Orientation.W:
      newRobot.x--;
      break;
  }

  if (isLost(newRobot.x, newRobot.y, gridWidth, gridHeight)) {
    newRobot.isLost = true;
  }
  return newRobot;
};

export const isLost = (
  x: number,
  y: number,
  gridWidth: number,
  gridHeight: number
): boolean => {
  return x < 0 || y < 0 || x > gridWidth || y > gridHeight;
};
