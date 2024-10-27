import {
  AddLocation,
  Circle,
  ExpandLess,
  ExpandMore,
  MilitaryTech,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { MapRef } from "react-map-gl";

export interface GuessProps {
  guesses: Guess[];
  mapRef: React.RefObject<MapRef>;
  goal: Guess | undefined;
}

function GuessList({ guesses, mapRef, goal }: GuessProps) {
  const [selected, setSelected] = useState<number>(guesses.length - 1);
  const [collapse, setCollapse] = useState<boolean>(false);
  const MAX = 20037.5;

  const zoom = (dist: number) => {
    const z = ((dist / MAX - 1) * -5) ** 3;
    return z / 20 + 1;
  };

  useEffect(() => {
    setSelected(guesses.length - 1);

    const selectedGuess = guesses.find((item) => item.i == guesses.length - 1);

    if (selectedGuess) {
      mapRef.current?.flyTo({
        center: [selectedGuess.lon, selectedGuess.lat],
        duration: 2000,
        zoom: zoom(selectedGuess.dist),
      });
    }
  }, [guesses]);

  const handlePress = (guess: Guess) => {
    setSelected(guess.i);
    mapRef.current?.flyTo({
      center: [guess.lon, guess.lat],
      duration: 2000,
      zoom: zoom(guess.dist),
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        borderRadius: 8,
        position: "absolute",
        bottom: "4%",
        right: "10%",
        left: "65%",
        padding: 2,
        paddingX: 3,
        paddingBottom: 0,
        zIndex: 1,
      }}
    >
      <List
        subheader={
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              overflow: "visible",
              justifyContent: "space-between",
            }}
          >
            <ListSubheader
              sx={{
                fontWeight: 7,
                fontSize: 24,
                bgcolor: "transparent",
                color: "white",
              }}
            >
              GUESSES
            </ListSubheader>
            <IconButton onClick={() => setCollapse((prev) => !prev)}>
              {collapse ? (
                <ExpandLess fontSize="large" sx={{ color: "white" }} />
              ) : (
                <ExpandMore fontSize="large" sx={{ color: "white" }} />
              )}
            </IconButton>
          </Box>
        }
        sx={{
          width: "100%",
          maxHeight: 800,
          position: "relative",
          bgcolor: "transparent",
          overflow: "auto",
        }}
      >
        <Collapse in={!collapse} collapsedSize={98}>
          {goal ? (
            <Box>
              <Divider sx={{ bgcolor: "white" }} />
              <ListItem
                dense
                disablePadding
                secondaryAction={
                  <ListItemText primary={"0 km"} sx={{ color: "white" }} />
                }
              >
                <ListItemButton
                  onClick={() =>
                    handlePress({ ...goal, i: guesses.length, dist: 1 })
                  }
                  sx={{
                    bgcolor:
                      guesses.length == selected
                        ? "rgba(255,255,0,0.5)"
                        : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,0,0.2)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <MilitaryTech
                      fontSize="large"
                      sx={{ color: "rgba(255,255,0,1)" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"#" + (guesses.length + 1) + " " + goal.name}
                    sx={{ color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          ) : (
            <></>
          )}
          {guesses.map((item, i) => {
            const score = item.dist / MAX;
            const circleColor =
              "rgba(" + (255 - 255 * score) + ",0," + 255 * score + ",1)";
            const hoverColor =
              "rgba(" + (255 - 255 * score) + ",0," + 255 * score + ",0.2)";
            const selectColor =
              "rgba(" + (255 - 255 * score) + ",0," + 255 * score + ",0.5)";
            return (
              <Box key={i}>
                <Divider sx={{ bgcolor: "white" }} />
                <ListItem
                  dense
                  disablePadding
                  secondaryAction={
                    <ListItemText
                      primary={item.dist.toFixed(0) + " km"}
                      sx={{ color: "white" }}
                    />
                  }
                >
                  <ListItemButton
                    onClick={() => handlePress(item)}
                    sx={{
                      bgcolor: item.i == selected ? selectColor : "transparent",
                      "&:hover": {
                        bgcolor: hoverColor,
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Circle fontSize="large" sx={{ color: circleColor }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={"#" + (item.i + 1) + " " + item.name}
                      sx={{ color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Box>
            );
          })}
          <Divider sx={{ bgcolor: "white" }} />
        </Collapse>
      </List>
    </Box>
  );
}

export default GuessList;
