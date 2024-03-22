import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

export const registerUser = createAsyncThunk('auth/registerUser', api.registerUser);
export const loginUser = createAsyncThunk('auth/loginUser', api.loginUser);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = 'loading';

    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.token = action.payload.token;
    });
  },
});

export default authSlice.reducer;