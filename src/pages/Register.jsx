import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";

const Register = () => {
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const inputStyle = {
    margin: "10px 0px",
  };

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords Not Match!", { position: "top-center" });
    }

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (isError || message) {
      toast.error(message);
    }
  }, [user, isError, message]);

  if (isLoading) {
    return (
      <Container sx={{ padding: "80px 0px" }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ padding: "80px 0px" }}>
      <Typography variant="h4" align="center">
        Register Here
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              required
              sx={inputStyle}
              onChange={handleChange}
              name="name"
              value={name}
            ></TextField>

            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              required
              sx={inputStyle}
              type="email"
              onChange={handleChange}
              name="email"
              value={email}
            ></TextField>

            <TextField
              variant="outlined"
              label="Password"
              fullWidth
              required
              sx={inputStyle}
              type="password"
              onChange={handleChange}
              name="password"
              value={password}
            ></TextField>

            <TextField
              variant="outlined"
              label="Confirm Password"
              fullWidth
              required
              sx={inputStyle}
              type="password"
              onChange={handleChange}
              name="password2"
              value={password2}
            ></TextField>

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={inputStyle}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
