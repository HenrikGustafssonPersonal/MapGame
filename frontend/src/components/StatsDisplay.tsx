import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPlayers } from "../requests/subPageRequests";

function StatsDisplay() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    getAllPlayers().then((res) => {
      setPlayers(res);
      //console.log(players);
      // Sort The list Here based on Player Score:
    });
  }, []);

  function getTotalGames() {
    if (players == undefined) return 0;

    const totalGamesPlayed = players.reduce(
      (a, v) => (a = a + v.games.length),
      0
    );
    return totalGamesPlayed;
  }

  return (
    <Grid container justifyContent={"center"} height={"20%"} paddingTop={25}>
      <Card
        sx={{
          minWidth: "70%",
          maxWidth: 400,
          minHeight: 400,
          borderRadius: 10,
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" variant="h1">
          GlobaL Games Played: {getTotalGames()}
        </Typography>
      </Card>
    </Grid>
  );
}
export default StatsDisplay;
