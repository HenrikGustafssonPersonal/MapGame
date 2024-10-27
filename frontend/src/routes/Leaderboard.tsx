import StatusBar from "../components/StatusBar";
import LeaderBoardDisplay from "../components/LeaderBoardDisplay";

function Leaderboard() {
  return (
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
      <LeaderBoardDisplay />
    </div>
  );
}
export default Leaderboard;
