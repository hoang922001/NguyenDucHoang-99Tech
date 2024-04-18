import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../services/apis/user';
import { getCookie, removeItem } from '../../constants/cookie';
// POST : api/users/login
export const login = createAsyncThunk(
  'api/login',
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.login({ email, password });
      if (remember) localStorage.setItem('userInfo', JSON.stringify(data.data.user));
      localStorage.setItem('access-token', data.data.token);
      return data.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

//API
// POST : Register
export const registerApi = createAsyncThunk(
  'api/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.register({ username, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data.data.user)); 
      localStorage.setItem('access-token', data.data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userFromCookie = {
  user_name: getCookie('user_name'),
  token: getCookie('token'),
};

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : userFromCookie.token
  ? userFromCookie
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  err: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('access-token');
      removeItem('username');
      removeItem('token');
      return {};
    },
    reset_auth: (state) => {
      state.error = null;
      state.errorRegister = null;
    },
    loginGoogle: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return state;
    },
  },
  extraReducers: {
    // login list
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // // register
    [registerApi.pending]: (state) => {
      state.loadingRegister = true;
    },
    [registerApi.fulfilled]: (state, action) => {
      state.loadingRegister = false;
      state.userInfo = action.payload;
    },
    [registerApi.rejected]: (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, reset_auth, loginGoogle } = authSlice.actions;

export default authSlice.reducer;
