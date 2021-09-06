import "./Login.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Checkbox } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Alert, AlertTitle } from "@material-ui/lab";
import FacebookIcon from "@material-ui/icons/Facebook";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  createAccountFromForm,
  firebaseHandler,
  handleSignInWithFacebook,
  handleSignInWithGoogle,
  handleSignOut,
  logInFromForm,
} from "./loginManager";
export const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Login() {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });
  firebaseHandler();
  //Context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const googleSignIn = () => {
    ///
    handleSignInWithGoogle().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleSignInWithFacebook().then((res) => {
      handleResponse(res, true);
    });
  };
  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
      ///
    });
  };

  const handleChange = (event) => {
    let isValid = true;
    if (event.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isValid2 = /\d{1}/.test(event.target.value);
      const valid3 = event.target.value.length > 6;
      isValid = isValid2 && valid3;
    }
    if (isValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
    //  else {
    //   const newUser = { ...user };
    //   newUser.error = "Invalid Email or Password";
    //   setUser(newUser);
    // }
  };
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      ///
      createAccountFromForm(user.email, user.password, user.name).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      ///
      logInFromForm(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    event.preventDefault();
  };

  return (
    <div className="Login">
      {!user.isSignedIn && (
        <div className="form">
          <form className={classes.root} noValidate autoComplete="off">
            {newUser ? <h3>Sign Up</h3> : <h3>Sign In</h3>}
            {newUser && (
              <TextField
                type="text"
                id="standard-basic1"
                label="Name:"
                placeholder="Your name"
                name="name"
                required
                onBlur={handleChange}
              />
            )}

            <br />
            <TextField
              type="text"
              id="standard-basic2"
              label="Email:"
              placeholder="xxx@xyz.com"
              name="email"
              required
              onBlur={handleChange}
            />
            <br />
            <TextField
              type="password"
              id="standard-basic3"
              label="Password:"
              placeholder="password"
              name="password"
              required
              onBlur={handleChange}
            />

            <br />
            <input
              type="submit"
              value={newUser ? "Sign up" : "Sign in"}
              id="submit"
              onClick={handleSubmit}
            />
            <br />
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              name="newUser"
              onClick={() => setNewUser(!newUser)}
            />
            <label htmlFor="newUser">New user Sign up</label>
          </form>
          {user.error && (
            <div className="alert">
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {user.error} — <strong>check it out!</strong>
              </Alert>
            </div>
          )}
          {user.success && (
            <div className="alert">
              <Alert severity="success">
                <AlertTitle>Successful</AlertTitle>
                <strong> {newUser ? "Account created!" : "Logged in"}</strong>
              </Alert>
            </div>
          )}
          <h3>Or</h3>
        </div>
      )}

      <div className={classes.root}>
        {user.isSignedIn ? (
          <Button color="secondary" onClick={signOut}>
            Sign out
          </Button>
        ) : (
          <div>
            <Button color="secondary" onClick={googleSignIn}>
              Sign in with <GTranslateIcon color="secondary" />
            </Button>
            <Button color="primary" onClick={fbSignIn}>
              Sign in with <FacebookIcon color="primary" />
            </Button>
          </div>
        )}
      </div>
      {user.isSignedIn && (
        <Container maxWidth="sm">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                image={user.photo}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Container>
      )}
    </div>
  );
}

export default Login;
