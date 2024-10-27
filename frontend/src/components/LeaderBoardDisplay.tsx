import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/auth-context";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { getAllPlayers } from "../requests/subPageRequests";

function LeaderBoardDisplay() {
  const { currentUser, signOut } = useContext(AuthContext);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    getAllPlayers().then((res) => {
      setPlayers(res);
    });
  }, []);

  function ListElementColor(playerUid: string, playerIndex: number) {
    if (playerUid == currentUser?.uid) return "lightblue"; // Player
    else if (playerIndex == 0) return "#ffe082"; // Gold
    else if (playerIndex == 1) return "lightgrey"; // Silver
    else if (playerIndex == 2) return "#a1887f"; // Bronze
    else return "white"; // Nothing
  }

  function getPlayerRank(playerUid: string) {
    const uids: string[] = players.map((value) => {
      return value.uid;
    });
    const playerRank = uids.findIndex((uid) => uid === playerUid);
    console.log(playerRank);
    return playerRank + 1;
  }

  function getPlayer(playerUid: string) {
    return players.find((player) => player.uid === playerUid);
  }

  function getSelf() {
    //console.log(players);
    //console.log(players.findIndex((value) => value.name == playerName));
    if (players == undefined) return;
    if (players.find((player) => player.uid == currentUser?.uid) != undefined)
      return players.find((player) => player.uid == currentUser?.uid);
    else return [];
  }
  return (
    <Grid container justifyContent={"center"} height={"90%"}>
      <Card
        sx={{
          minWidth: "70%",
          maxWidth: 400,
          minHeight: 400,
          borderRadius: 10,
          maxHeight: "100%",
          alignContent: "center",
          justifyContent: "center",
          //display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{}}>
          <List
            sx={{ overflow: "auto", borderRadius: 5, maxHeight: 700 }}
            subheader={
              <ListSubheader>
                <Typography variant="h2" paddingTop={4} paddingBottom={2}>
                  Leaderboard
                </Typography>
              </ListSubheader>
            }
          >
            {players
              .filter(function (value) {
                if (getPlayer(value.uid).score == undefined) {
                  return false;
                }
                return true;
              })
              .map((value, index) => {
                <Divider />;
                return (
                  <>
                    <Divider />
                    <ListItem
                      key={value.uid + index}
                      disablePadding
                      sx={{
                        backgroundColor: ListElementColor(value.uid, index),
                      }}
                    >
                      <Typography paddingLeft={3} variant="h4">
                        Rank {index + 1}:
                      </Typography>
                      <CardHeader
                        title={
                          value.name == currentUser?.email?.split("@")[0]
                            ? "You"
                            : value.name
                        }
                        avatar={<AccountCircle sx={{ fontSize: 50 }} />}
                        subheader={
                          "Player Score: " +
                          getPlayer(value.uid).score?.toFixed(0)
                        }
                        titleTypographyProps={{ variant: "h4" }}
                        subheaderTypographyProps={{ variant: "h6" }}
                      />
                      <Divider />
                    </ListItem>
                  </>
                );
              })}
          </List>
        </CardContent>
        <Divider />
        <CardHeader
          title={
            "Your Rank: " +
            getPlayerRank(
              currentUser?.uid != undefined ? currentUser?.uid : "token"
            )
          }
          avatar={<AccountCircle sx={{ fontSize: 80 }} />}
          subheader={"Player Score: " + getSelf().score?.toFixed(0)}
          titleTypographyProps={{ variant: "h4" }}
          subheaderTypographyProps={{ variant: "h6" }}
        />
      </Card>
    </Grid>
  );
}
export default LeaderBoardDisplay;
