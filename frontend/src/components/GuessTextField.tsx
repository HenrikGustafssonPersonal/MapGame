import {
  Alert,
  Box,
  InputAdornment,
  LinearProgress,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { AddLocation } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { makeGuess } from "../requests/singlePlayerRequests";

interface GuessTextFieldProps {
  setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
  setGoal: React.Dispatch<React.SetStateAction<Guess | undefined>>;
  userId: string;
}
function GuessTextField({ setGuesses, setGoal, userId }: GuessTextFieldProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [guess, setGuess] = useState<string>("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (guess == "") {
      return;
    }

    if (event.key === "Enter") {
      setLoading(true);
      console.log(" Making guess: " + guess + "...");
      makeGuess(userId, guess).then((res) => {
        if (res.status == "goal") {
          setGoal(res.data.goal);
        }
        if (res.status === "success") {
          const newGuesses: Guess[] = res.data.guesses;
          setGuesses(newGuesses);
        }
        if (res.status === "error") {
          setOpenAlert(true);
        }
        setLoading(false);
      });
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Paper
      sx={{
        backgroundColor: "white",
        borderRadius: 8,
        border: "1 black",
        position: "absolute",
        bottom: "4%",
        right: "40%",
        left: "40%",
        padding: 2,
        paddingX: 3,
        zIndex: 1,
      }}
    >
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong, try again.
        </Alert>
      </Snackbar>
      <TextField
        variant="standard"
        fullWidth
        placeholder="Guess a city!"
        onKeyDown={handleEnter}
        onChange={(e) => setGuess(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddLocation />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <LinearProgress
        value={0}
        variant={loading ? "indeterminate" : "determinate"}
      />
    </Paper>
  );
}

export default GuessTextField;
