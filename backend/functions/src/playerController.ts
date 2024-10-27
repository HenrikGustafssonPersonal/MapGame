import { Response } from "express";
import { db } from "./config/firebase";

type PlayerRequest = {
  body: { user_id: string; user_name: string };
  params: { userId: string };
};

const addPlayer = async (req: PlayerRequest, res: Response) => {
  const { user_id, user_name } = req.body;
  try {
    const entry = db.collection("players").doc(user_id);
    const entryObject = {
      uid: user_id,
      name: user_name,
      games: [],
    };

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    res.status(200).send({
      status: "success",
      message: "Player added successfully",
      data: entryObject,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { addPlayer };
