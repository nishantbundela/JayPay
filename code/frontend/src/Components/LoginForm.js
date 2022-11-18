import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import KeyIcon from "@mui/icons-material/Key";
/*
LoginForm component that is part of the larger LandingPage component
*/

export default function LoginForm() {
  /*
    To make things easier, the following usernames will take you to the 
    following dashboards:  

     'admin' -> admin dashboard
     'employer' -> employer dashboard
     'ta' -> employee dashboard (not implemented)
  */

  // these are for the css elements that hold the login paper
  const paperStyle = {
    padding: 30,
    width: "42vh",
    height: "45vh",
  };
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [username, setUsername] = React.useState('')

  const handleSignIn = (e) => {
    /*
      Temporary function to handle logins to access various
      dashboards before SSO is complete
    */
    e.preventDefault();
    if(username === 'admin') {
      window.location.href = "/admin";
    }
    if(username === 'employer') {
      window.location.href = "/employer";
    }
    if(username === 'employee') {
      window.location.href = "/employee";
    }
  };

  const handleInput = (event) => {
    setUsername(event.target.value)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const avatarStyle = { backgroundColor: "#9EDDF2" };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Login to JayPay</h2>

            <TextField
              style={{ width: "26ch" }}
              id="outlined-basic"
              label="User ID"
              variant="outlined"
              onChange={handleInput}
            />

            <FormControl sx={{ m: 1, width: "26ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => handleSignIn(e)}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<KeyIcon />}
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                window.location.href =
                  "https://jaypay-lego-api.herokuapp.com/jhu/login";
              }}
            >
              Sign In with SSO
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
