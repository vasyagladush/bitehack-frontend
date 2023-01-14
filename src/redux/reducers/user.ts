import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, User } from "../../types";

export interface UserStore {
  authUser: LE<User>;
  userByUsername: LE<User>;
}

const initialState = {
  _id: "",
  email: "",
  fullname: "",
  password: "",
  gender: "",
  country: "",
  subjects: [],
  auth: {
    local: {
      accessToken: undefined,
      refreshToken: undefined,
    },
  },
  isLoading: false,
  error: undefined,
};

const userInitialState: UserStore = {
  authUser: initialState,
  userByUsername: initialState,
};
interface RegisterResponse {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}
interface RegisterRequest {
  fullname: string;
  email: string;
  gender: string;
  country: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  subjects: Array<{ name: string; percent: string; level: string }>;
}

interface LoginResponse {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
  "auth/register",
  async ({
    email,
    password,
    fullname,
    gender,
    country,
    dateOfBirth,
    subjects,
  }) => {
    const response = await instance.post("/auth/signup", {
      email,
      password,
      fullname,
      gender,
      country,
      dateBirth: dateOfBirth,
      subjects,
    });
    return response.data;
  }
);
const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async ({ email, password }) => {
    const response = await instance.post("auth/login", {
      email,
      password,
    });
    return response.data;
  }
);

const fetchUser = createAsyncThunk<User, string>(
  "profile/username",
  async (username) => {
    const response = await instance.get("users", {
      params: { query: { username: username } },
    });
    return response.data.docs[0];
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    clearError: (state) => {
      state.authUser.error = "";
    },
    resetUserData: () => {
      return userInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      Object.assign(store.authUser, {
        ...userInitialState.authUser,
        ...payload.user,
        auth: {
          local: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        },
      });
    });
    builder.addCase(registerUser.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to register user";
    });

    builder.addCase(loginUser.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      Object.assign(store.authUser, {
        ...userInitialState.authUser,
        ...payload.user,
        auth: {
          local: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        },
      });
    });
    builder.addCase(loginUser.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to login user";
    });

    builder.addCase(fetchUser.pending, (store) => {
      store.userByUsername.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (store, { payload }) => {
      store.userByUsername = { ...userInitialState, ...payload };
      store.userByUsername.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (store) => {
      store.userByUsername.isLoading = false;
      store.userByUsername.error = "Failed to fetch user by username";
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  registerUser,
  loginUser,
  fetchUser,
};

export default userSlice.reducer;
