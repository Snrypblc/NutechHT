import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { API } from "../config/api";

export const loginUser = createAsyncThunk("user/loginUser", async (userCredintials) => {
    const response = await API.post("/login", userCredintials);
    localStorage.setItem("user", JSON.stringify(response))
    return response.data.data
})

const authSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state, action) => {
            state.loading = false;
            state.user = null;
            console.log(action.error.message)
            if(action.error.message === "request failed") {
                state.error = "access denided"
            } else {
                state.error = action.error.message
            }
        })
    }
})

export default authSlice.reducer