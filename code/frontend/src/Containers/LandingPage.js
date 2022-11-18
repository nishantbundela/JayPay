import React from "react";
import Box from "@mui/material/Box";
import logo from "../logo.png";
import backvg from "../loginbackground.svg";
import LoginForm from "../Components/LoginForm";
import { Grid, Paper } from "@mui/material";

/*
LandingPage is the entry point to the application. This component does not persist state (nor should it).
Responsible for laying out LoginForm and JayPay logo.
*/

export default function LandingPage() {
  return (
    <Box
      sx={{
        width: 1,
        height: "120vh",
        display: "flex",
        justifyContent: "center",
        background: "#F0F8FF",
        backgroundImage: `url(${backvg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid>
        <Paper
          elevation={10}
          style={{
            padding: 50,
            height: "60vh",
            width: 800,
            margin: "150px auto",
          }}
        >
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={5} style={{ margin: "30px 0px", padding: "60px" }}>
              <img
                src={logo}
                alt="JayPay Logo"
                style={{ width: "30vh", height: "30vh" }}
              />
            </Grid>
            <Grid item xs={7} style={{ margin: "20px 0px" }}>
              <LoginForm />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}
