import { Box, Slide, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { GuessProps } from "./GuessList";
import { BorderColor } from "@mui/icons-material";
import ThermometerMarker from "./ThermometerMarker";

function Thermometer({ guesses, goal }: GuessProps) {
  const svgRef = useRef<SVGRectElement>(null);
  const MAX = 20037.5;
  const theme = useTheme();
  const [hover, setHover] = useState<number>(-1);

  const Markers = guesses.map((item, i) => {
    return guesses.length > item.i + 1 ? (
      <ThermometerMarker
        key={i}
        i={i}
        item={item}
        hover={hover}
        setHover={setHover}
      />
    ) : (
      <Slide
        in={true}
        direction="up"
        container={svgRef.current}
        key={i}
        easing={{
          enter: theme.transitions.easing.easeOut,
          exit: theme.transitions.easing.sharp,
        }}
        timeout={{
          enter: 1000,
          exit: theme.transitions.duration.leavingScreen,
        }}
        mountOnEnter
        unmountOnExit
      >
        <g>
          <ThermometerMarker
            i={i}
            item={item}
            hover={hover}
            setHover={setHover}
          />
        </g>
      </Slide>
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0%",
        right: "1%",
        zIndex: 1,
        height: "80%",
      }}
    >
      <svg viewBox="0 0 20 100" width="100%" height="100%">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>
        <rect
          ref={svgRef}
          width="6"
          height="80"
          fill="url(#myGradient)"
          stroke={goal ? "rgba(255,255,0,1)" : "white"}
          strokeWidth={0.6}
          rx={"3"}
          x={7}
          y={10}
        ></rect>
        {Markers}
      </svg>
    </div>
  );
}

export default Thermometer;
