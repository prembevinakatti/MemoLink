import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: false, 
    authUser: null, 
  },
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload; 
      state.status = true; 
    },
  },
});

export const { setAuthUser } = userSlice.actions; 
export default userSlice.reducer; 
