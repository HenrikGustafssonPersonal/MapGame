export const addPlayer = async (userId: string, email: string) => {
  const name = email.split("@")[0];
  const response = await fetch(
    "https://us-central1-mapgame-79bf9.cloudfunctions.net/app/player",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: String(userId), user_name: name }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.error(error));
};
