import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./context/require-auth";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import SinglePlayerGame from "./routes/SinglePlayerGame";
import Leaderboard from "./routes/Leaderboard";
import Profile from "./routes/Profile";
import Stats from "./routes/Stats";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NOTE: console log for testing purposes
  console.log("User:", !!currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route
        path="home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="singleplayer"
        element={
          <RequireAuth>
            <SinglePlayerGame />
          </RequireAuth>
        }
      />
      <Route path="signup" element={<Signup />} />
      <Route
        path="leaderboard"
        element={
          <RequireAuth>
            <Leaderboard />
          </RequireAuth>
        }
      />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="stats"
        element={
          <RequireAuth>
            <Stats />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
