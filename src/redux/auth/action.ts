import {User} from '../../models';
import {AppDispatch, RootState} from '../store';
import {addUser, userLogged} from './authSlice';

const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const addUserFnc =
  (item: {email: string; password: string}) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    if (!emailReg.test(item.email)) {
      return Promise.reject('Email is invalid');
    }
    const isExist = Boolean(
      getState().auth.users.find(user => user.email === item.email),
    );
    if (isExist) {
      return Promise.reject('Email already taken');
    }
    const user: User = {
      _id: Date.now(),
      email: item.email,
      password: item.password,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
    };
    dispatch(addUser(user));
    return Promise.resolve();
  };

export const loginUserFnc =
  (item: {email: string; password: string}) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    if (!emailReg.test(item.email)) {
      return Promise.reject('Email is invalid');
    }
    const fUser = getState().auth.users.find(
      user => user.email === item.email && user.password === item.password,
    );
    if (!fUser) {
      return Promise.reject('Email or password is incorrect');
    }
    dispatch(userLogged(fUser));
    return Promise.resolve();
  };
