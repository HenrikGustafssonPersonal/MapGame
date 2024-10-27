import { Badge, Typography } from "@mui/material";
import { Fragment } from "react";

type MapMarkerProps = {
  index: number;
  dist: number;
  correctCountry: boolean;
};

function CustomMarker({ index, dist, correctCountry }: MapMarkerProps) {
  const size = 40;
  const MAX = 20037.5;
  const score = dist / MAX;
  const fireEmoji = "🔥";
  const indexToShow = index + 1;
  const circleColor =
    "rgba(" + (255 - 255 * score) + ",0," + 255 * score + ",1)";

  const filter = correctCountry
    ? "sepia(1) saturate(5)  hue-rotate(90deg)"
    : "";

  return (
    <Badge
      badgeContent={
        <Typography fontSize={22} sx={{ filter: filter }}>
          {score > 0.8 ? "🥶" : "🔥"}
        </Typography>
      }
      overlap="circular"
      invisible={score > 0.05 && score < 0.8 && !correctCountry}
      sx={{
        bgColor: "transparent",
      }}
    >
      <svg height={size} viewBox="0 0 100 100">
        <circle
          cx="50%"
          cy="50%"
          r={size - 5}
          fill={circleColor}
          strokeWidth={4}
        ></circle>
        <text
          x="50%"
          y="50%"
          fontSize={28}
          fontWeight="bold"
          textAnchor="middle"
          dy=".3em"
          fill="white"
        >
          {"#" + indexToShow}
        </text>
      </svg>
    </Badge>
  );
}
export default CustomMarker;
/*
        <text
          x="51%"
          y="55%"
          fontSize={88}
          fontWeight="bold"
          textAnchor="middle"
          dy=".31em"
          opacity={score < 0.025 ? 1 : 0}
          fill="white"
        >
          {fireEmoji}
        </text>;*/
