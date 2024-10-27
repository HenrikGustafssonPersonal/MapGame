import { ChangeEvent, FormEvent, useState } from "react";
import { signUpUser } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import ".././index.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  TextField,
} from "@mui/material";
import { addPlayer } from "../requests/playerRequests";

const defaultFormFields = {
  email: "",
  password: "",
};

function Signup() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Send the email and password to firebase
      const userCredential = await signUpUser(email, password);

      if (userCredential) {
        addPlayer(userCredential.user.uid, email);
        resetFormFields();
        navigate("/login");
      }
    } catch (error: any) {
      console.log("User Sign Up Failed", error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: "url(/img/mapOfWorld.png)",
        height: "100%",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Card
        sx={{ minWidth: 400, minHeight: 400, padding: 2, borderRadius: 10 }}
      >
        <CardHeader
          title={"Register User"}
          subheader={"Enter You information Bellow:"}
          titleTypographyProps={{ variant: "h2" }}
          subheaderTypographyProps={{ variant: "h6" }}
        />
        <CardContent style={{ height: "50%" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              onChange={handleChange}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={handleChange}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
          <Link href="/" variant="body2">
            {"Already have an account? Login here"}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
