// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// --- Async thunk for login ---
export const login = createAsyncThunk("auth/login", async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data; // includes role + token
});

// --- Async thunk for register ---
export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data; // includes role + token
});

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // normalize role before saving
        const user = {
          ...action.payload,
          role: action.payload.role?.toLowerCase(),
        };
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        const user = {
          ...action.payload,
          role: action.payload.role?.toLowerCase(),
        };
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
