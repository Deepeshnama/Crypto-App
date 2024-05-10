import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// Check if user already exist in localStorage

const userExist = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userExist ? userExist : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(logInUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export default authSlice.reducer;

// Register User

export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (formdata, thunkAPI) => {
    try {
      return await authService.register(formdata);
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LogOut User

export const logOutUser = createAsyncThunk("LOGOUT/USER", async () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
});

// Login User

export const logInUser = createAsyncThunk("LOGIN/USER", async (formData , thunkAPI) => {
  try {
    return await authService.login(formData);
  } catch (error) {
    const message = error.response.data.message;

    return thunkAPI.rejectWithValue(message);
  }
});
