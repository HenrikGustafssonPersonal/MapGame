import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createGame,
  unfinishedGame,
  deleteGame,
} from "../requests/singlePlayerRequests";
import { AuthContext } from "../context/auth-context";
import { useContext, useEffect, useState } from "react";
import MGButton from "./MGButton";
import { Start } from "@mui/icons-material";

function GamePicker() {
  const navigate = useNavigate();
  const [gameExists, setGameExists] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    currentUser
      ? unfinishedGame(currentUser.uid).then((val) => {
          setGameExists(val.status == "true");
          setCountry(val.data ? val.data : "");
        })
      : {};
  }, [currentUser]);

  function StartGame(gameType: string) {
    setLoading(true);
    createGame(userId ? userId : "", gameType, navigate);
  }

  function handleContinue() {
    setLoading(true);
    setGameExists(false);
    navigate("/singleplayer", { state: { country: country } });
  }

  function handleAbandon() {
    setGameExists(false);
    setLoading(true);
    deleteGame(userId ? userId : "").then((res) => {
      setLoading(false);
    });
  }

  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Backdrop sx={{ color: "white", zIndex: 2000 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        disableEscapeKeyDown
        PaperProps={{ sx: { borderRadius: 6 } }}
        open={gameExists}
      >
        <DialogTitle>
          {"An unfinished game exists. Do you want to continue that game?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleAbandon()}>Abandon Game</Button>
          <Button onClick={() => handleContinue()}>Continue Game</Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={20}
        justifyContent={"center"}
        height={"100%"}
        padding={15}
      >
        <Grid item xs={6}>
          <Card
            sx={{
              height: "110%",
              width: "100%",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title={"Single Player Game"}
              subheader={"Please Select Difficulty:"}
              titleTypographyProps={{ variant: "h2", marginX: 4 }}
              subheaderTypographyProps={{ variant: "h6", marginX: 4 }}
              sx={{ paddingTop: 3 }}
            />
            <CardContent
              sx={{
                flex: "auto",
                padding: 4,
                paddingTop: 0,
                marginBottom: 1,
              }}
            >
              <Stack
                direction="column"
                spacing={4}
                height="100%"
                justifyContent="space-between"
              >
                <MGButton
                  onClick={() => StartGame("easy")}
                  children={
                    <Typography variant="button" display="block" gutterBottom>
                      Easy Game
                    </Typography>
                  }
                />
                <MGButton
                  onClick={() => StartGame("intermediate")}
                  children={
                    <Typography variant="button" display="block" gutterBottom>
                      Intermediate Game
                    </Typography>
                  }
                />
                <MGButton
                  onClick={() => StartGame("expert")}
                  children={
                    <Typography variant="button" display="block" gutterBottom>
                      Expert Game
                    </Typography>
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default GamePicker;
