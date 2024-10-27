import { AccountCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { getCurrentPlayer } from "../requests/subPageRequests";

function ProfileDisplay() {
  const { currentUser, signOut } = useContext(AuthContext);

  const [player, setPlayer] = useState<any>();
  useEffect(() => {
    if (currentUser != null) {
      getCurrentPlayer(currentUser?.uid).then((res) => {
        setPlayer(res);
      });
    }
  }, []);

  function getAmountOfGamesOFType(gamesType: string) {
    if (player == undefined) return 0;

    const games = player.games.filter(function (game: any) {
      if (game.type != gamesType) {
        return false;
      }
      return true;
    });

    return games.length;
  }

  function getGames() {
    if (player == undefined) return [];
    else return player.games;
  }

  return (
    <Grid container justifyContent={"center"} height={"80%"} padding={10}>
      <Grid item xs={6}>
        <Card
          sx={{
            minWidth: "100%",
            maxWidth: 400,
            minHeight: 400,
            borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <CardHeader
            title={currentUser?.email}
            avatar={<AccountCircle sx={{ fontSize: 100 }} />}
            subheader={"Joined: " + currentUser?.metadata.creationTime}
            titleTypographyProps={{ variant: "h2" }}
            subheaderTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Divider />
            <Typography variant="h4" paddingTop={2}>
              Games Played:
            </Typography>
            <Grid
              container
              justifyContent={"center"}
              height={"100%"}
              paddingTop={2}
              paddingBottom={2}
              spacing={1}
            >
              <Grid item xs={3}>
                <Card>
                  <Typography variant="h6">
                    Total:{" "}
                    {getAmountOfGamesOFType("easy") +
                      getAmountOfGamesOFType("intermediate") +
                      getAmountOfGamesOFType("expert")}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card>
                  <Typography variant="h6">
                    Easy: {getAmountOfGamesOFType("easy")}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card>
                  <Typography variant="h6">
                    Intermediate: {getAmountOfGamesOFType("intermediate")}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card>
                  <Typography variant="h6">
                    Expert: {getAmountOfGamesOFType("expert")}
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h4" paddingTop={2} paddingBottom={2}>
              Previous Games:
            </Typography>
            <List>
              {getGames().map((value: any, index: number) => {
                <Divider />;
                return (
                  <>
                    <Divider />
                    <ListItem key={value + index} disablePadding>
                      <Typography variant="h6" alignContent={"left"}>
                        #
                        {index +
                          1 +
                          " " +
                          value.type +
                          " game: " +
                          (value.guesses.length + 1) +
                          " moves"}
                      </Typography>

                      <Divider />
                    </ListItem>
                  </>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default ProfileDisplay;
