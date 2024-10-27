import { Response } from "express";
import { db } from "./config/firebase";
import * as geofire from "geofire-common";

import fetch from "node-fetch";

type StartGameType = {
  user_id: string;
  type: string;
};

type StartGameRequest = {
  body: StartGameType;
  params: { docId: string };
};

type MakeGuessType = {
  name: string;
  user_id: string;
};

type MakeGuessRequest = {
  body: MakeGuessType;
  params: { docId: string };
};

type GetGuessType = {
  user_id: string;
};

type GetGuessRequest = {
  body: GetGuessType;
  params: { userId: string };
};

const startGameSingle = async (req: StartGameRequest, res: Response) => {
  const { user_id, type } = req.body;
  const max = 38000000;
  const easyCountries = [
    "US",
    "DE",
    "CA",
    "SE",
    "UK",
    "JP",
    "AU",
    "ES",
    "FR",
    "IT",
    "RU",
  ];
  try {
    var url = "https://api.api-ninjas.com/v1/city?";
    var limit = 0;

    if (type === "easy") {
      limit = 3;
      const randIndex = Math.floor(Math.random() * easyCountries.length);
      url = url + "country=" + easyCountries[randIndex] + "&limit=" + limit;
    }

    if (type === "intermediate") {
      limit = 30;
      const randPop = Math.floor((Math.random() / 2.5 + 0.6) * max);
      url = url + "max_population=" + randPop + "&limit=" + limit;
    }

    if (type === "expert") {
      limit = 30;
      const randPop = Math.floor((Math.random() / 5) * max + 200000);
      url = url + "max_population=" + randPop + "&limit=" + limit;
    }

    const cityResponse = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "EpKQpwLmRdD9jnCxT0St1w==cqZ7sm9RWSJCLwQz",
      },
    });

    if (!cityResponse.ok) {
      throw new Error(`Error with ninjas api! status: ${cityResponse.status}`);
    }

    const cityData = await cityResponse.json();

    var index = Math.floor(Math.random() * limit);
    const start = index;
    var country = cityData[index].country;

    while (country == "CN") {
      index++;
      if (index == limit) index = 0;
      if (index == start) break;
      country = cityData[index].country;
    }

    const randIndex2 = type == "expert" ? index : start;

    const cityObject = {
      country: cityData[randIndex2].country,
      lat: cityData[randIndex2].latitude,
      lon: cityData[randIndex2].longitude,
      name: cityData[randIndex2].name,
    };

    const entry = db.collection("active_s_games").doc();
    const entryObject = {
      user_id: user_id,
      goal: cityObject,
      guesses: [],
      type: type,
    };

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    res.status(200).send({
      status: "success",
      message: type + " game created successfully",
      data: entryObject,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const unfinishedGame = async (req: GetGuessRequest, res: Response) => {
  const user_id = req.params.userId;
  try {
    const gamesRef = db.collection("active_s_games");
    const currentGameSnapshot = await gamesRef
      .where("user_id", "==", user_id)
      .get();

    if (currentGameSnapshot.docs.length > 0) {
      const currentGameRef = currentGameSnapshot.docs[0].ref;
      const currentGameData = (await currentGameRef.get()).data() || {};

      return res.status(200).json({
        status: "true",
        message: "Game already exists",
        data: currentGameData.goal.country,
      });
    }
    return res
      .status(200)
      .json({ status: "false", message: "Game dont exists" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const makeGuess = async (req: MakeGuessRequest, res: Response) => {
  const { name, user_id } = req.body;
  try {
    const gamesRef = db.collection("active_s_games");

    const currentGameSnapshot = await gamesRef
      .where("user_id", "==", user_id)
      .get();
    const currentGameRef = currentGameSnapshot.docs[0].ref;

    const currentGameData = (await currentGameRef.get()).data() || {};

    if (currentGameData.goal.name == name) {
      res.status(200).json({
        status: "goal",
        message: "Success! Finished game.",
        data: currentGameData,
      });
      return;
    }

    const guessResponse = await fetch(
      "https://api.api-ninjas.com/v1/geocoding?city=" + name,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "EpKQpwLmRdD9jnCxT0St1w==cqZ7sm9RWSJCLwQz",
        },
      }
    );

    if (!guessResponse.ok) {
      throw new Error(`Error with ninjas api! status: ${guessResponse.status}`);
    }

    const guessData = await guessResponse.json();

    const distance = geofire.distanceBetween(
      [guessData[0].latitude, guessData[0].longitude],
      [currentGameData.goal.lat, currentGameData.goal.lon]
    );

    if (distance < 7) {
      res.status(200).json({
        status: "goal",
        message: "Success! Finished game.",
        data: currentGameData,
      });
      return;
    }

    const guessObject = {
      country: guessData[0].country,
      name: name,
      lon: guessData[0].longitude,
      lat: guessData[0].latitude,
      dist: distance,
    };

    const guessArray = currentGameData.guesses;
    guessArray.push(guessObject);

    const updatedObject = {
      guesses: guessArray,
    };

    await currentGameRef.update(updatedObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    res.status(200).send({
      status: "success",
      message: "Added guess",
      data: updatedObject,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getGuesses = async (req: GetGuessRequest, res: Response) => {
  const user_id = req.params.userId;
  try {
    const gamesRef = db.collection("active_s_games");
    const currentGameSnapshot = await gamesRef
      .where("user_id", "==", user_id)
      .get();
    const currentGameRef = currentGameSnapshot.docs[0].ref;
    const currentGameData = (await currentGameRef.get()).data() || {};

    const guessObject = { guesses: currentGameData.guesses };

    return res.status(200).json(guessObject);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteGame = async (req: GetGuessRequest, res: Response) => {
  const user_id = req.params.userId;
  try {
    const gamesRef = db.collection("active_s_games");
    const currentGameSnapshot = await gamesRef
      .where("user_id", "==", user_id)
      .get();

    await currentGameSnapshot.docs[0].ref.delete().catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "Game deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const finishGame = async (req: GetGuessRequest, res: Response) => {
  const user_id = req.params.userId;
  try {
    const gamesRef = db.collection("active_s_games");
    const currentGameSnapshot = await gamesRef
      .where("user_id", "==", user_id)
      .get();

    const currentGameRef = currentGameSnapshot.docs[0].ref;

    const currentGameData = (await currentGameRef.get()).data() || {};

    const finishedGameData = {
      goal: currentGameData.goal,
      guesses: currentGameData.guesses,
      type: currentGameData.type,
    };

    const entry = db.collection("players").doc(user_id);

    const playerData = (await entry.get()).data() || {};

    const games = playerData.games ? playerData.games : [];
    games.push(finishedGameData);

    await entry.update({ games: games }).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    await currentGameSnapshot.docs[0].ref.delete().catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "Game finished successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export {
  startGameSingle,
  makeGuess,
  getGuesses,
  unfinishedGame,
  deleteGame,
  finishGame,
};
