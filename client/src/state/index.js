import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  users: [],
  employees: [],
  areas: [],
  proyects: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload.employees;
    },
    setAreas: (state, action) => {
      state.areas = action.payload.areas;
    },
    setProyects: (state, action) => {
      state.proyects = action.payload.proyects;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setUsers,
  setEmployees,
  setAreas,
  setProyects,
} = authSlice.actions;
export default authSlice.reducer;
