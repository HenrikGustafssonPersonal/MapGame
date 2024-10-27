import StatsDisplay from "../components/StatsDisplay";
import StatusBar from "../components/StatusBar";

function Stats() {
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
      <StatsDisplay />
    </div>
  );
}
export default Stats;
