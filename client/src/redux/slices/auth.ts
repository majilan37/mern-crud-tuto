import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserData, User } from "../../types";
import { authService } from "../services/auth";

interface InitialState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const user = JSON.parse(localStorage.getItem("user") as string);

const initialState: InitialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// register user
export const register = createAsyncThunk<User, UserData>(
  "auth/register",
  async (user: unknown, thunkApi) => {
    try {
      return authService.register(user as UserData);
    } catch (err: any) {
      console.log(err);
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// login user
export const login = createAsyncThunk<User, Pick<User, "email" | "password">>(
  "auth/login",
  async (user: unknown, thunkApi) => {
    try {
      return authService.login(user as UserData);
    } catch (err: any) {
      console.log(err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// logout user
export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async (user, thunkApi) => {
    try {
      // thunkApi.rejectWithValue(message)
      return authService.logout();
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully registered";
        state.user = action.payload as User;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
        state.user = null;
      })
      // login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully logged in";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
        state.user = null;
      })
      // logout user
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = true;
        state.message = "Successfully logged out";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
      });
  },
});

export const { reset } = authSlice.actions;
