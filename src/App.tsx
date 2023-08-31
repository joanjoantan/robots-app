import React, { useState } from "react";
import { Orientation, Instruction } from "./utils/helper";
import { Robot } from "./utils/interface";
import { turnLeft, turnRight, moveForward } from "./utils/features";

const App: React.FC = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState<string>(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`);

  const handleRunClick = () => {
    const linesArray = input.trim().split("\n");
    const lines = linesArray.filter((linesArray) => linesArray !== "");
    const [gridWidth, gridHeight] = lines.shift()!.split(" ").map(Number);

    const robots: Robot[] = [];

    while (lines.length > 1) {
      const [position, instructions] = lines.splice(0, 2);

      const [x, y, orientation] = position.split(" ");

      const robot: Robot = {
        x: Number(x),
        y: Number(y),
        orientation: orientation as Orientation,
        isLost: false,
      };

      for (const instruction of instructions) {
        if (robot.isLost) break;

        switch (instruction) {
          case Instruction.L:
            robot.orientation = turnLeft(robot).orientation;
            break;
          case Instruction.R:
            robot.orientation = turnRight(robot).orientation;
            break;
          case Instruction.F:
            const movedRobot = moveForward(robot, gridWidth, gridHeight);
            if (movedRobot.isLost) {
              robot.isLost = true;
            } else {
              robot.x = movedRobot.x;
              robot.y = movedRobot.y;
            }
            break;
        }
      }

      robots.push(robot);
    }

    const outputResponse = robots.map((robot) =>
      robot.isLost
        ? `${robot.x} ${robot.y} ${robot.orientation} LOST`
        : `${robot.x} ${robot.y} ${robot.orientation}`
    );

    setOutput(outputResponse.join("\n"));
  };

  return (
    <>
      <h1>Martian Robots</h1>

      <div>
        <h2>The Input</h2>
        <textarea
          rows={10}
          cols={50}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button onClick={handleRunClick}>Run</button>

      <div>
        <h2>The Output</h2>
        <pre>{output}</pre>
      </div>
    </>
  );
};

export default App;
