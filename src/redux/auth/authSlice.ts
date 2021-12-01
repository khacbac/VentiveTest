import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models';

// Define a type for the slice state
interface IUserState {
  users: Array<User>;
  isLogged: boolean;
  user: User | null;
}

// Define the initial state using that type
const initialState: IUserState = {
  users: [],
  isLogged: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [action.payload, ...state.users];
    },
    userLogged: (state, action: PayloadAction<User>) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isLogged = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUser, userLogged, logout} = authSlice.actions;

export default authSlice.reducer;
