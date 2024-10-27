import ProfileDisplay from "../components/ProfileDisplay";
import StatusBar from "../components/StatusBar";

function Profile() {
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
      <ProfileDisplay />
    </div>
  );
}
export default Profile;
