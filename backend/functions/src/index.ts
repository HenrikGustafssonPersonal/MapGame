import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import {
  deleteGame,
  finishGame,
  getGuesses,
  makeGuess,
  startGameSingle,
  unfinishedGame,
} from "./singlePlayerController";

import {
  getAllPlayers, getCurrentPlayer
} from "./subPageController";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

import { addPlayer } from "./playerController";


const app = express();

app.use(cors({ origin: true }));

app.get("/", (req, res) => res.status(200).send("Bingo!"));

app.post("/singleplayer", startGameSingle);

app.patch("/singleplayer/makeguess", makeGuess);

app.get("/singleplayer/getguesses/:userId", getGuesses);


// Subpages:
app.get("/getplayers", getAllPlayers);

app.get("/getcurrentplayer/:userId", getCurrentPlayer);

app.get("/singleplayer/unfinishedgame/:userId", unfinishedGame);

app.delete("/singleplayer/deletegame/:userId", deleteGame);

app.patch("/singleplayer/finishgame/:userId", finishGame);

app.post("/player", addPlayer);


exports.app = functions.https.onRequest(app);
