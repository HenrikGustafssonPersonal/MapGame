import { Tooltip } from "@mui/material";
import { useState } from "react";

interface ThermometerMarkerProps {
  i: number;
  item: Guess;
  hover: number;
  setHover: React.Dispatch<React.SetStateAction<number>>;
}

function ThermometerMarker({
  i,
  item,
  hover,
  setHover,
}: ThermometerMarkerProps) {
  const MAX = 20037.5;
  const y = 10 + 80 * (item.dist / MAX);
  const x = [5, 15];
  var emoji = "";
  const score = item.dist / MAX;

  if (score < 0.025) {
    emoji = "🔥";
  }

  if (score > 0.7) {
    emoji = "🥶";
  }

  const tooltipText = `${emoji} #${item.i + 1} ${item.name}`;

  return (
    <Tooltip key={i} title={tooltipText} sx={{ fontSize: 20 }}>
      <g>
        <line
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          x1={i % 2 == 0 ? x[0] + 1 : x[0] + 2}
          y1={y}
          x2={i % 2 == 0 ? x[1] - 2 : x[1] - 1}
          y2={y}
          opacity={hover != i && hover != -1 ? 0.3 : 1}
          stroke={hover == i ? "red" : "white"}
          strokeWidth={0.4}
        />
        <circle
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          cx={i % 2 == 0 ? x[0] : x[1]}
          cy={y}
          r={1}
          fill={"#ebde34"}
          opacity={hover != i && hover != -1 ? 0.3 : 1}
          stroke={hover == i ? "red" : "white"}
          strokeWidth={0.4}
          style={{
            border: 1,
            borderColor: "black",
          }}
        />
      </g>
    </Tooltip>
  );
}

export default ThermometerMarker;
