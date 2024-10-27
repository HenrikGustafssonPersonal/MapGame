import { Avatar, Box } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Map, MapRef, Marker, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Thermometer from "../components/Thermometer";
import GuessTextField from "../components/GuessTextField";
import GuessList from "../components/GuessList";
import { useQuery } from "react-query";
import { getGuesses } from "../requests/singlePlayerRequests";
import { AuthContext } from "../context/auth-context";
import CustomMarker from "../components/CustomMarker";
import CorrectGuessCard from "../components/CorrectGuessCard";
import { MilitaryTech } from "@mui/icons-material";
import MapOptions from "../components/MapOptions";
import { useLocation } from "react-router-dom";

function SinglePlayerGame() {
  const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapRef = useRef<MapRef>(null);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  const location = useLocation();
  const country = location.state.country;

  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [goal, setGoal] = useState<Guess>();
  const [globeView, setGlobeView] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      getGuesses(userId).then((res) => setGuesses(res.guesses));
    }
  }, [userId]);

  useEffect(() => {
    if (goal) {
      mapRef.current?.flyTo({
        center: [goal.lon, goal.lat],
        duration: 2000,
        zoom: 2.5,
      });
    }
  }, [goal]);

  const Guesses = useMemo(() => {
    const newGuesses = guesses ? guesses : [];

    const arrayWithIndexes = newGuesses.map((item, i) => {
      return { ...item, i: i };
    });
    return arrayWithIndexes.sort((a, b) => a.dist - b.dist);
  }, [guesses]);

  return (
    <Box height={"100%"} width={"100%"}>
      <Map
        ref={mapRef}
        mapboxAccessToken={TOKEN}
        initialViewState={{
          longitude: 10.770106,
          latitude: 30.375257,
          zoom: 1.7,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        projection={globeView ? "globe" : undefined}
        fog={
          globeView
            ? {
                range: [0.5, 0.5],
                color: "transparent",
                "horizon-blend": 0.001,
              }
            : undefined
        }
        attributionControl={false}
      >
        {Guesses.map((guess) => {
          return (
            <Marker key={guess.i} latitude={guess.lat} longitude={guess.lon}>
              <CustomMarker
                index={guess.i}
                dist={guess.dist}
                correctCountry={guess.country === country}
              />
            </Marker>
          );
        })}
        {goal ? (
          <Marker key={goal.name} latitude={goal.lat} longitude={goal.lon}>
            <Avatar sx={{ bgcolor: "rgba(255,255,0,1)" }}>
              <MilitaryTech fontSize="large" sx={{ color: "black" }} />
            </Avatar>
          </Marker>
        ) : (
          <></>
        )}
        <ScaleControl
          maxWidth={300}
          position="bottom-left"
          style={{
            color: "white",
            marginLeft: "16px",
            fontSize: "16px",
            backgroundColor: "transparent",
            borderWidth: "0px 3px 3px",
            borderColor: "white",
          }}
        />
      </Map>
      {goal ? (
        <CorrectGuessCard
          nGuesses={Guesses.length + 1}
          userId={userId ? userId : ""}
        />
      ) : (
        <></>
      )}
      <GuessTextField
        setGuesses={setGuesses}
        userId={userId ? userId : ""}
        setGoal={setGoal}
      />
      <Thermometer guesses={Guesses} mapRef={mapRef} goal={goal} />
      <GuessList guesses={Guesses} mapRef={mapRef} goal={goal} />
      <MapOptions globeView={globeView} setGlobeView={setGlobeView} />
    </Box>
  );
}

export default SinglePlayerGame;
