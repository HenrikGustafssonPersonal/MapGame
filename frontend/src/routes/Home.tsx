import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import StatusBar from "../components/StatusBar";
import { Box, Card, Grid } from "@mui/material";
import GamePicker from "../components/GamePicker";

function Home() {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    /**
     * Extract the currrentUser from the context, if you want to
     * get the User info, like the email, display name, etc.
     */

    <div
      className="App"
      style={{
        backgroundImage: "url(/img/mapOfWorld.png)",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <StatusBar />
      <GamePicker />
    </div>
  );
}
export default Home;
