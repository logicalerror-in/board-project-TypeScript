import type {AuthUser} from "../types/auth.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type AuthSlice = {
  user: AuthUser | null;
};

const initialState: AuthSlice = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {setUser, clearUser} = authSlice.actions;

export const authReducer = authSlice.reducer;