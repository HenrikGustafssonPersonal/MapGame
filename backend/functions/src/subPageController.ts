import { Response } from "express";
import { db } from "./config/firebase";

//import fetch from "node-fetch";
type GetCurrentPlayerType = {
  user_id: string;
}
type GetCurrentPlayerRequest = {
  body: GetCurrentPlayerType;
  params: { userId: string };
}

  const getAllPlayers = async (req: any, res: Response) =>{
    try {
        const allPs: any[] = [];
        const querySnapshot = await db.collection('players').get()
        querySnapshot.forEach((doc: any) => {
          allPs.push({...doc.data(),score: calcPlayerScore(doc.data())}) 
          })
         const sortedPs = allPs.sort((a,b)=> b.score - a.score)

      return res.status(200).json(sortedPs)
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  const getCurrentPlayer = async(req: GetCurrentPlayerRequest, res: Response) => {
    const user_id = req.params.userId;
    try {
    const playerRef = db.collection('players').doc(user_id);
    const currentPlayerData = (await playerRef.get()).data() || {};;

    return res.status(200).json(currentPlayerData)
  } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  function calcPlayerScore(player: any) {
    if (player == undefined) return 0;

    const amountOfEasy = player.games.map((value: any) => {
      if (value.type === "easy") return value;
    }).length;
    const amountOfIntermediate = player.games.map((value: any) => {
      if (value.type === "intermediate") return value;
    }).length;
    const amountOfExpert = player.games.map((value: any) => {
      if (value.type === "expert") return value;
    }).length;

    const guessAmount = player.games.reduce(
      (a: any, currentValue:any) => (a = a + currentValue.guesses.length),
      0
    );
    
    const averageGuesses =
    guessAmount / (amountOfEasy + amountOfIntermediate + amountOfExpert);

    const easyMultiplier = 10 / averageGuesses + 1;
    const intermediateMultiplier = 15 / averageGuesses + 2;
    const expertMultiplier = 20 / averageGuesses + 3;

    const playerScore =
      amountOfEasy * easyMultiplier +
      amountOfIntermediate * intermediateMultiplier +
      amountOfExpert * expertMultiplier;

    return playerScore;
  }
  export { getAllPlayers , getCurrentPlayer};