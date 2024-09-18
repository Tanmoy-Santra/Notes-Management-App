// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         userData: null,
//         isAuthenticated: false,
//     },
//     reducers: {
//         setUserData: (state, action) => {
//             state.userData = action.payload;
//             state.isAuthenticated = true;
//         },
//         removeUserData: (state, action) => {
//             state.userData = null;
//             state.isAuthenticated = false;
//         },
//     },
// });

// export const { setUserData, removeUserData } = userSlice.actions;
// export const selectUserData = (state) => state.user.userData;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

// export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         userData: null,
//         isAuthenticated: false,
//         loading: true,
//         error: null,
//     },
//     reducers: {
//         // Set user data and authentication status
//         setUserData: (state, action) => {
//             state.userData = action.payload;
//             state.isAuthenticated = true;
//             state.loading = false;
//             state.error = null;
//         },
//         // Remove user data and authentication status
//         removeUserData: (state) => {
//             state.userData = null;
//             state.isAuthenticated = false;
//             state.loading = false;
//             state.error = null;
//         },
//         // Set loading state
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         // Set error state
//         setError: (state, action) => {
//             state.error = action.payload;
//             state.loading = false; // Ensure loading is false if there's an error
//         },
//     },
// });

// // Export actions
// export const { setUserData, removeUserData, setLoading, setError } = userSlice.actions;

// // Export selectors
// export const selectUserData = (state) => state.user.userData;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
// export const selectLoading = (state) => state.user.loading;
// export const selectError = (state) => state.user.error;

// // Export reducer
// export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         userData: null,
//         isAuthenticated: false,
//         loading: false,  // Initialize loading state
//         error: null,     // Initialize error state
//     },
//     reducers: {
//         setUserData: (state, action) => {
//             state.userData = action.payload;
//             state.isAuthenticated = true;
//             state.loading = false; // Set loading to false after data is set
//             state.error = null;    // Clear error
//         },
//         removeUserData: (state) => {
//             state.userData = null;
//             state.isAuthenticated = false;
//             state.loading = false; // Set loading to false when user data is removed
//             state.error = null;    // Clear error
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         },
//     },
// });

// export const { setUserData, removeUserData, setLoading, setError } = userSlice.actions;
// export const selectUserData = (state) => state.user.userData;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
// export const selectLoading = (state) => state.user.loading;
// export const selectError = (state) => state.user.error;

// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUserData: {
      reducer: (state, action) => {
        if (action.payload && action.payload.token) {
          state.userData = action.payload;
          state.isAuthenticated = true;
          // Store complete user data and token in localStorage
          localStorage.setItem('authToken', action.payload.token);
          localStorage.setItem('userData', JSON.stringify(action.payload));
        } else {
          state.userData = null;
          state.isAuthenticated = false;
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
        state.loading = false;
        state.error = null;
      },
      prepare: (userData) => ({
        payload: userData,
      }),
    },
    removeUserData: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserData, removeUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;


