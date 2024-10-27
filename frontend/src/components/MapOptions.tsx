import { Info, Public, PublicOff, Settings } from "@mui/icons-material";
import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";

type MapOptionsProps = {
  globeView: boolean;
  setGlobeView: React.Dispatch<React.SetStateAction<boolean>>;
};

function MapOptions({ globeView, setGlobeView }: MapOptionsProps) {
  const InfoText = () => {
    return (
      <Stack direction="column">
        <Typography>🔥: Close guess</Typography>
        <Typography sx={{ filter: "sepia(1) saturate(5)  hue-rotate(90deg)" }}>
          🔥: Correct country
        </Typography>
        <Typography>🥶: Ice cold guess</Typography>
      </Stack>
    );
  };

  return (
    <SpeedDial
      sx={{ position: "absolute", top: 16, left: 16 }}
      icon={<Settings />}
      ariaLabel={"MapOptions"}
      direction="down"
    >
      <SpeedDialAction
        icon={globeView ? <Public /> : <PublicOff />}
        tooltipTitle={
          <Typography>
            {globeView ? "Globe view on" : "Globe view off"}
          </Typography>
        }
        onClick={() => setGlobeView((prev) => !prev)}
      />
      <SpeedDialAction icon={<Info />} tooltipTitle={InfoText()} />
    </SpeedDial>
  );
}
export default MapOptions;
