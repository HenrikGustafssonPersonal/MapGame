import { Done, MilitaryTech } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Slide,
} from "@mui/material";
import { finishGame } from "../requests/singlePlayerRequests";
import { useNavigate } from "react-router-dom";
import MGButton from "./MGButton";

interface CorrectGuessCardProps {
  nGuesses: number;
  userId: string;
}

function CorrectGuessCard({ nGuesses, userId }: CorrectGuessCardProps) {
  const navigate = useNavigate();

  const handleFinish = () => {
    finishGame(userId).then(() => navigate("/home"));
  };

  return (
    <Slide in={true} direction="up" timeout={1000}>
      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: 8,
          border: "1 black",
          position: "absolute",
          bottom: "4%",
          right: "38%",
          left: "38%",
          padding: 2,
          paddingX: 3,
          zIndex: 2,
        }}
      >
        <CardHeader
          title="CORRECT GUESS!"
          titleTypographyProps={{ fontSize: 24 }}
          padding={1}
          avatar={
            <Avatar sx={{ bgcolor: "rgba(255,255,0,1)" }}>
              <MilitaryTech fontSize="large" sx={{ color: "black" }} />
            </Avatar>
          }
          subheader={"You reached the goal in " + nGuesses + " guesses"}
        ></CardHeader>
        <CardActions>
          <MGButton
            onClick={() => handleFinish()}
            children={"Finish Game"}
            endIcon={<Done />}
          />
        </CardActions>
      </Card>
    </Slide>
  );
}

export default CorrectGuessCard;
