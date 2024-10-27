export const getAllPlayers = async () => {
    const response = await fetch(
      "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/getplayers"
    
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));
  
    return response;
  };

  export const getCurrentPlayer = async (userId: string) => {
    const response = await fetch(
      "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/getcurrentPlayer/" + userId
    
    )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return response;
  }