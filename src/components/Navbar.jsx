import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import {useSelector , useDispatch} from "react-redux"
import { logOutUser } from "../features/auth/authSlice";

const Navbar = () => {

  const {user} = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOutUser())
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link to={"/"}>Auth App</Link>
        </Typography>

        {!user ? (
          <>
            <Link to={"/register"}>
              <Button variant="contained" color="secondary" size="small">
                Register
              </Button>
            </Link>

            <Link to={"/login"}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ margin: "10px" }}
              >
                Login
              </Button>
            </Link>
          </>
        ) : (
          <Button
            variant="contained"
            color="error"
            size="small"
            endIcon={<LogoutIcon />}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
