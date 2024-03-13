import { createReducer, on } from '@ngrx/store';
import { clearErrorAction, setErrorAction } from '../actions/error.action';

interface IUser {
  message: string;
  messages: string[];
}

const initialState: IUser = {
  message: '',
  messages: [],
};

export const errorReducer = createReducer(
  initialState,
  on(setErrorAction, (state, action) => {
    return { ...state, ...action };
  }),
  on(clearErrorAction, () => initialState)
);
