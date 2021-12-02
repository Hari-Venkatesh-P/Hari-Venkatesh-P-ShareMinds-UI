import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@mui/styles";
import LockClockIcon from "@mui/icons-material/LockClock";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import socketIOClient from "socket.io-client";
import "react-notifications-component/dist/theme.css";
import { API_URL, APP_NAME, USER_AUTHENTICATED } from "../../utils/constants";
import "animate.css";
import {
  authenticationCallBackSuccess,
  makeAuthenticationClear,
  makeAuthenticationRequest,
} from "../../store/actions";
import { UserData } from "../../store/models";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
});

const LoginScreen = () => {

  const history = useHistory();
  const classes = useStyles();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const paperStyle = {
    padding: 20,
    width: isDesktopOrLaptop ? 370 : 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#ac42c2" };

  const dispatch = useDispatch();

  const authenticationRequestLoading = useSelector(
    (state: any) => state.authenticationRequestLoading
  );

  const authenticationRequestSuccess = useSelector(
    (state: any) => state.authenticationRequestSuccess
  );

  const authenticationRequestFailure = useSelector(
    (state: any) => state.authenticationRequestFailure
  );

  const authenticationRequestShortURL = useSelector(
    (state: any) => state.authenticationRequestShortURL
  );

  const twitterUserId = useSelector((state: any) => state.twitterUserId);

  const btnstyle = { margin: "8px 0", color: "#FFFFFF" };

  React.useEffect(() => {
    if (
      !authenticationRequestLoading &&
      authenticationRequestSuccess &&
      authenticationRequestShortURL.length > 0
    ) {
      dispatch(makeAuthenticationClear());
      window.open(authenticationRequestShortURL, "_blank", "location=yes");
    } else if (!authenticationRequestLoading) {
      dispatch(makeAuthenticationClear());
    }
  }, [
    authenticationRequestLoading,
    authenticationRequestSuccess,
    authenticationRequestFailure,
    authenticationRequestShortURL,
  ]);

  useEffect(() => {
    const socket = socketIOClient(API_URL);
    socket.on(USER_AUTHENTICATED, (data: any) => {
      const parsedUserData: UserData = JSON.parse(data) as UserData;
      dispatch(authenticationCallBackSuccess(parsedUserData.userId));
    });
  }, []);

  useEffect(() => {
    if (twitterUserId.length > 0) {
      history.push("/feeds");
    }
  }, [twitterUserId]);

  return (
    <React.Fragment>
      <Grid
        container
        style={{
          height: "100vh",
          backgroundImage: `url("https://consumerhelpline.gov.in/directsell/assets/img/backgrounds/1.jpg")`,
        }}
      >
        {isDesktopOrLaptop && <Grid item xs={4}></Grid>}
        <Grid
          item
          xs={isDesktopOrLaptop ? 8 : 12}
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper elevation={10} style={paperStyle}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar style={avatarStyle}>
                <LockClockIcon />
              </Avatar>
              <h2
                style={{
                  color: "#ac42c2",
                }}
              >
                {APP_NAME}
              </h2>
            </Box>
            <Box sx={{ backgroundColor: "transparent" }}>
              <div style={{ cursor: "pointer" }}>
                <Button
                  className={classes.root}
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="medium"
                  style={btnstyle}
                  fullWidth
                  disabled={authenticationRequestLoading}
                  onClick={() => {
                    dispatch(makeAuthenticationRequest(uuidv4()));
                  }}
                >
                  {"Sign In with Twitter"}
                </Button>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginScreen;
