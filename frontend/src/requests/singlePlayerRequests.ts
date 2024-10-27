import { NavigateFunction, useNavigate } from "react-router-dom";

export const createGame = async (
  userId: string,
  type: string,
  nav: NavigateFunction
) => {
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/singleplayer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, type: type }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.error(error));

  if (response?.status == "success") {
    const country = response.data.goal.country;
    nav("/singleplayer", { state: { country: country } });
    console.log("Starting an " + type + " Game");
  } else {
    console.log("Failed");
  }
};

export const getGuesses = async (userId: string) => {
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/singleplayer/getguesses/" +
      userId
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return response;
};

export const makeGuess = async (userId: string, name: string) => {
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/singleplayer/makeguess",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, name: name }),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log(error.message));

  return response;
};

export async function unfinishedGame(userId: string) {
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/singleplayer/unfinishedgame/" +
      userId,
    {
      method: "GET",
      headers: {},
    }
  )
    .then(async (res) => {
      const result = await res.json();
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });

  return response;
}

export async function deleteGame(userId: string) {
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/singleplayer/deletegame/" +
      userId,
    {
      method: "DELETE",
      headers: {},
    }
  )
    .then(async (res) => {
      const result = await res.json();
      return result.status === "true";
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
  return response;
}

export const finishGame = async (userId: string) => {
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/singleplayer/finishgame/" +
      userId,
    {
      method: "PATCH",
      headers: {},
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return response;
};
